import { TreeNode } from './TreeNode';
import { FormDesignerEngine } from './FormDesignerEngine';
import { action, define, observable } from '@formily/reactive';
import { EventManager } from '../event/event';
import { Cursor, CursorStatus, ICursorPosition } from './Cursor';
import { requestIdle } from '../request-idle';
import { Viewport } from './Viewport';
import {
  calcPointToRectDistance,
  IPoint,
  isNearAfter,
  isPointInRect,
  Point,
  transformToSchema,
  transformToTreeNode,
} from '../coordinate';
import _ from 'lodash';
import { GlobalStore } from '../store';

export enum ClosestPosition {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  UPPER = 'UPPER',
  UNDER = 'UNDER',
  INNER = 'INNER',
  INNER_BEFORE = 'INNER_BEFORE',
  INNER_AFTER = 'INNER_AFTER',
}

interface IOperation {
  engine: FormDesignerEngine;
  value: any;
}

export class Operation {
  engine: FormDesignerEngine;
  viewport: Viewport;
  tree: TreeNode;
  cursor: Cursor;
  onMouseDownAt: number; //鼠标按下时间
  startEvent: any; //开始事件
  hoverNode?: TreeNode; //悬浮节点
  selectionNode?: TreeNode; //选中节点
  draggingNode?: TreeNode; //拖拽节点
  draggingHoverNode?: TreeNode; //拖拽悬浮节点
  closestPosition: ClosestPosition; //与最近可托入节点的位置
  closestNode?: TreeNode; //最近节点
  closestNodeRect?: DOMRect; //最近节点
  eventManager: EventManager;
  mouseEvent: any;

  constructor(args: IOperation) {
    this.engine = args.engine;

    this.tree = new TreeNode({
      componentName: args.engine.rootComponentName,
      isSourceNode: false,
      operation: this,
      schema: GlobalStore.getDesignerResource(args.engine.rootComponentName)
        ?.schema,
    });

    if (args.value) {
      this.tree.from(transformToTreeNode(args.value));
    }
    this.cursor = new Cursor({
      engine: this.engine,
    });
    this.onMouseDownAt = 0;
    this.closestPosition = null;
    this.eventManager = new EventManager(this);

    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      tree: observable.ref,
      dragging: observable.computed,
      hoverNode: observable.ref,
      selectionNode: observable,
      draggingNode: observable.ref,
      draggingHoverNode: observable.ref,
      closestPosition: observable.ref,
      closestNode: observable.ref,
      mouseEvent: observable.ref,
      onChange: action,
    });
  }

  onChange = _.debounce((msg) => {
    const schema = transformToSchema(this.tree);
    this.engine.onChange?.(schema);
  }, 0);

  setViewport(viewport: Viewport) {
    this.viewport = viewport;
  }

  setTree(tree: TreeNode) {
    this.tree = tree;
  }

  setClosetNode(node: TreeNode) {
    this.closestNode = node;
  }

  setClosestPosition(closestPosition: ClosestPosition) {
    this.closestPosition = closestPosition;
  }

  setClosestNodeRect(rect: DOMRect) {
    this.closestNodeRect = rect;
  }

  setSelectionNode(node: TreeNode) {
    this.selectionNode = node;
  }

  findNodeById(id: string) {
    return this.tree.findNodeById(id);
  }

  setDraggingNodeById(id: string) {
    this.draggingNode = this.findNodeById(id);
  }

  get dragging() {
    return (
      this.cursor.status == CursorStatus.DRAGGING ||
      this.cursor.status == CursorStatus.DRAG_START
    );
  }

  dragStart() {
    this.cursor.setStatus(CursorStatus.DRAG_START);
  }

  /**
   * 拖拽移动
   * @param position
   */
  dragMove(position: ICursorPosition) {
    this.cursor.setPosition(position);
    this.cursor.setStatus(CursorStatus.DRAGGING);
    requestIdle(() => {
      this.setClosetNode(this.calcClosestNode());
      this.setClosestPosition(
        this.calcClosestPosition(
          new Point(position.topClientX, position.topClientY),
        ),
      );
      this.setClosestNodeRect(this.calcClosestNodeRect());
    });
  }

  dragStop() {
    this.cursor.setStatus(CursorStatus.DRAG_STOP);
    this.onMouseDownAt = 0;
    /**
     * 清除拖拽悬浮状态,一定要在requestIdle回调中执行，否则会出行函数据已经刷新，但是页面没渲染的情况，主要还是在使用处结合状态判断
     */
    requestIdle(() => {
      this.cursor.setStatus(CursorStatus.NORMAL);
      this.draggingNode = null;
    });
  }

  /**
   * 清除拖拽悬浮状态
   */
  cleanDraggingHover() {
    this.draggingHoverNode = null;
    this.closestPosition = null;
  }

  setDraggingNode(node: TreeNode) {
    this.draggingNode = node;
  }

  /**
   * 计算最近节点
   */
  calcClosestNode() {
    if (this.draggingHoverNode?.droppable) {
      //当前节点为可拖入节点
      if (_.isEmpty(this.draggingHoverNode.children)) {
        //如果没有子节点，则该节点为最近节点
        return this.draggingHoverNode;
      } else {
        let minDistance = Number.MAX_VALUE;
        let closestElement = null;
        _.forEach(this.draggingHoverNode.children, (node: TreeNode) => {
          const rect = this.viewport.getValidNodeOffsetRect(node);
          const position = this.cursor.position;
          const distance = calcPointToRectDistance(
            new Point(position.topClientX, position.topClientY),
            rect,
          );

          if (distance < minDistance) {
            minDistance = distance;
            closestElement = node;
          }
        });
        return closestElement;
      }
    } else {
      //当前节点不可拖入，则该节点为最近节点
      return this.draggingHoverNode;
    }
  }

  /**
   * 计算鼠标相对于最近节点的位置
   * @param point
   */
  calcClosestPosition(point: IPoint) {
    const closestNode = this.closestNode;
    const closestRect = this.viewport.getValidNodeRect(closestNode);

    if (!closestRect) {
      return;
    }
    const isInline =
      this.viewport.getValidNodeLayout(closestNode) == 'horizontal';
    const isAfter = isNearAfter(point, closestRect, isInline);
    if (isPointInRect(point, closestRect, true)) {
      //点在矩形内
      if (closestNode.droppable) {
        return ClosestPosition.INNER;
      } else {
        if (isInline) {
          return isAfter ? ClosestPosition.AFTER : ClosestPosition.BEFORE;
        } else {
          return isAfter ? ClosestPosition.UNDER : ClosestPosition.UPPER;
        }
      }
    } else if (closestNode === closestNode.root) {
      //最近的是根节点
      return isAfter
        ? ClosestPosition.INNER_AFTER
        : ClosestPosition.INNER_BEFORE;
    } else {
      //点在矩形外
      if (isInline) {
        return isAfter ? ClosestPosition.AFTER : ClosestPosition.BEFORE;
      } else {
        return isAfter ? ClosestPosition.UNDER : ClosestPosition.UPPER;
      }
    }
  }

  /**
   * 计算最近节点的rect
   */
  calcClosestNodeRect() {
    if (!this.closestNode) {
      return;
    }
    return this.viewport.getValidNodeOffsetRect(this.closestNode);
  }
}
