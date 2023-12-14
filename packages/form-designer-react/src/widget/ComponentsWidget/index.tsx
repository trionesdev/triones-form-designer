import React, {FC, useEffect} from "react"
import {TreeNodeWidget} from "./TreeNodeWidget";
import {observer} from "@formily/react";
import {IComponents} from "../../types";
import {useFormDesigner, useTree} from "../../hooks";
import _ from "lodash";
import {Field} from "../Field";
import {GlobalStore} from "../../store";
import {DesignerComponentsContext} from "../../context";
import styled from "@emotion/styled";

const ComponentsWidgetStyled = styled('div')({
    minWidth: '100%', minHeight: '100%'
})

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

    const componentsMap = _.assign({Field}, components)

    useEffect(() => {
        GlobalStore.registerDesignerResources(componentsMap)
    }, [])

    return <>
        <DesignerComponentsContext.Provider value={componentsMap}>
            <ComponentsWidgetStyled {...dataId} ><TreeNodeWidget treeNode={tree}/></ComponentsWidgetStyled>
        </DesignerComponentsContext.Provider>
    </>
})