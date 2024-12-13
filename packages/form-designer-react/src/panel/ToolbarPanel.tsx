import React, { FC } from 'react';

type ToolbarPanelProps = {
  children?: React.ReactNode;
};
export const ToolbarPanel: FC<ToolbarPanelProps> = ({ children }) => {
  return <div>{children}</div>;
};
