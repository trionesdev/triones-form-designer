import React from "react";
import {FC} from "react";
import styled from "@emotion/styled";
import {observer} from "@formily/react";
import {AuxToolsWidget} from "../widget";

type WorkspacePanelProps = {
    children?: React.ReactNode
}

const WorkspacePanelStyled = styled('div')({
    flex: '1 auto',
    minWidth: 0,
    position: 'relative',
    display: 'flex',
    // padding: '4px',
})

export const WorkspacePanel: FC<WorkspacePanelProps> = observer(({children}) => {


    return <WorkspacePanelStyled>
        {children}
    </WorkspacePanelStyled>
}, {
    scheduler: () => {
        return requestIdleCallback
    }
})