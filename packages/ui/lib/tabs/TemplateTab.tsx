import classNames from "classnames";
import { Button } from "../components/Button";
import { GroupCard } from "../components/CardGroup";
import { useEditor } from "../context/EditorContext";

export function ApplyTemplateTab() {
  const { form } = useEditor();

  const applyTemplate1 = () => {
    form.setValue('quest_type_flags.variants.quest_variant2', 34);
    form.setValue('quest_type_flags.skip3.0', 64);
    form.setValue('quest_type_flags.allowed_equipment_bitmask', 2);
    form.setValue('quest_type_flags.main_quest_prop.unkk', 130);
    form.setValue('quest_type_flags.variants.monster_variant0', 2);

    form.setValue('quest_type_flags.main_quest_prop.quest_time', 27000);

    form.setValue('strings.title', "≪G★7 UL Sigil Quest≫\nMostre seu valor com [SNS]");
    form.setValue('strings.clear_reqs', "Achieve All Objectives");
    form.setValue('strings.contractor', "Arca");
    form.setValue('strings.description', "Quest feita para conseguir\nHiden Stamp, um item usado\npara sigil.\n\nProibido halk potion, NPCs e\narmas do Raviente.\n\nQuebre a parte Z ou \na quest ira falhar!");
    form.setValue('strings.fail_reqs', "Faint ３ Times or\nTime Runs Out or\nDon't break the Z parts");
    form.setValue('strings.main_objective', "Hunt１Anorupatisu");
    form.setValue('strings.sub_a_objective', "None");
    form.setValue('strings.sub_b_objective', "None");

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
                            onClick={applyTemplate1}
                        >
                            Apply Sigil Quest
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
            </tbody>
        </table>
      </GroupCard>
    </div>
  );
}
