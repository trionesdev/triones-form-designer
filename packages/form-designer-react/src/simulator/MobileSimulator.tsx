import styled from '@emotion/styled';
import React, { FC } from 'react';

const MobileSimulatorStyled = styled('div')({
  flex: '1 auto',
  background: '#f5f5f7',
  display: 'flex',
  justifyContent: 'center',
  padding: '30px 0',
  minHeight: '0',
  '.mobile-box': {
    background: '#fff',
    display: 'flex',
    width: '360px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '24px',
    boxShadow: '0 8px 40px 0 rgba(17, 31, 44, 0.12)',
    maxHeight: '640px',
    border: '1px solid rgba(17, 31, 44, 0.08)',
    '&-inner': {
      width: '100%',
      borderRadius: '14px',
      height: 'calc(100% - 20px)',
      padding: '10px',
      // backgroundColor:'#f2f4f5',
      '&-wrapper': {
        border: '1px solid #f2f4f5',
        height: '100%',
        borderRadius: '24px',
      },
    },
  },
});

type MobileSimulatorProps = {
  children?: React.ReactNode;
};

export const MobileSimulator: FC<MobileSimulatorProps> = ({ children }) => {
  return (
    <MobileSimulatorStyled>
      <div className={`mobile-box`}>
        <div className={`mobile-box-inner`}>
          <div className={`mobile-box-inner-wrapper`}>{children}</div>
        </div>
      </div>
    </MobileSimulatorStyled>
  );
};
