import React, { FC, useState } from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';
import { DesignerComponent } from '../../types';
import { SourceWidget } from './SourceWidget';
import { Row, Col } from '../../components';
import { Down, Up } from '../../Icon';
import classNames from 'classnames';

const ResourceWidgetStyled = styled('div')({
  '.td-resource-header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: '#FAFAFA',
    borderBottom: '1px solid #d9d9d9',
    cursor: 'pointer',
    transition: 'all 0.3s,visibility 0s',
    '.action': {
      cursor: 'pointer',
      '.icon': {
        width: '1em',
        height: '1em',
      },
    },
  },
  '.td-resource-content': {
    padding: '4px',
    display: 'none',
    '&-inner': {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 50%)',
      gap: '4px',
    },
    '&.open': {
      display: 'grid',
    },
  },
});

type ResourceWidgetProps = {
  title?: React.ReactNode;
  sources?: DesignerComponent[];
};

export const ResourceWidget: FC<ResourceWidgetProps> = ({ title, sources }) => {
  const [open, setOpen] = useState(true);

  const scopeSources = _.reduce(
    sources,
    (result: any, source: any) => {
      return _.concat(result, source.Resource);
    },
    [],
  );

  return (
    <ResourceWidgetStyled>
      <div className={`td-resource-header`} onClick={() => setOpen(!open)}>
        <div>{title}</div>
        <div className={`action`}>
          <span>{React.cloneElement(open ? Down : Up)}</span>
        </div>
      </div>
      <div className={classNames(`td-resource-content`, { open: open })}>
        <Row gutter={[8, 8]}>
          {scopeSources.map((source: any) => (
            <Col key={`${source.node.id}`} span={12}>
              <SourceWidget source={source} />
            </Col>
          ))}
        </Row>
      </div>
    </ResourceWidgetStyled>
  );
};
