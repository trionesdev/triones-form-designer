import { useContext } from 'react';
import { Viewport } from '../model';
import { ViewportContext } from '../context';

export const useViewport = (): Viewport => {
  return useContext(ViewportContext);
};
