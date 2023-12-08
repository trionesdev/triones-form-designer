import React, {FC} from "react"

type PCSimulatorProps = {
    children?: React.ReactNode
}
export const PCSimulator: FC<PCSimulatorProps> = ({
                                                      children
                                                  }) => {
    return <>{children}</>
}