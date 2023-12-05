import {define, observable, reaction} from "@formily/reactive";
import {IComponents} from "../types";
import {TD_DESIGNER_NODE_ID, TD_DESIGNER_SOURCE_ID} from "../constant";
import {Operation} from "./Operation";

interface IFormDesignerEngine {
    rootComponentName?: string
    /**
     * nodeId属性名称 ，必须data-开头 否则很可能不识别
     */
    nodeIdAttrName?: string
    sourceIdAttrName?: string
}

export class FormDesignerEngine {
    rootComponentName: string
    nodeIdAttrName?: string
    sourceIdAttrName?: string
    components: IComponents
    operation?: Operation


    constructor(args: IFormDesignerEngine) {
        this.rootComponentName = args.rootComponentName || 'Form'
        this.nodeIdAttrName = args.nodeIdAttrName || TD_DESIGNER_NODE_ID
        this.sourceIdAttrName = args.sourceIdAttrName || TD_DESIGNER_SOURCE_ID
        this.operation = new Operation({engine: this})

        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            nodeIdAttrName: observable.ref,
            components: observable.ref,
        })

        reaction(() => {
            return this.components
        }, () => {
            console.log('components changed')
        })

    }

    registerSources = () => {

    }

    registerComponents = (components: IComponents) => {
        this.components = components
    }

}