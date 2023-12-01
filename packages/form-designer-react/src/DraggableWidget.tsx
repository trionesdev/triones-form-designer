import React, {FC} from "react"
import {useDrag} from "react-dnd";
import styled from "@emotion/styled";

type DraggableWidgetProps = {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    name?: string
}

const DraggableWidgetStyled = styled('div')({})

export const DraggableWidget: FC<DraggableWidgetProps> = ({
                                                              children,
                                                              className,
                                                              style,
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
    return <DraggableWidgetStyled ref={drag} className={className} style={style}>{children}</DraggableWidgetStyled>
}