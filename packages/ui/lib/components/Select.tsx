import type { ComponentProps } from "react";
import { useState } from "react";
import ReactSelect, { StylesConfig } from "react-select";

interface SelectProps extends ComponentProps<ReactSelect> {
  index: number;
}

export function Select(props: SelectProps) {
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
           primary: 'rgb(4 120 87 / var(--tw-text-opacity))',
         },
      })}
    />
  );
}
