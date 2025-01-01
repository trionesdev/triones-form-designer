import React, {
  CSSProperties,
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {
  useCursor,
  useFormDesigner,
  useOperation,
  useWorkbench,
} from '../hooks';
import styled from '@emotion/styled';
import { ViewportContext } from '../context';
import { CursorStatus, Viewport } from '../model';
import { AuxToolsWidget } from '../widget';
import { MobileAuxToolsWidget } from '../widget/MobileAuxToolsWidget';
import { observer } from '@formily/react';
import { WorkbenchType } from '../types';
import { requestIdle } from '../request-idle';

const ViewPanelStyled = styled('div')({
  position: 'relative',
  overflow: 'overlay',
  minHeight: '100%',
  height: '100%',
  overflowX: 'hidden',
});

type ViewPanelProps = {
  children?: React.ReactNode;
  type?: WorkbenchType;
};
export const ViewPanel: FC<ViewPanelProps> = observer(({ children, type }) => {
  const ref = useRef<HTMLDivElement>();
  const [visible, setVisible] = React.useState(false);
  const engine = useFormDesigner();
  const { eventManager } = useOperation();
  const cursor = useCursor();
  const workbench = useWorkbench();
  const handleStudioPanelStyles = (): CSSProperties => {
    const baseStyle: CSSProperties = {};
    if (cursor.status === CursorStatus.DRAGGING) {
      baseStyle.cursor = 'move';
    } else {
      baseStyle.cursor = 'default';
    }
    return baseStyle;
  };

  const viewport = useMemo(() => {
    return new Viewport({
      engine: engine,
      viewportElement: ref.current,
    });
  }, [ref, ref.current]);

  useLayoutEffect(() => {
    if (ref.current) {
      viewport.onMoment(ref.current);
    }

    return () => {
      viewport.onUnmount();
    };
  }, [ref.current]);

  useEffect(() => {
    if (workbench.type === type) {
      requestIdle(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
    }
  }, [workbench.type]);

  if (workbench.type !== type) {
    return null;
  }

  return (
    <ViewportContext.Provider value={viewport}>
      {workbench.type === 'DESIGNABLE' ? (
        <ViewPanelStyled
          ref={ref}
          className={`td-view-panel`}
          style={handleStudioPanelStyles()}
          onClick={(e) => eventManager.onMouseClick(e)}
          onScroll={(e) => eventManager.onViewportScroll(e)}
          onResize={(e) => eventManager.onViewportResize(e)}
        >
          {children}
          {engine.type == 'PC' && <AuxToolsWidget />}
          {engine.type == 'MOBILE' && <MobileAuxToolsWidget />}
        </ViewPanelStyled>
      ) : (
        visible && <ViewPanelStyled>{children}</ViewPanelStyled>
      )}
    </ViewportContext.Provider>
  );
});
