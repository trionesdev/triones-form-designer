import randomstring from "randomstring"
import {ISchema} from "@formily/react";
interface ITreeNode{
    parent?: TreeNode
    root?: TreeNode
    children?: TreeNode[]
    id?: string
    componentName?:string
    isSourceNode?: boolean
    schema?: ISchema
}
export class TreeNode {
    parent?: TreeNode
    root?: TreeNode
    children: TreeNode[]
    id: string
    componentName:string
    props: any
    isSourceNode?: boolean
    schema?: ISchema

    constructor(props: ITreeNode) {
        this.id = props.id || `td_${randomstring.generate(10)}`
        this.root = props?.root
        this.parent = props?.parent
        this.children = props?.children || []
        this.isSourceNode = props?.isSourceNode
        this.parent = props?.parent
        this.componentName = props?.componentName
        this.schema= props?.schema
        if (!props.parent){
            this.root = this
            this.parent = null
        }
    }

    toNode():TreeNode{
        return new TreeNode(this)
    }
}