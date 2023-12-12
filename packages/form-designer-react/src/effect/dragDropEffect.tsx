import {ClosestPosition, Operation} from "../model";
import React from "react";

/**
 * 开始拖拽
 * @param e
 * @param operation
 */
export const dragStartEffect = (e, operation: Operation) => {
    const engine = operation.engine
    const target = e.target as HTMLElement
    const el = target?.closest(`
       *[${engine.nodeIdAttrName}],
       *[${engine.sourceIdAttrName}]
      `)
    if (!el?.getAttribute) {
        return
    }
    const sourceId = el.getAttribute(engine.sourceIdAttrName)
    const nodeId = el.getAttribute(engine.nodeIdAttrName)
    if (nodeId) {
        const node = operation.findNodeById(nodeId)
        if (node.root == node) {
            return;
        }
        if (node) {
            operation.dragStart()
            operation.setDraggingNode(node)
        }
    } else if (sourceId) {
        const sourceNode = operation.findNodeById(sourceId)
        if (sourceNode) {
            operation.dragStart()
            operation.setDraggingNode(sourceNode)
        }
    }
}

export const dragMoveEffect = (e, operation: Operation) => {
    operation.cursor.setPosition({
        pageX: e.pageX,
        pageY: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY,
        topPageX: e.pageX,
        topPageY: e.pageY,
        topClientX: e.clientX,
        topClientY: e.clientY,
    })
    const engine = operation.engine
    const target = e.target as HTMLElement
    const el = target?.closest(`
       *[${engine.nodeIdAttrName}]
      `)
    if (!el?.getAttribute) {
        operation.cleanDraggingHover()
        return
    }
    operation.dragMove()
    const nodeId = el.getAttribute(engine.nodeIdAttrName)
    if (nodeId) {
        operation.draggingHoverNode = operation.findNodeById(nodeId)
        operation.mouseEvent = e
    } else {
        operation.cleanDraggingHover()
    }
}

export const dragEndEffect = (e: React.MouseEvent, operation: Operation) => {

    const closestNode = operation.closestNode
    const closestPosition = operation.closestPosition
    console.log("dragEndEffect operation", operation, operation.draggingNode)
    if (operation.draggingNode) {

        console.log("dragEndEffect operation draggingNode", operation.draggingNode)
        console.log("dragEndEffect operation closestNode", closestNode)
        console.log("dragEndEffect operation closestPosition", closestPosition)
        console.log("dragEndEffect operation draggingHoverNode", operation.draggingHoverNode)
        if (ClosestPosition.INNER === closestPosition) {
            closestNode.append(operation.draggingNode)
        } else if (ClosestPosition.BEFORE === closestPosition) {
            closestNode.insertBefore(operation.draggingNode)
        } else if (ClosestPosition.AFTER === closestPosition) {
            closestNode.insertAfter(operation.draggingNode)
        }
    }
    operation.dragStop();
}