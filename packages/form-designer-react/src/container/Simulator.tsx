import React, { FC } from 'react';
import { MobileSimulator, PCSimulator } from '../simulator';
import { observer } from '@formily/react';
import { requestIdle } from '../request-idle';
import { useFormDesigner } from '../hooks';

type SimulatorProps = {
  children: React.ReactNode;
};
export const Simulator: FC<SimulatorProps> = observer(
  ({ children }) => {
    const { type } = useFormDesigner();
    if (type == 'PC') {
      return <PCSimulator>{children}</PCSimulator>;
    } else if (type == 'MOBILE') {
      return <MobileSimulator>{children}</MobileSimulator>;
    }
  },
  {
    scheduler: requestIdle,
  },
);
