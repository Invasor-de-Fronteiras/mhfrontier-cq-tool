import React from "react";
import { Control, Path, useController } from "react-hook-form";
import { useEditor } from "../context/EditorContext";
import { QuestFile } from "../utils";

interface PosInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function PosInput({ label, ...props }: PosInputProps) {
  return (
    <label className=" p-1 relative flex items-center">
      {label && <span className="text-gray-500 absolute pl-2">{label}</span>}
      <input
        type="number"
        className="text-left w-32 pl-6 border-2 border-transparent rounded focus:border-emerald-500 outline-none"
        {...props}
      />
    </label>
  );
}

interface PosInputFieldProps<T = QuestFile> extends PosInputProps {
  name: Path<T>;
  control?: Control<T>;
}

export function PosInputField<T>({
  label,
  name,
  defaultValue,
  control,
  ...props
}: PosInputFieldProps<T>) {
  const { form } = useEditor();
  const { field } = useController({
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    control: control ?? form.control,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <PosInput label={label} {...props} {...field} />;
}
