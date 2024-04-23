import React from 'react';
import {
  dragEndEffect,
  dragMoveEffect,
  dragStartEffect,
  mouseClickEffect,
  mouseMoveEffect,
} from '../effect';
import { Operation } from '../model';
import { ViewportEffect } from '../effect';

export class EventManager {
  operation: Operation;

  constructor(operation: Operation) {
    this.operation = operation;
  }

  onMouseDown(e: React.MouseEvent) {
    this.operation.startEvent = e;
    this.operation.onMouseDownAt = new Date().getTime();
  }

  onMouseMove(e: React.MouseEvent) {
    if (!e.bubbles) {
      //如果鼠标没有按住，则清除拖拽状态
      this.operation.dragStop();
    }
    if (this.operation.dragging) {
      dragMoveEffect(e, this.operation);
    } else {
      const { startEvent, onMouseDownAt } = this.operation;
      if (onMouseDownAt > 0) {
        const distance = Math.sqrt(
          Math.pow(e.pageX - startEvent.pageX, 2) +
            Math.pow(e.pageY - startEvent.pageY, 2),
        );
        const timeDelta = Date.now() - onMouseDownAt;
        if (distance > 4 && timeDelta > 10 && e != startEvent) {
          //当距离大于4且时间大于10ms时，开始拖拽
          dragStartEffect(e, this.operation);
        }
      } else {
        mouseMoveEffect(e, this.operation);
      }
    }
  }

  onMouseUp(e: React.MouseEvent) {
    this.operation.startEvent = null;
    this.operation.onMouseDownAt = 0;

    if (this.operation.dragging) {
      dragEndEffect(e, this.operation);
    }
  }

  onMouseClick(e: React.MouseEvent) {
    mouseClickEffect(e, this.operation);
  }

  onViewportScroll(e: React.UIEvent) {
    ViewportEffect.viewportScrollEffect(e, this.operation);
  }

  onViewportResize(e: React.SyntheticEvent) {
    ViewportEffect.viewportResizeEffect(e, this.operation);
  }
}
