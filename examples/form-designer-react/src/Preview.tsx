import { useMemo } from 'react';
import { createForm } from '@formily/core';
import { transformToSchema, useTree } from '@trionesdev/form-designer-react';
import {
  Form,
  FormItem,
  FormGrid,
  Input,
  NumberPicker,
  Select,
  DatePicker,
  TimePicker,
} from '@formily/antd-v5';
import { createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    Input,
    InputNumber: NumberPicker,
    Select,
    DatePicker,
    TimePicker,
  },
});

export const Preview = () => {
  const tree = useTree();
  const form = useMemo(() => createForm(), []);
  const schema = transformToSchema(tree);

  return (
    <>
      <Form {...schema['x-component-props']} form={form}>
        <SchemaField schema={schema} />
      </Form>
    </>
  );
};
