import {define, observable, reaction} from "@formily/reactive";
import {IComponents} from "../types";
import {TreeNode} from "./TreeNode";
import {TD_DESIGNER_NODE_ID} from "../constant";
import React from "react";
import {Operation} from "./Operation";

interface IFormDesignerEngine {
    rootComponentName?: string
    nodeIdName?: string
}

export class FormDesignerEngine {
    rootComponentName: string
    nodeIdName?: string
    components: IComponents
    operation?: Operation


    constructor(args: IFormDesignerEngine) {
        this.rootComponentName = args.rootComponentName || 'Form'
        this.nodeIdName = args.nodeIdName || TD_DESIGNER_NODE_ID
        this.operation =  new Operation({engine: this})
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            nodeIdName: observable.ref,
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