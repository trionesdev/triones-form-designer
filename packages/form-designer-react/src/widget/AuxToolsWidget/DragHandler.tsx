import styled from "@emotion/styled";
import React, {FC} from "react";
import {MoveIcon} from "../../Icon";

const DragHandlerStyled = styled('button')({
    cursor: 'move!important',
    padding:'2px',
    display:'inline-flex',
    'svg':{
        width:'1rem',
        height:'1rem',
    }
})

type DragHandlerProps = {
    name?: string
}

export const DragHandler: FC<DragHandlerProps> = ({
                                                      name
                                                  }) => {


    return <DragHandlerStyled>{React.cloneElement(MoveIcon)}</DragHandlerStyled>
}