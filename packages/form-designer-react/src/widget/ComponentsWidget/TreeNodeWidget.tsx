import React, {FC, useEffect} from "react"
import {observer} from "@formily/react";
import {TreeNode} from "../../model";
import {useFormDesigner} from "../../hooks/useFormDesigner";
import {TreeNodeContext} from "../../context";

type ComponentWidgetProps = {
    treeNode: TreeNode;
}
export const TreeNodeWidget: FC<ComponentWidgetProps> = observer(({treeNode}) => {
    const {nodeIdAttrName, components} = useFormDesigner()
    console.log('TreeNodeWidget {}',treeNode)
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
                key: treeNode.id,
                [nodeIdAttrName]: treeNode.id,
                schema: treeNode.schema
            }
        }
        if (Component) {
            return React.createElement(Component, renderProps(), ...renderChildren())
        } else {
            if (treeNode.children.length > 0) {
                return <>{renderChildren()}</>
            }
        }

    }

    useEffect(() => {
        console.log('[TreeInfo] TreeNodeWidget',treeNode)
    }, [treeNode]);

    return <TreeNodeContext.Provider value={treeNode}>{handleRender()}</TreeNodeContext.Provider>
})