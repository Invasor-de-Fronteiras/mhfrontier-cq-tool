import react from "react";
import ReactSelect, { Props, GroupBase } from "react-select";

interface SelectProps<T = unknown> extends Props<T, false, GroupBase<T>> {
  index: number;
}

export function Select<T>(props: SelectProps<T>) {
  return (
    <ReactSelect
      {...props}
      // https://github.com/JedWatson/react-select/issues/1537#issuecomment-868383410
      // @ts-ignore
      menuPortalTarget={document.body}
      theme={(theme) => ({
          ...theme,
         colors: {
           ...theme.colors,
           primary: 'rgb(4 120 87)',
         },
      })}
    />
  );
}
