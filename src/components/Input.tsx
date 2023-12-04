/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from "classnames";
import React from "react";
import { Control, Path, useController } from "react-hook-form";
import { useEditor } from "../context/EditorContext";
import { QuestFile } from "../utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wrapOnChange = (type: string, onChange?: (...event: any[]) => void) => {
    if (type === 'number' && onChange) return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value, 10))
    }

    return onChange;
}


export function Input({
  label,
  placeholder,
  type,
  className,
  inputClassName,
  ...props
}: InputProps) {
  return (
    <label className={classNames('m-2',  className)}>
      {label && (
        <span className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2">
          {label}
        </span>
      )}
      <input
        className={classNames("appearance-none w-full border-gray-200 border-2 rounded py-3 px-4 dark:text-black leading-tight focus:border-emerald-500 outline-none", inputClassName)}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
}

interface InputFieldProps<T = QuestFile> extends InputProps {
  /**
   * Path reference to the value in the form data.
   */
  name: Path<T>;
  control?: Control<T>;
}

export function InputField<T>({
  name,
  defaultValue,
  control,
  type,
  ...props
}: InputFieldProps<T>) {
  const { form } = useEditor();
  const { field } = useController({
    // @ts-ignore
    name,
    // @ts-ignore
    control: control ?? form.control,
  });

  // @ts-ignore
  return <Input {...props} type={type} {...field} onChange={wrapOnChange(type, field.onChange)} />;
}
