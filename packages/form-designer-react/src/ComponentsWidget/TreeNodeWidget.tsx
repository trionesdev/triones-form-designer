import React, {FC} from "react"
import {TreeNode} from "../TreeNode";
import {useFormDesigner} from "../hooks/useFormDesigner";

type ComponentWidgetProps = {
    treeNode: TreeNode;
}
export const TreeNodeWidget: FC<ComponentWidgetProps> = ({treeNode}) => {
    const {nodeIdName, components} = useFormDesigner()

    const handleRender = () => {
        const Component = components[treeNode.name]

        const renderProps = () => {
            return {
                [nodeIdName]: treeNode.id,
                ...treeNode.props
            }
        }


        return React.createElement(Component, renderProps())
    }

    return <>{handleRender()}</>
}