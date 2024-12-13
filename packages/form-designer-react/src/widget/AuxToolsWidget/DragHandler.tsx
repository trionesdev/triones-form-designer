import styled from '@emotion/styled';
import React, { FC } from 'react';
import { MoveIcon } from '../../Icon';
import { TreeNode } from '../../model';
import { useOperation } from '../../hooks';

const DragHandlerStyled = styled('button')({
  cursor: 'move!important',
  padding: '2px',
  display: 'inline-flex',
  svg: {
    width: '1rem',
    height: '1rem',
  },
});

type DragHandlerProps = {
  name?: string;
  node?: TreeNode;
};

/**
 * when mouse down event effect one the handle button , set this rect TreeNode as dragging node,
 * and moving event listen on the Viewpanel
 * @param name
 * @param node
 * @constructor
 */
export const DragHandler: FC<DragHandlerProps> = ({ name, node }) => {
  const operation = useOperation();

  return (
    <DragHandlerStyled
      onMouseDown={(e) => {
        operation.setDraggingNode(node);
        operation.eventManager.onMouseDown(e);
        e.stopPropagation();
      }}
    >
      {React.cloneElement(MoveIcon)}
    </DragHandlerStyled>
  );
};
