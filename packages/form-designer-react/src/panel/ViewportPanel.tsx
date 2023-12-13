import React, {FC} from "react"
import styled from "@emotion/styled";
import {Simulator} from "../container";
import {MobileSimulator} from "../simulator";

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
    display:'flex',
    '.ant-formily-item-label,.ant-formily-item-control': {
        userSelect: 'none',
        pointerEvents: 'none'
    }
})

export const ViewportPanel: FC<ViewportPanelProps> = ({children}) => {

    return <ViewportPanelStyled className={`td-viewport-panel`}>
        {/*<Simulator>{children}</Simulator>*/}
        <MobileSimulator>{children}</MobileSimulator>
    </ViewportPanelStyled>
}