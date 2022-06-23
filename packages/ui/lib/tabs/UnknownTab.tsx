import { useEditor } from "../context/EditorContext";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import { isObject } from "../utils/util";
import { Controller, useWatch } from "react-hook-form";

export function UnknownTab() {
  const { form } = useEditor();
  const data = useWatch({ control: form.control });

  return <UnknownField data={data!} name="root" initialHide={false} path="" />;
}

interface UnknownFieldProps {
  data: object;
  name: string;
  initialHide?: boolean;
  path: string;
}

function UnknownField({
  data,
  name,
  initialHide = true,
  path,
}: UnknownFieldProps) {
  const [hide, setHide] = useState(initialHide);
  const { form } = useEditor();

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
              <UnknownField data={value} name={key} key={key} path={newPath} />
            ) : (
              <Controller
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /** @ts-ignore */
                name={newPath}
                control={form.control}
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
