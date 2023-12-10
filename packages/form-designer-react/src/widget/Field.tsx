import React from "react";
import {Field as FormilyField, ISchema, ObjectField, observer} from "@formily/react"
import {FormItem, Input} from "@formily/antd-v5";
import {useFormDesigner} from "../hooks";
import {IComponents, TdFC} from "../types";
import _ from "lodash";
import {toJS} from "@formily/reactive";
import {useComponents} from "../hooks";

const SchemaStateMap = {
    title: 'title',
    description: 'description',
    default: 'value',
    enum: 'dataSource',
    readOnly: 'readOnly',
    writeOnly: 'editable',
    required: 'required',
    'x-content': 'content',
    'x-value': 'value',
    'x-editable': 'editable',
    'x-disabled': 'disabled',
    'x-read-pretty': 'readPretty',
    'x-read-only': 'readOnly',
    'x-visible': 'visible',
    'x-hidden': 'hidden',
    'x-display': 'display',
    'x-pattern': 'pattern',
}

type ToFieldProps = {
    id: string,
    nodeIdAttrName: string,
    components: IComponents,
    schema?: ISchema
}

const toFieldProps = ({
                          id,
                          nodeIdAttrName,
                          components,
                          schema
                      }: ToFieldProps) => {
    const results: { [key: string]: any } = {}
    if (!components['FormItem']) {
        components['FormItem'] = FormItem
    }
    _.each(SchemaStateMap, (fieldKey, schemaKey) => {
        const value = _.get(schema, schemaKey)
        if (value) {
            results[fieldKey] = value
        }
    })

    const decorator = _.get(schema, 'x-decorator') && _.get(components, schema['x-decorator'])
    const component = _.get(schema, 'x-component') && _.get(components, schema['x-component'])
    const decoratorProps = _.get(schema, 'x-decorator-props', {}) || {}
    const componentProps = _.get(schema, 'x-component-props', {}) || {}
    if (decorator) {
        results.decorator = [decorator, toJS(decoratorProps)]
    }
    if (component) {
        results.component = [component, toJS(componentProps)]
    }
    if (decorator) {
        _.set(results['decorator'][1], nodeIdAttrName, id)
    } else if (component) {
        _.set(results['component'][1], nodeIdAttrName, id)
    }
    results.title = results.title && (
        <span data-content-editable="title">{results.title}</span>
    )
    results.description = results.description && (
        <span data-content-editable="description">{results.description}</span>
    )
    return results
}

type FieldProps = {
    schema?: ISchema,
    [key: string]: any
}
export const Field: TdFC<FieldProps> = observer((props) => {
    const {nodeIdAttrName} = useFormDesigner()
    const components = useComponents()

    const fieldProps = toFieldProps({
        id: _.get(props, nodeIdAttrName),
        nodeIdAttrName,
        components,
        schema: props.schema
    })

    return <FormilyField {...fieldProps} name={_.get(props, nodeIdAttrName)}/>
})
Field.Resource = [{}]