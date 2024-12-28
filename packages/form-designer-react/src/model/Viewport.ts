import { action, define, observable } from '@formily/reactive';
import { FormDesignerEngine } from './FormDesignerEngine';
import { TreeNode } from './TreeNode';
import _ from 'lodash';

interface IViewport {
  engine: FormDesignerEngine;
  viewportElement: HTMLElement;
}

export interface IViewportData {
  scrollX?: number;
  scrollY?: number;
  width?: number;
  height?: number;
}

export class Viewport {
  engine: FormDesignerEngine;
  viewportElement: HTMLElement;
  scrollX = 0;
  scrollY = 0;
  width = 0;
  height = 0;

  constructor(args: IViewport) {
    this.engine = args.engine;
    this.viewportElement = args.viewportElement;
    this.digestViewport();
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      viewportElement: observable.ref,
      scrollX: observable.ref,
      scrollY: observable.ref,
      width: observable.ref,
      height: observable.ref,
      digestViewport: action,
    });
  }

  onMoment(element: HTMLElement) {
    this.viewportElement = element;
    this.engine.operation.setViewport(this);
  }

  onUnmount() {
    this.engine.operation.setViewport(null);
  }

  get rect() {
    const viewportElement = this.viewportElement;
    if (viewportElement) return viewportElement.getBoundingClientRect();
  }

  get innerRect() {
    const rect = this.rect;
    return new DOMRect(0, 0, rect?.width, rect?.height);
  }

  findElementById(id: string) {
    if (!id) {
      return null;
    }
    return this.viewportElement?.querySelector(
      `[${this.engine.nodeIdAttrName}="${id}"]`,
    );
  }

  getValidNodeRect(node: TreeNode) {
    if (!node) return;
    const rect = this.getElementRectById(node.id);
    return rect;
  }

  getElementRectById(id: string) {
    return this.findElementById(id)?.getBoundingClientRect();
  }

  getElementOffsetRectById(nodeId: string) {
    if (!nodeId) {
      return null;
    }
    const nodeHtml = this.findElementById(nodeId);
    if (!nodeHtml) {
      return null;
    }
    const viewportRect = this.viewportElement.getBoundingClientRect();
    const nodeRect = nodeHtml.getBoundingClientRect();

    if (this.isInPosition(nodeRect)) {
      return new DOMRect(
        nodeRect.left - viewportRect.left + this.viewportElement.scrollLeft,
        nodeRect.top - viewportRect.top + this.viewportElement.scrollTop,
        nodeRect.width,
        nodeRect.height,
      );
    } else {
      return new DOMRect(
        nodeRect.left - viewportRect.left + this.viewportElement.scrollLeft,
        nodeRect.top - viewportRect.top + this.viewportElement.scrollTop,
        nodeRect.width,
        nodeRect.height,
      );
    }
  }

  isInPosition(rect: DOMRect) {
    const viewportRect = this.viewportElement.getBoundingClientRect();
    return (
      rect.left >= viewportRect.left &&
      rect.top >= viewportRect.top &&
      rect.right <= viewportRect.right &&
      rect.bottom <= viewportRect.bottom
    );
  }

  /**
   * 计算节点在视口中的位置
   * @param node
   */
  getValidNodeOffsetRect(node: TreeNode) {
    if (!node) {
      return;
    }
    const rect = this.getElementOffsetRectById(node.id);
    return rect;
  }

  /**
   * 计算视口
   */
  digestViewport() {
    if (this.viewportElement) {
      const data: IViewportData = {
        scrollX: this.viewportElement.scrollLeft,
        scrollY: this.viewportElement.scrollTop,
        width: this.viewportElement.clientWidth,
        height: this.viewportElement.clientHeight,
      };
      _.assign(this, data);
    }
  }

  getValidNodeLayout(node: TreeNode) {
    if (!node) {
      return 'vertical';
    }
    //TODO 根据组件类型获取布局
    if (!node.parent) {
      //最近节点是根节点
      return 'vertical';
    } else if (node.parent.id == node.root.id) {
      //最近节点是一级节点
      return 'vertical';
    } else {
      if (node.parent.droppable) {
        return 'horizontal';
      } else {
        return 'vertical';
      }
    }

    // return 'vertical';
  }
}
