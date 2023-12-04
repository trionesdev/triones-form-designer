import React, {FC, useEffect} from "react"
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
    const [{isDragging,clientOffset,monitor}, drag] = useDrag(() => ({
        type: 'box',
        item: {name},
        end: (item, monitor) => {
            debugger
            const dropResult = monitor.getDropResult<any>()
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
            clientOffset: monitor.getSourceClientOffset(),
            monitor
        }),
    }))


    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
console.log("dddd")
        }
    }

    useEffect(() => {
        console.log(monitor)
        debugger
        if (isDragging){

        }
    }, [clientOffset]);

    return <DraggableWidgetStyled ref={drag} className={className} style={style} onMouseMove={handleMouseMove}>{children}</DraggableWidgetStyled>
}