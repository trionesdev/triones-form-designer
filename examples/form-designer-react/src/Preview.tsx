import { useMemo } from 'react';
import { createForm } from '@formily/core';
import { transformToSchema, useTree } from '@trionesdev/form-designer-react';
import { Form, FormItem, FormGrid, Input, Select } from '@formily/antd-v5';
import { createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    Input,
    Select,
  },
});

export const Preview = () => {
  const tree = useTree();
  const form = useMemo(() => createForm(), []);
  const schema = transformToSchema(tree);
  console.log(schema);
  return (
    <>
      <Form form={form}>
        <SchemaField schema={schema} />
      </Form>
    </>
  );
};
