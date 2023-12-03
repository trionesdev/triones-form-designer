import {FormDesignerContext} from "./FormDesignerContext";
import React, {FC, useState} from "react";
import {TreeNode} from "./TreeNode";
import {IComponents, IResource} from "./types";
import {TD_DESIGNER_NODE_ID, TD_DESIGNER_SOURCE_ID} from "./constant";

type FormDesignerProviderProps = {
    children?: React.ReactNode
}

export const FormDesignerProvider: FC<FormDesignerProviderProps> = ({children}) => {
    const sources = new Map<string, IResource>();
    const [components, setComponents] = useState<IComponents>({});
    const treeNodes = new Map<string, TreeNode>();
    const [nodeIdName, setNodeIdName] = React.useState<string>(TD_DESIGNER_NODE_ID);
    // @ts-ignore
    const [treeNode, setTreeNode] = React.useState<TreeNode>(null);
    const [hoverNode, setHoverNode] = React.useState<TreeNode>(null);
    const [selectionNode, setSelectionNode] = React.useState<TreeNode>(null);
    const [dragging, setDragging] = useState(false)
    // @ts-ignore
    const [draggingNode, setDraggingNode] = useState<TreeNode>(null)

    const handleRegisterSources = (IResource: IResource[]) => {
        IResource.forEach(item => {
            sources.set(item?.name, item)
        })
    }

    const handleFindNodeById = (id: string) => {
        return treeNodes.get(id)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        console.log('handleMouseMove')
        const target = e.target as HTMLElement
        const el = target?.closest?.(`*[${nodeIdName}]`)
        if (el) {
            setHoverNode(handleFindNodeById(el.getAttribute(nodeIdName)))
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {

        const target = e.target as HTMLElement
        const el = target?.closest?.(`*[${nodeIdName}],*[${TD_DESIGNER_SOURCE_ID}]`)
        debugger
        if (el) {
            const nodeId = el.getAttribute(nodeIdName)
            handleDragStart(e, el)
            setSelectionNode(handleFindNodeById(nodeId))
        }
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        handleDragEnd(e)
    }

    const handleDragStart = (e: React.MouseEvent, el?: Element) => {
        console.log("drag start")
        setDragging(true)
        const sourceEl = el?.closest?.(`*[${TD_DESIGNER_SOURCE_ID}=${}]`)
    }

    const handleDragEnd = (e: React.MouseEvent, el?: Element) => {
        console.log("drag end")

        if (draggingNode) {

        }
        setDragging(false)
        setDraggingNode(null)
    }

    return <FormDesignerContext.Provider value={{
        nodeIdName,
        setNodeIdName,
        dragging,
        setDragging,
        components,
        treeNode,
        hoverNode,
        selectionNode,
        draggingNode,

        registerSources: handleRegisterSources,
        registerComponents: setComponents,

        onMouseMove: handleMouseMove,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd
    }}>{children}</FormDesignerContext.Provider>
}