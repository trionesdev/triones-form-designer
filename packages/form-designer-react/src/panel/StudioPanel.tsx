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
    const {onMouseDown,onMouseUp} = useOperation()

    return <StudioPanelStyled
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
    >
        {children}
    </StudioPanelStyled>
}