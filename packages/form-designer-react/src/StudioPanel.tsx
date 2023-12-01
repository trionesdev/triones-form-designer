import React, {FC} from "react";
import styled from "@emotion/styled";

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
    return <StudioPanelStyled>{children}</StudioPanelStyled>
}