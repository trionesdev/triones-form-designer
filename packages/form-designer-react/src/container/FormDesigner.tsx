import React, {useEffect} from "react";
import {FC} from "react";
import {FormDesignerContext} from "../context";
import {FormDesignerEngine} from "../model";
import {GhostWidget} from "../widget/GhostWidget";
import {transformToTreeNode} from "../coordinate";


type FormDesignerProps = {
    children?: React.ReactNode
    engine?: FormDesignerEngine
    value?: any
    onChange?: (value: any) => void
}
export const FormDesigner: FC<FormDesignerProps> = ({children, engine, value, onChange}) => {
    let scopeEngine = engine
    if (!scopeEngine) {
        scopeEngine = new FormDesignerEngine({rootComponentName: 'Form'})
    }
    scopeEngine?.setOnchange(onChange)

    useEffect(() => {
        if (value) {
            const tree = scopeEngine.operation?.tree.from(transformToTreeNode(value))
        }
    }, [value])


    return <FormDesignerContext.Provider value={scopeEngine}>
        {children}
        <GhostWidget/>
    </FormDesignerContext.Provider>
}