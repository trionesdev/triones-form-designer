import { FormDesignerEngine } from './FormDesignerEngine';
import { define, observable } from '@formily/reactive';

export enum CursorStatus {
  NORMAL = 'NORMAL',
  DRAG_START = 'DRAG_START',
  DRAGGING = 'DRAGGING',
  DRAG_STOP = 'DRAG_STOP',
}

const DEFAULT_POSITION = {
  pageX: 0,
  pageY: 0,
  clientX: 0,
  clientY: 0,
  topPageX: 0,
  topPageY: 0,
  topClientX: 0,
  topClientY: 0,
};
interface ICursor {
  engine: FormDesignerEngine;
}

export interface ICursorPosition {
  pageX?: number;

  pageY?: number;

  clientX?: number;

  clientY?: number;

  topPageX?: number;

  topPageY?: number;

  topClientX?: number;

  topClientY?: number;
}

export class Cursor {
  engine: FormDesignerEngine;
  status: CursorStatus = CursorStatus.NORMAL;
  position: ICursorPosition = DEFAULT_POSITION;

  constructor(args: ICursor) {
    this.engine = args.engine;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      status: observable.ref,
      position: observable.ref,
    });
  }

  setStatus(status: CursorStatus) {
    this.status = status;
  }

  setPosition(position?: ICursorPosition) {
    if (position) {
      this.position = position;
    }
  }
}
