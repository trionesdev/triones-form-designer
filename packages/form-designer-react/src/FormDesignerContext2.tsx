import {createContext} from "react";
import {FormDesignerEngine} from "./model/FormDesignerEngine";

export const FormDesignerContext = createContext<FormDesignerEngine>(null)