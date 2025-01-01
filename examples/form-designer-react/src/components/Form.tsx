import {
  DesignerCore,
  TdFC,
  useFormDesigner,
} from '@trionesdev/form-designer-react';
import React, { useMemo } from 'react';
import { Form as FormilyForm } from '@formily/antd-v5';
import { createForm } from '@formily/core';
import createResource = DesignerCore.createResource;
import { ISchema } from '@formily/react';

type FormProps = React.ComponentProps<typeof FormilyForm> & {
  schema?: ISchema;
};

export const Form: TdFC<FormProps> = (props) => {
  const { nodeIdAttrName } = useFormDesigner();
  const form = useMemo(
    () =>
      createForm({
        designable: true,
      }),
    [],
  );

  const formProps = {
    ...props?.schema?.['x-component-props'],
    [nodeIdAttrName]: props[nodeIdAttrName],
  };

  return (
    <FormilyForm {...formProps} form={form}>
      {props?.children}
    </FormilyForm>
  );
};

Form.Resource = createResource([
  {
    name: 'Form',
    title: '表单',
    droppable: true,
    schema: {
      type: 'object',
      title: '表单',
      'x-component': 'Form',
      'x-component-props': {
        labelWidth: 100,
      },
    },
    designerProps: {
      propsSchema: {
        type: 'object',
        properties: {
          'x-component-props.layout': {
            type: 'string',
            title: '布局',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [
              { label: 'Horizontal', value: 'horizontal' },
              { label: 'Vertical', value: 'vertical' },
            ],
          },
          'x-component-props.labelWidth': {
            type: 'number',
            title: '标签宽度',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              min: 0,
            },
          },
          'x-component-props.labelCol': {
            type: 'number',
            title: '标签占比',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              min: 1,
              max: 24,
            },
          },
        },
      },
    },
  },
]);
