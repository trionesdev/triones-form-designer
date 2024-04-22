import { Operation } from '../model';

export namespace ViewportEffect {
  export const viewportResizeEffect = (e, operation: Operation) => {
    operation.viewport.digestViewport();
  };

  export const viewportScrollEffect = (e, operation: Operation) => {
    operation.viewport.digestViewport();
  };
}
