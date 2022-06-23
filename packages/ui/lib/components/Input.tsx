/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from "classnames";
import React from "react";
import { Control, Path, useController } from "react-hook-form";
import { useEditor } from "../context/EditorContext";
import { QuestFile } from "../utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({
  label,
  placeholder,
  type,
  className,
  ...props
}: InputProps) {
  return (
    <label className={classNames('m-2',  className)}>
      {label && (
        <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {label}
        </span>
      )}
      <input
        className="appearance-none w-full border-gray-200 border-2 rounded py-3 px-4 leading-tight focus:border-emerald-500 outline-none"
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
  return <Input {...props} {...field} />;
}
