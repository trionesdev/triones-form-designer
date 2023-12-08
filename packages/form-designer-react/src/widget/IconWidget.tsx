import React, {FC} from "react";

type IconWidgetProps = {
    icon?: React.JSX.Element;
}
export const IconWidget: FC<IconWidgetProps> = ({icon}) => {
    console.log("icon",icon)
    return <>{icon && <span className={`icon`}>{React.cloneElement(icon)}</span>}</>
}