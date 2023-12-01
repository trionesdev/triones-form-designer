import {FormDesignerContext} from "./FormDesignerContext";
import React, {FC} from "react";

type FormDesignerProviderProps = {
    children?: React.ReactNode
}

export const FormDesignerProvider: FC<FormDesignerProviderProps> = ({children}) => {
    return <FormDesignerContext.Provider value={{}}>{children}</FormDesignerContext.Provider>
}