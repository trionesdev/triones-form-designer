import React from 'react';
import { FC } from 'react';
import styled from '@emotion/styled';

type CompositePanelProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const CompositePanelStyled = styled('div')({
  flexShrink: 0,
  borderRight: '1px solid #d9d9d9',
  backgroundColor: 'white',
});

export const CompositePanel: FC<CompositePanelProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <CompositePanelStyled className={className} style={style}>
      {children}
    </CompositePanelStyled>
  );
};
