import {Operation} from "../model";

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
            operation.hoverNode = hoverNode
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
    console.log("mouseClickEffect operation ",target)
    const el = target?.closest(`
       *[${engine.nodeIdAttrName}]
      `)
    console.log("mouseClickEffect operation el",target)
    if (!el?.getAttribute) {
        return
    }
    const nodeId = el.getAttribute(engine.nodeIdAttrName)
    if (nodeId) {
        const selectionNode = operation.findNodeById(nodeId)
        console.log("mouseClickEffect operation selectionNode",selectionNode)
        if (selectionNode) {
            // if (operation.selectionNode == selectionNode){
            //     console.log("mouseClickEffect operation selectionNode equal",operation.selectionNode == selectionNode)
            //     operation.selectionNode = undefined
            // }
            operation.selectionNode = selectionNode
        }
    }
}