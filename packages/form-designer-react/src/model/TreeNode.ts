import randomstring from "randomstring"
import {ISchema} from "@formily/react";
import {FormDesignerEngine} from "./FormDesignerEngine";
import {action, define, observable} from "@formily/reactive";
import {Operation} from "./Operation";

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
        this.componentName = args?.componentName
        this.schema = args?.schema
        this.operation = args?.operation

        if (args.parent) {
            this.root = args.parent?.root
            this.parent = args.parent
        }else {
            this.root = this
            this.parent = null
        }

        TreeNodes.set(this.id, this)
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            children: observable.shallow,
            append: action
        })
    }

    append(...nodes: TreeNode[]) {
        this.children = this.children.concat(nodes)
        console.log('TreeNode {}', this)
    }

}