import {DesignerCore, TdFC} from "@trionesdev/form-designer-react";
import React from "react";
import {Select as FormilySelect} from "@formily/antd-v5";
import createResource = DesignerCore.createResource;

export const Select: TdFC<React.ComponentProps<typeof FormilySelect>> = FormilySelect

Select.Resource = createResource([
    {
        name: 'Select',
        icon:'SelectIcon',
        title: '选择框',
        componentName: 'Field',
        schema: {
            title: '选择',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
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