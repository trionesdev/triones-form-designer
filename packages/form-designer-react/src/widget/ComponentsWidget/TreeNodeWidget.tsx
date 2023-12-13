import React, {FC, useEffect} from "react"
import {observer} from "@formily/react";
import {TreeNode} from "../../model";
import {useFormDesigner} from "../../hooks";
import {TreeNodeContext} from "../../context";
import {useComponents} from "../../hooks";
import {autorun, reaction} from "@formily/reactive";

type ComponentWidgetProps = {
    treeNode: TreeNode;
}
export const TreeNodeWidget: FC<ComponentWidgetProps> = observer(({treeNode}) => {
    const {nodeIdAttrName} = useFormDesigner()
    const components = useComponents()

    const handleRender = () => {
        const Component = components?.[treeNode.componentName];

        const renderChildren = () => {
            if (treeNode.children.length > 0) {
                return treeNode.children.map((item, index) => {
                    return <TreeNodeWidget key={index} treeNode={item}/>
                })
            } else {
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
        autorun(() => {
            console.log("[Reactive listiner]")
        })
    }, []);

    reaction(() => {
        return [treeNode.schema,treeNode.children]
    }, ()=>{
        console.log("[Reactive listiner reaction]")
    })

    useEffect(() => {
        console.log("[Reactive listiner useEffect]")
    }, [treeNode.schema,treeNode.children]);

    return <TreeNodeContext.Provider value={treeNode}>{handleRender()}</TreeNodeContext.Provider>
})