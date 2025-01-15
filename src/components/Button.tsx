import classNames from "classnames";
import type { ComponentProps } from "react";

export function Button({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={classNames(
        "border rounded p-2 text-white bg-slate-900 hover:bg-slate-700 font-semibold w-full sm:w-auto",
        "disabled:bg-slate-500 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      {...props}
    />
  );
}
