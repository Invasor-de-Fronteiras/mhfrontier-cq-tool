import classNames from "classnames";
import { ComponentProps } from "react";

export function Button(props: ComponentProps<"button">) {
  return (
    <button
      className={classNames(
        "border rounded p-2 bg-gray-700 text-white w-52 font-medium disabled:bg-gray-500 disabled:cursor-not-allowed",
        props.className
      )}
      {...props}
    />
  );
}
