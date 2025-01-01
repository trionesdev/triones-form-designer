import React, { FC, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { Button, Input } from 'antd';
import { DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import Chance from 'chance';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const chance = new Chance();

const SelectOptionContext = React.createContext<{
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}>({});

type SelectOptionProps = {
  option?: any;
  index?: number;
  onChange?: (value: any, index: number) => void;
  onDelete?: (value: any) => void;
};
const SelectOption: FC<SelectOptionProps> = ({
  option,
  index,
  onChange,
  onDelete,
}) => {
  const {
    listeners,
    attributes,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: option.value,
  });

  const contextValue = useMemo<{
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
    listeners?: SyntheticListenerMap;
  }>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <SelectOptionContext.Provider value={contextValue}>
      <div
        ref={setNodeRef}
        key={option.value}
        style={{ ...style, display: 'flex', width: '100%', gap: 4 }}
        {...attributes}
      >
        <Button
          ref={setActivatorNodeRef}
          {...listeners}
          type={`text`}
          icon={<HolderOutlined />}
        />
        <div style={{ flex: 1 }}>
          <Input
            value={option.label}
            onChange={(e) => {
              onChange?.(_.assign(option, { label: e.target.value }), index);
            }}
          />
        </div>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            onDelete?.(option.value);
          }}
        >
          <DeleteOutlined />
        </span>
      </div>
    </SelectOptionContext.Provider>
  );
};

type SelectOptionsSetterProps = {
  value: any;
  onChange: (value: any) => void;
};
export const SelectOptionsSetter: FC<SelectOptionsSetterProps> = ({
  value,
  onChange,
}) => {
  const [options, setOptions] = useState<any>([]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (_.get(active, 'id') !== _.get(over, 'id')) {
      setOptions((prevState: any) => {
        const activeIndex = prevState.findIndex((record: any) => {
          return _.get(record, 'value') === _.get(active, 'id');
        });
        const overIndex = prevState.findIndex(
          (record: any) => _.get(record, 'value') === _.get(over, 'id'),
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  useEffect(() => {
    onChange?.(options);
  }, [options]);

  useEffect(() => {
    if (!_.isEqual(value || [], options || [])) {
      setOptions(value || []);
    }
  }, [value]);

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={options.map((i) => i.value)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {options.map((option: any, index: number) => (
            <SelectOption
              option={option}
              index={index}
              key={index}
              onChange={(opt) => {
                const newOption = _.map(options, (item) => {
                  if (opt.value === item.value) {
                    return opt;
                  }
                  return item;
                });
                setOptions(newOption);
              }}
              onDelete={(value) => {
                const newOptions = _.filter(options, (opt: any) => {
                  return opt.value != value;
                });
                setOptions(newOptions);
              }}
            />
          ))}
        </div>
        <div>
          <Button
            type={`link`}
            size={`small`}
            onClick={() => {
              const newOption = {
                label: '',
                value: `opt_${chance.string({ length: 10, alpha: true })}`,
              };
              setOptions([...options, newOption]);
            }}
          >
            添加选项
          </Button>
        </div>
      </SortableContext>
    </DndContext>
  );
};
