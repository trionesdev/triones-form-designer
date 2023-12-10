import {TreeNode} from "./TreeNode";
import {FormDesignerEngine} from "./FormDesignerEngine";
import {action, autorun, define, markObservable, observable, observe, reaction, toJS} from "@formily/reactive";
import React from "react";
import {EventManager} from "../event/event";

export enum ClosestPosition {
    BEFORE = 'BEFORE',
    AFTER = 'AFTER',
    INNER = 'INNER',
}

interface IOperation {
    engine: FormDesignerEngine;
    onChange:(tree:TreeNode)=>void
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
    onChange: ()=>void

    constructor(args: IOperation) {
        this.engine = args.engine
        this.onChange = ()=>{
            console.log("[TreeInfo]","tree change sssse", this.tree)
            args.onChange?.(this.tree)
        }
        this.tree = new TreeNode({
            componentName: args.engine.rootComponentName,
            isSourceNode: false,
            operation: this,
            schema: {},
        })
        this.dragging = false
        this.onMouseDownAt = 0
        this.closestPosition = null
        this.eventManager = new EventManager(this)

        this.makeObservable()

        autorun(() => {
            console.log("[TreeInfo]", "sssssssssss")
        })
    }

    makeObservable() {
        define(this, {
            tree:observable,
            dragging: observable.ref,
            hoverNode: observable.ref,
            selectionNode: observable.ref,
            draggingNode: observable.ref,
            draggingHoverNode: observable.ref,
            closestPosition: observable.ref,
            closestNode: observable.ref,
            mouseEvent: observable.ref,
        })

        observe(this.tree,()=>{
            console.log("[TreeInfo]", "operation tree changed")
        })

    }

    findNodeById(id: string) {
        return this.tree.findNodeById(id)
    }

    /**
     * 清除拖拽状态
     */
    cleanDragging(){
        this.dragging = false
        this.onMouseDownAt = 0
        this.draggingNode = null
    }

    /**
     * 清除拖拽悬浮状态
     */
    cleanDraggingHover() {
        this.draggingHoverNode = null
        this.closestPosition = null
    }

}