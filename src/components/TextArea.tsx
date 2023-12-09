/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from "classnames";
import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({
  label,
  placeholder,
  type,
  className,
  ...props
}: TextAreaProps) {
  return (
    <label className={classNames('m-2',  className)}>
      {label && (
        <span className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2">
          {label}
        </span>
      )}
      <textarea
        className="appearance-none w-full border-gray-200 dark:text-black border-2 rounded py-3 px-4 leading-tight focus:border-emerald-500 outline-none"
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
}

interface TextAreaFieldProps<T extends FieldValues> extends TextAreaProps {
  /**
   * Path reference to the value in the form data.
   */
  name: Path<T>;
  control: Control<T>;
}

export function TextAreaField<T extends FieldValues>({
  name,
  defaultValue,
  control,
  ...props
}: TextAreaFieldProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  return <TextArea {...props} {...field} />;
}
