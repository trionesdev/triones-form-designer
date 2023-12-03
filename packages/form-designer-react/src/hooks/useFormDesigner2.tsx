import {useContext} from "react";
import {FormDesignerContext} from "../FormDesignerContext2";
import {FormDesignerEngine} from "../model/FormDesignerEngine";

export const useFormDesigner2 = ():FormDesignerEngine => {
  return useContext(FormDesignerContext);
}