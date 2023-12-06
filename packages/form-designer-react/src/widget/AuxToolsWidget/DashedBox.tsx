import styled from "@emotion/styled";
import React, {useEffect, useRef} from "react";
import {FC} from "react";
import {useFormDesigner} from "../../hooks/useFormDesigner";
import {useOperation} from "../../hooks/useOperation";
import {observer} from "@formily/react";

const DashedBoxStyled = styled('div')({
    position: 'absolute',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    '.td-aux-dashed-box-title': {
        position: 'absolute',
        left: 0,
        fontSize: '12px',
        userSelect: 'none'
    }
})

type DashedBoxProps = {}
export const DashedBox: FC<DashedBoxProps> = observer(({}) => {
    const ref = useRef<HTMLDivElement>()
    const spanRef = useRef<HTMLDivElement>()
    const {nodeIdAttrName} = useFormDesigner()
    const {dragging, hoverNode} = useOperation()

    useEffect(() => {
        console.log("ss")
        // @ts-ignore
        console.log(hoverNode)
        const hoverNodeEl = document.querySelector(`*[${nodeIdAttrName}=${hoverNode?.id}]`)
        console.log(hoverNode)

        if (hoverNodeEl) {
            console.log("node: {} {}", hoverNodeEl.clientWidth, hoverNodeEl.clientHeight)
            const rect = hoverNodeEl.getBoundingClientRect()
            console.log(rect)
            ref.current.style.height = `${rect.height}px`
            ref.current.style.width = `${rect.width}px`
            ref.current.style.border = `1px dashed #1890FF`
            ref.current.style.transform = `perspective(1px) translate3d(0px, ${rect.top}px, 0px)`

            if (spanRef.current) {
                if (hoverNode == hoverNode.root) {

                } else {
                    if (rect.top > 10) {
                        spanRef.current.style.top = 'auto';
                        spanRef.current.style.bottom = '100%';
                    } else {
                        spanRef.current.style.top = '100%';
                        spanRef.current.style.bottom = 'auto';
                    }
                }
            }
        }
    }, [hoverNode]);

    return <>
        {!dragging && hoverNode && <DashedBoxStyled ref={ref}>
            {hoverNode != hoverNode.root && <span ref={spanRef} className={`td-aux-dashed-box-title`}>测试</span>}
        </DashedBoxStyled>}
    </>
})