import { createContext } from 'react';
import { FormDesignerEngine, TreeNode, Viewport } from './model';
import { IDesignerComponents } from './types';

export const FormDesignerContext = createContext<FormDesignerEngine>(null);

export const TreeNodeContext = createContext<TreeNode>(null);

export const DesignerComponentsContext = createContext<IDesignerComponents>({});

export const ViewportContext = createContext<Viewport>(null);
