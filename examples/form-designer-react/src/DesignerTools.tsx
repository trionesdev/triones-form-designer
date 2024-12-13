import { Button, Space } from 'antd';
import { useFormDesigner } from '@trionesdev/form-designer-react';

export const DesignerTools = () => {
  const engine = useFormDesigner();
  return (
    <Space>
      <Button onClick={() => engine.setDesignerType('PC')}>PC</Button>
      <Button onClick={() => engine.setDesignerType('MOBILE')}>Mobile</Button>
    </Space>
  );
};
