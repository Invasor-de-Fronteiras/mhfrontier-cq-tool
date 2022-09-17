import classNames from "classnames";
import { useWatch } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { createFilter } from "react-select";
import { Button } from "../components/Button";
import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { SelectField } from "../components/Select";
import { useEditor } from "../context/EditorContext";
import { monster_options } from "../utils";
import { item_options } from "../utils/items";
import { ActionButton } from "./questlist/QuestlistRow";

export function RewardsTab() {
  const { form } = useEditor();
  const rewardsTables = useWatch({
    control: form.control,
    name: "rewards",
  });

  const onAddItem = (table: number) => () => {
    form.setValue(`rewards.${table}.items`, [
      ...rewardsTables[table].items,
      { item: 0, quantity: 0, rate: 0 },
    ]);
  };

  const onRemoveItem = (table: number, index: number) => () => {
    form.setValue(`rewards.${table}.items`, rewardsTables[table].items.filter((v, i) => i !== index));
  };


  const onAddTable = () => () => {
    form.setValue('rewards', [
      ...rewardsTables,
      {
        table_header: {
          table_id: 1,
          unk_0: 128,
          unk_1: 0,
          table_offset: 0
        },
        items: [],
      }
    ]);
  };

  const onRemoveTable = (index: number) => () => {
    form.setValue('rewards', rewardsTables.filter((v, i) => i !== index));
  };

  const onReorder = () => {
    form.setValue('rewards', rewardsTables.sort((a, b) => a.table_header.table_id - b.table_header.table_id));
  };

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
        <Button type="button" className="mt-5 mx-4" onClick={onAddTable()}>Add Table</Button>
        <Button type="button" className="mt-5 mr-4" onClick={onReorder}>Reorder</Button>
      </GroupCard>
      {rewardsTables.map((table, tableIndex) => (
        <GroupCard
          key={`${table.table_header.table_id}_${tableIndex}`}
          title={`Reward Table ${table.table_header.table_id}`}
        >
          <GroupCard title="Text" contentClass="grid grid-cols-6">
            <InputField
              label="ID"
              className="col-span-2"
              type="number"
              name={`rewards.${tableIndex}.table_header.table_id`}
            />
            <InputField
              label="Unk 0"
              className="col-span-2"
              type="number"
              name={`rewards.${tableIndex}.table_header.unk_0`}
            />
            <InputField
              label="Unk 1"
              className="col-span-2"
              type="number"
              name={`rewards.${tableIndex}.table_header.unk_1`}
            />
            <Button type="button" onClick={onAddItem(tableIndex)} >Add Item</Button>
            <Button type="button" onClick={onRemoveTable(tableIndex)} >Remove Table</Button>
          </GroupCard>
          
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
                    <td className="px-6 py-3">
                      <ActionButton onClick={onRemoveItem(tableIndex, itemIndex)}>
                          <MdDelete size={16} />
                      </ActionButton>
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
