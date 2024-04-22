import React, { FC } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import _ from 'lodash';

type Span = 0 | 2 | 3 | 4 | 6 | 8 | 12;

const ColStyled = styled('div')<{ span: Span }>((props) => {
  const width = props.span ? `${100 / (24 / props.span)}%` : '100%';
  return {
    flex: `0 0 ${width}`,
    maxWidth: `${width}`,
    boxSizing: 'border-box',
  };
});

type ColProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  span?: Span;
};

export const Col: FC<ColProps> = ({ children, className, style, span }) => {
  return (
    <ColStyled
      className={classnames(className, `td-col`, `td-col-${span}`)}
      style={style}
      span={span}
    >
      <div>{children}</div>
    </ColStyled>
  );
};
