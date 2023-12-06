import React from "react";
import {FC} from "react";
import {Field as FormilyField, ISchema, ObjectField} from "@formily/react"
import {FormItem, Input} from "@formily/antd-v5";
import {useFormDesigner} from "../hooks/useFormDesigner";
import {IComponents} from "../types";

const propsGenerate = ({
                           nodeIdAttrName,
                           components
                       },
                       {
                           nodeIdAttrName: string,
                           components: IComponents
                       }) => {
    return {}
}

type FieldProps = {

    schema?: ISchema,
    [key: string]: any
}
export const Field: FC<FieldProps> = (props) => {
    const {nodeIdAttrName, components} = useFormDesigner()

    const props1 = {
        "decorator": [FormItem, {[nodeIdAttrName]: props[nodeIdAttrName]}],
        "component": [Input]
    }


    return <FormilyField {...props1} title={'gggg'} name={`ss`}/>
    // return  <div sss={`ddd`}>jjjjj</div>
}