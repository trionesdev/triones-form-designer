import {
  DesignerCore,
  TdFC,
  useFormDesigner,
  useTree,
} from '@trionesdev/form-designer-react';
import React from 'react';
import { FormGrid as FormilyGrid } from '@formily/antd-v5';
import _ from 'lodash';
import createResource = DesignerCore.createResource;

export const FormGrid: TdFC<React.ComponentProps<typeof FormilyGrid>> = ({
  ...props
}) => {
  const { nodeIdAttrName } = useFormDesigner();
  const tree = useTree().findNodeById(props[nodeIdAttrName]);
  const rootProps = {
    [nodeIdAttrName]: props[nodeIdAttrName],
  };

  return (
    <div {...rootProps} style={{ minHeight: 50 }}>
      {_.isEmpty(props.children) ? (
        <div
          style={{
            minHeight: 50,
            backgroundColor: '#bfbfbf',
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 10 }}>{tree?.title}</div>
          <div style={{ textAlign: 'center' }}>组件拖入此处</div>
        </div>
      ) : (
        <FormilyGrid
          {..._.omit(props, nodeIdAttrName)}
          minColumns={2}
          maxColumns={2}
        >
          {props.children}
        </FormilyGrid>
      )}
    </div>
  );
};

FormGrid.Resource = createResource([
  {
    name: 'FormGrid',
    icon: 'FormGridIcon',
    title: '栅格',
    componentName: 'FormGrid',
    droppable: true,
    schema: {
      type: 'void',
      title: '栅格',
      'x-component': 'FormGrid',
    },
  },
]);
