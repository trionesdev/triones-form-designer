import React, {CSSProperties, FC, useEffect} from "react"
import styled from "@emotion/styled";
import {DragHandler} from "./DragHandler";
import {useFormDesigner, useOperation, useValidNodeOffsetRect, useViewport} from "../../hooks";
import {observer} from "@formily/react";
import {DeleteIcon} from "../../Icon";
import {CursorStatus, TreeNode} from "../../model";


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

type SelectionBoxProps = {
    node: TreeNode;
}

export const SelectionBox: FC<SelectionBoxProps> = ({
                                                        node
                                                    }) => {
    const {nodeIdAttrName} = useFormDesigner()
    const operation = useOperation()
    const {dragging, selectionNode} = operation
    console.log("mouseClickEffect operation SelectionBox selectionNode box", selectionNode)
    const viewport = useViewport()
    // const selectionNodeEl = document.querySelector(`*[${nodeIdAttrName}=${node?.id}]`)
    // console.log("mouseClickEffect operation SelectionBox selectionNodeEl", selectionNodeEl)
    const rect = useValidNodeOffsetRect(selectionNode)
    console.log("mouseClickEffect operation SelectionBox rect", rect)

    const handleBoxStyles = () => {
        const boxStyles: CSSProperties = {
            border: `2px solid #1890FF`,
            visibility: 'hidden',
        }
        if (rect) {
            boxStyles.visibility = 'visible';
            boxStyles.height = `${rect.height}px`
            boxStyles.width = `${rect.width}px`
            boxStyles.transform = `perspective(1px) translate3d(0px, ${rect.top}px, 0px)`
        }
        return boxStyles
    }

    const handleHelperStyles = () => {
        const helperStyles: CSSProperties = {}
        if (rect) {
            if (selectionNode == selectionNode.root) {
                helperStyles.top = 'auto';
                helperStyles.bottom = 'auto';
            } else {
                if (rect.top > 10) {
                    helperStyles.top = 'auto';
                    helperStyles.bottom = '100%';
                } else {
                    helperStyles.top = '100%';
                    helperStyles.bottom = 'auto';
                }
            }
        }
        return helperStyles
    }

    const handleDelete = () => {
        if (node == node.root) {
            return
        }
        node.remove()
    }


    return <>{!dragging && selectionNode &&
        <SelectionBoxStyled className={`td-aux-selection`} style={handleBoxStyles()}>
            <div className={`td-aux-selection-helpers`} style={handleHelperStyles()}>
                <button>{selectionNode?.title}</button>
                {selectionNode != selectionNode.root && <>
                    <DragHandler/>
                    <button onClick={handleDelete}>{React.cloneElement(DeleteIcon)}</button>
                </>}
            </div>
        </SelectionBoxStyled>}</>
}

export const Selection = observer(() => {
    const operation = useOperation()
    const {selectionNode, tree, cursor} = operation
    console.log("mouseClickEffect operation Selection selectionNode", selectionNode)
    console.log("mouseClickEffect operation Selection cursor.status", cursor.status)

    if (cursor.status != CursorStatus.NORMAL) {
        return null
    }

    return <>
        {selectionNode && <SelectionBox node={selectionNode}/>}
    </>
}, {})