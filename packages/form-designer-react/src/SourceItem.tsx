import {DraggableWidget} from "./DraggableWidget";
import {IDesignerProps} from "./types";
import {FC} from "react";
import React from "react";
// @ts-ignore
import {ReactComponent as Ab} from "./Ab.svg"
import {A} from "./Icon"
import styled from "@emotion/styled";

type SourceItemProps = {
    source: IDesignerProps
}

const SourceItemStyled = styled(DraggableWidget)({
    cursor: 'pointer',
    padding: '8px',
    display:'flex',
    alignItems:'center',
    gap:'4px',
    backgroundColor: '#f0f0f0',
    '.icon':{
        display:'inline-block',
        alignItems:'center',
        lineHeight:'0',
        'svg':{
            width:'1rem',
            height:'1rem',
        }
    },
    '&:hover': {
        backgroundColor: '#f0f0f0',
        color: '#4096ff',
        border: '1px dashed #4096ff',
    }
})

export const SourceItem: FC<SourceItemProps> = ({
                                                    source
                                                }) => {
    // console.log(A)
    return <SourceItemStyled>
        <span className={`icon`}>{React.cloneElement(A)}</span>
        <span>{source.title}</span>
    </SourceItemStyled>
}