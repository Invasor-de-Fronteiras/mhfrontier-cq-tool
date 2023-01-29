import classNames from "classnames";
import { useWatch } from 'react-hook-form';
import { Button } from "../../components/Button";
import { GroupCard } from "../../components/CardGroup";
import { useEditor } from "../../context/EditorContext";
import { LargeMonsterSpawn, maps } from "../../utils";
import { SmallMonsterSpawn } from "../../utils/quest-file/mapZones";

export function ApplyTemplateTab() {
  const { form } = useEditor();

  const mapZones = useWatch({
    control: form.control,
    name: "map_zones.map_zones",
  });

  const applyTextTemplate = () => {
    form.setValue('strings.title', "≪G★7 UL Sigil Quest≫\nMostre seu valor com [SNS]");
    form.setValue('strings.clear_reqs', "Achieve All Objectives");
    form.setValue('strings.contractor', "Arca");
    form.setValue('strings.description', "Quest feita para conseguir\nHiden Stamp, um item usado\npara sigil.\n\nProibido halk potion, NPCs e\narmas do Raviente.\n\nQuebre a parte Z ou \na quest ira falhar!");
    form.setValue('strings.fail_reqs', "Faint ３ Times or\nTime Runs Out or\nDon't break the Z parts");
    form.setValue('strings.main_objective', "Hunt１Anorupatisu");
    form.setValue('strings.sub_a_objective', "None");
    form.setValue('strings.sub_b_objective', "None");
  }

  const applySigilTemplate = () => {
    form.setValue('quest_type_flags.variants.quest_variant2', 34);
    form.setValue('quest_type_flags.skip3.0', 64);
    form.setValue('quest_type_flags.allowed_equipment_bitmask', 2);
    form.setValue('quest_type_flags.main_quest_prop.unkk', 130);
    form.setValue('quest_type_flags.variants.monster_variant0', 2);

    form.setValue('quest_type_flags.main_quest_prop.quest_time', 27000);

    form.setValue('rewards', [
      {
          "table_header": {
              "table_id": 1,
              "unk_0": 128,
              "unk_1": 0,
              "table_offset": 3134
          },
          "items": [
              {
                  "rate": 1,
                  "item": 15288,
                  "quantity": 1
              },
              {
                  "rate": 40,
                  "item": 0,
                  "quantity": 0
              },
          ]
      },
      {
          "table_header": {
              "table_id": 1,
              "unk_0": 128,
              "unk_1": 0,
              "table_offset": 3172
          },
          "items": [
              {
                  "rate": 1,
                  "item": 15268,
                  "quantity": 1
              },
              {
                  "rate": 40,
                  "item": 0,
                  "quantity": 1
              },
          ]
      },
      {
          "table_header": {
              "table_id": 2,
              "unk_0": 128,
              "unk_1": 0,
              "table_offset": 3204
          },
          "items": [
              {
                  "rate": 25,
                  "item": 14984,
                  "quantity": 1
              },
              {
                  "rate": 25,
                  "item": 15121,
                  "quantity": 1
              },
              {
                  "rate": 25,
                  "item": 16301,
                  "quantity": 1
              },
              {
                  "rate": 25,
                  "item": 15396,
                  "quantity": 1
              }
          ]
      }
    ]);
  }

  const disableNpcsAndHalk = () => {
    form.setValue('quest_type_flags.variants.quest_variant2', 34);
    form.setValue('quest_type_flags.main_quest_prop.unkk', 130);
  }

  const addMassiveMonsters = () => {
    const monsters: LargeMonsterSpawn[] = [];
    const map = maps[2];
    
    map.stages.forEach((v, areaIndex) => {
        if (areaIndex >= 10) {
            for (let i=0; i < areaIndex; i+=1) {
                monsters.push({
                    monster_id: 22,
                    unk0: 0,
                    unk1: 0,
                    unk2: 0,
                    spawn_amount: 1,
                    spawn_stage: v.id,
                    unk4: 0,
                    unk5: 0,
                    unk6: 0,
                    unk7: 0,
                    unk8: 51638,
                    unk9: 0,
                    unk10: 0,
                    unk11: 0,
                    unk12: 0,
                    x_position: 10000 + (i * 75),
                    y_position: 0,
                    z_position: 10000,
                });
            }
        }
    });

    form.setValue(`large_monster_spawns`, monsters);
  }

  const addMassiveSmallMonsters = () => {
    let toggle = 0;
    let size = 0;
    let y = 0;

    mapZones.map((mapZone, mapZoneIndex) => {
        mapZone.map_sections.map((mapSection, mapSectionIndex) => {
            const monsters: SmallMonsterSpawn[] = [];
            
            if (mapSectionIndex > 1) {

                for (let i=0; i < 20; i+=1) {
                    monsters.push({
                        monster_id: 7,
                        skip0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        skip1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        spawn_amount: 1,
                        spawn_toggle: toggle,
                        size: size,
                        unk0: 0,
                        unk1: 0,
                        unk2: 0,
                        x_position: 10000 + (i * 75),
                        y_position: y,
                        z_position: 9000 - (i * 75),
                    });
                    toggle += 1;
                    size += 20;
                    y += 200;
                }
            }

            form.setValue(
                `map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns`, 
                monsters
            );
        });
    });
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <GroupCard title="Templates" >
        <table
            aria-label="Quest monsters"
            className="shadow-sm  w-full text-sm text-left"
        >
            <thead className="text-xs uppercase">
                <tr className="dark:text-white">
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Template
                    </th>
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Description
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className={classNames("hover:bg-emerald-300 cursor-pointer")}>
                    <td className="px-6 py-4" scope="row">
                        <Button
                            type="button"
                            onClick={applyTextTemplate}
                        >
                            Apply Text Template
                        </Button>
                    </td>
                    <td className="px-6 py-4">
                        <p>Template for text (titles, descript, etc...)</p>
                    </td>
                </tr>
                <tr className={classNames("hover:bg-emerald-300 cursor-pointer hidden")}>
                    <td className="px-6 py-4" scope="row">
                        <Button
                            type="button"
                            onClick={applySigilTemplate}
                        >
                            Apply Sigil Template
                        </Button>
                    </td>
                    <td className="px-6 py-4">
                        <p>Force 1 weapon type</p>
                        <p>Disable npcs</p>
                        <p>Disable Halk Potion</p>
                        <p>Disable Ravient Weapons</p>
                        <p>Time 15min</p>
                    </td>
                </tr>
                <tr className={classNames("hover:bg-emerald-300 cursor-pointer")}>
                    <td className="px-6 py-4" scope="row">
                        <Button
                            type="button"
                            onClick={disableNpcsAndHalk}
                        >
                            Disable npcs and halk potion
                        </Button>
                    </td>
                    <td className="px-6 py-4">
                        <p>Disable npcs</p>
                        <p>Disable Halk Potion</p>
                    </td>
                </tr>
                <tr className={classNames("hover:bg-emerald-300 cursor-pointer hidden")}>
                    <td className="px-6 py-4" scope="row">
                        <Button
                            type="button"
                            onClick={addMassiveMonsters}
                        >
                            Add 200 Velocidrome
                        </Button>
                    </td>
                    <td className="px-6 py-4">
                        <p>Add 200 Velocidrome</p>
                    </td>
                </tr>
                <tr className={classNames("hover:bg-emerald-300 cursor-pointer hidden")}>
                    <td className="px-6 py-4" scope="row">
                        <Button
                            type="button"
                            onClick={addMassiveSmallMonsters}
                        >
                            Add Small monsters
                        </Button>
                    </td>
                    <td className="px-6 py-4">
                        <p> Add Small monsters</p>
                    </td>
                </tr>
            </tbody>
        </table>
      </GroupCard>
    </div>
  );
}
