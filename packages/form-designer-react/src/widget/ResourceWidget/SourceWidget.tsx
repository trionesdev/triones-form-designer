import { FC } from 'react';
import React from 'react';

import styled from '@emotion/styled';
import { TD_DESIGNER_SOURCE_ID } from '../../constant';
import { GlobalStore } from '../../store';
import { IconWidget } from '../IconWidget';
import { DesignerComponent } from '../../types';

const SourceItemStyled = styled('div')({
  gridColumnStart: 'span 1',
  userSelect: 'none',
  cursor: 'grab',
  padding: '6px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '4px',
  border: '1px solid #f0f0f0',
  backgroundColor: 'white',
  fontSize: '14px',
  '.icon': {
    display: 'inline-block',
    alignItems: 'center',
    lineHeight: '0',
    svg: {
      width: '1.25rem',
      height: '1.25rem',
    },
  },
  '&:hover': {
    backgroundColor: '#f0f0f0',
    color: '#4096ff',
    border: '1px dashed #4096ff',
  },
});

type SourceItemProps = {
  source: DesignerComponent;
  [key: string]: any;
};

export const SourceWidget: FC<SourceItemProps> = ({ source, ...props }) => {
  return (
    <SourceItemStyled {...{ [TD_DESIGNER_SOURCE_ID]: source?.node?.id }}>
      <IconWidget icon={GlobalStore.getIcon(source.icon)} />
      <span>{source.title}</span>
    </SourceItemStyled>
  );
};
