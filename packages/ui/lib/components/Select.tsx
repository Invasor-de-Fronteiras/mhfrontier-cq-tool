import { useMemo } from 'react';
import classNames from "classnames";
import ReactSelect, { Props, GroupBase, GetOptionValue, GetOptionLabel } from "react-select";


export type SelectOption = {
  label: string;
  value: number | string;
};

const getOptionValueDefault: GetOptionValue<SelectOption> = (option) => option.value.toString();
const getOptionLabel: GetOptionLabel<SelectOption> = (option) => option.label;



interface DefaultSelectProps extends Omit<Props<SelectOption, false, GroupBase<SelectOption>>, 'value'> {
  label: string;
  options: SelectOption[];
  value: string;
}

interface SelectProps<O> extends Omit<Props<O, false, GroupBase<O>>, 'options' | 'value' > {
  label: string;
  value: string;
  options: O[];
  getOptionValue: GetOptionValue<O>;
  getOptionLabel: GetOptionLabel<O>;
}

export function Select<O, V>({ label, className, value, options, getOptionValue = getOptionValueDefault, ...props }: SelectProps<O> | DefaultSelectProps) {

  const selected = useMemo(() => (options as O[]).find(o => getOptionValue(o as O) === value), [value, getOptionValue, options])

  return (
    <label className={classNames("flex flex-col w-full pt-3 max-w-xs", className)}>
      <span className="dark:text-white">{label}</span>
      <ReactSelect
        {...props}

        value={selected}
        getOptionValue={getOptionValue}
        options={options}
        // https://github.com/JedWatson/react-select/issues/1537#issuecomment-868383410
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
