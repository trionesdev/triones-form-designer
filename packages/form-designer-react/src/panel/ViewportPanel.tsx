import React, {FC} from "react"
import {useOperation} from "../hooks/useOperation";
import styled from "@emotion/styled";

type ViewportPanelProps = {
    children?: React.ReactNode;
}

const ViewportPanelStyled = styled('div')({
    flex: '1 auto',
    minWidth: 0,
    position: 'relative',
})

export const ViewportPanel: FC<ViewportPanelProps> = ({children}) => {
    const {eventManager} = useOperation()
    return <ViewportPanelStyled onClick={(e) => eventManager.onMouseClick(e)}>{children}</ViewportPanelStyled>
}