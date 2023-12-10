import React, {FC, useEffect, useRef} from "react"
import styled from "@emotion/styled";
import {DragHandler} from "./DragHandler";
import {useFormDesigner} from "../../hooks/useFormDesigner";
import {useOperation} from "../../hooks/useOperation";
import {observer} from "@formily/react";
import {DeleteIcon} from "../../Icon";
import {useViewport} from "../../hooks/useViewport";

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
            border: 'none',
            backgroundColor: '#1890FF',
            color: 'white',
            fontSize: '12px',
            padding: '2px',
            display: 'inline-flex',
            'svg': {
                width: '1rem',
                height: '1rem',
            }
        }
    }
})

type SelectionBoxProps = {}

export const SelectionBox: FC<SelectionBoxProps> = observer(({}) => {
    const ref = useRef<HTMLDivElement>()
    const helpersRef = useRef<HTMLDivElement>()
    const {nodeIdAttrName} = useFormDesigner()
    const {dragging, selectionNode} = useOperation()
    const viewport = useViewport()

    useEffect(() => {
        console.log("SelectionBox",selectionNode)
        const selectionNodeEl = document.querySelector(`*[${nodeIdAttrName}=${selectionNode?.id}]`)
        if (selectionNodeEl) {
            if (ref.current && helpersRef.current) {
                const rect = viewport.viewportNodeRect(selectionNodeEl)

                ref.current.style.height = `${rect.height}px`
                ref.current.style.width = `${rect.width}px`
                ref.current.style.border = `2px solid #1890FF`
                ref.current.style.transform = `perspective(1px) translate3d(0px, ${rect.top}px, 0px)`

                if (selectionNode == selectionNode.root) {
                    helpersRef.current.style.top = 'auto';
                    helpersRef.current.style.bottom = 'auto';
                } else {
                    if (rect.top > 10) {
                        helpersRef.current.style.top = 'auto';
                        helpersRef.current.style.bottom = '100%';
                    } else {
                        helpersRef.current.style.top = '100%';
                        helpersRef.current.style.bottom = 'auto';
                    }
                }
            }

        }

    }, [selectionNode])

    const handleDelete = () => {
        if (selectionNode == selectionNode.root) {
            return
        }
        selectionNode.remove()
    }

    return <>{!dragging && selectionNode && <SelectionBoxStyled ref={ref} className={`td-aux-selection`}>
        <div ref={helpersRef} className={`td-aux-selection-helpers`}>
            <button>{selectionNode?.title}</button>
            {selectionNode != selectionNode.root && <>
                <DragHandler/>
                <button onClick={handleDelete}>{React.cloneElement(DeleteIcon)}</button>
            </>}
        </div>
    </SelectionBoxStyled>}</>
})