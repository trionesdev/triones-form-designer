import React from "react";
import {FC} from "react";
import {FormDesignerContext} from "./FormDesignerContext2";
import {FormDesignerEngine} from "./model/FormDesignerEngine";


type FormDesignerProps = {
    children?: React.ReactNode
}
export const FormDesigner: FC<FormDesignerProps> = ({children}) => {
    const engine = new FormDesignerEngine({rootComponentName: 'Form'})
    return <FormDesignerContext.Provider value={engine}>
        {children}
    </FormDesignerContext.Provider>
}