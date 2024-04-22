import { Operation } from '../model';
import React from 'react';

/**
 * 鼠标按下
 * @param e
 * @param operation
 */
export const mouseDownEffect = (e, operation: Operation) => {};

/**
 * 鼠标松开
 * @param e
 * @param operation
 */
export const mouseUpEffect = (e, operation: Operation) => {};

/**
 * 鼠标移动
 * @param e
 * @param operation
 */
export const mouseMoveEffect = (e, operation: Operation) => {
  const engine = operation.engine;
  const target = e.target as HTMLElement;
  const el = target?.closest(`
       *[${engine.nodeIdAttrName}]
      `);
  if (!el?.getAttribute) {
    return;
  }
  const nodeId = el.getAttribute(engine.nodeIdAttrName);
  if (nodeId) {
    const hoverNode = operation.findNodeById(nodeId);
    if (hoverNode) {
      operation.hoverNode = hoverNode;
    }
  }
};

export const mouseLeaveEffect = (e, operation: Operation) => {};

/**
 * 鼠标点击
 * @param e
 * @param operation
 */
export const mouseClickEffect = (e: React.MouseEvent, operation: Operation) => {
  const engine = operation.engine;
  const target = e.target as HTMLElement;

  const el = target?.closest(`
       *[${engine.nodeIdAttrName}]
      `);

  if (!el?.getAttribute) {
    return;
  }
  const nodeId = el.getAttribute(engine.nodeIdAttrName);
  if (nodeId) {
    const selectionNode = operation.findNodeById(nodeId);
    if (selectionNode) {
      operation.selectionNode = selectionNode;
    }
  }
};
