import React, { FC } from 'react';
import styled from '@emotion/styled';

const PCSimulatorStyled = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  overflow: 'hidden',
});

type PCSimulatorProps = {
  children?: React.ReactNode;
};

export const PCSimulator: FC<PCSimulatorProps> = ({ children }) => {
  return <PCSimulatorStyled>{children}</PCSimulatorStyled>;
};
