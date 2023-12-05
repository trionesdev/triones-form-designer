import React, {FC} from "react";
import styled from "@emotion/styled";
import {useOperation} from "../hooks/useOperation";

type StudioPanelProps = {
    children?: React.ReactNode
}

const StudioPanelStyled = styled('div')({
    height: '100%',
    display: 'flex'
})

export const StudioPanel: FC<StudioPanelProps> = ({
                                                      children
                                                  }) => {
    const {eventManager} = useOperation()

    return <StudioPanelStyled
        onMouseDown={(e)=>eventManager.onMouseDown(e)}
        onMouseUp={(e)=>eventManager.onMouseUp(e)}
        onMouseMove={(e)=>eventManager.onMouseMove(e)}
    >
        {children}
    </StudioPanelStyled>
}