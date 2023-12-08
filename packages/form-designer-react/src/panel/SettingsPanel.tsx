import React, {useMemo} from "react"
import {useOperation} from "../hooks/useOperation";
import styled from "@emotion/styled";
import {createForm} from "@formily/core";
import {createSchemaField, FormProvider, observer} from "@formily/react";
import {FormItem, Input} from "@formily/antd-v5";

const SettingsPanelStyled = styled('div')({
    minWidth: '300px'
})

type SettingsPanelProps = {
    className?: string
}

const SchemaField = createSchemaField({
    components: {
        Input,
        FormItem,
    },
})


export const SettingsPanel: React.FC<SettingsPanelProps> = observer(({
                                                                         className
                                                                     }) => {
    const operation = useOperation()
    const {selectionNode} = operation

    const form = useMemo(() => {
        return createForm({
            initialValues: selectionNode?.designerProps?.defaultProps,
            values: selectionNode?.schema,
            effects(form) {

            }
        })
    }, [selectionNode, selectionNode?.id])
    debugger
    return <SettingsPanelStyled className={className}>
        <FormProvider form={form}>
            <SchemaField schema={selectionNode?.designerProps}/>
        </FormProvider>
    </SettingsPanelStyled>
})