import React, {FC, useEffect} from "react"
import {IComponents} from "../types";
import {useFormDesigner} from "../hooks/useFormDesigner";
import {TreeNodeWidget} from "./TreeNodeWidget";

type ComponentsWidgetProps = {
    children?: React.ReactNode,
    components?: IComponents
}
export const ComponentsWidget: FC<ComponentsWidgetProps> = ({children, components}) => {
    const {nodeIdName, treeNode, registerComponents} = useFormDesigner()

    const dataId = {}
    if (treeNode) {
        dataId[nodeIdName] = treeNode.id
    }

    useEffect(() => {
        registerComponents(components)
    }, [components])

    return <>
        {treeNode &&
            <div {...dataId} style={{width: '100%', height: '100%'}}><TreeNodeWidget treeNode={treeNode}/></div>}
    </>
}