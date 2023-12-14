import {DesignerCore, TdFC} from "@trionesdev/form-designer-react";
import {Password as FormilyPassword} from '@formily/antd-v5'
import createResource = DesignerCore.createResource;
import React from "react";

export const Password: TdFC<React.ComponentProps<typeof FormilyPassword>> =
    FormilyPassword

Password.Resource = createResource([
    {
        name: 'Password',
        icon: 'PasswordIcon',
        title: '密码输入',
        componentName: 'Field',
        schema: {
            title: '密码输入',
            'x-decorator': 'FormItem',
            'x-component': 'Password',
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