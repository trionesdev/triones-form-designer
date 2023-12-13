import styled from "@emotion/styled";
import React, {FC, useEffect, useRef} from "react";
import {observer} from "@formily/react";
import {useOperation} from "../../hooks";
import {useFormDesigner} from "../../hooks";
import {ClosestPosition} from "../../model";
import _ from "lodash";
import {TreeNode} from "../../model";
import {useViewport} from "../../hooks";

const InsertionStyled = styled('div')({
    position: 'absolute',
    boxSizing: 'border-box',
    pointerEvents: 'none',
})

type InsertionProps = {}

export const Insertion: FC<InsertionProps> = observer(({}) => {
    const operation = useOperation()
    const {dragging, draggingHoverNode, mouseEvent, closestNode, closestPosition, closestNodeRect} = operation

    const handleInsertionStyles = (): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {}
        console.log("Insertion closestNode", closestNode)
        console.log("Insertion closestNodeRect", closestNodeRect)
        console.log("Insertion closestPosition", closestPosition)

        if (closestNode) {

            if (closestPosition == ClosestPosition.UPPER) {
                baseStyle.height = `2px`
                baseStyle.width = `${closestNodeRect.width}px`
                baseStyle.backgroundColor = `#1890FF`
                baseStyle.transform = `perspective(1px) translate3d(0px, ${closestNodeRect.top}px, 0px)`
            } else if (closestPosition == ClosestPosition.UNDER) {
                baseStyle.height = `2px`
                baseStyle.width = `${closestNodeRect.width}px`
                baseStyle.backgroundColor = `#1890FF`
                baseStyle.transform = `perspective(1px) translate3d(0px, ${closestNodeRect.top + closestNodeRect.height}px, 0px)`
            }
        }
        return baseStyle
    }

    return <>{
        dragging && draggingHoverNode && <InsertionStyled style={handleInsertionStyles()}></InsertionStyled>
    }</>
})