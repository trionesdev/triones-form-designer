import {TreeNode} from "./TreeNode";
import {FormDesignerEngine} from "./FormDesignerEngine";
import {autorun, define, observable, observe} from "@formily/reactive";
import {EventManager} from "../event/event";
import {Cursor, CursorStatus} from "./Cursor";
import {requestIdle} from "../request-idle";
import {Viewport} from "./Viewport";

export enum ClosestPosition {
    BEFORE = 'BEFORE',
    AFTER = 'AFTER',
    INNER = 'INNER',
}

interface IOperation {
    engine: FormDesignerEngine;
    onChange: (tree: TreeNode) => void
}

export class Operation {
    engine: FormDesignerEngine;
    viewport: Viewport
    tree: TreeNode
    cursor: Cursor
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
    onChange: () => void

    constructor(args: IOperation) {
        this.engine = args.engine
        this.onChange = () => {
            console.log("[TreeInfo]", "tree change sssse", this.tree)
            args.onChange?.(this.tree)
        }
        this.tree = new TreeNode({
            componentName: args.engine.rootComponentName,
            isSourceNode: false,
            operation: this,
            schema: {},
        })
        this.cursor = new Cursor({
            engine: this.engine,
        })
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
            tree: observable,
            dragging: observable.computed,
            hoverNode: observable.ref,
            selectionNode: observable,
            draggingNode: observable.ref,
            draggingHoverNode: observable.ref,
            closestPosition: observable.ref,
            closestNode: observable.ref,
            mouseEvent: observable.ref,
        })

        observe(this.tree, () => {
            console.log("[TreeInfo]", "operation tree changed")
        })

    }

    setViewport(viewport: Viewport) {
        this.viewport = viewport
    }

    setClosetNode(node: TreeNode) {
        this.closestNode = node
    }

    setClosestPosition(closestPosition: ClosestPosition) {
        this.closestPosition = closestPosition
    }

    setSelectionNode(node: TreeNode) {
        this.selectionNode = node
    }

    findNodeById(id: string) {
        return this.tree.findNodeById(id)
    }

    get dragging() {
        return this.cursor.status == CursorStatus.DRAGGING || this.cursor.status == CursorStatus.DRAG_START
    }

    dragStart() {
        this.cursor.setStatus(CursorStatus.DRAG_START)
    }

    dragMove() {
        this.cursor.setStatus(CursorStatus.DRAGGING)
    }

    dragStop() {
        this.cursor.setStatus(CursorStatus.DRAG_STOP)
        this.onMouseDownAt = 0
        requestIdle(() => {
            this.cursor.setStatus(CursorStatus.NORMAL)
        })
    }

    /**
     * 清除拖拽悬浮状态
     */
    cleanDraggingHover() {
        this.draggingHoverNode = null
        this.closestPosition = null
    }

    setDraggingNode(node: TreeNode) {
        this.draggingNode = node
    }

}