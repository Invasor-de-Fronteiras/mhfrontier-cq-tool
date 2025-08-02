import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { createFilter } from "react-select";
import { AllowedWeaponTypeField } from "../../components/AllowedWeaponType";
import { BitFlagsField } from "../../components/BitFlags";
import { GroupCard } from "../../components/CardGroup";
import { Checkbox } from "../../components/Checkbox";
import { Select, SelectField, SelectOption } from "../../components/Select";
import { useEditor } from "../../context/EditorContext";
import { arms_options, chest_options, equipeTypes, head_options, legs_options, melee, meleeTypes, range, rangeTypes, waist_options } from "../../utils/equips";
import { item_options } from "../../utils/items";

const getFormValue = (option: SelectOption) => option.value + 0x8000;

const setFormValue = (option: SelectOption) => option.value + 0x8000;

export function ForcedEquipmentTab() {
  const [weaponType, setWeaponType] = useState<string | null>(null);
  const { form } = useEditor();
  const forcedEquipment = useWatch({
    control: form.control,
    name: 'quest_type_flags.forced_equipement'
  });

  const { arms, chest, head, legs, waist, weapon } = useMemo(() => ({
    weapon: forcedEquipment.weapon_attach1or_bitmask >= 0x8000,
    head: forcedEquipment.head_attach1 >= 0x8000,
    chest: forcedEquipment.chest_attach1 >= 0x8000,
    arms: forcedEquipment.arms_attach1 >= 0x8000,
    waist: forcedEquipment.waist_attach1 >= 0x8000,
    legs: forcedEquipment.legs_attach1 >= 0x8000,
  }), [forcedEquipment]);

  const onEnableWeapon = (value: boolean) => {
    if (value) {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        weapon_attach1or_bitmask: 0x8000,
        weapon_attach2: 0x8000,
        weapon_attach3: 0x8000,
        weapon: 0
      });
    } else {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        weapon_attach1or_bitmask: 0,
        weapon_attach2: 0,
        weapon_attach3: 0,
        weapon: 0
      });
    }
  }

  const onEnableHead = (value: boolean) => {
    if (value) {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        head_attach1: 0x8000,
        head_attach2: 0x8000,
        head_attach3: 0x8000,
        head: 0
      });
    } else {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        head_attach1: 0,
        head_attach2: 0,
        head_attach3: 0,
        head: 0
      });
    }
  }

  const onEnableChest = (value: boolean) => {
    if (value) {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        chest_attach1: 0x8000,
        chest_attach2: 0x8000,
        chest_attach3: 0x8000,
        chest: 0
      });
    } else {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        chest_attach1: 0,
        chest_attach2: 0,
        chest_attach3: 0,
        chest: 0
      });
    }
  }

  const onEnableArms = (value: boolean) => {
    if (value) {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        arms_attach1: 0x8000,
        arms_attach2: 0x8000,
        arms_attach3: 0x8000,
        arms: 0
      });
    } else {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        arms_attach1: 0,
        arms_attach2: 0,
        arms_attach3: 0,
        arms: 0
      });
    }
  }

  const onEnableWaist = (value: boolean) => {
    if (value) {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        waist_attach1: 0x8000,
        waist_attach2: 0x8000,
        waist_attach3: 0x8000,
        waist: 0
      });
    } else {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        waist_attach1: 0,
        waist_attach2: 0,
        waist_attach3: 0,
        waist: 0
      });
    }
  }

  const onEnableLegs = (value: boolean) => {
    if (value) {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        legs_attach1: 0x8000,
        legs_attach2: 0x8000,
        legs_attach3: 0x8000,
        legs: 0
      });
    } else {
      form.setValue('quest_type_flags.forced_equipement', {
        ...forcedEquipment,
        legs_attach1: 0,
        legs_attach2: 0,
        legs_attach3: 0,
        legs: 0
      });
    }
  }

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
        <GroupCard title="Banned weapons">
          <BitFlagsField
            label="Banned weapons"
            name="quest_type_flags.allowed_equipment_bitmask"
            options={[
              { bitValue: 1, label: "Tower Weap" },
              { bitValue: 2, label: "Evolution Weapon (Ravi)" },
              { bitValue: 4, label: "Master's Weap" },
              { bitValue: 8, label: "HC Weap" },
              { bitValue: 16, label: "SP Weap" },
              { bitValue: 32, label: "RNGou Weap" },
              { bitValue: 64, label: "Gou Weap" },
              { bitValue: 128, label: "Heaven Weap" },
              { bitValue: 256, label: "Supremacy Weap" },
              { bitValue: 512, label: "G Supremacy Weap" },
              { bitValue: 1024, label: "Burst Weap" },
              { bitValue: 2048, label: "G Rank Weap" },
              { bitValue: 4096, label: "G Level Weap" },
              { bitValue: 8192, label: "Origin Weap" },
              { bitValue: 16384, label: "Other Weap" },
              { bitValue: 32768, label: "Exotic Weap" },
              { bitValue: 65536, label: "Prayer Weap" },
              { bitValue: 131072, label: "Zenith Weap" },
            ]}
            control={form.control}
          />
        </GroupCard>
        <GroupCard title="Forced Equipment">
          <div className="right-0 mt-3 mr-4">
            <Checkbox name="Weapon" label="Weapon" value={weapon} onChange={onEnableWeapon} />
            <Checkbox name="Head" label="Head" value={head} onChange={onEnableHead} />
            <Checkbox name="Chest" label="Chest" value={chest} onChange={onEnableChest} />
          </div>
          <div className="right-0 mt-3 mr-4">
            <Checkbox name="Arms" label="Arms" value={arms} onChange={onEnableArms} />
            <Checkbox name="Waist" label="Waist" value={waist} onChange={onEnableWaist} />
            <Checkbox name="Legs" label="Legs" value={legs} onChange={onEnableLegs} />
          </div>
        </GroupCard>
        <GroupCard title="Disable Weapons type">
          <AllowedWeaponTypeField
            name="quest_type_flags.forced_equipement.weapon_attach1or_bitmask"
            msFlag="quest_type_flags.skip3.2"
            control={form.control}
          />
        </GroupCard>
        <GroupCard title="Weapon">
          <Select
            label="Weapon Type"
            options={equipeTypes.map(v => ({ label: v, value: v }))}
            // value={weaponType}
            onChange={v => setWeaponType(v?.value || null)}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!weapon}
          />
          <SelectField
            label="Weapon"
            options={weaponOptions}
            name="quest_type_flags.forced_equipement.weapon"
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!weapon}
            control={form.control}
          />
          <SelectField
            label="Weapon Attach 1"
            name="quest_type_flags.forced_equipement.weapon_attach1or_bitmask"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!weapon}
            control={form.control}
          />
          <SelectField
            label="Weapon Attach 2"
            name="quest_type_flags.forced_equipement.weapon_attach2"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!weapon}
            control={form.control}
          />
          <SelectField
            label="Weapon Attach 3"
            name="quest_type_flags.forced_equipement.weapon_attach3"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!weapon}
            control={form.control}
          />
        </GroupCard>

        <GroupCard title="Head">
          <SelectField
            label="Head"
            options={head_options}
            name="quest_type_flags.forced_equipement.head"
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!head}
            control={form.control}
          />
          <SelectField
            label="Head Attach 1"
            name="quest_type_flags.forced_equipement.head_attach1"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!head}
            control={form.control}
          />
          <SelectField
            label="Head Attach 2"
            name="quest_type_flags.forced_equipement.head_attach2"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!head}
            control={form.control}
          />
          <SelectField
            label="Head Attach 3"
            name="quest_type_flags.forced_equipement.head_attach3"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!head}
            control={form.control}
          />
        </GroupCard>
        <GroupCard title="Chest">
          <SelectField
            label="Chest"
            options={chest_options}
            name="quest_type_flags.forced_equipement.chest"
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!chest}
            control={form.control}
          />
          <SelectField
            label="Chest Attach 1"
            name="quest_type_flags.forced_equipement.chest_attach1"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!chest}
            control={form.control}
          />
          <SelectField
            label="Chest Attach 2"
            name="quest_type_flags.forced_equipement.chest_attach2"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!chest}
            control={form.control}
          />
          <SelectField
            label="Chest Attach 3"
            name="quest_type_flags.forced_equipement.chest_attach3"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!chest}
            control={form.control}
          />
        </GroupCard>
        <GroupCard title="Arms">
          <SelectField
            label="Arms"
            options={arms_options}
            name="quest_type_flags.forced_equipement.arms"
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!arms}
            control={form.control}
          />
          <SelectField
            label="Arms Attach 1"
            name="quest_type_flags.forced_equipement.arms_attach1"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!arms}
            control={form.control}
          />
          <SelectField
            label="Arms Attach 2"
            name="quest_type_flags.forced_equipement.arms_attach2"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!arms}
            control={form.control}
          />
          <SelectField
            label="Arms Attach 3"
            name="quest_type_flags.forced_equipement.arms_attach3"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!arms}
            control={form.control}
          />
        </GroupCard>
        <GroupCard title="Waist">
          <SelectField
            label="Waist"
            options={waist_options}
            name="quest_type_flags.forced_equipement.waist"
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!waist}
            control={form.control}
          />
          <SelectField
            label="Waist Attach 1"
            name="quest_type_flags.forced_equipement.waist_attach1"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!waist}
            control={form.control}
          />
          <SelectField
            label="Waist Attach 2"
            name="quest_type_flags.forced_equipement.waist_attach2"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!waist}
            control={form.control}
          />
          <SelectField
            label="Waist Attach 3"
            name="quest_type_flags.forced_equipement.waist_attach3"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!waist}
            control={form.control}
          />
        </GroupCard>
        <GroupCard title="Legs">
          <SelectField
            label="Legs"
            options={legs_options}
            name="quest_type_flags.forced_equipement.legs"
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!legs}
            control={form.control}
          />
          <SelectField
            label="Legs Attach 1"
            name="quest_type_flags.forced_equipement.legs_attach1"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!legs}
            control={form.control}
          />
          <SelectField
            label="Legs Attach 2"
            name="quest_type_flags.forced_equipement.legs_attach2"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!legs}
            control={form.control}
          />
          <SelectField
            label="Legs Attach 3"
            name="quest_type_flags.forced_equipement.legs_attach3"
            options={item_options}
            getFormValue={getFormValue}
            setFormValue={setFormValue}
            filterOption={createFilter({ ignoreAccents: false })}
            isDisabled={!legs}
            control={form.control}
          />
        </GroupCard>
    </div>
  );
}
