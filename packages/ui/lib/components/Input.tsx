/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { Control, Path, useController } from "react-hook-form";
import { useEditor } from "../context/EditorContext";
import { QuestFile } from "../utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, placeholder, type, ...props }: InputProps) {
  return (
    <div className="grid-cols-3 mt-3 px-3">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-last-name"
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-last-name"
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
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
