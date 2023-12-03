import React, {FC} from "react"
import {TreeNode} from "../TreeNode";
import {useFormDesigner} from "../hooks/useFormDesigner";

type ComponentWidgetProps = {
    treeNode: TreeNode;
}
export const TreeNodeWidget: FC<ComponentWidgetProps> = ({treeNode}) => {
    const {nodeIdName, components} = useFormDesigner()

    const handleRender = () => {
        const Component = components?.[treeNode.componentName];

        const renderChildren = () => {
            if (treeNode.children.length > 0) {
                return treeNode.children.map((item, index) => {
                    return <TreeNodeWidget key={index} treeNode={item}/>
                })
            }else {
                return []
            }
        }
        const renderProps = () => {
            return {
                [nodeIdName]: treeNode.id,
                ...treeNode.props
            }
        }
        if (Component) {
            debugger
            return React.createElement(Component, renderProps(), ...renderChildren())
        } else {
            if (treeNode.children.length > 0) {
                return <>{renderChildren()}</>
            }
        }

    }

    return <>{handleRender()}</>
}