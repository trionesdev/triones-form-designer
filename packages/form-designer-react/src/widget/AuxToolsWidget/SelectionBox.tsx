import React, {FC, useEffect, useRef} from "react"
import styled from "@emotion/styled";
import {DragHandler} from "./DragHandler";
import {useFormDesigner} from "../../hooks/useFormDesigner";
import {useOperation} from "../../hooks/useOperation";
import {observer} from "@formily/react";

const SelectionBoxStyled = styled('div')({
    position: 'absolute',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    '.td-aux-selection-helpers': {
        pointerEvents: 'all',
        position: 'absolute',
        display: 'inline-flex',
        right: 0,
        fontSize: '12px',
        userSelect: 'none',
        padding: '4px 4px',
        gap: '4px',
        'button': {
            cursor: 'pointer',
            border: 'none'
        }
    }
})

type SelectionBoxProps = {}

export const SelectionBox: FC<SelectionBoxProps> = observer(({}) => {
    const ref = useRef<HTMLDivElement>()
    const helpersRef = useRef<HTMLDivElement>()
    const {nodeIdAttrName} = useFormDesigner()
    const {selectionNode} = useOperation()

    useEffect(() => {
        const selectionNodeEl = document.querySelector(`*[${nodeIdAttrName}=${selectionNode?.id}]`)
        if (selectionNodeEl) {
            if (ref.current && helpersRef.current) {
                const rect = selectionNodeEl.getBoundingClientRect()

                ref.current.style.height = `${rect.height}px`
                ref.current.style.width = `${rect.width}px`
                ref.current.style.border = `2px solid #1890FF`
                ref.current.style.transform = `perspective(1px) translate3d(0px, ${rect.top}px, 0px)`


                if (rect.top > 10) {
                    helpersRef.current.style.top = 'auto';
                    helpersRef.current.style.bottom = '100%';
                } else {
                    helpersRef.current.style.top = '100%';
                    helpersRef.current.style.bottom = 'auto';
                }

            }

        }

    }, [selectionNode])

    return <>{selectionNode && <SelectionBoxStyled ref={ref}>
        <div ref={helpersRef} className={`td-aux-selection-helpers`}>
            <button>多行输入</button>
            <DragHandler/>
            <button>删除</button>
        </div>
    </SelectionBoxStyled>}</>
})