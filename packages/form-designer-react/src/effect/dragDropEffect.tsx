import {useFormDesigner} from "../hooks/useFormDesigner";
import {Operation} from "../model/Operation";

/**
 * 开始拖拽
 * @param e
 * @param operation
 */
export const dragStartEffect = (e, operation: Operation) => {
    console.log("dragStartEffect",e)
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
    if (sourceId || nodeId) {
        const node = operation.findNodeById(sourceId || nodeId)
        operation.tree.append(node)
    }
}

export const dragMoveEffect = (e, operation: Operation) => {
    console.log("dragMoveEffect",e)
}