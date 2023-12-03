import React, {FC, useEffect} from "react"
import {IComponents} from "../types";
import {useFormDesigner} from "../hooks/useFormDesigner";
import {TreeNodeWidget} from "./TreeNodeWidget";

type ComponentsWidgetProps = {
    children?: React.ReactNode,
    components?: IComponents
}
export const ComponentsWidget: FC<ComponentsWidgetProps> = ({children, components}) => {
    const {treeNode, registerComponents} = useFormDesigner()

    useEffect(() => {
        registerComponents(components)
    }, [components])

    return <>
        {treeNode && <TreeNodeWidget treeNode={treeNode}/>}
    </>
}