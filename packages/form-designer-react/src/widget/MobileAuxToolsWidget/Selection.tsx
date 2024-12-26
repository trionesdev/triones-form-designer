import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';
import { useOperation, useValidNodeOffsetRect } from '../../hooks';
import { observer } from '@formily/react';
import { MobileDeleteIcon } from '../../Icon';
import { CursorStatus, TreeNode } from '../../model';

const SelectionBoxStyled = styled('div')({
  position: 'absolute',
  boxSizing: 'border-box',
  pointerEvents: 'none',
  '.td-aux-selection-helpers': {
    pointerEvents: 'all',
    position: 'absolute',
    display: 'inline-flex',
    right: 0,
    fontSize: '12px',
    userSelect: 'none',
    padding: '4px 4px',
    gap: '4px',
    button: {
      cursor: 'pointer',
      border: 'none',
      color: 'white',
      fontSize: '12px',
      padding: '2px',
      display: 'inline-flex',
      svg: {
        width: '1em',
        height: '1em',
      },
    },
  },
});

type SelectionBoxProps = {
  node: TreeNode;
};

export const SelectionBox: FC<SelectionBoxProps> = ({ node }) => {
  const operation = useOperation();
  const { dragging, selectionNode } = operation;
  const rect = useValidNodeOffsetRect(selectionNode);
  const handleBoxStyles = () => {
    const boxStyles: CSSProperties = {
      borderLeft: `2px solid #1890FF`,
      visibility: 'hidden',
    };
    if (rect) {
      boxStyles.height = `${rect.height}px`;
      boxStyles.width = `${rect.width}px`;
      boxStyles.transform = `perspective(1px) translate3d(${rect.left}px, ${rect.top}px, 0px)`;
    }
    if (selectionNode != selectionNode.root) {
      boxStyles.visibility = 'visible';
    }
    return boxStyles;
  };

  const handleHelperStyles = () => {
    const helperStyles: CSSProperties = {
      backgroundColor: 'rgba(17, 31, 44, 0.04)',
      borderRadius: '50px',
      padding: '4px',
    };

    return helperStyles;
  };

  const handleDelete = () => {
    if (node == node.root) {
      return;
    }
    if (operation.engine.onItemDelete) {
      operation.engine.onItemDelete(node);
      return;
    }
    node.remove();
  };

  return (
    <>
      {!dragging && selectionNode && (
        <SelectionBoxStyled
          className={`td-aux-selection`}
          style={handleBoxStyles()}
        >
          <div
            className={`td-aux-selection-helpers`}
            style={handleHelperStyles()}
          >
            <button onClick={handleDelete}>
              {React.cloneElement(MobileDeleteIcon)}
            </button>
          </div>
        </SelectionBoxStyled>
      )}
    </>
  );
};

export const Selection = observer(() => {
  const operation = useOperation();
  const { selectionNode, cursor } = operation;

  if (cursor.status != CursorStatus.NORMAL) {
    return null;
  }

  return <>{selectionNode && <SelectionBox node={selectionNode} />}</>;
}, {});
