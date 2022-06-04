import type { ComponentProps } from "react";
import { useState } from "react";
import ReactSelect from "react-select";

interface SelectProps extends ComponentProps<ReactSelect> {
  index: number;
}

export function Select(props: SelectProps) {
  // https://github.com/JedWatson/react-select/issues/1537#issuecomment-868383410
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <>
    {menuIsOpen}
    <ReactSelect
      {...props}
      onMenuOpen={() => setMenuIsOpen(!menuIsOpen)}
      onMenuClose={() => setMenuIsOpen(!menuIsOpen)}
      styles={{ container: (styles) => ({ ...styles, zIndex: menuIsOpen ? 999 : 0  }) }}
    />
    </>
  );
}
