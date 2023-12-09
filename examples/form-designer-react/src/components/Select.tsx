import type {TdFC} from "@trionesdev/form-designer-react";
import React from "react";
import {Select as FormilySelect} from "@formily/antd-v5";

export const Select: TdFC<React.ComponentProps<typeof FormilySelect>> = FormilySelect

Select.Resource = [
    {
        name: 'Select',
        title: '选择',
        componentName:'Field',
        schema: {
            title: '性别',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
        },
        designerProps: {
            propsSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        title: '字段标识',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                    },
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
                }
            }
        }
    }
]