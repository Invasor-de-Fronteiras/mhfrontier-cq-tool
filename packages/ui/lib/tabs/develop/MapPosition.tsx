import { useMemo, useState } from "react";
import { PosInput } from "../../components/PosInput";

import { Button } from "../../components/Button";
import classNames from "classnames";
import { Select } from "../../components/Select";
import { maps } from "../../utils";
import { polynomial } from "../../utils/math";
import { MapPreview } from "../../components/MapPreview";

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
  const [useGameCoords, setUseGameCoords] = useState(false);

  const [objects, setObjects] = useState<Object[]>([
    {
      x: 34,
      y: 75,
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

      x: 94,
      y: 70,
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

  const [selectedMapId, setSelectedMapId] = useState<number>(maps[2].id);

  const selectedMap = useMemo(
    () => selectMaps.find((v) => v.value === selectedMapId),
    [selectMaps, selectedMapId]
  );

  const selectAreas = useMemo(() => {
    const map = maps.find((v) => v.id === selectedMap?.value);
    if (!map) return [];

    return map.stages.map((v) => ({
      value: v.id,
      label: v.areaNumber === 0 ? "Base" : `Area ${v.areaNumber}`,
    }));
  }, [selectedMap]);

  const [selectedAreaId, setSelectedAreaId] = useState<number>(0);

  const selectedArea = useMemo(
    () => selectAreas.find((v) => v.value === selectedAreaId),
    [selectAreas, selectedAreaId]
  );

  return (
    <div>
      <div className="grid grid-cols-2 m-2 gap-3">
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
      </div>
      <div className="flex flex-row gap-6 items-center justify-center">
        <MapPreview
          mapId={selectedMapId}
          areaId={selectedAreaId}
          shouldCalculate={useGameCoords}
          onChange={(obj) => {
            const data = useGameCoords
              ? { gamex: obj.x, gameY: obj.y }
              : { x: obj.x, y: obj.y };

            setObjects((prev) =>
              prev.map((v) => (v.name === obj.id ? { ...v, ...data } : v))
            );
          }}
          objects={objects.map((v) => ({
            id: v.name,
            x: useGameCoords ? v.gameX : v.x,
            y: useGameCoords ? v.gameY : v.y,
          }))}
        />
        <div className="flex flex-col justify-center gap-3">
          <Select
            label="Maps"
            options={selectMaps}
            value={selectedMap}
            onChange={(v) => setSelectedMapId(v!.value)}
          />
          <Select
            label="Area"
            options={selectAreas}
            value={selectedArea}
            onChange={(v) => setSelectedAreaId(v!.value)}
          />

          <Button onClick={() => setUseGameCoords(!useGameCoords)}>
            {useGameCoords ? "Use Canvas Coordinates" : "Use Game Coordinates"}
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

  const { a, b, getX, getY } = polynomial(input1, input2);

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
