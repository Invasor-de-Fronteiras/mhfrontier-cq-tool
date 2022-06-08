import { useEditor } from "../context/EditorContext";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import { isObject, updateObjByDepth } from "../utils/util";

export function UnknownTab() {
  const { data } = useEditor();

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
  const { onChangeData } = useEditor();

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
              <label className="flex flex-col gap-2" key={key}>
                <span className="text-sm">{key}</span>
                <input
                  className="border p-1"
                  type="text"
                  value={value}
                  onChange={(e) => {
                    onChangeData((file) => {
                      const data = updateObjByDepth(file, newPath, e.target.value);
                      return data;
                    });
                  }}
                />
              </label>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}
