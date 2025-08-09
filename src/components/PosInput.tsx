import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useQuestEditor } from "../context/QuestEditorContext";
import { QuestFile } from "../utils";

interface PosInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wrapOnChange = (onChange?: (...event: any[]) => void) => {
  if (onChange) return (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10))
  }

  return onChange;
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

interface PosInputFieldProps<T extends FieldValues = QuestFile> extends PosInputProps {
  name: Path<T>;
  control: Control<T>;
}

export function PosInputField<T extends FieldValues>({
  label,
  name,
  defaultValue,
  control,
  ...props
}: PosInputFieldProps<T>) {
  const { form } = useQuestEditor();
  const { field } = useController({
    name,
    control: control ?? form.control,
  });

  return <PosInput label={label} {...props} {...field} onChange={wrapOnChange(field.onChange)}  />;
}
