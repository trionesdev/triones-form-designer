import {define, observable} from "@formily/reactive";
import {DesignerComponent, IComponents, IResource, TdFC} from "../types";
import {TD_DESIGNER_NODE_ID, TD_DESIGNER_SOURCE_ID} from "../constant";
import {Operation} from "./Operation";
import _ from "lodash";

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
    operation?: Operation


    constructor(args: IFormDesignerEngine) {
        this.rootComponentName = args.rootComponentName || 'Form'
        this.nodeIdAttrName = args.nodeIdAttrName || TD_DESIGNER_NODE_ID
        this.sourceIdAttrName = args.sourceIdAttrName || TD_DESIGNER_SOURCE_ID
        this.operation = new Operation({engine: this,onChange:(tree )=>{
            console.log("treeeee",tree)
            }})

        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            nodeIdAttrName: observable.ref,
        })

    }



}