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
        }
    }
]