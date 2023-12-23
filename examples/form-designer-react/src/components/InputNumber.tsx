import {NumberPicker as FormilyInputNumber} from "@formily/antd-v5"
import {DesignerCore, TdFC} from "@trionesdev/form-designer-react";
import React from "react";
import createResource = DesignerCore.createResource;
export const InputNumber:TdFC<React.ComponentProps<typeof FormilyInputNumber>> = FormilyInputNumber

InputNumber.Resource = createResource([
    {
        name: 'InputNumber',
        icon: 'InputNumberIcon',
        title: '数字输入',
        componentName: 'Field',
        schema: {
            title: '数字输入',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
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
                }
            }
        }
    }
])