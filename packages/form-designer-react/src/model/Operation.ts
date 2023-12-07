import {TreeNode} from "./TreeNode";
import {FormDesignerEngine} from "./FormDesignerEngine";
import {define, observable, reaction, toJS} from "@formily/reactive";
import React from "react";
import {EventManager} from "../event/event";

export enum ClosestPosition {
    BEFORE = 'BEFORE',
    AFTER = 'AFTER',
    INNER = 'INNER',
}

interface IOperation {
    engine: FormDesignerEngine;
}

export class Operation {
    engine: FormDesignerEngine;
    tree: TreeNode
    dragging: boolean //是否在拖拽
    onMouseDownAt: number //鼠标按下时间
    startEvent: any //开始事件
    hoverNode?: TreeNode //悬浮节点
    selectionNode?: TreeNode //选中节点
    draggingNode?: TreeNode //拖拽节点
    draggingHoverNode?: TreeNode //拖拽悬浮节点
    closestPosition: ClosestPosition //与最近可托入节点的位置
    closestNode?: TreeNode //最近节点
    eventManager: EventManager
    mouseEvent: any


    constructor(args: IOperation) {
        this.engine = args.engine
        this.tree = new TreeNode({
            componentName: args.engine.rootComponentName,
            isSourceNode: false,
            operation: this
        })
        this.dragging = false
        this.onMouseDownAt = 0
        this.closestPosition = null
        this.eventManager = new EventManager(this)
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            dragging: observable.ref,
            hoverNode: observable.ref,
            selectionNode: observable.ref,
            draggingNode: observable.ref,
            draggingHoverNode: observable.ref,
            closestPosition: observable.ref,
            mouseEvent: observable.ref,
            closestNode: observable.ref,
        })
    }

    findNodeById(id: string) {
        return this.tree.findNodeById(id)
    }

    setHoverNode(node: TreeNode) {
        this.hoverNode = node
    }

}