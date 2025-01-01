import { Button, Flex, Space } from 'antd';
import { useFormDesigner } from '@trionesdev/form-designer-react';
import { FC } from 'react';

type DesignerToolsProps = {
  onSetDefaultData: (data: any) => void;
};

export const DesignerTools: FC<DesignerToolsProps> = ({ onSetDefaultData }) => {
  const engine = useFormDesigner();
  return (
    <Flex justify={`space-between`}>
      <Space>
        <Button onClick={() => engine.setDesignerType('PC')}>PC</Button>
        <Button onClick={() => engine.setDesignerType('MOBILE')}>Mobile</Button>
      </Space>
      <Space>
        <Button onClick={onSetDefaultData}>设置默认值</Button>
        <Button
          onClick={() => {
            engine.workbench.type = 'DESIGNABLE';
          }}
        >
          设计
        </Button>
        <Button
          onClick={() => {
            engine.workbench.type = 'PREVIEW';
          }}
        >
          预览
        </Button>
      </Space>
    </Flex>
  );
};
