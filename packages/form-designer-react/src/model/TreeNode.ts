import randomstring from "randomstring"
import {ISchema} from "@formily/react";
import {action, define, observable, observe, reaction, toJS} from "@formily/reactive";
import {Operation} from "./Operation";
import _ from "lodash";
import {GlobalStore} from "../store";

export interface ITreeNode {

    children?: ITreeNode[]
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
    children: TreeNode[] = []
    id: string
    componentName: string
    isSourceNode?: boolean
    schema?: ISchema
    operation?: Operation

    constructor(node: ITreeNode, parent?: TreeNode) {
        if (node instanceof TreeNode) {
            return node
        }
        this.id = node.id || `td_${randomstring.generate({
            length: 10,
            charset: 'alphabetic'
        })}`
        this.root = node?.root
        this.parent = node?.parent
        this.isSourceNode = node?.isSourceNode
        this.componentName = node?.componentName || 'Field'
        this.schema = node?.schema
        this.operation = node?.operation || parent?.operation

        if (parent) {
            this.root = parent?.root
            this.parent = parent
        } else {
            this.root = this
            this.parent = null
        }

        TreeNodes.set(this.id, this) //同步设置节点到TreeNodes

        if (node) {
            this.from(node)
        }
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            children: observable.shallow,
            schema: observable,
            designerProps: observable.computed,
            append: action
        })
        reaction(() => {
            return this.children
        }, () => {
            if (!this.isSourceNode) {
                this.operation.onChange(`${this.id} children changed`)
            }
        })

        observe(this.schema,()=>{
            if(!this.isSourceNode){
                this.operation.onChange(`${this.id} schema changed`)
            }
        })

    }


    from(node?: ITreeNode) {
        if (!node) return

        if (node.id && node.id !== this.id) {
            TreeNodes.delete(this.id)
            TreeNodes.set(node.id, this)
            this.id = node.id
        }
        if (node.componentName) {
            this.componentName = node.componentName
        }
        this.schema = node.schema ?? {}

        if (node.children) {
            this.children =
                node.children?.map?.((node) => {
                    node.operation = this.operation
                    return new TreeNode(node,this)
                }) || []
        }
    }

    get designerProps() {
        return GlobalStore.getDesignerResourceByNode(this)?.designerProps?.propsSchema || {}
    }

    get title() {
        return GlobalStore.getDesignerResourceByNode(this)?.title
    }

    get displayName() {
        return _.get(this.schema, 'title', GlobalStore.getDesignerResourceByNode(this)?.title)
    }

    get icon() {
        return GlobalStore.getDesignerResourceByNode(this)?.icon
    }

    get droppable() {
        return GlobalStore.getDesignerResourceByNode(this)?.droppable || false
    }

    findNodeById(id: string) {
        return TreeNodes.get(id)
    }

    get index() {
        if (this.parent === this || !this.parent) return 0
        return this.parent.children.indexOf(this)
    }

    get next() {
        if (this.parent === this || !this.parent) return
        return this.parent.children[this.index + 1]
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
            this.operation.setSelectionNode(appendNodes[0]) //设置新增节点为选中状态
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
            const index = _.findIndex(droppableNode.children, (node: TreeNode) => {
                return node.id === this.id
            })
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
            this.operation.setSelectionNode(dropNodes[0])
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
            const index = _.findIndex(droppableNode.children, (node: TreeNode) => {
                return node.id === this.id
            })
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
            this.operation.setSelectionNode(dropNodes[0])
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
                if (!node.parent) {
                    node.parent = parentNode
                }
                return node
            }

        })
    }

    clone(parent?: TreeNode): TreeNode {
        const newNode = new TreeNode({
            componentName: this.componentName,
            schema: _.cloneDeep(this.schema), //一定要深拷贝，否则数据会干扰，都是直接用的source组件的数据
            isSourceNode: false,
            operation: parent.operation
        },parent)
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