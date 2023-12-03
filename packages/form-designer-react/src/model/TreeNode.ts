import randomstring from "randomstring"
import {ISchema} from "@formily/react";
import {FormDesignerEngine} from "./FormDesignerEngine";
interface ITreeNode{
    engine: FormDesignerEngine;
    parent?: TreeNode
    root?: TreeNode
    children?: TreeNode[]
    id?: string
    componentName?:string
    isSourceNode?: boolean
    schema?: ISchema
}
export class TreeNode {
    engine: FormDesignerEngine;
    parent?: TreeNode
    root?: TreeNode
    children: TreeNode[]
    id: string
    componentName:string
    props: any
    isSourceNode?: boolean
    schema?: ISchema

    constructor(args: ITreeNode) {
        this.engine = args.engine
        this.id = args.id || `td_${randomstring.generate(10)}`
        this.root = args?.root
        this.parent = args?.parent
        this.children = args?.children || []
        this.isSourceNode = args?.isSourceNode
        this.parent = args?.parent
        this.componentName = args?.componentName
        this.schema= args?.schema
        if (!args.parent){
            this.root = this
            this.parent = null
        }

        this.engine.treeNodes.set(this.id, this)
    }


}