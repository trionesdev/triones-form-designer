import randomstring from "randomstring"
interface ITreeNode{
    parent?: TreeNode
    root?: TreeNode
    children?: TreeNode[]
    id?: string
    name?:string
    isSourceNode?: boolean
}
export class TreeNode {
    parent?: TreeNode
    root?: TreeNode
    children: TreeNode[]
    id: string
    name:string
    props: any
    isSourceNode?: boolean

    constructor(props: ITreeNode) {
        this.id = props.id || randomstring.generate(10)
        this.root = props?.root
        this.parent = props?.parent
        this.children = props?.children || []
        this.isSourceNode = props?.isSourceNode
        this.parent = props?.parent
        this.name = props?.name
        if (!props.parent){
            this.root = this
            this.parent = null
        }
    }

    toNode():TreeNode{
        return new TreeNode(this)
    }
}