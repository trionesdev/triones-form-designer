import React, {FC} from "react";
import {PCSimulator} from "../simulator/PCSimulator";

type SimulatorProps = {
    children: React.ReactNode;
}
export const Simulator: FC<SimulatorProps> = ({children}) => {
    return <PCSimulator>{children}</PCSimulator>
}