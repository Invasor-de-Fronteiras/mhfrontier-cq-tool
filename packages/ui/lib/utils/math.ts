export const getPolynomialX = (v: number, a: number, b: number) => (v - b) / a;
export const getPolynomialY = (v: number, a: number, b: number) => (v - b) / a;

export const polynomial = (
  input1: [number, number],
  input2: [number, number]
) => {
  const [x1, x2] = input1;
  const [y1, y2] = input2;

  const x = x1 - y1;
  const y = x2 - y2;

  const a = x / y;
  const b = x2 - x1 * a;

  const getX = (v: number) => getPolynomialX(v, a, b);
  const getY = (v: number) => getPolynomialY(v, a, b);

  return {
    a,
    b,
    getX,
    getY,
  };
};
