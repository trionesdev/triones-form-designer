import type {TdFC} from "@trionesdev/form-designer-react";
import {Input as FormilyInput} from '@formily/antd-v5'
import React from "react";


export const Input: TdFC<React.ComponentProps<typeof FormilyInput>> = FormilyInput

Input.Resource = [
    {
        name: 'Input',
        icon: 'InputIcon',
        title: '输入框',
        componentName: 'Field',
        schema: {
            type: 'string',
            title: '输入框',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            required: true,
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
    },
    {
        name: 'Input.TextArea',
        icon: 'InputIcon',
        title: '多行输入框',
        componentName: 'Field',
        schema: {
            type: 'string',
            title: '文本框',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea'
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
                }
            }
        }
    }
]