import React from "react";
import {FC} from "react";
import {FormDesignerContext} from "../context";
import {FormDesignerEngine} from "../model/FormDesignerEngine";


type FormDesignerProps = {
    children?: React.ReactNode
    engine?: FormDesignerEngine
}
export const FormDesigner: FC<FormDesignerProps> = ({children, engine}) => {
    let scopeEngine = engine
    if (!scopeEngine) {
        scopeEngine = new FormDesignerEngine({rootComponentName: 'Form'})
    }

    return <FormDesignerContext.Provider value={scopeEngine}>
        {children}
    </FormDesignerContext.Provider>
}