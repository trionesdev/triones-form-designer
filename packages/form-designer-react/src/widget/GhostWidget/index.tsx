import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useOperation } from '../../hooks';
import { autorun } from '@formily/reactive';
import { observer } from '@formily/react';
import { CursorStatus } from '../../model';

const GhostWidgetStyled = styled('div')({
  paddingLeft: '25px',
  paddingRight: '15px',
  height: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  color: `#fff`,
  fontSize: '12px',
  zIndex: 9999,
  borderRadius: '50px',
  backgroundColor: `rgba(24, 144, 255, 0.5)`,
  pointerEvents: 'none',
  left: 0,
  top: 0,
  transform: `translate3d(0, 0, 0)`,
});

export const GhostWidget = observer(() => {
  const ref = useRef<HTMLDivElement>();
  const operation = useOperation();
  const { engine, cursor, draggingNode } = operation;
  useEffect(
    () =>
      autorun(() => {
        const transform = `perspective(1px) translate3d(${
          cursor.position?.topClientX - 18
        }px,${cursor.position?.topClientY - 12}px,0) scale(0.8)`;
        if (!ref.current) return;
        ref.current.style.transform = transform;
      }),
    [engine, cursor],
  );
  if (!draggingNode) {
    return null;
  }

  return cursor.status == CursorStatus.DRAGGING ? (
    <GhostWidgetStyled ref={ref}>{draggingNode?.displayName}</GhostWidgetStyled>
  ) : null;
});
