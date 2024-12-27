import { define, observable } from '@formily/reactive';
import { TD_DESIGNER_NODE_ID, TD_DESIGNER_SOURCE_ID } from '../constant';
import { Operation } from './Operation';
import { Workbench } from './Workbench';
import { ITreeNode } from './TreeNode';

export type DesignerType = 'MOBILE' | 'PC';

interface IFormDesignerEngine {
  rootComponentName?: string;
  /**
   * nodeId属性名称 ，必须data-开头 否则很可能不识别
   */
  nodeIdAttrName?: string;
  sourceIdAttrName?: string;
  type?: DesignerType;
  value?: any;
  onChange?: (value: any) => void;
  onItemDelete?: (item: ITreeNode) => void;
  beforeItemDelete?: (item: ITreeNode) => boolean;
}

export class FormDesignerEngine {
  rootComponentName: string;
  nodeIdAttrName?: string;
  sourceIdAttrName?: string;
  operation?: Operation;
  type?: DesignerType;
  workbench?: Workbench;
  onChange?: (value: any) => void;
  onItemDelete?: (item: ITreeNode) => void;
  beforeItemDelete?: (item: ITreeNode) => boolean;

  constructor(args: IFormDesignerEngine) {
    this.rootComponentName = args.rootComponentName || 'Form';
    this.nodeIdAttrName = args.nodeIdAttrName || TD_DESIGNER_NODE_ID;
    this.sourceIdAttrName = args.sourceIdAttrName || TD_DESIGNER_SOURCE_ID;
    this.type = args.type || 'PC';
    this.workbench = new Workbench(this);
    this.operation = new Operation({
      engine: this,
      value: args.value,
    });
    this.onChange = args.onChange;
    this.onItemDelete = args.onItemDelete;
    this.beforeItemDelete = args.beforeItemDelete;

    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      nodeIdAttrName: observable.ref,
      sourceIdAttrName: observable.ref,
      type: observable.ref,
    });
  }

  setDesignerType(type: DesignerType) {
    this.type = type;
  }

  // setOnchange(fn: (value: any) => void) {
  //   this.onChange = fn;
  // }
}
