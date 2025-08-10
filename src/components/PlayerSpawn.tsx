import { useMemo } from "react";
import { findMap } from "../utils";
import { SelectField } from "./Select";
import { useQuestEditor } from "../context/QuestEditorContext";
import { useWatch } from "react-hook-form";

const colors = [
    'Red',
    'Blue',
    'Yellow',
    'Purple'
];

export function PlayerSpawn() {
    const { form } = useQuestEditor();
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
        <div className="py-2 flex flex-row flex-wrap w-full">
            {(fields || []).map((v, i) => <SelectField
                label={`Player ${colors[i]} Area Spawn`}
                options={stages}
                isClearable
                onClearValue={0}
                control={form.control}
                name={`loaded_stages.${i}.stage_id`}
            />)}
            <SelectField
                label={`Player base camp return`}
                options={stages}
                isClearable
                onClearValue={0}
                control={form.control}
                name={`map_info.return_bc_id`}
            />
        </div>
    );
}
