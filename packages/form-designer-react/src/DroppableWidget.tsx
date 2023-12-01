import React, {FC} from "react";
import {useDrop} from "react-dnd";
import styled from "@emotion/styled";

type DroppableWidgetProps = {
    children?: React.ReactNode
    className?: string
}

const DroppableWidgetStyled = styled(`div`)({})
export const DroppableWidget: FC<DroppableWidgetProps> = ({children, className}) => {
    const [, drop] = useDrop(() => ({
        accept: 'box',
        drop: () => ({name: 'Dustbin'}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    return <DroppableWidgetStyled ref={drop}>{children}</DroppableWidgetStyled>
}