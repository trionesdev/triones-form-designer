import { DesignerCore, TdFC } from '@trionesdev/form-designer-react';
import React from 'react';
import { DatePicker as FormilyDatePicker } from '@formily/antd-v5';
import createResource = DesignerCore.createResource;

export const DatePicker: TdFC<React.ComponentProps<typeof FormilyDatePicker>> =
  FormilyDatePicker;

DatePicker.Resource = createResource([
  {
    name: 'DatePicker',
    icon: 'DatePickerIcon',
    title: '日期选择',
    componentName: 'Field',
    schema: {
      type: 'string',
      title: '日期选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
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
  {
    name: 'DatePicker.RangePicker',
    icon: 'RangePickerIcon',
    title: '日期区间',
    componentName: 'Field',
    schema: {
      type: 'string',
      title: '日期区间',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
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
]);
