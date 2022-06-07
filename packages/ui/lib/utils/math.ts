interface IPolynomial {
    a: number;
    b: number;
}

export const getPolynomialX = (v: number, {a,b}: IPolynomial) => (v - b) / a;
export const getPolynomialY = (v: number, {a,b}: IPolynomial) => (v * a) + b;

export const polynomial = (
  input1: [number, number],
  input2: [number, number]
) => {
  const [x1, x2] = input1;
  const [y1, y2] = input2;

  const x = Math.abs(x1 - y1);
  const y = Math.abs(x2 - y2);

  const a =  y / x;
  const b = x2 - (x1 * a);

  const getX = (v: number) => getPolynomialX(v, {a, b});
  const getY = (v: number) => getPolynomialY(v, {a, b});

  return {
    a,
    b,
    getX,
    getY,
  };
};
