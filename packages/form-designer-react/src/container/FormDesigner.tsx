import React from "react";
import {FC} from "react";
import {FormDesignerContext} from "../context";
import {FormDesignerEngine} from "../model";
import {GhostWidget} from "../widget/GhostWidget";


type FormDesignerProps = {
    children?: React.ReactNode
    engine?: FormDesignerEngine
    value?: any
    onChange?: (value: any) => void
}
export const FormDesigner: FC<FormDesignerProps> = ({children, engine,onChange}) => {
    let scopeEngine = engine
    if (!scopeEngine) {
        scopeEngine = new FormDesignerEngine({rootComponentName: 'Form'})
    }
    scopeEngine?.setOnchange(onChange)

    return <FormDesignerContext.Provider value={scopeEngine}>
        {children}
        <GhostWidget/>
    </FormDesignerContext.Provider>
}