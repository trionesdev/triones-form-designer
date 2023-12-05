import type {TdFC} from "@trionesdev/form-designer-react";
import {Input as FormilyInput} from '@formily/antd-v5'
import React from "react";


export const Input: TdFC<React.ComponentProps<typeof FormilyInput>> = FormilyInput

Input.Resource = [
    {
        name: 'Input',
        title: '输入框',
        componentName:'Field',
        schema: {
            type: 'string',
            title: 'Input',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        }
    },
    {
        name: 'Input.TextArea',
        title: '多行输入框',
        componentName:'Field',
        schema: {
            type: 'string',
            title: 'Input.TextArea',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
        }
    }
]