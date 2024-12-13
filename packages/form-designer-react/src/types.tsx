import React from 'react';
import { TreeNode } from './model';
import { ISchema } from '@formily/react';

export type IResource = {
  name?: string;
  icon?: string;
  schema?: ISchema;
  designerProps?: {
    propsSchema?: ISchema;
    defaultProps?: any;
  };
  node?: TreeNode;
  [key: string]: any;
};

export type DesignerComponent = IResource & { node?: TreeNode };

export type IComponents = {
  [key: string]: TdFC<any>;
};

export type TdFC<P = {}> = React.FC<P> & {
  Resource?: IResource[];
};

export interface IDesignerComponents {
  [key: string]: TdFC<any>;
}

export type WorkbenchType =
  | 'DESIGNABLE'
  | 'PREVIEW'
  | 'JSONTREE'
  | 'MARKUP'
  | (string & {});
