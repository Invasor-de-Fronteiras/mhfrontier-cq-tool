import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PosInput } from "../../components/PosInput";
// @ts-ignore
import jungleImgUrl from "../../assets/MHFZ Resource Maps/Jungle/Day/mitu-bc.png";
import { Button } from "../../components/Button";
import classNames from "classnames";
import { Select } from "../../components/Select";
import { maps } from "../../utils";

interface Object {
  x: number;
  y: number;
  gameX: number;
  gameY: number;
  color: string;
  canvasColor: string;
  name: string;
}

export function MapPositionTab() {
  const [divisorX, setDivisorX] = useState(0);
  const [divisorY, setDivisorY] = useState(0);

  const [selected, setSelected] = useState<string>("red");
  const [useCalc, setUseCalc] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [objects, setObjects] = useState<Object[]>([
    {
      x: 7400,
      y: 13000,
      gameX: 7400,
      gameY: 13000,
      name: "red",
      canvasColor: "rgb(250,82,222)",
      color: "#fa52de",
    },
    {
      name: "blue",
      canvasColor: "blue",
      color: "blue",
      x: 14300,
      y: 11300,
      gameX: 14300,
      gameY: 11300,
    },
  ]);

  const selectMaps = useMemo(
    () =>
      maps.map((v) => ({
        value: v.id,
        label: v.name,
      })),
    []
  );

  const [selectedMapId, setSelectedMapId] = useState<number>(maps[0].id);

  const selectedMap = useMemo(
    () => selectMaps.find((v) => v.value === selectedMapId),
    [selectMaps, selectedMapId]
  );

  const selectAreas = useMemo(() => {
    const map = maps.find((v) => v.id === selectedMapId);
    if (!map) return [];

    return map.stages.map((v) => ({
      value: v.id,
      label: v.areaNumber === 0 ? "Base" : `Area ${v.areaNumber}`,
    }));
  }, [selectedMapId]);
  // const selectedMap = useMemo(() => ,[]);
  // f(1) = 5
  // f(-3) = -7
  // 5 = 1a + b
  // -7 = -3a + b
  // 5 - 1a = -7 - 3a
  // 12 - 4a = b
  //  12 = 4a
  // a = 3

  const calcX = useCallback((x: number) => (x - 3000) / 115, []);
  const calcY = useCallback((y: number) => 75, [divisorY]);

  const drawMonster = useCallback(
    (obj: Object, ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = obj.color;
      ctx.beginPath();

      ctx.arc(
        useCalc ? calcX(obj.gameX) : obj.x,
        useCalc ? calcY(obj.gameY) : obj.y,
        10,
        0,
        2 * Math.PI
      );
      ctx.fill();
    },
    [useCalc, calcX, calcY]
  );

  const getMousePos: React.MouseEventHandler<HTMLCanvasElement> = (evt) => {
    var rect = canvasRef.current!.getBoundingClientRect();
    const pos = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };

    setObjects((prev) =>
      prev.map((obj) =>
        obj.name === selected ? { ...obj, x: pos.x, y: pos.y } : obj
      )
    );
  };

  const loadImg = (onload: (img: HTMLImageElement) => void) => {
    const img = new Image();
    img.src = jungleImgUrl;

    img.onload = () => {
      onload(img);
    };
  };

  useEffect(() => {
    loadImg((img) => {
      const canvas = canvasRef.current!;
      const context = canvas.getContext("2d")!;

      canvas.height = img.height;
      canvas.width = img.width;

      context.drawImage(img, 0, 0);

      for (const object of objects) {
        drawMonster(object, context);
      }
    });
  }, [objects, drawMonster]);

  return (
    <div>
      <div className="flex flex-col  md:flex-row gap-3">
        {objects.map((object, index) => (
          <fieldset
            key={index}
            className={classNames(
              "flex gap-3 border-x border-t rounded-sm w-min p-2 flex-1",
              `border-b-[${object.color}] border-b-2`
            )}
          >
            <legend>{object.name}</legend>
            <fieldset>
              <legend className="text-sm">Image positions</legend>
              <PosInput
                label="X"
                value={object.x}
                onChange={(e) => {
                  const newObjects = [...objects];
                  newObjects[index].x = Number(e.target.value);
                  setObjects(newObjects);
                }}
              />
              <PosInput
                label="Y"
                value={object.y}
                onChange={(e) => {
                  const newObjects = [...objects];
                  newObjects[index].y = Number(e.target.value);
                  setObjects(newObjects);
                }}
              />
            </fieldset>
            <fieldset>
              <legend className="text-sm">Game positions</legend>

              <PosInput
                label="X"
                value={object.gameX}
                onChange={(e) => {
                  const newObjects = [...objects];
                  newObjects[index].gameX = Number(e.target.value);
                  setObjects(newObjects);
                }}
              />
              <PosInput
                label="Y"
                value={object.gameY}
                onChange={(e) => {
                  const newObjects = [...objects];
                  newObjects[index].gameY = Number(e.target.value);
                  setObjects(newObjects);
                }}
              />
            </fieldset>
          </fieldset>
        ))}
      </div>
      <Calculate
        name="calcX"
        input1={[objects[0].x, objects[0].gameX]}
        input2={[objects[1].x, objects[1].gameX]}
      />
      <Calculate
        name="calcY"
        input1={[objects[0].y, objects[0].gameY]}
        input2={[objects[1].y, objects[1].gameY]}
      />

      <div className="flex flex-row justify-around">
        <div className="flex flex-col items-center justify-center">
          <div>
            <canvas
              ref={canvasRef}
              onClick={getMousePos}
              height={canvasRef.current?.height}
              width={canvasRef.current?.width}
            />
          </div>
          <p>click on the image to move the {selected} object</p>
        </div>
        <div className="flex flex-col justify-center gap-3">
          <Select
            label="Maps"
            options={selectMaps}
            value={selectedMap}
            onChange={(v) => setSelectedMapId(v!.value)}
          />
          <Select
            label="Area"
            options={selectMaps}
            value={selectedMap}
            onChange={(v) => setSelectedMapId(v!.value)}
          />

          <Button
            onClick={() => setSelected(selected === "blue" ? "red" : "blue")}
          >
            To controll {selected} object
          </Button>
          <Button onClick={() => setUseCalc(!useCalc)}>
            {useCalc ? "Use Game Coordinates" : "Use Canvas Coordinates"}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface CalculateProps {
  name: string;
  input1: [number, number];
  input2: [number, number];
}

const Calculate = ({ name, input1, input2 }: CalculateProps) => {
  const [result, setResult] = useState<number>(0);

  const calc = (input1: [number, number], input2: [number, number]) => {
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

  const { a, b, getX, getY } = calc(input1, input2);

  return (
    <fieldset className="rounded-sm border p-2 max-w-xs flex flex-col">
      <legend>{name} - f(x) = ax + b</legend>
      <div className="flex flex-row">
        <PosInput label="a" value={a} />
        <PosInput label="b" value={b} />
      </div>
      <label>
        <span>Game {name}</span>
        <input
          className="border ml-2"
          type="number"
          value={result}
          onChange={(ev) => setResult(Number(ev.target.value))}
        />
      </label>
      <span>Result: {getX(result)}</span>
    </fieldset>
  );
};
