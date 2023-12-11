import {action, define, observable} from "@formily/reactive";
import {FormDesignerEngine} from "./FormDesignerEngine";
import {TreeNode} from "./TreeNode";

interface IViewport {
    engine: FormDesignerEngine;
    viewportElement: HTMLElement
}

export class Viewport {
    engine: FormDesignerEngine;
    viewportElement: HTMLElement

    constructor(args: IViewport) {
        this.engine = args.engine
        this.viewportElement = args.viewportElement

        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            viewportElement: observable.ref,
        })
    }

    onMoment(element: HTMLElement) {
        this.viewportElement = element
    }

    get rect() {
        const viewportElement = this.viewportElement
        if (viewportElement) return viewportElement.getBoundingClientRect()
    }

    get innerRect() {
        const rect = this.rect
        return new DOMRect(0, 0, rect?.width, rect?.height);
    }

    viewportNodeRect(nodeHtml: Element) {
        if (!nodeHtml) {
            return null
        }
        const viewportRect = this.viewportElement.getBoundingClientRect();
        const nodeRect = nodeHtml.getBoundingClientRect()
        return new DOMRect(
            nodeRect.left - viewportRect.left,
            nodeRect.top - viewportRect.top,
            nodeRect.width,
            nodeRect.height
        )
    }

    findElementById(id: string) {
        if (!id) {
            return null
        }
        return this.viewportElement.querySelector(`[${this.engine.nodeIdAttrName}="${id}"]`)
    }

    getElementOffsetRectById(nodeId: string) {
        if (!nodeId) {
            return null
        }
        const nodeHtml = this.findElementById(nodeId)
        if (!nodeHtml) {
            return null
        }
        const viewportRect = this.viewportElement.getBoundingClientRect();
        const nodeRect = nodeHtml.getBoundingClientRect()
        return new DOMRect(
            nodeRect.left - viewportRect.left,
            nodeRect.top - viewportRect.top,
            nodeRect.width,
            nodeRect.height
        )
    }

    getValidNodeOffsetRect(node: TreeNode) {
        if (!node){
            return
        }
        return this.getElementOffsetRectById(node.id)
    }
}
