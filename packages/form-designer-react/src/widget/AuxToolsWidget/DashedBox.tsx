import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';
import { FC } from 'react';
import { useOperation, useValidNodeOffsetRect } from '../../hooks';
import { observer } from '@formily/react';

/**
 *  hoverNode 不要用useEffect监听
 */

const DashedBoxStyled = styled('div')({
  position: 'absolute',
  boxSizing: 'border-box',
  pointerEvents: 'none',
  '.td-aux-dashed-box-title': {
    position: 'absolute',
    left: 0,
    fontSize: '12px',
    userSelect: 'none',
    visibility: 'hidden',
  },
});
/**
 * 解决鼠标hover时对高度计算不正确导致的抖动问题
 */
const DashedBoxWrapperStyled = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  overflow: 'hidden',
});

type DashedBoxProps = {};
export const DashedBox: FC<DashedBoxProps> = observer(({}) => {
  const { dragging, hoverNode, selectionNode } = useOperation();
  const rect = useValidNodeOffsetRect(hoverNode);

  const handleBoxStyles = (): React.CSSProperties => {
    const boxStyles: React.CSSProperties = {
      top: 0,
      left: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box',
      visibility: 'hidden',
      zIndex: 2,
    };
    if (rect) {
      boxStyles.height = `${rect.height}px`;
      boxStyles.width = `${rect.width}px`;
      boxStyles.border = `1px dashed #1890FF`;
      boxStyles.transform = `perspective(1px) translate3d(${rect.left}px, ${rect.top}px, 0px)`;
      boxStyles.visibility = 'visible';
    }
    return boxStyles;
  };

  const handleSpanStyles = (): CSSProperties => {
    const spanStyles: CSSProperties = {};
    if (!hoverNode || hoverNode == hoverNode?.root) {
    } else {
      if (rect) {
        if (rect.top > 10) {
          spanStyles.top = 'auto';
          spanStyles.bottom = '100%';
        } else {
          spanStyles.top = '100%';
          spanStyles.bottom = 'auto';
        }
      }
    }
    return spanStyles;
  };

  return (
    <>
      {!dragging && hoverNode && hoverNode != selectionNode && (
        <DashedBoxWrapperStyled>
          <DashedBoxStyled style={handleBoxStyles()}>
            {hoverNode && hoverNode != hoverNode.root && (
              <span
                className={`td-aux-dashed-box-title`}
                style={handleSpanStyles()}
              >
                {hoverNode?.title}
              </span>
            )}
          </DashedBoxStyled>
        </DashedBoxWrapperStyled>
      )}
    </>
  );
});
