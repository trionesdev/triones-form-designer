import React, {FC} from "react"
import {useOperation} from "../hooks/useOperation";
import styled from "@emotion/styled";
import {AuxToolsWidget} from "../widget";
import {Simulator} from "../container";

type ViewportPanelProps = {
    children?: React.ReactNode;
}

const ViewportPanelStyled = styled('div')({
    flex: '1 auto',
    minWidth: 0,
    position: 'relative',
    '.ant-formily-item-label,.ant-formily-item-control': {
        userSelect: 'none',
        pointerEvents: 'none'
    }
})

export const ViewportPanel: FC<ViewportPanelProps> = ({children}) => {

    return <ViewportPanelStyled >
        <Simulator>{children}</Simulator>
    </ViewportPanelStyled>
}