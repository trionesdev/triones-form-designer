import { TreeNode } from '../model';
import { useViewport } from './useViewport';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutObserver } from '../layout-observer';

export const useValidNodeOffsetRect = (node: TreeNode) => {
  const viewport = useViewport();
  const [, forceUpdate] = useState(null);
  const rectRef = useMemo(
    () => ({ current: viewport.getValidNodeOffsetRect(node) }),
    [viewport],
  );

  const element = viewport.findElementById(node?.id);
  const compute = useCallback(() => {
    const nextRect = viewport.getValidNodeOffsetRect(node);
    if (nextRect) {
      rectRef.current = nextRect;
      forceUpdate([]);
    }
  }, [viewport, node]);

  useEffect(() => {
    const layoutObserver = new LayoutObserver(compute);
    if (element) layoutObserver.observe(element);
    return () => {
      layoutObserver.disconnect();
    };
  }, [node, viewport, element]);
  return rectRef.current;
};
