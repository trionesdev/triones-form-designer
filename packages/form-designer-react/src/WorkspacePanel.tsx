import React from "react";
import {FC} from "react";
import styled from "@emotion/styled";
import {DroppableWidget} from "./DroppableWidget";

type WorkspacePanelProps = {
    children?: React.ReactNode
}

const WorkspacePanelStyled = styled('div')({
    flex: '1 auto',
    minWidth: 0,
})

export const WorkspacePanel: FC<WorkspacePanelProps> = ({children}) => {
    return <WorkspacePanelStyled>
        <DroppableWidget></DroppableWidget>
    </WorkspacePanelStyled>
}