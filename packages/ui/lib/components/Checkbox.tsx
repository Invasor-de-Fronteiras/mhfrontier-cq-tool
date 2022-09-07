import type { ComponentProps } from "react";

interface CheckboxProps extends Omit<ComponentProps<"input">, 'value' | 'onChange'> {
    label: string;
    name: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
}

export function Checkbox({ label, name, value, onChange, ...rest }: CheckboxProps) {
  return (
    <div className="form-check" {...rest} >
        <input 
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            checked={value}
            onChange={event => {
                if (onChange) onChange(event.target.checked);
            }}
            value=""
            id={name}
        />
        <label className="form-check-label inline-block text-gray-800 dark:text-white" htmlFor={name}>
            {label}
        </label>
    </div>
  );
}

