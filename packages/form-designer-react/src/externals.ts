import { IResource } from './types';
import { TreeNode } from './model';
import _ from 'lodash';

export namespace DesignerCore {
  /**
   * 创建资源对象
   * @param resources
   */
  export const createResource = (resources: IResource[]): IResource[] => {
    return _.reduce(
      resources,
      (result: any, source: any) => {
        return _.concat(result, source);
      },
      [],
    ).map((item: any) =>
      _.assign(item, {
        node: new TreeNode({
          isSourceNode: true,
          componentName: item.componentName,
          schema: item.schema,
        }),
      }),
    );
  };
}
