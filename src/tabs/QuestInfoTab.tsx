import { createFilter } from "react-select";
import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { ObjectiveCard } from "../components/Objective";
import { PlayerSpawn } from "../components/PlayerSpawn";
import { SelectField } from "../components/Select";
import { locale_flags, monster_options } from "../utils";
import { item_options } from "../utils/items";
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
      </GroupCard>
      <GroupCard title="Objectives" >
        <div>
          <ObjectiveCard objective={1} />
          <ObjectiveCard objective={2} />
          <ObjectiveCard objective={3} />
        </div>
      </GroupCard>
      <GroupCard title="Reward">
        <InputField
          label="Reward Main"
          type="number"
          name="quest_type_flags.main_quest_prop.reward_main"
        />
        <InputField
          label="Reward A"
          type="number"
          name="quest_type_flags.main_quest_prop.reward_a"
        />
        <InputField
          label="Reward B"
          type="number"
          name="quest_type_flags.main_quest_prop.reward_b"
        />
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
      <GroupCard title="Monster Icons (Only for Diva Defense)">
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon1"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon2"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon3"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon4"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon5"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
      </GroupCard>
      <GroupCard title="Requirements">
        <SelectField
          label="Requirement"
          options={requirements}
          name="quest_type_flags.main_quest_prop.unkk"
        />
        <SelectField
          label="Required Item"
          name="quest_type_flags.variants.required_item_type"
          options={item_options}
          className="mt-2"
          filterOption={createFilter({ ignoreAccents: false })}
        />
        <InputField
          label="Required count"
          type="number"
          name="quest_type_flags.variants.required_item_count"
        />
      </GroupCard>
    </div>
  );
}
