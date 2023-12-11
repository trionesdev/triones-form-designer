import React, {FC} from "react"
import {useOperation} from "../hooks/useOperation";
import styled from "@emotion/styled";
import {AuxToolsWidget} from "../widget";
import {Simulator} from "../container";

type ViewportPanelProps = {
    children?: React.ReactNode;
}

const ViewportPanelStyled = styled('div')({
    background: '#fff',
    flex: '1 auto',
    minWidth: 0,
    position: 'relative',
    minHeight: 0,
    overflow: 'hidden',
    '.ant-formily-item-label,.ant-formily-item-control': {
        userSelect: 'none',
        pointerEvents: 'none'
    }
})

export const ViewportPanel: FC<ViewportPanelProps> = ({children}) => {

    return <ViewportPanelStyled className={`td-viewport-panel`}>
        <Simulator>{children}</Simulator>
    </ViewportPanelStyled>
}