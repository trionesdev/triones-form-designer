import { useMemo } from 'react';
import {createForm, onFormValuesChange} from '@formily/core';
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
  const form = useMemo(() => createForm({
    effects() {
      onFormValuesChange((form: any) => {
         console.log(form.values)
      })
    }
  }), []);
  const schema = transformToSchema(tree);

  return (
    <>
      <Form {...schema['x-component-props']} form={form}>
        <SchemaField schema={schema} />
      </Form>
    </>
  );
};
