import classNames from "classnames";
import { useMemo } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import ReactSelect, {
  Props,
  GroupBase,
  MenuListProps,
  createFilter,
} from "react-select";
import { FixedSizeList as List } from "react-window";
import { QuestFile } from "../utils";

export type SelectOption = {
  label: string;
  value: number;
};

const itemHeight = 35;

function MenuList<T>({
  options,
  children,
  maxHeight,
  getValue,
}: MenuListProps<T>) {
  const [value] = getValue();
  const initialOffset = useMemo(() => {
    const offset = options.indexOf(value) * itemHeight;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const height = itemHeight * (children?.length || 0);

    return height > maxHeight ? offset : 0;
  }, [value]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <List
      // width={100}
      height={maxHeight}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      itemCount={children.length}
      itemSize={itemHeight}
      initialScrollOffset={initialOffset}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
}

interface SelectProps<T = SelectOption> extends Props<T, false, GroupBase<T>> {
  label?: string;
}

export function Select<T>({ label, className='m-2', ...props }: SelectProps<T>) {
  return (
    <label className={classNames(className, "flex flex-col w-full max-w-xs")}>
      {label && (
        <span className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2">
          {label}
        </span>
      )}
      <ReactSelect
        {...props}
        // https://github.com/JedWatson/react-select/issues/1537#issuecomment-868383410
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        styles={{
          menu: (menuProps) => ({
            ...menuProps,
            marginBottom: '2rem'
          }),
        }}
        filterOption={createFilter({ ignoreAccents: false })}
        components={{
          MenuList,
        }}
      />
    </label>
  );
}

interface SelectFieldProps<T = SelectOption, FormT extends FieldValues = QuestFile>
  extends Omit<SelectProps<T>, "onChange"> {
  /**
   * Path reference to the value in the form data.
   */
  name: Path<FormT>;
  control: Control<FormT>;
  getFormValue?: (option: T) => unknown;
  setFormValue?: (option: T) => unknown;
  onClearValue?: unknown;
}

export function SelectField<T, FormT extends FieldValues>({
  name,
  control,
  options,
  value,
  getFormValue = (option) => option ? (option as unknown as SelectOption).value : null,
  setFormValue = getFormValue,
  onClearValue,
  ...props
}: SelectFieldProps<T, FormT>) {
  const {
    field: { value: _value, onChange, ...field },
  } = useController({
    name: name,
    control,
  });

  const selectedValue = useMemo(() => {
    if (value !== undefined) return value;
    if (!options) return null;
    return options.find((v) => getFormValue(v as T) === _value) as T;
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
        onChange(setFormValue(option));
      }}
    />
  );
}
