import {DraggableWidget} from "./DraggableWidget";
import {IDesignerProps} from "./types";
import {FC} from "react";
import React from "react";
import styled from "@emotion/styled";

type SourceItemProps = {
    source: IDesignerProps
}

const SourceItemStyled = styled(DraggableWidget)({
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f0f0f0',
        color: '#4096ff'
    }
})

export const SourceItem: FC<SourceItemProps> = ({
                                                    source
                                                }) => {
    return <SourceItemStyled>
        <span>{source.title}</span>
    </SourceItemStyled>
}