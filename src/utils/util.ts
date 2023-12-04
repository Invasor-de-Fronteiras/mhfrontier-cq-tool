/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (obj: any): obj is object =>
  obj && typeof obj === "object";

export function convertToIntObj<A extends object>(obj: A): A {
  return Object.keys(obj).reduce((acc, key) => {
    //@ts-ignore
    const value = obj[key];
    if (typeof value === "number") {
      //@ts-ignore
      acc[key] = value;
    } else if (typeof value === "string") {
      //@ts-ignore
      acc[key] = parseInt(value, 10);
    } else if (Array.isArray(value)) {
      //@ts-ignore
      acc[key] = value.map((v) => {
        if (typeof v === "number") {
          return v;
        } else if (typeof v === "string") {
          return parseInt(v, 10);
        }
        return convertToIntObj(v);
      });
    } else if (isObject(value)) {
      //@ts-ignore
      acc[key] = convertToIntObj(value);
    }

    return acc;
  }, {} as A);
}
