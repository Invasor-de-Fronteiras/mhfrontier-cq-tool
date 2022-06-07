import classNames from "classnames";
import ReactSelect, { Props, GroupBase } from "react-select";


export type SelectOption = {
  label: string;
  value: number;
};

interface SelectProps<T = unknown> extends Props<T, false, GroupBase<T>> {
  label: string;
}

export function Select<T>({ label, className, ...props }: SelectProps<T>) {
  return (
    <label className={classNames("flex flex-col w-full max-w-xs", className)}>
      <span>{label}</span>
      <ReactSelect
        {...props}
        // https://github.com/JedWatson/react-select/issues/1537#issuecomment-868383410
        // @ts-ignore
        menuPortalTarget={document.body}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "rgb(16 185 129 / 1)", // text-emerald-500
            primary75: "rgb(52 211 153 / 1)", // text-emerald-400
            primary50: "rgb(10 231 183 / 1)", // text-emerald-300
            primary25: "rgb(167 243 208 / 1)", // text-emerald-200
          },
        })}
      />
    </label>
  );
}
