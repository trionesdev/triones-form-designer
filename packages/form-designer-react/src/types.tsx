import React from "react";

export type IDesignerProps = {
    name?: string
    icon?: string
    [key:string]:any
}

export type DesignerComponent = IDesignerProps

export type TdFC<P = {}> = React.FC<P> & {
    DesignerProps?: IDesignerProps[]
}