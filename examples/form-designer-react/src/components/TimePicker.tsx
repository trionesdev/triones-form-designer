import { DesignerCore, TdFC } from '@trionesdev/form-designer-react';
import React from 'react';
import { TimePicker as FormilyTimePicker } from '@formily/antd-v5';
import createResource = DesignerCore.createResource;

export const TimePicker: TdFC<React.ComponentProps<typeof FormilyTimePicker>> =
  FormilyTimePicker;

TimePicker.Resource=createResource([
  {
    name: 'TimePicker',
    icon: 'TimePickerIcon',
    title: '时间选择',
    componentName: 'Field',
    schema: {
      type: 'string',
      title: '时间选择',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      required: true,
    },
    designerProps: {
      propsSchema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            title: '标题',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          required: {
            type: 'string',
            title: '是否必填',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
    },
  },
])