import React from "react";

export type IResource = {
    name?: string
    icon?: string
    [key:string]:any
}

export type DesignerComponent = IResource

export type IComponents = {
    [key:string]: TdFC<any>
}

export type TdFC<P = {}> = React.FC<P> & {
    Resource?: IResource[]
}