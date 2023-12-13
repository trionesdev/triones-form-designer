import React, {FC} from "react";
import {PCSimulator} from "../simulator";
import {observer} from "@formily/react";
import {requestIdle} from "../request-idle";

type SimulatorProps = {
    children: React.ReactNode;
}
export const Simulator: FC<SimulatorProps> = observer(({children}) => {
    return <PCSimulator>{children}</PCSimulator>
}, {
    scheduler: requestIdle
})