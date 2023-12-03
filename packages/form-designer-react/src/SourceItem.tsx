import {IResource} from "./types";
import {FC} from "react";
import React from "react";
// @ts-ignore
import {ReactComponent as Ab} from "./Ab.svg"
import {A} from "./Icon"
import styled from "@emotion/styled";

const SourceDiv = ({children, className,sourceId}: { children: React.ReactNode, className?: string ,sourceId?: string}) => {
    return <div className={className} td-designer-source-id={sourceId}>{children}</div>
}

const SourceItemStyled = styled(SourceDiv)({
    userSelect: 'none',
    cursor: 'move',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#f0f0f0',
    '.icon': {
        display: 'inline-block',
        alignItems: 'center',
        lineHeight: '0',
        'svg': {
            width: '1rem',
            height: '1rem',
        }
    },
    '&:hover': {
        backgroundColor: '#f0f0f0',
        color: '#4096ff',
        border: '1px dashed #4096ff',
    }
})


type SourceItemProps = {
    source: IResource
    [key: string]:any
}

export const SourceItem: FC<SourceItemProps> = ({source,...props}) => {
    // console.log(A)
    return <SourceItemStyled sourceId={source.name} {...props}>
        <span className={`icon`}>{React.cloneElement(A)}</span>
        <span>{source.title}</span>
    </SourceItemStyled>
}