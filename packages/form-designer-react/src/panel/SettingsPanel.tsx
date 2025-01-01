import React, { useMemo } from 'react';
import { useOperation } from '../hooks';
import styled from '@emotion/styled';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormProvider, observer } from '@formily/react';
import { JSXComponent } from '@formily/react/esm/types';
import { IconWidget } from '../widget/IconWidget';
import { GlobalStore } from '../store';
import _ from 'lodash';

const SettingsPanelStyled = styled('div')({
  minWidth: '300px',
  backgroundColor: 'white',
  borderLeft: '1px solid #d9d9d9',
  display: 'flex',
  flexDirection: 'column',
  '.properties-header': {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    padding: '16px 8px',
    borderBottom: '1px solid #d9d9d9',
  },
  '.properties-body': {
    padding: '8px',
    flex: '1 auto',
    minHeight: 0,
    overflowY: 'auto',
  },
});

type SettingsPanelProps = {
  className?: string;
  components?: Record<string, JSXComponent>;
  /**
   * form 组件属性
   */
  formProps?: Omit<any, 'form'>;
};

const SchemaField = createSchemaField({
  components: {},
});

export const SettingsPanel: React.FC<SettingsPanelProps> = observer(
  ({ className, components, formProps }) => {
    const operation = useOperation();
    const { selectionNode } = operation;

    const form = useMemo(() => {


      const form = createForm({
        initialValues: selectionNode?.designerProps?.defaultProps,
        // values: selectionNode?.schema,
        effects() {
          onFormValuesChange((form: any) => {
            selectionNode.schema = _.merge(selectionNode.schema,form.values);
            if (selectionNode.root == selectionNode) {
              operation.setTree(selectionNode);
            }
          });
        },
      });

      form.setValues(selectionNode?.schema)
      return form;
    }, [selectionNode, selectionNode?.id]);

    /**
     * 如果有Form组件，则使用Form组件包裹，如果没有则使用FormProvider包裹
     * @param children
     */
    const formRender = (children: React.ReactNode) => {
      const formComp = components['Form'];
      if (formComp) {
        return React.createElement(formComp, { form, ...formProps }, children);
      } else {
        return React.createElement(FormProvider, { form }, children);
      }
    };

    return (
      <SettingsPanelStyled className={className}>
        <div className={`properties-header`}>
          {selectionNode && (
            <>
              <IconWidget icon={GlobalStore.getIcon(selectionNode.icon)} />
              <span>{selectionNode.title}</span>
            </>
          )}
        </div>
        <div className={`properties-body`}>
          {formRender(
            <SchemaField
              components={components}
              schema={selectionNode?.designerProps}
            />,
          )}
        </div>
      </SettingsPanelStyled>
    );
  },
);
