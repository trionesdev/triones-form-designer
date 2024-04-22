import { useContext } from 'react';
import { DesignerComponentsContext } from '../context';
import { IDesignerComponents } from '../types';

export const useComponents = (): IDesignerComponents => {
  return useContext(DesignerComponentsContext);
};
