import {useContext} from "react";
import {FormDesignerContext} from "../FormDesignerContext";

export const useFormDesigner = () => {
  return useContext(FormDesignerContext);
}