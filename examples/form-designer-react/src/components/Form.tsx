import {DesignerCore, TdFC} from "@trionesdev/form-designer-react";
import React, {useMemo} from "react";
import {Form as FormilyForm} from "@formily/antd-v5";
import {createForm} from "@formily/core";
import createResource = DesignerCore.createResource;

export const Form: TdFC<React.ComponentProps<typeof FormilyForm>> = (props) => {
    const form = useMemo(
        () =>
            createForm({
                designable: true,
            }),
        []
    )

    return <FormilyForm form={form} labelCol={6} wrapperCol={14} {...props}>{props?.children}</FormilyForm>
}

Form.Resource = createResource([
    {
        name: 'Form',
        title: '表单',
        droppable: true,
        schema: {
            title: '表单',
            'x-component': 'Form',
        }
    }
])
