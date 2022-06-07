import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import { findMapAndStage } from "../utils";
import { getPolynomialX, getPolynomialY } from "../utils/math";

interface MaPreviewObject {
  x: number;
  y: number;
  id: string | number;
}

interface MapPreviewProps {
  mapId: number;
  areaId: number;
  objects: MaPreviewObject[];
  shouldCalculate?: boolean;
  canDraw?: boolean;
  onChange?: (objects: MaPreviewObject) => void;
}

const colors = ["rgb(250,82,222)", "red", "blue", "green", "yellow"];

const drawError = (
  ctx: CanvasRenderingContext2D,
  message: string,
  canvas: HTMLCanvasElement
) => {
  ctx.font = "1rem Arial";
  ctx.fillStyle = "#FF0000";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
};

export function MapPreview({
  areaId,
  mapId,
  objects,
  canDraw = true,
  shouldCalculate = true,
  onChange,
}: MapPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<string | number>(objects[0]?.id);

  const { map, stage } = findMapAndStage(mapId, areaId);

  const validMap = map && stage;
  const hasCalc = stage?.calculationX && stage?.calculationY;

  useEffect(() => {
    if (!validMap) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const img = new Image();
    img.src = `/maps/${map.name}/${stage.areaNumber}.png`;

    img.onerror = () => {
      canvas.height = 150;
      canvas.width = 150;
      drawError(ctx, "Map image not found", canvas);
    };

    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;

      ctx.drawImage(img, 0, 0);

      const drawObject = (obj: MaPreviewObject, index: number) => {
        const x =
          hasCalc && shouldCalculate
            ? getPolynomialX(obj.x, stage.calculationX!)
            : obj.x;
        const y =
          hasCalc && shouldCalculate
            ? getPolynomialX(obj.y, stage.calculationY!)
            : obj.y;

        ctx.fillStyle = colors[index];
        ctx.beginPath();

        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
      };

      for (let i in objects) {
        drawObject(objects[i], Number(i));
      }
    };
  }, [stage, map, objects, shouldCalculate, hasCalc, validMap]);

  const getMousePos: React.MouseEventHandler<HTMLCanvasElement> = (evt) => {
    if (!canDraw) return;

    var rect = canvasRef.current!.getBoundingClientRect();
    const pos = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
    const obj = {
      x:
        shouldCalculate && hasCalc
          ? getPolynomialY(pos.x, stage.calculationX!)
          : pos.x,
      y:
        shouldCalculate && hasCalc
          ? getPolynomialY(pos.y, stage.calculationY!)
          : pos.y,
      id: selected,
    };
    console.log(obj, pos, stage);

    onChange?.(obj);
  };

  if (!validMap) return <></>;

  return (
    <div className="text-center w-min ">
      {objects.length > 1 && (
        <div className="flex flex-row flex-wrap gap-2 mb-1">
          {objects.map((obj, i) => (
            <div
              key={i}
              onClick={() => setSelected(obj.id)}
              className={classNames("w-4 h-4 rounded-full shadow-sm", {
                "ring-2ring-slate-400 ring-offset-2 ring-offset-slate-50 border-2 border-emerald-500":
                  selected === obj.id,
              })}
              style={{ backgroundColor: colors[i] }}
            />
          ))}
        </div>
      )}
      <div className="border flex justify-center items-center w-min">
        <canvas
          ref={canvasRef}
          className="bg-black"
          height={180}
          width={180}
          onClick={getMousePos}
        />
      </div>
      {onChange && <small>click on the image to move</small>}
    </div>
  );
}
