import React, {createContext} from "react";

export interface FormDesignerContextProps {
    nodeIdName: string
    setNodeIdName:(value:any)=>void
    hoverNodeId?: string
    selectionNodeId?: string
    dragging: boolean
    setDragging:(value:boolean)=>void
    onMouseMove:(e: React.MouseEvent)=>void
    onMouseDown:(e: React.MouseEvent)=>void
    onDragStart:(e: React.MouseEvent)=>void
    onDragEnd:(e: React.MouseEvent)=>void
}

export const FormDesignerContext = createContext<FormDesignerContextProps>({
    onDragEnd(e: React.MouseEvent): void {
    }, onDragStart(e: React.MouseEvent): void {
    },
    onMouseMove(e: React.MouseEvent): void {
    },
    setNodeIdName(): void {
    }, onMouseDown(e: React.MouseEvent): void {
    }, setDragging(value: boolean): void {
    },
    nodeIdName: 'td-designer-node-id',
    dragging:false
})
