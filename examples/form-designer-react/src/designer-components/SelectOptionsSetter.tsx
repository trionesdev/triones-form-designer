import { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { Input } from 'antd';

type SelectOptionsSetterProps = {
  value: any;
  onChange: (value: any) => void;
};
export const SelectOptionsSetter: FC<SelectOptionsSetterProps> = ({
  value,
  onChange,
}) => {
  const [options, setOptions] = useState<any>([]);
  useEffect(() => {
    onChange?.(options);
  }, [options]);

  useEffect(() => {
    if (!_.isEqual(value || [], options || [])) {
      setOptions(value || []);
    }
  }, [value]);

  return (
    <div>
      {options.map((option: any) => (
        <div key={option.value} style={{display:'flex',width:'100%',gap:4}}>
          <div style={{flex:1}}><Input value={option.label}/></div>
          <span >删除</span>
        </div>
      ))}
      <div
        onClick={() => {
          setOptions([
            ...options,
            {
              label: '1',
              value: '2',
            },
          ]);
        }}
      >
        添加选项
      </div>
    </div>
  );
};
