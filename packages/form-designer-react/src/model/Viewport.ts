import {action, define, observable} from "@formily/reactive";

interface IViewport {
    viewportElement: HTMLElement
}

export class Viewport {
    viewportElement: HTMLElement

    constructor(args: IViewport) {
        this.viewportElement = args.viewportElement

        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            viewportElement: observable.ref,
        })
    }

    onMoment(element: HTMLElement){
        this.viewportElement = element
    }

    viewportNodeRect(nodeHtml: Element) {
        const viewportRect = this.viewportElement.getBoundingClientRect();
        const nodeRect = nodeHtml.getBoundingClientRect()
        return new DOMRect(
            nodeRect.left - viewportRect.left,
            nodeRect.top - viewportRect.top,
            nodeRect.width,
            nodeRect.height
        )
    }
}