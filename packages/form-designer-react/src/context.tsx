import {createContext} from "react";
import {TreeNode} from "./model/TreeNode";
import {FormDesignerEngine} from "./model/FormDesignerEngine";

export const FormDesignerContext = createContext<FormDesignerEngine>(null)

export const TreeNodeContext = createContext<TreeNode>(null)
