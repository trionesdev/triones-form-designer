import {TdFC} from "@trionesdev/form-designer-react";
import React, {useMemo} from "react";
import {Form as FormilyForm} from "@formily/antd-v5";
import {createForm} from "@formily/core";

export const Form: TdFC<React.ComponentProps<typeof FormilyForm>> = (props) => {
    const form = useMemo(
        () =>
            createForm({
                designable: true,
            }),
        []
    )

    return <FormilyForm form={form}>{props?.children}</FormilyForm>
}

Form.Resource = [
    {
        name: 'Form',
        title: '表单',
    }
]
