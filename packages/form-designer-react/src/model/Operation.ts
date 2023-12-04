import {TreeNode} from "./TreeNode";
import {FormDesignerEngine} from "./FormDesignerEngine";
import {define, observable} from "@formily/reactive";
import React from "react";

interface IOperation {
    engine: FormDesignerEngine;
}

export class Operation {
    engine: FormDesignerEngine;
    tree: TreeNode
    dragging: boolean
    hoverNode?: TreeNode
    selectionNode?: TreeNode


    constructor(args: IOperation) {
        this.engine = args.engine
        this.tree = new TreeNode({
            componentName: args.engine.rootComponentName,
        })

        this.makeObservable()
    }

    makeObservable(){
        define(this,{

        })
    }

    onMouseDown = (e: React.MouseEvent) => {
        this.dragging = true
        console.log('onMouseDown')
    }

    onMouseUp = (e: React.MouseEvent) => {
        this.dragging = false
        console.log('onMouseUp')
    }

}