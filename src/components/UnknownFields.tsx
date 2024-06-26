import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useMemo, useState } from "react";
import { isObject } from "../utils/util";
import { Control, Controller, FieldValues } from "react-hook-form";

interface UnknownFieldProps<T extends FieldValues> {
  data: object;
  name: string;
  path: string;
  control: Control<T>;
  initialHide?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wrapOnChange = (onChange?: (...event: any[]) => void) => {
  if (onChange) return (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10))
  }

  return onChange;
}

export function UnknownField<T extends FieldValues>({
  data,
  name,
  initialHide = true,
  path,
  control
}: UnknownFieldProps<T>) {
  const [hide, setHide] = useState(initialHide);

  const keys = useMemo(() => {
    if (Array.isArray(data)) return Object.keys(data).map(v => parseInt(v, 10)).sort((a, b) => a - b);

    return Object.keys(data).sort();
  }, [data]);

  console.log('keys: ', keys);

  return (
    <fieldset className="border p-2 w-full">
      <legend
        className="flex flex-row items-center gap-2 mx-2"
        onClick={() => setHide(!hide)}
      >
        {name} {hide ? <BsEyeSlash /> : <BsEye />}
      </legend>
      {!hide && (
        <div className="flex flex-row flex-wrap gap-2">
          {keys.map((key) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /** @ts-ignore */
            const value = data[key];
            const newPath = name === "root" ? `${key}` : `${path}.${key}`;

            return isObject(value) ? (
              <UnknownField
                data={value}
                name={key as string}
                key={key}
                path={newPath}
                control={control}
              />
            ) : (
              <Controller
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /** @ts-ignore */
                name={newPath}
                control={control}
                render={({ field }) => (
                  <label className="flex flex-col gap-2" key={key}>
                    <span className="text-sm">{key}</span>
                    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                    {/*@ts-ignore*/}
                    <input className="border p-1" {...field} type="number" onChange={wrapOnChange(field.onChange)}/>
                  </label>
                )}
              />
            );
          })}
        </div>
      )}
    </fieldset>
  );
}
