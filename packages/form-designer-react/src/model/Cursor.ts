import {FormDesignerEngine} from "./FormDesignerEngine";
import {define, observable} from "@formily/reactive";

export enum CursorStatus {
    Normal = 'NORMAL',
    DragStart = 'DRAG_START',
    Dragging = 'DRAGGING',
    DragStop = 'DRAG_STOP',
}

interface ICursor {
    engine: FormDesignerEngine
}

export class Cursor {
    engine: FormDesignerEngine
    status: CursorStatus = CursorStatus.Normal

    constructor(args: ICursor) {
        this.engine = args.engine
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            status: observable.ref,
        })
    }

    setStatus(status: CursorStatus) {
        this.status = status
    }
}