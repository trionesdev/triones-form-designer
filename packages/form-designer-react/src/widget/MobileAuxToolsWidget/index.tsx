import styled from '@emotion/styled';
import React from 'react';
import { Insertion } from './Insertion';
import { Selection } from './Selection';

const MobileAuxToolsWidgetStyled = styled('div')({
  transform: 'perspective(1px) translate3d(0, 0, 0)',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  zIndex: 10,
});

export const MobileAuxToolsWidget = () => {
  return (
    <MobileAuxToolsWidgetStyled className={`mobile-aux-tools`}>
      <Insertion />
      <Selection />
    </MobileAuxToolsWidgetStyled>
  );
};
