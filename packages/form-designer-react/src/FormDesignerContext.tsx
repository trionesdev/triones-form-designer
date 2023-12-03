import React, {createContext} from "react";
import {TreeNode} from "./TreeNode";
import {DesignerComponent, IComponents, IResource} from "./types";
import {TD_DESIGNER_NODE_ID} from "./constant";

export interface FormDesignerContextProps {
    nodeIdName: string
    setNodeIdName: (value: any) => void
    rootComponentName?: string
    setRootComponentName?: (value: any) => void
    components?: IComponents
    treeNode?: TreeNode
    hoverNode?: TreeNode
    selectionNode?: TreeNode
    draggingNode?: TreeNode
    dragging: boolean
    setDragging: (value: boolean) => void
    registerSources:(resources:DesignerComponent[])=>void
    registerComponents:(components:IComponents)=>void
    onMouseMove: (e: React.MouseEvent) => void
    onMouseDown: (e: React.MouseEvent) => void
    onMouseUp: (e: React.MouseEvent) => void
    onDragStart: (e: React.MouseEvent) => void
    onDragEnd: (e: React.MouseEvent) => void
}

export const FormDesignerContext = createContext<FormDesignerContextProps>({
    registerComponents(components: IComponents): void {
    },
    registerSources(resources: IResource[]): void {
    },
    onMouseUp(e: React.MouseEvent): void {
    },
    onDragEnd(e: React.MouseEvent): void {
    }, onDragStart(e: React.MouseEvent): void {
    },
    onMouseMove(e: React.MouseEvent): void {
    },
    setNodeIdName(): void {
    }, onMouseDown(e: React.MouseEvent): void {
    }, setDragging(value: boolean): void {
    },
    nodeIdName: TD_DESIGNER_NODE_ID,
    dragging: false
})
