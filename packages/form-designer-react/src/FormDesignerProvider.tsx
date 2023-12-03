import {FormDesignerContext} from "./FormDesignerContext";
import React, {FC, useEffect, useRef, useState} from "react";
import {TreeNode} from "./TreeNode";
import {DesignerComponent, IComponents} from "./types";
import {TD_DESIGNER_NODE_ID, TD_DESIGNER_SOURCE_ID} from "./constant";
import _ from "lodash";

type FormDesignerProviderProps = {
    children?: React.ReactNode
    rootComponentName?: string
}

export const FormDesignerProvider: FC<FormDesignerProviderProps> = ({children, rootComponentName = 'Form'}) => {
    const sources = new Map<string, DesignerComponent>();
    const [components, setComponents] = useState<IComponents>({});
    const treeNodes = useRef<Map<string, TreeNode>>(new Map())
    const [nodeIdName, setNodeIdName] = React.useState<string>(TD_DESIGNER_NODE_ID);
    // @ts-ignore
    const [treeNode, setTreeNode] = React.useState<TreeNode>(null);
    const [hoverNode, setHoverNode] = React.useState<TreeNode>(null);
    const [selectionNode, setSelectionNode] = React.useState<TreeNode>(null);
    const [dragging, setDragging] = useState(false)
    // @ts-ignore
    const [draggingNode, setDraggingNode] = useState<TreeNode>(null)

    const handleRegisterSources = (IResource: DesignerComponent[]) => {
        debugger
        IResource.forEach(item => {
            sources.set(item?.name, item)
            treeNodes.current.set(item.node.id, item.node)
        })
    }

    const handleFindNodeById = (id: string) => {
        debugger
        return treeNodes.current.get(id)
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
        const el = target?.closest?.(`*[${nodeIdName}],
                            *[${TD_DESIGNER_SOURCE_ID}]`)
        debugger
        if (el) {
            const sourceId = el.getAttribute(TD_DESIGNER_SOURCE_ID)
            const nodeId = el.getAttribute(nodeIdName)
            handleDragStart(e, (sourceId || nodeId))
            setSelectionNode(handleFindNodeById(nodeId))
        }
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        handleDragEnd(e)
    }

    const handleDragStart = (e: React.MouseEvent, nodeId?: string) => {
        console.log("drag start")
        setDragging(true)
        const node = handleFindNodeById(nodeId)
        console.log("dragNod {}", node)
        setDraggingNode(node)
    }

    const handleDragEnd = (e: React.MouseEvent) => {
        console.log("drag end")

        if (draggingNode) {
            console.log("drag end node {}", draggingNode)
            if (draggingNode.isSourceNode) { //拖拽的是组件
                console.log("drag end node isSourceNode")
               const ss = new TreeNode({
                    parent: treeNode,
                    componentName: draggingNode.componentName
                })
                treeNode.children.push(ss)
                setTreeNode(_.cloneDeep(treeNode))
                treeNodes.current.set(ss.id, ss)
                console.log("drag end node isSourceNode", treeNode)
            } else {

            }
        }
        setDragging(false)
        setDraggingNode(null)
    }

    useEffect(() => {
        const Component = components?.[rootComponentName]
        debugger
        if (Component) {
            const rootTreeNode = new TreeNode({
                componentName: 'Form'
            })
            setTreeNode(rootTreeNode)
            treeNodes.current.set(rootTreeNode.id, rootTreeNode)
        }
    }, [rootComponentName, components])

    return <FormDesignerContext.Provider value={{
        rootComponentName,
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