import {useContext} from "react";
import {FormDesignerEngine} from "../model/FormDesignerEngine";
import {FormDesignerContext} from "../context";

export const useFormDesigner = ():FormDesignerEngine => {
  return useContext(FormDesignerContext);
}