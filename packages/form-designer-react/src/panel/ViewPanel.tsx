import React, {FC} from "react"
import {AuxToolsWidget} from "../widget";
import {useOperation} from "../hooks/useOperation";
import styled from "@emotion/styled";

const ViewPanelStyled = styled('div')({
    height:'100%'
})

type ViewPanelProps = {
    children?: React.ReactNode
}
export const ViewPanel: FC<ViewPanelProps> = ({children}) => {
    const {eventManager} = useOperation()
    return <ViewPanelStyled className={`view-panel`} onClick={(e) => eventManager.onMouseClick(e)}>
        {children}
        <AuxToolsWidget/>
    </ViewPanelStyled>
}