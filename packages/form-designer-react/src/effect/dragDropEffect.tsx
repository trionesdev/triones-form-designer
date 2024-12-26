import { ClosestPosition, Operation } from '../model';
import React from 'react';
import { Point } from '../coordinate';

/**
 * 开始拖拽
 * @param e
 * @param operation
 */
export const dragStartEffect = (e, operation: Operation) => {
  const engine = operation.engine;
  if (operation.draggingNode) {
    operation.dragStart();
    return;
  }
  const target = e.target as HTMLElement;
  const el = target?.closest(`
       *[${engine.nodeIdAttrName}],
       *[${engine.sourceIdAttrName}]
      `);
  if (!el?.getAttribute) {
    return;
  }
  const sourceId = el.getAttribute(engine.sourceIdAttrName);
  const nodeId = el.getAttribute(engine.nodeIdAttrName);
  if (nodeId) {
    const node = operation.findNodeById(nodeId);
    if (node.root == node) {
      return;
    }
    if (node) {
      operation.dragStart();
      operation.setDraggingNode(node);
    }
  } else if (sourceId) {
    const sourceNode = operation.findNodeById(sourceId);
    if (sourceNode) {
      operation.dragStart();
      operation.setDraggingNode(sourceNode);
    }
  }
};

export const dragMoveEffect = (e, operation: Operation) => {
  const position = {
    pageX: e.pageX,
    pageY: e.pageY,
    clientX: e.clientX,
    clientY: e.clientY,
    topPageX: e.pageX,
    topPageY: e.pageY,
    topClientX: e.clientX,
    topClientY: e.clientY,
  };
  operation.cursor.setPosition();
  operation.dragMove(position);
  const engine = operation.engine;
  const target = e.target as HTMLElement;
  const el = target?.closest(`
       *[${engine.nodeIdAttrName}]
      `);
  if (!el?.getAttribute) {
    operation.cleanDraggingHover();
    return;
  }

  operation.calcClosestPosition(new Point(e.clientX, e.clientX));
  const nodeId = el.getAttribute(engine.nodeIdAttrName);
  if (nodeId) {
    operation.draggingHoverNode = operation.findNodeById(nodeId);
    operation.mouseEvent = e;
  } else {
    operation.cleanDraggingHover();
  }
};

export const dragEndEffect = (e: React.MouseEvent, operation: Operation) => {
  const closestNode = operation.closestNode;
  const closestPosition = operation.closestPosition;
  if (operation.draggingNode) {
    if (ClosestPosition.INNER === closestPosition) {
      closestNode.append(operation.draggingNode);
    } else if (
      ClosestPosition.BEFORE === closestPosition ||
      ClosestPosition.UPPER === closestPosition
    ) {
      closestNode.insertBefore(operation.draggingNode);
    } else if (
      ClosestPosition.AFTER === closestPosition ||
      ClosestPosition.UNDER === closestPosition
    ) {
      closestNode.insertAfter(operation.draggingNode);
    } else if (ClosestPosition.INNER_AFTER === closestPosition) {
    } else if (ClosestPosition.INNER_BEFORE === closestPosition) {
    }
  }
  operation.dragStop();
};
