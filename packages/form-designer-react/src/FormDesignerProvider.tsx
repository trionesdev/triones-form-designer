import {FormDesignerContext} from "./FormDesignerContext";
import React, {FC, useState} from "react";

type FormDesignerProviderProps = {
    children?: React.ReactNode
}

export const FormDesignerProvider: FC<FormDesignerProviderProps> = ({children}) => {
    const [nodeIdName, setNodeIdName] = React.useState<string>('td-designer-node-id');
    const [hoverNodeId, setHoverNodeId] = React.useState<string>(null);
    const [selectionNodeId, setSelectionNodeId] = React.useState<string>(null);
    const [dragging, setDragging] = useState(false)

    const handleMouseMove = (e: React.MouseEvent) => {
console.log('handleMouseMove')
        const target = e.target as HTMLElement
        const el = target?.closest?.(`*[${nodeIdName}]`)
        if (el) {
            setHoverNodeId(el.getAttribute(nodeIdName))
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {

        const target = e.target as HTMLElement
        const el = target?.closest?.(`*[${nodeIdName}],*[td-designer-source-id]`)
        debugger
        if (el) {
            handleDragStart(e)
            setSelectionNodeId(el.getAttribute(nodeIdName))
        }
    }

    const handleDragStart = (e: React.MouseEvent) => {
        console.log("drag start")
        setDragging(true)
    }

    const handleDragEnd = (e: React.MouseEvent) => {
        setDragging(false)
    }

    return <FormDesignerContext.Provider value={{
        nodeIdName,
        setNodeIdName,
        hoverNodeId,
        selectionNodeId,
        dragging,
        setDragging,
        onMouseMove: handleMouseMove,
        onMouseDown: handleMouseDown,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd
    }}>{children}</FormDesignerContext.Provider>
}