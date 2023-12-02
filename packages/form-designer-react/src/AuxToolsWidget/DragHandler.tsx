import {useDrag} from "react-dnd";
import styled from "@emotion/styled";
import React, {FC} from "react";

const DragHandlerStyled = styled('button')({
    cursor: 'move!important'
})

type DragHandlerProps = {
    name?: string
}

export const DragHandler: FC<DragHandlerProps> = ({
                                                      name
                                                  }) => {

    const [{}, drag] = useDrag(() => ({
        type: 'box',
        item: {name},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<any>()
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))


    return <DragHandlerStyled ref={drag} >拖拽</DragHandlerStyled>
}