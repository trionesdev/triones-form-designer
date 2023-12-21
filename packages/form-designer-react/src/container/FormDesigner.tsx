import React, {useEffect, useMemo, useState} from "react";
import {FC} from "react";
import {FormDesignerContext} from "../context";
import {FormDesignerEngine} from "../model";
import {GhostWidget} from "../widget/GhostWidget";
import {transformToTreeNode} from "../coordinate";
import _ from "lodash";
import {ISchema} from "@formily/react";


type FormDesignerProps = {
    children?: React.ReactNode
    engine?: FormDesignerEngine
    value?: ISchema
    onChange?: (value: ISchema) => void
}
export const FormDesigner: FC<FormDesignerProps> = ({children, engine, value, onChange}) => {
    const [scopeValue, setScopeValue] = useState(value)
    let designerEngine = useMemo(() => {
        let scopeEngine = engine
        if (!scopeEngine) {
            scopeEngine = new FormDesignerEngine({rootComponentName: 'Form', value})
        }
        return scopeEngine
    }, [engine])


    designerEngine?.setOnchange((value: any) => {
        setScopeValue(value)
        onChange?.(value)
    })

    useEffect(() => {
        if (value && !_.isEqual(value, scopeValue)) {
            designerEngine.operation?.tree.from(transformToTreeNode(value))
        }
    }, [value])


    return <FormDesignerContext.Provider value={designerEngine}>
        {children}
        <GhostWidget/>
    </FormDesignerContext.Provider>
}