import React, { FC, useEffect, useMemo, useState } from 'react';
import { FormDesignerContext } from '../context';
import { DesignerType, FormDesignerEngine, ITreeNode } from '../model';
import { GhostWidget } from '../widget/GhostWidget';
import { transformToTreeNode } from '../coordinate';
import _ from 'lodash';
import { ISchema } from '@formily/react';

type FormDesignerProps = {
  children?: React.ReactNode;
  engine?: FormDesignerEngine;
  designerType?: DesignerType;
  value?: ISchema;
  onChange?: (value: ISchema) => void;
  onItemDelete?: (item: ITreeNode) => void;
  beforeItemDelete?: (item: ITreeNode) => boolean;
};
export const FormDesigner: FC<FormDesignerProps> = ({
  children,
  engine,
  designerType = 'PC',
  value,
  onChange,
  onItemDelete,
  beforeItemDelete,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (value: any) => {
    setInternalValue(value);
    onChange?.(value);
  };

  let designerEngine = useMemo(() => {
    let internalEngine = engine;
    if (!internalEngine) {
      internalEngine = new FormDesignerEngine({
        rootComponentName: 'Form',
        type: designerType,
        value,
        onChange: handleChange,
        onItemDelete,
        beforeItemDelete,
      });
    }
    return internalEngine;
  }, [engine]);

  useEffect(() => {
    if (!_.isEmpty(value) && !_.isEqual(value, internalValue)) {
      designerEngine.operation?.tree.from(transformToTreeNode(value));
    }
  }, [value]);

  return (
    <FormDesignerContext.Provider value={designerEngine}>
      {children}
      <GhostWidget />
    </FormDesignerContext.Provider>
  );
};
