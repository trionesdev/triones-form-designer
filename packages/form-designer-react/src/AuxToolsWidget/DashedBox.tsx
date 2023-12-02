import styled from "@emotion/styled";
import React, {useEffect, useRef} from "react";
import {FC} from "react";
import {useFormDesigner} from "../hooks/useFormDesigner";

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
export const DashedBox: FC<DashedBoxProps> = ({}) => {
    const ref = useRef<HTMLDivElement>()
    const spanRef = useRef<HTMLDivElement>()
    const {nodeIdName, hoverNodeId} = useFormDesigner()

    useEffect(() => {
        console.log("ss")
        const hoverNode = document.querySelector(`*[${nodeIdName}=${hoverNodeId}]`)
        console.log(hoverNode)

        if (hoverNode) {
            console.log("node: {} {}", hoverNode.clientWidth, hoverNode.clientHeight)
            const rect = hoverNode.getBoundingClientRect()
            console.log(rect)
            ref.current.style.height = `${rect.height}px`
            ref.current.style.width = `${rect.width}px`
            ref.current.style.border = `1px dashed #1890FF`
            ref.current.style.transform = `perspective(1px) translate3d(0px, ${rect.top}px, 0px)`

            if (spanRef.current){
                if(rect.height == rect.bottom){

                }else {
                    if(rect.top>10){
                        spanRef.current.style.top='auto';
                        spanRef.current.style.bottom='100%';
                    }else {
                        spanRef.current.style.top='100%';
                        spanRef.current.style.bottom='auto';
                    }
                }
            }
        }
    }, [hoverNodeId]);

    return <DashedBoxStyled ref={ref}>
        <span ref={spanRef} className={`td-aux-dashed-box-title`}>测试</span>
    </DashedBoxStyled>
}