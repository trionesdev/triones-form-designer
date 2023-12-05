import {TreeNode} from "./TreeNode";
import {FormDesignerEngine} from "./FormDesignerEngine";
import {define, observable, reaction, toJS} from "@formily/reactive";
import React from "react";
import {EventManager} from "../event/event";

interface IOperation {
    engine: FormDesignerEngine;
}

export class Operation {
    engine: FormDesignerEngine;
    tree: TreeNode
    dragging: boolean
    onMouseDownAt: number
    startEvent: any
    hoverNode?: TreeNode
    selectionNode?: TreeNode
    eventManager: EventManager

    constructor(args: IOperation) {
        this.engine = args.engine
        this.tree = new TreeNode({
            componentName: args.engine.rootComponentName,
        })
        this.dragging = false
        this.onMouseDownAt = 0
        this.eventManager = new EventManager(this)
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            tree: observable,
        })

        reaction(() => {
            return this.tree
        }, () => {
            console.log('tree changed')
        })
    }

    findNodeById(id: string) {
        return this.tree.findNodeById(id)
    }

}