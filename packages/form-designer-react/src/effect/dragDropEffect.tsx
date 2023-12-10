import {ClosestPosition, Operation} from "../model";

/**
 * 开始拖拽
 * @param e
 * @param operation
 */
export const dragStartEffect = (e, operation: Operation) => {
    console.log("dragStartEffect", e)
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
            operation.dragging = true
            operation.draggingNode = node
        }
    } else if (sourceId) {
        const sourceNode = operation.findNodeById(sourceId)
        if (sourceNode) {
            operation.dragging = true
            operation.draggingNode = sourceNode
        }
    }
}

export const dragMoveEffect = (e, operation: Operation) => {
    console.log("dragMoveEffect", e)
    const engine = operation.engine
    const target = e.target as HTMLElement
    const el = target?.closest(`
       *[${engine.nodeIdAttrName}]
      `)
    if (!el?.getAttribute) {
        operation.cleanDraggingHover()
        return
    }
    const nodeId = el.getAttribute(engine.nodeIdAttrName)
    if (nodeId) {
        operation.draggingHoverNode = operation.findNodeById(nodeId)
        operation.mouseEvent = e
    } else {
        operation.cleanDraggingHover()
    }
}

export const dragEndEffect = (e, operation: Operation) => {
    console.log("dragEndEffect", e)
    const engine = operation.engine
    const closestNode = operation.closestNode
    const closestPosition = operation.closestPosition
    console.log("dragEndEffect operation", operation,operation.draggingNode)
    if (operation.draggingNode) {
        if (ClosestPosition.INNER === closestPosition) {
            closestNode.append(operation.draggingNode)
        } else if (ClosestPosition.BEFORE === closestPosition) {
            closestNode.insertBefore(operation.draggingNode)
        } else if (ClosestPosition.AFTER === closestPosition) {
            closestNode.insertAfter(operation.draggingNode)
        }
    }
    operation.dragging = false
    operation.draggingNode = null
}
