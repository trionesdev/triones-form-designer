import React, { FC } from 'react';
import { observer } from '@formily/react';
import { TreeNode } from '../../model';
import { useFormDesigner } from '../../hooks';
import { TreeNodeContext } from '../../context';
import { useComponents } from '../../hooks';

type ComponentWidgetProps = {
  treeNode: TreeNode;
};
export const TreeNodeWidget: FC<ComponentWidgetProps> = observer(
  ({ treeNode }) => {
    const { nodeIdAttrName } = useFormDesigner();
    const components = useComponents();

    const handleRender = () => {
      const Component = components?.[treeNode.componentName];

      const renderChildren = () => {
        if (treeNode.children.length > 0) {
          return treeNode.children.map((item, index) => {
            return <TreeNodeWidget key={index} treeNode={item} />;
          });
        } else {
          return [];
        }
      };
      const renderProps = () => {
        return {
          key: treeNode.id,
          [nodeIdAttrName]: treeNode.id,
          schema: treeNode.schema,
        };
      };

      if (Component) {
        return React.createElement(
          Component,
          renderProps(),
          ...renderChildren(),
        );
      } else {
        if (treeNode.children.length > 0) {
          return <>{renderChildren()}</>;
        }
      }
    };

    return (
      <TreeNodeContext.Provider value={treeNode}>
        {handleRender()}
      </TreeNodeContext.Provider>
    );
  },
);
