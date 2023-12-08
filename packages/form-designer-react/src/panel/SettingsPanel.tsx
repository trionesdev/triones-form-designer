import React, {useMemo} from "react"
import {useOperation} from "../hooks/useOperation";
import styled from "@emotion/styled";
import {createForm} from "@formily/core";
import {createSchemaField, FormProvider, observer} from "@formily/react";
import {JSXComponent} from "@formily/react/esm/types";

const SettingsPanelStyled = styled('div')({
    minWidth: '300px'
})

type SettingsPanelProps = {
    className?: string,
    components?: Record<string, JSXComponent>
    /**
     * form 组件属性
     */
    formProps?: Omit<any, 'form'>
}

const SchemaField = createSchemaField({
    components: {},
})

export const SettingsPanel: React.FC<SettingsPanelProps> = observer(({
                                                                         className,
                                                                         components,
                                                                         formProps
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

    /**
     * 如果有Form组件，则使用Form组件包裹，如果没有则使用FormProvider包裹
     * @param children
     */
    const formRender = (children: React.ReactNode) => {
        const formComp = components['Form']
        if (formComp) {
            return React.createElement(formComp, {form, ...formProps}, children)
        } else {
            return React.createElement(FormProvider, {form}, children)
        }
    }

    return <SettingsPanelStyled className={className}>
        {formRender(<SchemaField components={components} schema={selectionNode?.designerProps}/>)}
    </SettingsPanelStyled>
})