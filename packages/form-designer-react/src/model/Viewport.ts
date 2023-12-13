import {define, observable} from "@formily/reactive";
import {FormDesignerEngine} from "./FormDesignerEngine";
import {TreeNode} from "./TreeNode";
import _ from "lodash"

interface IViewport {
    engine: FormDesignerEngine;
    viewportElement: HTMLElement
}

export class Viewport {
    engine: FormDesignerEngine;
    viewportElement: HTMLElement
    scrollX = 0
    scrollY = 0
    width = 0
    height = 0

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
        this.engine.operation.setViewport(this)
    }

    onUnmount() {
        this.engine.operation.setViewport(null)
    }

    get rect() {
        const viewportElement = this.viewportElement
        if (viewportElement) return viewportElement.getBoundingClientRect()
    }

    get innerRect() {
        const rect = this.rect
        return new DOMRect(0, 0, rect?.width, rect?.height);
    }

    // viewportNodeRect(nodeHtml: Element) {
    //     if (!nodeHtml) {
    //         return null
    //     }
    //     const viewportRect = this.viewportElement.getBoundingClientRect();
    //     const nodeRect = nodeHtml.getBoundingClientRect()
    //     return new DOMRect(
    //         nodeRect.left - viewportRect.left,
    //         nodeRect.top - viewportRect.top,
    //         nodeRect.width,
    //         nodeRect.height
    //     )
    // }

    findElementById(id: string) {
        if (!id) {
            return null
        }
        return this.viewportElement.querySelector(`[${this.engine.nodeIdAttrName}="${id}"]`)
    }

    getValidNodeRect(node: TreeNode) {
        if (!node) return
        const rect = this.getElementRectById(node.id)
        return rect;
    }

    getElementRectById(id: string) {
        return this.findElementById(id)?.getBoundingClientRect()
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

        console.log(" Viewport viewportRect", viewportRect)
        console.log("Viewport nodeRect", nodeRect)
        console.log("Viewport vietport", this)
        if (this.isInPosition(nodeRect)) {
            return new DOMRect(
                nodeRect.left - viewportRect.left + this.scrollX,
                nodeRect.top - viewportRect.top + this.scrollY,
                nodeRect.width,
                nodeRect.height
            )
        } else {
            return new DOMRect(
                nodeRect.left - viewportRect.left + this.scrollX,
                nodeRect.top - viewportRect.top + this.scrollY,
                nodeRect.width,
                nodeRect.height
            )
        }

    }

    isInPosition(rect: DOMRect) {
        const viewportRect = this.viewportElement.getBoundingClientRect();
        return rect.left >= viewportRect.left &&
            rect.top >= viewportRect.top &&
            rect.right <= viewportRect.right &&
            rect.bottom <= viewportRect.bottom;
    }

    /**
     * 计算节点在视口中的位置
     * @param node
     */
    getValidNodeOffsetRect(node: TreeNode) {
        if (!node) {
            return
        }
        return this.getElementOffsetRectById(node.id)
    }

    /**
     * 计算视口
     */
    digestViewport() {
        if (this.viewportElement) {
            const data = {
                scrollX: this.viewportElement.scrollLeft,
                scrollY: this.viewportElement.scrollTop,
                width: this.viewportElement.clientWidth,
                height: this.viewportElement.clientHeight
            }
            _.assign(this, data)
        }
    }

    getValidNodeLayout(node: TreeNode) {
        if (!node) {
            return 'vertical'
        }
        //TODO 根据组件类型获取布局
        return 'vertical'
    }
}
