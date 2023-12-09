import React, {FC} from "react";
import styled from "@emotion/styled";
import {useOperation} from "../hooks/useOperation";

type StudioPanelProps = {
    children?: React.ReactNode
}

const StudioPanelStyled = styled('div')({
    height: '100%',
    display: 'flex',
    backgroundColor: '#00000014',
    '.icon': {
        display: 'inline-block',
        alignItems: 'center',
        lineHeight: '0',
        'svg': {
            width: '1rem',
            height: '1rem',
        }
    },
})

export const StudioPanel: FC<StudioPanelProps> = ({
                                                      children
                                                  }) => {
    const {eventManager} = useOperation()

    return <StudioPanelStyled
        className={`td-studio-panel`}
        onMouseDown={(e) => eventManager.onMouseDown(e)}
        onMouseUp={(e) => eventManager.onMouseUp(e)}
        onMouseMove={(e) => eventManager.onMouseMove(e)}
    >
        {children}
    </StudioPanelStyled>
}