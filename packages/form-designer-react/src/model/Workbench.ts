import { WorkbenchType } from '../types';
import { FormDesignerEngine } from './FormDesignerEngine';
import { define, observable } from '@formily/reactive';

export class Workbench {
  engine: FormDesignerEngine;
  type: WorkbenchType = 'DESIGNABLE';

  constructor(engine: FormDesignerEngine) {
    this.engine = engine;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      type: observable.ref,
    });
  }
}
