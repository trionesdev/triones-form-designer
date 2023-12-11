import {FormDesignerEngine} from "./FormDesignerEngine";
import {define, observable} from "@formily/reactive";

export enum CursorStatus {
    NORMAL = 'NORMAL',
    DRAG_START = 'DRAG_START',
    DRAGGING = 'DRAGGING',
    DRAG_STOP = 'DRAG_STOP',
}

interface ICursor {
    engine: FormDesignerEngine
}

export class Cursor {
    engine: FormDesignerEngine
    status: CursorStatus = CursorStatus.NORMAL

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