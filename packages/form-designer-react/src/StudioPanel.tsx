import React, {FC} from "react";
import styled from "@emotion/styled";
import {useFormDesigner} from "./hooks/useFormDesigner";

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
    const {onMouseDown, onMouseMove} = useFormDesigner()

    return <StudioPanelStyled onMouseDown={onMouseDown} onMouseMove={onMouseMove}>{children}</StudioPanelStyled>
}