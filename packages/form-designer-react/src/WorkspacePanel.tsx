import React from "react";
import {FC} from "react";
import styled from "@emotion/styled";
import {DroppableWidget} from "./DroppableWidget";
import {AuxToolsWidget} from "./AuxToolsWidget";
import {useFormDesigner} from "./hooks/useFormDesigner";

type WorkspacePanelProps = {
    children?: React.ReactNode
}

const WorkspacePanelStyled = styled('div')({
    flex: '1 auto',
    minWidth: 0,
    position: 'relative',
})

export const WorkspacePanel: FC<WorkspacePanelProps> = ({children}) => {
    const {onMouseMove,onMouseDown} = useFormDesigner()

    return <WorkspacePanelStyled onMouseMove={onMouseMove} onMouseDown={onMouseDown}>
        <DroppableWidget style={{height: '100%'}}>
            {children}
            <AuxToolsWidget/>
        </DroppableWidget>
    </WorkspacePanelStyled>
}