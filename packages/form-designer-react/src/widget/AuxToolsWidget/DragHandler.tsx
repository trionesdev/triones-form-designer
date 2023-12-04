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



    return <DragHandlerStyled  >拖拽</DragHandlerStyled>
}