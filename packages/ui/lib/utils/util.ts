/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (obj: any): obj is object => obj && typeof obj === "object";

export function updateObjByDepth<O extends object>(obj: O, key: string, value: any): O {
  const [k, ...rest] = key.split(".");

  if (Array.isArray(obj)) {
    const index = parseInt(k, 10);
    if (isNaN(index)) {
      throw new Error(`Key ${key} is not a number`);
    }

    if (rest.length === 0) {
      obj[index] = value;
    } else {
      obj[index] = updateObjByDepth(obj[index], rest.join("."), value);
    }
    
    return obj;
  }

  if (!(k in obj)) {
    throw new Error(`Key ${key} not exists`);
  }

  if (rest.length === 0) {
    return { ...obj, [k]: value };
  }

  return {
    ...obj,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [k]: changeObj(obj[k] as object, rest.join("."), value),
  };
}
