import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { ObjectiveCard } from "../components/Objective";
import { PlayerSpawn } from "../components/PlayerSpawn";
import { SelectField } from "../components/Select";
import { locale_flags, quest_type_options } from "../utils";
import { requirements } from "../utils/requirements";

export function QuestInfoTab() {
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
        <InputField
          label="Post rank min"
          type="number"
          name="quest_type_flags.main_quest_prop.post_rank_min"
        />
        <InputField
          label="Join rank min"
          type="number"
          name="quest_type_flags.main_quest_prop.join_rank_min"
        />
        <SelectField
          label="Locale flags"
          options={locale_flags}
          name="quest_type_flags.main_quest_prop.quest_locale_flags"
        />
        <SelectField
          label="Requirement"
          options={requirements}
          name="quest_type_flags.main_quest_prop.unkk"
        />
      </GroupCard>
      <GroupCard title="Objectives" >
        <div>
          <ObjectiveCard objective={1} />
          <ObjectiveCard objective={2} />
          <ObjectiveCard objective={3} />
        </div>
      </GroupCard>
      <GroupCard title="Reward Points">
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
      <GroupCard title="Player Spawn">
        <PlayerSpawn />
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
        />
      </GroupCard>
    </div>
  );
}
