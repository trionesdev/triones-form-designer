import React, {CSSProperties, FC, useEffect, useLayoutEffect, useMemo, useRef} from "react"
import {useCursor, useFormDesigner, useOperation} from "../hooks";
import styled from "@emotion/styled";
import {ViewportContext} from "../context";
import {CursorStatus, DesignerType, Viewport} from "../model";
import {AuxToolsWidget} from "../widget";
import {MobileAuxToolsWidget} from "../widget/MobileAuxToolsWidget";
import {observer} from "@formily/react";

const ViewPanelStyled = styled('div')({
    position: 'relative',
    overflow: 'overlay',
    minHeight: '100%',
    height: '100%',
    overflowX: 'hidden',
})

type ViewPanelProps = {
    children?: React.ReactNode
    type?: DesignerType
}
export const ViewPanel: FC<ViewPanelProps> = observer(({children, type}) => {
    const ref = useRef<HTMLDivElement>()
    const engine = useFormDesigner()
    const {eventManager} = useOperation()
    const cursor = useCursor()
    const handleStudioPanelStyles = (): CSSProperties => {
        const baseStyle: CSSProperties = {}
        if (cursor.status === CursorStatus.DRAGGING) {
            baseStyle.cursor = 'move'
        } else {
            baseStyle.cursor = 'default'
        }
        return baseStyle
    }

    const viewport = useMemo(() => {
        return new Viewport({
            engine: engine,
            viewportElement: ref.current
        })
    }, [ref, ref.current]);

    useEffect(() => {
        if (type) {
            engine.setDesignerType(type)
        }
    }, [type]);


    useLayoutEffect(() => {
        if (ref.current) {
            viewport.onMoment(ref.current)
        }

        return () => {
            viewport.onUnmount()
        }
    }, [])


    return <ViewportContext.Provider value={viewport}>
        <ViewPanelStyled ref={ref} className={`td-view-panel`} style={handleStudioPanelStyles()}
                         onClick={(e) => eventManager.onMouseClick(e)}
                         onScroll={(e) => eventManager.onViewportScroll(e)}
                         onResize={(e) => eventManager.onViewportResize(e)}
        >
            {children}
            {engine.type == 'PC' && <AuxToolsWidget/>}
            {engine.type == 'MOBILE' && <MobileAuxToolsWidget/>}
        </ViewPanelStyled>
    </ViewportContext.Provider>
})