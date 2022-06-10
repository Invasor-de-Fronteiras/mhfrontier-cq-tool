import React from 'react';

interface PosInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function PosInput({ label, ...props }: PosInputProps) {
  return (
    <label className=" p-1 relative flex items-center">
      {label &&<span className="text-gray-500 absolute pl-2">{label}</span>}
      <input
        type="number"
        className="text-left w-32 pl-6 border-2 border-transparent rounded focus:border-emerald-500 outline-none"
        {...props}
      />
    </label>
  );
}
