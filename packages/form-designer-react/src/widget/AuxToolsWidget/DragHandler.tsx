import styled from '@emotion/styled';
import React, { FC } from 'react';
import { MoveIcon } from '../../Icon';
import { TreeNode } from '../../model';
import { useOperation } from '../../hooks';
import _ from 'lodash';

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

export const DragHandler: FC<DragHandlerProps> = ({ name, node }) => {
  const { tree, eventManager, draggingNode, setDraggingNode } = useOperation();

  return (
    <DragHandlerStyled
      onMouseDown={(e) => {
        console.log('selectNode', node);
        // setDraggingNode({...node})
        eventManager.onMouseDown(e);
        e.stopPropagation();
      }}
    >
      {React.cloneElement(MoveIcon)}
    </DragHandlerStyled>
  );
};
