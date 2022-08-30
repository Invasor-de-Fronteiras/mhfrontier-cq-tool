import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import { isObject } from "../utils/util";
import { Control, Controller } from "react-hook-form";

interface UnknownFieldProps<T> {
  data: object;
  name: string;
  path: string;
  control: Control<T>;
  initialHide?: boolean;
}

export function UnknownField<T>({
  data,
  name,
  initialHide = true,
  path,
  control
}: UnknownFieldProps<T>) {
  const [hide, setHide] = useState(initialHide);

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
          {Object.keys(data).map((key) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /** @ts-ignore */
            const value = data[key];
            const newPath = name === "root" ? `${key}` : `${path}.${key}`;

            return isObject(value) ? (
              <UnknownField
                data={value}
                name={key}
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
                    <input className="border p-1" type="text" {...field} />
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
