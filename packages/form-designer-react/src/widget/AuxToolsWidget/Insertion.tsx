import styled from "@emotion/styled";
import React, {FC, useEffect, useRef} from "react";
import {observer} from "@formily/react";
import {useOperation} from "../../hooks/useOperation";
import {useFormDesigner} from "../../hooks/useFormDesigner";
import {ClosestPosition} from "../../model/Operation";
import _ from "lodash";
import {TreeNode} from "../../model/TreeNode";

const InsertionStyled = styled('div')({
    position: 'absolute',
    boxSizing: 'border-box',
    pointerEvents: 'none',
})

type InsertionProps = {}

export const Insertion: FC<InsertionProps> = observer(({}) => {
    const ref = useRef<HTMLDivElement>()
    const {nodeIdAttrName} = useFormDesigner()
    let {dragging, draggingHoverNode, mouseEvent, closestPosition} = useOperation()

    //计算鼠标与元素的距离
    const handleComputePointDistance = (mouseEvent, rect: DOMRect) => {
        if (mouseEvent.clientX <= rect.left && mouseEvent.clientY <= rect.top) { //鼠标在元素左上角
            return Math.sqrt(Math.pow(rect.left - mouseEvent.clientX, 2) + Math.pow(rect.top - mouseEvent.clientY, 2));
        } else if (mouseEvent.clientX <= rect.left && mouseEvent.clientY >= rect.bottom) { //鼠标在元素左下角
            return Math.sqrt(Math.pow(rect.left - mouseEvent.clientX, 2) + Math.pow(mouseEvent.clientY - rect.bottom, 2));
        } else if (mouseEvent.clientX >= rect.right && mouseEvent.clientY <= rect.top) {//鼠标在元素右上角
            return Math.sqrt(Math.pow(mouseEvent.clientX - rect.right, 2) + Math.pow(rect.top - mouseEvent.clientY, 2));
        } else if (mouseEvent.clientX >= rect.right && mouseEvent.clientY >= rect.bottom) {//鼠标在元素右上角
            return Math.sqrt(Math.pow(mouseEvent.clientX - rect.right, 2) + Math.pow(mouseEvent.clientY - rect.bottom, 2));
        } else if ((mouseEvent.clientX >= rect.left && mouseEvent.clientX <= rect.right) && mouseEvent.clientY <= rect.top) { //上方
            return rect.top - mouseEvent.clientY;
        } else if ((mouseEvent.clientX >= rect.left && mouseEvent.clientX <= rect.right) && mouseEvent.clientY >= rect.bottom) { //下方
            return mouseEvent.clientY - rect.bottom;
        } else if (mouseEvent.clientX <= rect.left && (mouseEvent.clientY >= rect.top && mouseEvent.clientY <= rect.bottom)) { //左边
            return rect.left - mouseEvent.clientX;
        } else if (mouseEvent.clientX >= rect.right && (mouseEvent.clientY >= rect.top && mouseEvent.clientY <= rect.bottom)) { //右边
            return mouseEvent.clientX - rect.right;
        } else {
            return 0;
        }
    }

    const handleClosestNode = () => {
        debugger
        if (draggingHoverNode?.droppable) { //当前是可拖入节点
            if (_.isEmpty(draggingHoverNode.children)) {
                return draggingHoverNode;
            } else {
                let minDistance = Number.MAX_VALUE;
                let closestElement = draggingHoverNode;
                _.forEach(draggingHoverNode.children, (node: TreeNode) => {
                    const rect = document.querySelector(`*[${nodeIdAttrName}=${node.id}]`).getBoundingClientRect()
                    console.log("rect2222", rect)
                    const distance = handleComputePointDistance(mouseEvent, rect)
                    console.log("distance", distance)
                    debugger
                    if (distance < minDistance) {
                        minDistance = distance
                        closestElement = node
                    }
                })
                return closestElement
            }
        } else {
            return draggingHoverNode;
        }
    }

    const handleClosestPosition = (closestNode: TreeNode) => {
        const closestNodeEl = document.querySelector(`*[${nodeIdAttrName}=${closestNode?.id}]`)
        const closestRect = closestNodeEl.getBoundingClientRect()

        if (closestRect.left >= mouseEvent.clientX) { //左边

        } else if (closestRect.right <= mouseEvent.clientX) { //右边

        } else if (closestRect.top >= mouseEvent.clientY) { //上边

        } else if (closestRect.bottom <= mouseEvent.clientY) { //下边

        } else if ((closestRect.left >= mouseEvent.clientX && closestRect.right <= mouseEvent.clientX) && (closestRect.top <= mouseEvent.clientY && closestRect.bottom >= mouseEvent.clientY)) { //鼠标在元素内
            if ((closestRect.left <= mouseEvent.clientX && closestRect.left + (closestRect.width / 2) >= mouseEvent.clientX)
                && (closestRect.top <= mouseEvent.clientY && closestRect.top + (closestRect.height / 2) >= mouseEvent.clientY)
            ) { //左上

            } else if (
                (closestRect.right >= mouseEvent.clientX && closestRect.left + (closestRect.width / 2) >= mouseEvent.clientX)
                && (closestRect.top <= mouseEvent.clientY && closestRect.top + (closestRect.height / 2) >= mouseEvent.clientY)
            ) { //右上

            } else if (
                (closestRect.right >= mouseEvent.clientX && closestRect.left + (closestRect.width / 2) >= mouseEvent.clientX)
                && (closestRect.top + (closestRect.height / 2) >= mouseEvent.clientY && closestRect.bottom <= mouseEvent.clientY)
            ) { //右下

            } else if (
                (closestRect.left <= mouseEvent.clientX && closestRect.left + (closestRect.width / 2) >= mouseEvent.clientX)
                && (closestRect.top + (closestRect.height / 2) >= mouseEvent.clientY && closestRect.bottom <= mouseEvent.clientY)
            ) { //左下

            }
        }
    }

    const handleIsBefore = (rect: DOMRect): boolean => {

        return true
    }

    useEffect(() => {
        if (!dragging || !draggingHoverNode) {
            return
        }

        const closestNode = handleClosestNode()
        console.log("closestNode", closestNode)
        if (closestNode) {
            handleClosestPosition(closestNode)

        }
        // const hoverNodeEl = document.querySelector(`*[${nodeIdAttrName}=${draggingHoverNode?.id}]`)
        // if (hoverNodeEl && mouseEvent.type === 'mousemove') {
        //     const hoverRect = hoverNodeEl.getBoundingClientRect()
        //     if (handleIsBefore(hoverRect)) {
        //         closestPosition = ClosestPosition.BEFORE
        //     }
        //
        //     if (ClosestPosition.BEFORE == closestPosition) {
        //         ref.current.style.height = `2px`
        //         ref.current.style.width = `${hoverRect.width}px`
        //         ref.current.style.border = `1px solid #1890FF`
        //         ref.current.style.transform = `perspective(1px) translate3d(0px, ${hoverRect.top}px, 0px)`
        //     }
        //
        // }
    }, [dragging, draggingHoverNode, mouseEvent]);

    return <InsertionStyled ref={ref}></InsertionStyled>
})