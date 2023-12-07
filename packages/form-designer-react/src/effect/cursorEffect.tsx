import {Operation} from "../model/Operation";

/**
 * 鼠标按下
 * @param e
 * @param operation
 */
export const mouseDownEffect = (e, operation: Operation) => {

}

/**
 * 鼠标松开
 * @param e
 * @param operation
 */
export const mouseUpEffect = (e, operation: Operation) => {

}

/**
 * 鼠标移动
 * @param e
 * @param operation
 */
export const mouseMoveEffect = (e, operation: Operation) => {
    console.log("mouseMoveEffect")
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
        const hoverNode = operation.findNodeById(nodeId)
        if (hoverNode) {
            operation.setHoverNode(hoverNode)
        }
    }
}

export const mouseLeaveEffect = (e, operation: Operation) => {

}

/**
 * 鼠标点击
 * @param e
 * @param operation
 */
export const mouseClickEffect = (e, operation: Operation) => {
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
        const hoverNode = operation.findNodeById(nodeId)
        if (hoverNode) {
            operation.selectionNode = hoverNode
        }
    }
}