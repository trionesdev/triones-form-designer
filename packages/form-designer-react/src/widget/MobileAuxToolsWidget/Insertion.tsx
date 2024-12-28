import styled from '@emotion/styled';
import React, { FC } from 'react';
import { observer } from '@formily/react';
import { useOperation } from '../../hooks';
import { ClosestPosition } from '../../model';

const InsertionStyled = styled('div')({
  position: 'absolute',
  boxSizing: 'border-box',
  pointerEvents: 'none',
});

type InsertionProps = {};

export const Insertion: FC<InsertionProps> = observer(({}) => {
  const operation = useOperation();
  const {
    dragging,
    draggingHoverNode,
    closestNode,
    closestPosition,
    closestNodeRect,
  } = operation;

  const handleInsertionStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {};
    if (closestNode) {
      if (closestPosition == ClosestPosition.UPPER) {
        baseStyle.height = `2px`;
        baseStyle.width = `${closestNodeRect.width}px`;
        baseStyle.backgroundColor = `#1890FF`;
        baseStyle.transform = `perspective(1px) translate3d(${closestNodeRect.left}px, ${closestNodeRect.top}px, 0px)`;
      } else if (closestPosition == ClosestPosition.UNDER) {
        baseStyle.height = `2px`;
        baseStyle.width = `${closestNodeRect.width}px`;
        baseStyle.backgroundColor = `#1890FF`;
        baseStyle.transform = `perspective(1px) translate3d(${closestNodeRect.left}px, ${closestNodeRect.top + closestNodeRect.height}px, 0px)`;
      } else if (closestPosition == ClosestPosition.BEFORE) {
        baseStyle.height = `${closestNodeRect.height}px`;
        baseStyle.width = `2px`;
        baseStyle.backgroundColor = `#1890FF`;
        baseStyle.transform = `perspective(1px) translate3d(${closestNodeRect.left}px, ${closestNodeRect.top}px, 0px)`;
      } else if (closestPosition == ClosestPosition.AFTER) {
        baseStyle.height = `${closestNodeRect.height}px`;
        baseStyle.width = `2px`;
        baseStyle.backgroundColor = `#1890FF`;
        baseStyle.transform = `perspective(1px) translate3d(${closestNodeRect.left + closestNodeRect.width}px, ${closestNodeRect.top}px, 0px)`;
      } else if (closestPosition == ClosestPosition.INNER) {
        if (closestNode.parent) {
          baseStyle.height = `${closestNodeRect.height}px`;
          baseStyle.width = `${closestNodeRect.width}px`;
          baseStyle.backgroundColor = `#1890FF`;
          baseStyle.transform = `perspective(1px) translate3d(${closestNodeRect.left}px, ${closestNodeRect.top}px, 0px)`;
        } else {
          baseStyle.height = `2px`;
          baseStyle.width = `${closestNodeRect.width}px`;
          baseStyle.backgroundColor = `#1890FF`;
          baseStyle.transform = `perspective(1px) translate3d(${closestNodeRect.left}px, ${closestNodeRect.top}px, 0px)`;
        }
      }
    }
    return baseStyle;
  };

  return (
    <>
      {dragging && draggingHoverNode && (
        <InsertionStyled style={handleInsertionStyles()}></InsertionStyled>
      )}
    </>
  );
});
