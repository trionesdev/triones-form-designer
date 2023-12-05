import React from "react";
import {dragMoveEffect, dragStartEffect} from "../effect";
import {Operation} from "../model/Operation";

export const Events = {
    MOUSE_DOWN: "mouseDown",
    MOUSE_UP: "mouseUp",
    MOUSE_MOVE: "mouseMove",
    DRAG_START: "dragStart",
    DRAG_END: "dragEnd",
}

export class EventManager {
    operation: Operation;

    constructor(operation: Operation) {
        this.operation = operation;
    }

    onMouseDown(e: React.MouseEvent) {
        console.log("onMouseDown ", e)
        this.operation.startEvent = e
        this.operation.onMouseDownAt = new Date().getTime()
    }

    onMouseMove(e: React.MouseEvent) {
        console.log("onMouseMove ", e)
        if (this.operation.dragging) {
            dragMoveEffect(e, this.operation)
        } else {

            const {startEvent, onMouseDownAt} = this.operation
            if (onMouseDownAt > 0) {
                console.log("onMouseDownAt", onMouseDownAt)
                const distance = Math.sqrt(
                    Math.pow(e.pageX - startEvent.pageX, 2) +
                    Math.pow(e.pageY - startEvent.pageY, 2)
                )
                const timeDelta = Date.now() - onMouseDownAt
                if (distance > 4 && timeDelta > 10 && e != startEvent) {
                    this.operation.dragging = true
                    dragStartEffect(e, this.operation)
                }
            }

        }
    }

    onMouseUp(e: React.MouseEvent) {
        console.log("onMouseUp ", e)
        this.operation.dragging = false
        this.operation.startEvent = null
        this.operation.onMouseDownAt = 0
    }
}