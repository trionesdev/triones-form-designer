import randomstring from "randomstring"
import {ISchema} from "@formily/react";
import {FormDesignerEngine} from "./FormDesignerEngine";
import {action, define, observable} from "@formily/reactive";
import {Operation} from "./Operation";
import _ from "lodash";

interface ITreeNode {
    parent?: TreeNode
    root?: TreeNode
    children?: TreeNode[]
    id?: string
    componentName?: string
    isSourceNode?: boolean
    schema?: ISchema
    operation?: Operation

    [key: string]: any
}

const TreeNodes = new Map<string, TreeNode>()

export class TreeNode {
    parent?: TreeNode
    root?: TreeNode
    children: TreeNode[]
    id: string
    componentName: string
    isSourceNode?: boolean
    schema?: ISchema
    operation?: Operation

    constructor(args: ITreeNode) {
        this.id = args.id || `td_${randomstring.generate(10)}`
        this.root = args?.root
        this.parent = args?.parent
        this.children = args?.children || []
        this.isSourceNode = args?.isSourceNode
        this.componentName = args?.componentName || 'Field'
        this.schema = args?.schema
        this.operation = args?.operation

        if (args.parent) {
            this.root = args.parent?.root
            this.parent = args.parent
        } else {
            this.root = this
            this.parent = null
        }

        TreeNodes.set(this.id, this) //同步设置节点到TreeNodes
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            children: observable.shallow,
            schema: observable,
            designerProps: observable.computed,
            append: action
        })
    }

    get sourceComponent(){
        return this.operation?.engine?.findSourceComponent(_.get(this.schema, 'x-component', this.componentName))
    }

    get designerProps() {
        return this.operation?.engine?.findSourceComponent(_.get(this.schema, 'x-component', this.componentName))?.designerProps?.propsSchema || {}
    }

    get title() {
        return this.operation?.engine?.findSourceComponent(_.get(this.schema, 'x-component', this.componentName))?.title
    }

    get droppable() {
        console.log("droppable", this.operation?.engine?.findSourceComponent(_.get(this.schema, 'x-component', this.componentName)))
        return this.operation?.engine?.findSourceComponent(_.get(this.schema, 'x-component', this.componentName))?.droppable || false
    }

    findNodeById(id: string) {
        return TreeNodes.get(id)
    }

    /**
     * 在当前节点内添加节点
     * @param nodes
     */
    append(...nodes: TreeNode[]) {
        const droppableNode = this.droppableNode() //找到最近的可以拖入的节点
        if (droppableNode) {
            const appendNodes = this.restNodes(nodes, droppableNode);
            droppableNode.children = _.concat(droppableNode.children, appendNodes)
            console.log(this.operation)
            this.operation.selectionNode = appendNodes[0] //设置新增节点为选中状态
        }
    }

    /**
     * 插入当前节点之前
     * @param nodes
     */
    insertBefore(...nodes: TreeNode[]) {
        const insertNodes = _.filter(nodes, (node: TreeNode) => {
            return node.id !== this.id
        })
        if (_.isEmpty(insertNodes)) {
            return
        }
        const droppableNode = this.droppableNode() //找到最近的可以拖入的节点
        if (droppableNode) {
            const dropNodes = this.restNodes(insertNodes, droppableNode);
            const index = droppableNode.children.indexOf(this)
            const dropNodesIds = _.map(dropNodes, (node: TreeNode) => {
                return node.id
            })
            const beforeNodes = _.filter(droppableNode.children.slice(0, index), (node: TreeNode) => {
                return !_.includes(dropNodesIds, node.id)
            });
            const afterNodes = _.filter(droppableNode.children.slice(index), (node: TreeNode) => {
                return !_.includes(dropNodesIds, node.id)
            });
            droppableNode.children = _.concat(beforeNodes, dropNodes, afterNodes)
            this.operation.selectionNode = dropNodes[0]
        }
    }

    /**
     * 插入当前节点后面
     * @param nodes
     */
    insertAfter(...nodes: TreeNode[]) {
        const insertNodes = _.filter(nodes, (node: TreeNode) => {
            return node.id !== this.id
        })
        if (_.isEmpty(insertNodes)) {
            return
        }
        const droppableNode = this.droppableNode() //找到最近的可以拖入的节点
        if (droppableNode) {
            const dropNodes = this.restNodes(insertNodes, droppableNode);
            const index = droppableNode.children.indexOf(this)
            const dropNodesIds = _.map(dropNodes, (node: TreeNode) => {
                return node.id
            })
            const beforeNodes = _.filter(droppableNode.children.slice(0, index + 1), (node: TreeNode) => {
                return !_.includes(dropNodesIds, node.id)
            });
            const afterNodes = _.filter(droppableNode.children.slice(index + 1), (node: TreeNode) => {
                return !_.includes(dropNodesIds, node.id)
            });
            droppableNode.children = _.concat(beforeNodes, dropNodes, afterNodes)
            this.operation.selectionNode = dropNodes[0]
        }
    }

    remove() {
        const index = this.parent.children.indexOf(this)

        this.parent.children = this.parent.children.filter((node) => {
            return node.id !== this.id
        })
        if (_.isEmpty(this.parent.children)) {
            this.operation.selectionNode = this.parent
        } else {
            if (index > 0) {
                this.operation.selectionNode = this.parent.children[index - 1]
            } else {
                this.operation.selectionNode = this.parent.children[index]
            }
        }
        TreeNodes.delete(this.id)
    }

    /**
     * 最近的可以拖入的节点
     */
    droppableNode() {
        if (this.isSourceNode) {
            return
        } else {
            if (this.droppable) {
                return this;
            } else {
                return this.parent?.droppableNode()
            }
        }
    }

    private restNodes(nodes: TreeNode[], parentNode: TreeNode): TreeNode[] {
        return nodes.map(node => {
            if (node.isSourceNode) {
                return node.clone(parentNode);
            } else {
                node.parent = parentNode
                return node
            }

        })
    }

    clone(parent?: TreeNode): TreeNode {
        const newNode = new TreeNode({
            componentName: this.componentName,
            schema: _.cloneDeep(this.schema), //一定要深拷贝，否则数据会干扰，都是直接用的source组件的数据
            parent: parent,
            root: this.root,
            isSourceNode: false,
            operation: this.operation
        })
        return newNode
    }

    get layout() {
        if (this == this.root) {
            return 'vertical'
        }
        //TODO 根据组件类型获取布局
        return 'vertical'
    }
}