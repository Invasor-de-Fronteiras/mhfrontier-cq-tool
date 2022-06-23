import { useWatch } from "react-hook-form";
import { createFilter } from "react-select";
import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { SelectField } from "../components/Select";
import { useEditor } from "../context/EditorContext";

import { item_options } from "../utils/items";

export function SupplyItemTab() {
  const { form } = useEditor();

  const supplyItems = useWatch({
    control: form.control,
    name: "supply_items",
  });

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <GroupCard title={`Supply Item Table`}>
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
            </tr>
          </thead>
          <tbody>
            {supplyItems.map((_item, slot_index) => {
              return (
                <tr
                  key={slot_index}
                  className="hover:bg-emerald-300 cursor-pointer"
                >
                  <td className="px-6 py-3">
                    <SelectField
                      name={`supply_items.${slot_index}.item`}
                      label="Item"
                      options={item_options}
                      className="mt-2"
                      filterOption={createFilter({ ignoreAccents: false })}
                    />
                  </td>
                  <td className="px-6 py-3">
                    <InputField
                      label="Quantity"
                      className="mt-0"
                      type="number"
                      name={`supply_items.${slot_index}.quantity`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </GroupCard>
    </div>
  );
}
