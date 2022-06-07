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

  const calcX = useCallback((x: number) => x / divisorX, [divisorX]);
  const calcY = useCallback((y: number) => y / divisorY, [divisorY]);

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
      <div className="flex gap-3 flex-wrap">
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
        <fieldset className="p-2 border rounded-sm w-min my-3 flex flex-row">
          <legend>Distance</legend>
          <fieldset>
            <legend>Map</legend>
            <PosInput label="X" value={objects[1].x - objects[0].x} />
            <PosInput label="Y" value={objects[1].y - objects[0].y} />
          </fieldset>
          <fieldset>
            <legend>Game</legend>
            <PosInput label="X" value={objects[1].gameX - objects[0].gameX} />
            <PosInput label="Y" value={objects[1].gameY - objects[0].gameY} />
          </fieldset>
          <fieldset>
            <legend>Calc</legend>
            <PosInput
              label="X"
              value={
                (objects[1].gameX - objects[0].gameX) /
                (objects[1].x - objects[0].x)
              }
            />
            <PosInput
              label="Y"
              value={
                (objects[1].gameY - objects[0].gameY) /
                (objects[1].y - objects[0].y)
              }
            />
          </fieldset>
        </fieldset>
        <fieldset className="p-2 border rounded-sm w-10 my-3 flex-1">
          <legend className="text-sm">Divisor's</legend>
          <div className="flex flex-col justify-center items-center gap-3 ">
            <PosInput
              label="X"
              value={divisorX}
              onChange={(e) => {
                setDivisorX(e.target.valueAsNumber);
              }}
            />
            <PosInput
              label="Y"
              value={divisorY}
              onChange={(e) => {
                setDivisorY(e.target.valueAsNumber);
              }}
            />
            <PosInput label="X" value={objects[0].gameX / divisorY} />
            <PosInput label="Y" value={objects[0].gameY / divisorY} />
          </div>
        </fieldset>
      </div>

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
