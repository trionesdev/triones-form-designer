export class TreeNode {
    parent?: TreeNode
    root?: TreeNode
    children: TreeNode[]
    id: string
    name:string
    props: any

    constructor(props: any) {
        this.props = props
        this.id = props.id
        this.children = []
        this.parent = null
    }
}