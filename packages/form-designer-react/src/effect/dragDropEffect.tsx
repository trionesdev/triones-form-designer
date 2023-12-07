import {useFormDesigner} from "../hooks/useFormDesigner";
import {Operation} from "../model/Operation";

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
        return
    }
    const nodeId = el.getAttribute(engine.nodeIdAttrName)
    if (nodeId) {
        operation.draggingHoverNode = operation.findNodeById(nodeId)
        operation.mouseEvent = e
    }
}

export const dragEndEffect = (e, operation: Operation) => {
    console.log("dragEndEffect", e)
    const engine = operation.engine
    if (operation.draggingNode) {
        const target = e.target as HTMLElement
        const el = target?.closest(`
       *[${engine.nodeIdAttrName}]
      `)
        if (!el?.getAttribute) {
            return
        }
        const nodeId = el.getAttribute(engine.nodeIdAttrName)
        if (nodeId) {
            const closestNode = operation.findNodeById(nodeId)
            closestNode.append(operation.draggingNode)
        }
    }
    operation.dragging = false
    operation.draggingNode = null
}