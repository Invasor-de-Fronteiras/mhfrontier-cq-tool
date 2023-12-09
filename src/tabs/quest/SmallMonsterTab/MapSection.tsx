import classNames from "classnames";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Button } from "../../../components/Button";
import { GroupCard } from "../../../components/CardGroup";
import { InputField } from "../../../components/Input";
import { SelectField } from "../../../components/Select";
import { useEditor } from "../../../context/EditorContext";
import { findMap, monster_options } from "../../../utils";
import { ActionButton } from "../../questlist/QuestlistTab/QuestlistRow";
import { SmallMonsterIndex } from "./SmallMonsterEdit";

interface MapSectionProps {
  mapZoneIndex: number;
  mapSectionIndex: number;
  onSelectSmallMonster: (value: SmallMonsterIndex) => void;
  onRemoveSection: (zone: number, section: number) => void;
}

export function MapSection({ mapSectionIndex, mapZoneIndex, onSelectSmallMonster, onRemoveSection }: MapSectionProps) {
  const { form } = useEditor();
  const mapId = useWatch({ control: form.control, name: "map_info.map_id" });

  const mapSection = useWatch({
    control: form.control,
    name: `map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}`,
  });

  const smallMonsters = useWatch({
    control: form.control,
    name: `map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns`,
  });

  const onAddMonster = () => {
    form.setValue(`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns`, [
      ...smallMonsters,
      { 
        monster_id: 0,
        skip0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        skip1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        spawn_amount: 1,
        spawn_toggle: 0,
        size: 100,
        unk0: 0,
        unk1: 0,
        unk2: 0,
        x_position: 0,
        y_position: 0,
        z_position: 0
      },
    ]);
  };

  const onRemoveMonster = (index: number) => {
    form.setValue(
      `map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns`,
      smallMonsters.filter((v, i) => i !== index));
  };

  const stage = useMemo(
    () => {
      if (!mapId) return null;
      const map = findMap(mapId);
      if (!map) return null;

      const result =  map.stages.find((v) => v.id === mapSection.header.loaded_stage);

      if (!result) return null;
      
      return result.areaNumber;
    },
    [mapId, mapSection]
  );

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
    <GroupCard title={stage || 'Unknow'} className="relative mb-4">
      <div className="mt-5 mr-4 mb-2 flex w-full justify-end items-center absolute right-0 top-0">
        <SelectField
          label=""
          options={stages}
          isClearable
          onClearValue={0}
          control={form.control}
          name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.header.loaded_stage`}
        />
        <ActionButton onClick={() => onRemoveSection(mapZoneIndex, mapSectionIndex)}>
          <MdDelete size={16} />
        </ActionButton>
      </div>
      <table
        aria-label="Quest monsters"
        className="shadow-sm w-full text-sm text-left mt-6"
      >
        <caption>click on which monster you want to edit</caption>
        <thead className="text-xs uppercase">
          <tr className="dark:text-white">
            <th role="columnheader" scope="col" className="px-6 py-4">
              Monster
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Monster ID
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Position X
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Position Y
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Position Z
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Amount
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Toggle
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="dark:text-white">
          {mapSection.small_monster_spawns.map((monster, i) => {
            return (
              <tr
                key={i}
                className={classNames("hover:bg-emerald-300 cursor-pointer")}
              >
                <th className="px-2 py-2 min-w-min dark:text-gray-400" scope="row">
                    <SelectField
                        options={monster_options}
                        isClearable
                        onClearValue={65535}
                        control={form.control}
                        className="min-w-[200px] dark:bg-slate-800"
                        name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${i}.monster_id`}
                    />
                </th>
                <td className="px-2 py-2">
                  <InputField
                    type="number"
                    name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${i}.monster_id`}
                    control={form.control}
                  />
                </td>
                <td className="px-2 py-2">
                  <InputField
                    type="number"
                    name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${i}.x_position`}
                    control={form.control}
                  />
                </td>
                <td className="px-2 py-2">
                  <InputField
                    type="number"
                    name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${i}.y_position`}
                    control={form.control}
                  />
                </td>
                <td className="px-2 py-2">
                  <InputField
                    type="number"
                    name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${i}.z_position`}
                    control={form.control}
                  />
                </td>
                <td className="px-2 py-2">
                  <InputField
                    type="number"
                    name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${i}.spawn_amount`}
                    control={form.control}
                  />
                </td>
                <td className="px-2 py-2">
                  <InputField
                    type="number"
                    name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${i}.spawn_toggle`}
                    control={form.control}
                  />
                </td>
                <td className="px-2 py-2 flex">
                  <ActionButton onClick={() => onSelectSmallMonster({ mapSectionIndex, mapZoneIndex, monsterIndex: i })}>
                    <MdModeEdit size={16} />
                  </ActionButton>
                  <ActionButton onClick={() => onRemoveMonster(i)}>
                    <MdDelete size={16}   />
                  </ActionButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Button type="button" onClick={onAddMonster}>Add Small Monster</Button>
      </div>
    </GroupCard>
  );
}
