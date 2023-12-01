import React from "react";
import {FC} from "react";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {FormDesignerProvider} from "./FormDesignerProvider";

type FormDesignerProps = {
    children?: React.ReactNode
}
export const FormDesigner: FC<FormDesignerProps> = ({children}) => {
    return <FormDesignerProvider>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </FormDesignerProvider>
}