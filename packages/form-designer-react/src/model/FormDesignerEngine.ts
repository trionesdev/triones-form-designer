import {define, observable, reaction} from "@formily/reactive";
import {IComponents} from "../types";
import {TreeNode} from "./TreeNode";
import {TD_DESIGNER_NODE_ID} from "../constant";
import React from "react";

interface IFormDesignerEngine {
    rootComponentName?: string
    nodeIdName?: string
}

export class FormDesignerEngine {
    rootComponentName: string
    nodeIdName?: string
    components: IComponents[]
    treeNodes: Map<string, TreeNode>
    treeNode: TreeNode
    hoverNode?: TreeNode
    selectionNode?: TreeNode

    dragging: boolean
    draggingNode?: TreeNode

    constructor(args: IFormDesignerEngine) {
        this.rootComponentName = args.rootComponentName || 'Form'
        this.nodeIdName = args.nodeIdName || TD_DESIGNER_NODE_ID
        this.treeNodes = new Map()
        this.dragging = false
        this.treeNode = new TreeNode({
            componentName: this.rootComponentName,
            engine: this,
        })
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            nodeIdName: observable.ref,
            components: observable.ref,
            treeNode: observable.ref,
            dragging: observable.ref,
        })

        reaction(() => {
            return this.treeNode
        }, () => {
            console.log('treeNode changed')
        })

        reaction(() => {
            return this.components
        }, () => {
            console.log('components changed')
        })

        reaction(() => {
            return this.dragging
        }, () => {
            console.log('dragging changed')
        })
    }

    registerSources = () => {
        this.components = []
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