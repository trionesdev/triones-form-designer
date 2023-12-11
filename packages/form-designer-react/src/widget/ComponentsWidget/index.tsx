import React, {FC, useEffect} from "react"
import {TreeNodeWidget} from "./TreeNodeWidget";
import {observer} from "@formily/react";
import {IComponents} from "../../types";
import {useFormDesigner} from "../../hooks";
import {useTree} from "../../hooks";
import _ from "lodash";
import {Field} from "../Field";
import {GlobalStore} from "../../store";
import {DesignerComponentsContext} from "../../context";

type ComponentsWidgetProps = {
    children?: React.ReactNode,
    components?: IComponents
}
export const ComponentsWidget: FC<ComponentsWidgetProps> = observer(({children, components}) => {
    const {nodeIdAttrName} = useFormDesigner()
    const tree = useTree()

    const dataId = {}
    if (tree) {
        dataId[nodeIdAttrName] = tree.id
    }

    // useEffect(() => {
    //     registerComponents(_.assign({Field}, components))
    // }, [components])

    useEffect(() => {
        console.log("treeNode {}", tree)
    }, [tree])
    const componentsMap = _.assign({Field}, components)

    useEffect(() => {
        GlobalStore.registerDesignerResources(componentsMap)
    }, [])

    return <>
        <DesignerComponentsContext.Provider value={componentsMap}>
            <div {...dataId} style={{minWidth: '100%', minHeight: '100%'}}><TreeNodeWidget treeNode={tree}/></div>
        </DesignerComponentsContext.Provider>
    </>
})