export const polynomial = (input1: [number, number], input2: [number, number]) => {
    const [x1, x2] = input1;
    const [y1, y2] = input2;
  
    const x = x1 - y1;
    const y = x2 - y2;
  
    const a = x / y;
    const b = x2 - x1 * a;
  
    const getX = (v: number) => (v - b) / a;
    const getY = (v: number) => (v - b) / a;
  
    return {
      a,
      b,
      getX,
      getY,
    };
  };