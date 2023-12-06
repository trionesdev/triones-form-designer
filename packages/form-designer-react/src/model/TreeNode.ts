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
}

const TreeNodes = new Map<string, TreeNode>()

export class TreeNode {
    parent?: TreeNode
    root?: TreeNode
    children: TreeNode[]
    id: string
    componentName: string
    props: any
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
            append: action
        })
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
     * 插入当前节点后面
     * @param nodes
     */
    insertAfter(...nodes: TreeNode[]) {

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
            return this;
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
            schema: this.schema,
            parent: parent,
            root: this.root,
            isSourceNode: false,
            operation: this.operation
        })
        return newNode
    }
}