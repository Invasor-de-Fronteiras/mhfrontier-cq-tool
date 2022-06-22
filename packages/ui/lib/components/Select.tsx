import classNames from "classnames";
import { useMemo } from "react";
import { Control, Path, useController } from "react-hook-form";
import ReactSelect, { Props, GroupBase, MenuListProps, createFilter } from "react-select";
import { FixedSizeList as List } from 'react-window';
import { useEditor } from "../context/EditorContext";
import { QuestFile } from "../utils";

export type SelectOption = {
  label: string;
  value: number;
};

const height = 35;

function MenuList<T>({ options, children, maxHeight, getValue }: MenuListProps<T>) {
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <List
        // width={100}
        height={maxHeight}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
}


interface SelectProps<T = SelectOption> extends Props<T, false, GroupBase<T>> {
  label: string;
}

export function Select<T>({ label, className, ...props }: SelectProps<T>) {
  return (
    <label className={classNames("flex flex-col w-full max-w-xs mt-3 px-3", className)}>
      <span>{label}</span>
      <ReactSelect
        {...props}
        // https://github.com/JedWatson/react-select/issues/1537#issuecomment-868383410
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        menuPortalTarget={document.body}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "rgb(16 185 129 / 1)", // text-emerald-500
            primary75: "rgb(52 211 153 / 1)", // text-emerald-400
            primary50: "rgb(10 231 183 / 1)", // text-emerald-300
            primary25: "rgb(167 243 208 / 1)", // text-emerald-200
          },
        })}
        filterOption={createFilter({ ignoreAccents: false })}
        components={{
          MenuList
        }}
        {...props}
      />
    </label>
  );
}

interface SelectFieldProps<T = SelectOption, FormT = QuestFile>
  extends Omit<SelectProps<T>, "onChange"> {
  /**
   * Path reference to the value in the form data.
   */
  name: Path<FormT>;
  control?: Control<FormT>;
  getFormValue?: (option: T) => unknown;
  onClearValue?: unknown;
}

export function SelectField<T, FormT>({
  name,
  control,
  options,
  value,
  getFormValue = (option) => option ? (option as unknown as SelectOption).value : null,
  onClearValue,
  ...props
}: SelectFieldProps<T, FormT>) {
  const { form } = useEditor();
  const {
    field: { value: _value, onChange, ...field },
  } = useController({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    control: control ?? form.control,
  });

  const selectedValue = useMemo(() => {
    if (value !== undefined) return value;
    if (!options) return null;
    return options.find(v => getFormValue(v as T) === _value) as T;
  }, [value, _value, options]);

  return (
    <Select
      {...props}
      {...field}
      options={options}
      value={selectedValue}
      onChange={(option) => {
        if (!option && onClearValue !== undefined) {
          onChange(onClearValue);
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange(getFormValue(option));
      }}
    />
  );
}
