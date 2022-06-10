import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { SelectField } from "../components/Select";
import { useEditor } from "../context/EditorContext";
import { quest_type_options } from "../utils";

export function QuestInfoTab() {
  const { form } = useEditor();

  const monster_class_id = useWatch({
    name: "gen_quest_prop.monster_class_id",
    control: form.control,
  });

  const monsterClassIdSelected = useMemo(
    () =>
      quest_type_options.find(
        (option) => option.value === String(monster_class_id)
      ),
    [monster_class_id]
  );

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <GroupCard title="Quest">
        <InputField
          label="Quest ID"
          type="number"
          name="quest_type_flags.main_quest_prop.quest_id"
        />
        <InputField
          label="Max Deaths"
          type="number"
          name="quest_type_flags.main_quest_prop.max_death"
        />
        <InputField
          label="Quest Fee"
          type="number"
          name="quest_type_flags.main_quest_prop.quest_fee"
        />
        <InputField
          label="Quest Time"
          type="number"
          name="quest_type_flags.main_quest_prop.quest_time"
        />
        {/* <InputField
          label="Main rank points"
          type="number"
          onChange={onChangeMainQuestProp("deathtime"
          value={mainQuestProp?.objectives}
        /> */}
      </GroupCard>
      <GroupCard title="Points">
        <InputField
          label="Main rank points"
          type="number"
          name="gen_quest_prop.main_rank_points"
        />
        <InputField
          label="Sub A rank points"
          type="number"
          name="gen_quest_prop.sub_arank_points"
        />
        <InputField
          label="Sub B rank points"
          type="number"
          name="gen_quest_prop.sub_brank_points"
        />
      </GroupCard>
      <GroupCard title="Monsters">
        <InputField
          label="Monster size multiplier"
          type="number"
          name="gen_quest_prop.big_monster_size_multi"
        />
        <InputField
          label="Monster size range"
          type="number"
          name="gen_quest_prop.size_range"
        />
        <InputField
          label="Monster Status table"
          type="number"
          name="gen_quest_prop.mons_stat_table1"
        />
        <InputField
          label="Small Monster Status table"
          type="number"
          name="gen_quest_prop.little_mons_stat_table"
        />
        <SelectField
          label="Monster class id"
          options={quest_type_options}
          name="gen_quest_prop.monster_class_id"
          value={monsterClassIdSelected}
        />
      </GroupCard>
    </div>
  );
}
