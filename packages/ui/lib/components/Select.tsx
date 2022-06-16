import classNames from "classnames";
import { Control, Path, useController } from "react-hook-form";
import ReactSelect, { Props, GroupBase } from "react-select";
import { useEditor } from "../context/EditorContext";
import { QuestFile } from "../utils";

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectProps<T = SelectOption> extends Props<T, false, GroupBase<T>> {
  label: string;
}

export function Select<T>({ label, className, ...props }: SelectProps<T>) {
  return (
    <label className={classNames("flex flex-col w-full max-w-xs", className)}>
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
}

export function SelectField<T, FormT>({
  name,
  control,
  getFormValue = (option) => (option as unknown as SelectOption).value,
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

  return (
    <Select
      {...props}
      {...field}
      onChange={(option) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange(getFormValue(option));
      }}
    />
  );
}
