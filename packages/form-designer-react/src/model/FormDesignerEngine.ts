import {define, observable, reaction} from "@formily/reactive";
import {DesignerComponent, IComponents, IResource, TdFC} from "../types";
import {TD_DESIGNER_NODE_ID, TD_DESIGNER_SOURCE_ID} from "../constant";
import {Operation} from "./Operation";
import _ from "lodash";
import React from "react";

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
    sourceComponents?: DesignerComponent[]
    operation?: Operation


    constructor(args: IFormDesignerEngine) {
        this.rootComponentName = args.rootComponentName || 'Form'
        this.nodeIdAttrName = args.nodeIdAttrName || TD_DESIGNER_NODE_ID
        this.sourceIdAttrName = args.sourceIdAttrName || TD_DESIGNER_SOURCE_ID
        this.sourceComponents = []
        this.operation = new Operation({engine: this})

        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            nodeIdAttrName: observable.ref,
            components: observable.ref,
            sourceComponents: observable.ref,
            componentResources: observable.computed,
        })

        reaction(() => {
            return this.components
        }, () => {
            console.log('components changed')
        })

    }

    get componentResources() {
        console.log("components", this.components)
        return _.reduce(_.values(this.components), (a, b) => {
            console.log("a", a)
            return _.concat(a, b ? b.Resource : [])
        }, [])
    }

    registerSourceComponents = (value: DesignerComponent[]) => {
        this.sourceComponents = _.concat(this.sourceComponents, value)
    }

    registerComponents = (components: IComponents) => {
        this.components = components
    }

    findSourceComponent(name: string) {
        console.log("componentResources", this.componentResources)
        return _.find(this.componentResources, (item: IResource) => {
            return item.name === name
        })
    }

}