import { useEffect, useMemo, useState } from "react";
import { PosInput, PosInputField } from "../../components/PosInput";

import { Button } from "../../components/Button";
import classNames from "classnames";
import { SelectField } from "../../components/Select";
import { maps } from "../../utils";
import { polynomial } from "../../utils/math";
import { MapPreview } from "../../components/MapPreview";
import { useForm, useWatch } from "react-hook-form";

export function MapPositionTab() {
  const [useGameCoords, setUseGameCoords] = useState(false);

  const form = useForm({
    defaultValues: {
      mapId: 1,
      mapStage: 10,
      pink: {
        x: 34,
        y: 75,
        gameX: 7400,
        gameY: 13000,
        name: "pink",
        canvasColor: "rgb(250,82,222)",
        color: "#fa52de",
      },
      red: {
        name: "red",
        canvasColor: "red",
        color: "red",

        x: 94,
        y: 70,
        gameX: 14300,
        gameY: 11300,
      },
    },
  });

  const selectedMapId = useWatch({ control: form.control, name: "mapId" });
  const selectedAreaId = useWatch({ control: form.control, name: "mapStage" });
  const pinkObject = useWatch({ control: form.control, name: "pink" });
  const redObject = useWatch({ control: form.control, name: "red" });

  const selectedMap = useMemo(
    () => maps.find((v) => String(v.id) === String(selectedMapId)),
    [maps, selectedMapId]
  );

  const selectAreas = useMemo(() => {
    const map = maps.find((v) => v.id === selectedMapId);
    if (!map) return [];

    return map.stages.map((v) => ({
      value: v.id,
      label: v.areaNumber === 0 ? "Base" : `Area ${v.areaNumber}`,
    }));
  }, [selectedMap, selectedMapId]);

  const selectedArea = useMemo(
    () => selectAreas.find((v) => v.value === selectedAreaId),
    [selectAreas, selectedAreaId]
  );

  useEffect(() => {
    form.setValue("mapStage", selectAreas[0]!.value ?? 0);
  }, [selectAreas]);

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      <div className="flex flex-row flex-wrap items-center justify-center gap-6">
        <MapPreview
          mapId={selectedMapId}
          areaId={selectedAreaId}
          shouldCalculate={useGameCoords}
          onChange={(obj) => {
            const id = obj.id as "pink" | "red";
            const prev = id === "pink" ? pinkObject : redObject;
            const data = {
              ...prev,
              ...(useGameCoords
                ? { gamex: obj.x, gameY: obj.y }
                : { x: obj.x, y: obj.y }),
            };

            form.setValue(id, data);
          }}
          objects={[pinkObject, redObject].map((v) => ({
            id: v.name,
            x: useGameCoords ? v.gameX : v.x,
            y: useGameCoords ? v.gameY : v.y,
          }))}
        />
        <div className="flex flex-col justify-center gap-3">
          <SelectField
            label="Maps"
            options={maps}
            getOptionLabel={(v) => v.name}
            getOptionValue={(v) => String(v.id)}
            getFormValue={(v) => v.id}
            value={selectedMap}
            control={form.control}
            name="mapId"
          />
          <SelectField
            label="Area"
            options={selectAreas}
            value={selectedArea}
            control={form.control}
            name="mapStage"
          />

          <Button onClick={() => setUseGameCoords(!useGameCoords)}>
            {useGameCoords ? "Use Canvas Coordinates" : "Use Game Coordinates"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap flex-row lg:flex-col m-2 gap-3">
        {[pinkObject, redObject].map((object, index) => {
          const id = object.name as "pink" | "red";

          return (
            <fieldset
              key={index}
              className={classNames(
                "flex gap-3 border-x border-t rounded-sm w-full md:w-10 p-2 flex-1",
                `border-b-[${object.color}] border-b-2`
              )}
            >
              <legend>{object.name}</legend>
              <fieldset>
                <legend className="text-sm">Image positions</legend>
                <PosInputField
                  label="X"
                  control={form.control}
                  name={`${id}.x`}
                />
                <PosInputField
                  label="Y"
                  control={form.control}
                  name={`${id}.y`}
                />
              </fieldset>
              <fieldset>
                <legend className="text-sm">Game positions</legend>
                <PosInputField
                  label="X"
                  control={form.control}
                  name={`${id}.gameX`}
                />
                <PosInputField
                  label="Y"
                  control={form.control}
                  name={`${id}.gameY`}
                />
              </fieldset>
            </fieldset>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3">
        <Calculate
          name="calcX"
          input1={[pinkObject.x, pinkObject.gameX]}
          input2={[redObject.x, redObject.gameX]}
        />
        <Calculate
          name="calcY"
          input1={[pinkObject.y, pinkObject.gameY]}
          input2={[redObject.y, redObject.gameY]}
        />
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

  const { a, b, getX } = polynomial(input1, input2);

  return (
    <fieldset className="rounded-sm border p-2 max-w-xs flex flex-col">
      <legend>{name} - f(x) = ax + b</legend>
      <div className="flex flex-row">
        <PosInput label="a" value={a} />
        <PosInput label="b" value={b} />
      </div>
      <label className="border p-2">
        <span>Game {name}</span>
        <input
          id="input"
          className="border ml-2 w-20"
          type="number"
          value={result}
          onChange={(ev) => setResult(Number(ev.target.value))}
        />

        <output htmlFor="input" className="text-xs">
          {getX(result)}
        </output>
      </label>
      <div className="flex flex-row flex-wrap gap-3 justify-center mt-3">
        <span
          className={classNames("text-green-500 border p-2 w-full", {
            "text-red-500": getX(input1[1]) !== input1[0],
          })}
        >
          f({input1[0]}) = {input1[1]}
          <br />
          Result rosa: {getX(input1[1])}
        </span>
        <span
          className={classNames("text-green-500 border p-2 w-full", {
            "text-red-500": getX(input2[1]) !== input2[0],
          })}
        >
          f({input2[0]}) = {input2[1]}
          <br />
          Result red: {getX(input2[1])}
        </span>
      </div>
    </fieldset>
  );
};
