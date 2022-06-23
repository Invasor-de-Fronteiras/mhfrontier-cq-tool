import classNames from "classnames";
import { useWatch } from "react-hook-form";
import { createFilter } from "react-select";
import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { SelectField } from "../components/Select";
import { useEditor } from "../context/EditorContext";
import { monster_options } from "../utils";
import { item_options } from "../utils/items";

export function RewardsTab() {
  const { form } = useEditor();
  const rewardsTables = useWatch({
    control: form.control,
    name: "rewards",
  });

  if (!rewardsTables) return null;

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <GroupCard title="Rewards Focus">
        <SelectField
          name="quest_type_flags.rewards_focus.monster_id"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.item1"
          label="Item 1"
          options={item_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.item2"
          label="Item 2"
          options={item_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.item3"
          label="Item 3"
          options={item_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
      </GroupCard>
      {rewardsTables.map((table, tableIndex) => (
        <GroupCard
          key={table.table_header.table_id}
          title={`Reward Table ${table.table_header.table_id}`}
        >
          <table
            aria-label="Reward items"
            className="shadow-sm  w-full text-sm text-left"
          >
            <thead className="text-xs uppercase">
              <tr className="dark:text-white">
                <th role="columnheader" scope="col" className="px-6 py-4">
                  Item
                </th>
                <th role="columnheader" scope="col" className="px-6 py-4">
                  Quantity
                </th>
                <th role="columnheader" scope="col" className="px-6 py-4">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {table.items.map((item, itemIndex) => {
                return (
                  <tr
                    key={itemIndex}
                    className={classNames(
                      "hover:bg-emerald-300 cursor-pointer"
                    )}
                  >
                    <td className="px-6 py-3">
                      <SelectField
                        name={`rewards.${tableIndex}.items.${itemIndex}.item`}
                        label=""
                        options={item_options}
                        className="mt-2"
                        filterOption={createFilter({ ignoreAccents: false })}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <InputField
                        label=""
                        className="mt-0"
                        type="number"
                        name={`rewards.${tableIndex}.items.${itemIndex}.quantity`}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <InputField
                        label=""
                        className="mt-0"
                        type="number"
                        name={`rewards.${tableIndex}.items.${itemIndex}.rate`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GroupCard>
      ))}
    </div>
  );
}
