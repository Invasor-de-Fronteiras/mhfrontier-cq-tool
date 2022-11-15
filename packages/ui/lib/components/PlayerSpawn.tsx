import { useMemo } from "react";
import { findMap } from "../utils";
import { SelectField } from "./Select";
import { useEditor } from "../context/EditorContext";
import { useWatch } from "react-hook-form";

export function PlayerSpawn() {
    const { form } = useEditor();
    const mapId = useWatch({ control: form.control, name: "map_info.map_id" });
    const fields = useWatch({
        control: form.control,
        name: "loaded_stages",
    });

    const stages = useMemo(
        () => {
            if (!mapId) return [];
            const map = findMap(mapId);
            if (!map) return [];

            return map.stages.map((v) => ({
                value: v.id,
                label: v.areaNumber,
            }));
        },
        [mapId]
    );

    return (
        <div className="px-2 py-2 flex flex-row flex-wrap w-full">
            {fields.map((v, i) => <SelectField
                label={`Player Area Spawn ${i + 1}`}
                options={stages}
                isClearable
                onClearValue={0}
                control={form.control}
                name={`loaded_stages.${i}.stage_id`}
            />)}

        </div>
    );
}
