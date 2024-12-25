import {
  DesignerCore,
  TdFC,
  useFormDesigner,
} from '@trionesdev/form-designer-react';
import React from 'react';
import { FormGrid as FormilyGrid } from '@formily/antd-v5';
import createResource = DesignerCore.createResource;

export const FormGrid: TdFC<React.ComponentProps<typeof FormilyGrid>> = ({
  ...props
}) => {
  const { nodeIdAttrName } = useFormDesigner();

  const FormGridComponent = (
    <div>
      <div>洒洒水</div>
      <FormilyGrid {...props} />
    </div>
  );

  return React.createElement(FormGridComponent, {});
};

FormGrid.Resource = createResource([
  {
    name: 'FormGrid',
    icon: 'InputIcon',
    title: '栅格',
    componentName: 'Field',
    droppable: true,
    schema: {
      type: 'void',
      title: '栅格',
      'x-component': 'FormGrid',
    },
  },
]);
