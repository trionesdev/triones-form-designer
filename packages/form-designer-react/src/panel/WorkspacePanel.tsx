import React from 'react';
import { FC } from 'react';
import styled from '@emotion/styled';
import { observer } from '@formily/react';

type WorkspacePanelProps = {
  children?: React.ReactNode;
};

const WorkspacePanelStyled = styled('div')({
  flex: '1 auto',
  minWidth: 0,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: '4px',
});

export const WorkspacePanel: FC<WorkspacePanelProps> = observer(
  ({ children }) => {
    return (
      <WorkspacePanelStyled className={`td-workspace-panel`}>
        {children}
      </WorkspacePanelStyled>
    );
  },
  {
    scheduler: () => {
      return requestIdleCallback;
    },
  },
);
