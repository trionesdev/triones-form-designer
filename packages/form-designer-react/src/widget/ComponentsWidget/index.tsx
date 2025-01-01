import React, { FC, useEffect } from 'react';
import { TreeNodeWidget } from './TreeNodeWidget';
import { observer } from '@formily/react';
import { IComponents } from '../../types';
import { useFormDesigner, useTree } from '../../hooks';
import { GlobalStore } from '../../store';
import { DesignerComponentsContext } from '../../context';
import styled from '@emotion/styled';

const ComponentsWidgetStyled = styled('div')({
  minWidth: '100%',
  minHeight: '100%',
  '.ant-formily-item-label,.ant-formily-item-control': {
    userSelect: 'none',
    pointerEvents: 'none',
  },
});

type ComponentsWidgetProps = {
  children?: React.ReactNode;
  components?: IComponents;
};
export const ComponentsWidget: FC<ComponentsWidgetProps> = observer(
  ({ children, components }) => {
    const { nodeIdAttrName } = useFormDesigner();
    const tree = useTree();

    const dataId = {};
    if (tree) {
      dataId[nodeIdAttrName] = tree.id;
    }

    useEffect(() => {
      GlobalStore.registerDesignerResources(components);
    }, []);

    return (
      <>
        <DesignerComponentsContext.Provider value={components}>
          <ComponentsWidgetStyled {...dataId}>
            <TreeNodeWidget treeNode={tree} />
          </ComponentsWidgetStyled>
        </DesignerComponentsContext.Provider>
      </>
    );
  },
);
