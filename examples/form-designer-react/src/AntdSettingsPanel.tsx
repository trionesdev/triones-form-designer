import { SettingsPanel } from '@trionesdev/form-designer-react';
import {
  Form,
  FormItem,
  Input,
  Select,
  NumberPicker,
  Switch,
} from '@formily/antd-v5';
import {SelectOptionsSetter} from "./designer-components"

export const AntdSettingsPanel = () => {
  return (
    <SettingsPanel
      components={{
        Form,
        FormItem,
        Input,
        Select,
        Switch,
        InputNumber: NumberPicker,
        SelectOptionsSetter
      }}
      formProps={{
        layout: 'vertical',
      }}
    />
  );
};
