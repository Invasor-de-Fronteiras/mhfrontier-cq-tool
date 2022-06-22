import { useMemo, useState } from "react";
import { createFilter } from "react-select";
import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { Select, SelectField, SelectOption } from "../components/Select";
import { arms_options, chest_options, equipeTypes, head_options, legs_options, melee, meleeTypes, range, rangeTypes, waist_options } from "../utils/equips";

export function ForcedEquipmentTab() {
  const [weaponType, setWeaponType] = useState<string | null>(null);

  const weaponOptions = useMemo<SelectOption[]>(
    () => {
      if (!weaponType) return [];
      if (meleeTypes.includes(weaponType)) return melee.filter(v => v.type === weaponType).map(v => ({ label: v.english, value: v.hex }));
      if (rangeTypes.includes(weaponType)) return range.filter(v => v.type === weaponType).map(v => ({ label: v.english, value: v.hex }));
      
      return [];
    },
    [weaponType, melee, range]
  );

  return (
    <div className="flex flex-row flex-wrap gap-2">
        <GroupCard title="Weapon">
          <InputField
            label="Allowed equipment bitmask"
            type="number"
            name="quest_type_flags.allowed_equipment_bitmask"
          />
        </GroupCard>
        <GroupCard title="Weapon">
          <Select
            label="Weapon Type"
            options={equipeTypes.map(v => ({ label: v, value: v }))}
            // value={weaponType}
            onChange={v => setWeaponType(v?.value || null)}
            filterOption={createFilter({ ignoreAccents: false })}
          />
          <SelectField
            label="Weapon"
            options={weaponOptions}
            name="quest_type_flags.forced_equipement.weapon"
            filterOption={createFilter({ ignoreAccents: false })}
          />
          <InputField
            label="Weapon Attach 1"
            type="number"
            name="quest_type_flags.forced_equipement.weapon_attach1or_bitmask"
          />
          <InputField
            label="Weapon Attach 2"
            type="number"
            name="quest_type_flags.forced_equipement.weapon_attach2"
          />
          <InputField
            label="Weapon Attach 3"
            type="number"
            name="quest_type_flags.forced_equipement.weapon_attach3"
          />
        </GroupCard>

        <GroupCard title="Head">
          <SelectField
            label="Head"
            options={head_options}
            name="quest_type_flags.forced_equipement.head"
            filterOption={createFilter({ ignoreAccents: false })}
          />
          <InputField
            label="Head Attach 1"
            type="number"
            name="quest_type_flags.forced_equipement.head_attach1"
          />
          <InputField
            label="Head Attach 2"
            type="number"
            name="quest_type_flags.forced_equipement.head_attach2"
          />
          <InputField
            label="Head Attach 3"
            type="number"
            name="quest_type_flags.forced_equipement.head_attach3"
          />
        </GroupCard>
        <GroupCard title="Chest">
          <SelectField
            label="Chest"
            options={chest_options}
            name="quest_type_flags.forced_equipement.chest"
            filterOption={createFilter({ ignoreAccents: false })}
          />
          <InputField
            label="Chest Attach 1"
            type="number"
            name="quest_type_flags.forced_equipement.chest_attach1"
          />
          <InputField
            label="Chest Attach 2"
            type="number"
            name="quest_type_flags.forced_equipement.chest_attach2"
          />
          <InputField
            label="Chest Attach 3"
            type="number"
            name="quest_type_flags.forced_equipement.chest_attach3"
          />
        </GroupCard>
        <GroupCard title="Arms">
          <SelectField
            label="Arms"
            options={arms_options}
            name="quest_type_flags.forced_equipement.arms"
            filterOption={createFilter({ ignoreAccents: false })}
          />
          <InputField
            label="Arms Attach 1"
            type="number"
            name="quest_type_flags.forced_equipement.arms_attach1"
          />
          <InputField
            label="Arms Attach 2"
            type="number"
            name="quest_type_flags.forced_equipement.arms_attach2"
          />
          <InputField
            label="Arms Attach 3"
            type="number"
            name="quest_type_flags.forced_equipement.arms_attach3"
          />
        </GroupCard>
        <GroupCard title="Waist">
          <SelectField
            label="Waist"
            options={waist_options}
            name="quest_type_flags.forced_equipement.waist"
            filterOption={createFilter({ ignoreAccents: false })}
          />
          <InputField
            label="Waist Attach 1"
            type="number"
            name="quest_type_flags.forced_equipement.waist_attach1"
          />
          <InputField
            label="Waist Attach 2"
            type="number"
            name="quest_type_flags.forced_equipement.waist_attach2"
          />
          <InputField
            label="Waist Attach 3"
            type="number"
            name="quest_type_flags.forced_equipement.waist_attach3"
          />
        </GroupCard>
        <GroupCard title="Legs">
          <SelectField
            label="Legs"
            options={legs_options}
            name="quest_type_flags.forced_equipement.legs"
            filterOption={createFilter({ ignoreAccents: false })}
          />
          <InputField
            label="Legs Attach 1"
            type="number"
            name="quest_type_flags.forced_equipement.legs_attach1"
          />
          <InputField
            label="Legs Attach 2"
            type="number"
            name="quest_type_flags.forced_equipement.legs_attach2"
          />
          <InputField
            label="Legs Attach 3"
            type="number"
            name="quest_type_flags.forced_equipement.legs_attach3"
          />
        </GroupCard>
    </div>
  );
}
