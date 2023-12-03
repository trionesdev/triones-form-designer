import React, {FC} from "react";
import styled from "@emotion/styled";
import {useFormDesigner} from "./hooks/useFormDesigner";
import {useFormDesigner2} from "./hooks/useFormDesigner2";

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
    const {onMouseDown,onMouseUp} = useFormDesigner2()

    return <StudioPanelStyled
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
    >
        {children}
    </StudioPanelStyled>
}