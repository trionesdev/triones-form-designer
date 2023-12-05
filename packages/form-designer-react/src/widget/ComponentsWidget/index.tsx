import React, {FC, useEffect} from "react"
import {TreeNodeWidget} from "./TreeNodeWidget";
import {observer} from "@formily/react";
import {IComponents} from "../../types";
import {useFormDesigner} from "../../hooks/useFormDesigner";
import {useTree} from "../../hooks/useTree";
import _ from "lodash";
import {Field} from "../Field";

type ComponentsWidgetProps = {
    children?: React.ReactNode,
    components?: IComponents
}
export const ComponentsWidget: FC<ComponentsWidgetProps> = observer(({children, components}) => {
    const {nodeIdAttrName,registerComponents} = useFormDesigner()
    const tree = useTree()

    const dataId = {}
    if (tree) {
        dataId[nodeIdAttrName] = tree.id
    }

    useEffect(() => {
        registerComponents(_.assign({Field},components))
    }, [components])

    useEffect(()=>{
        console.log("treeNode {}",tree)
    },[tree])

    return <>
        <div {...dataId} style={{width: '100%', height: '100%'}}><TreeNodeWidget treeNode={tree}/></div>
    </>
})