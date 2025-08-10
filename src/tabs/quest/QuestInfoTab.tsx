import { createFilter } from "react-select";
import { GroupCard } from "../../components/CardGroup";
import { InputField } from "../../components/Input";
import { ObjectiveCard } from "../../components/Objective";
import { PlayerSpawn } from "../../components/PlayerSpawn";
import { SelectField } from "../../components/Select";
import { locale_flags, monster_options, requirement_to_finish_quest } from "../../utils";
import { item_options } from "../../utils/items";
import { requirements } from "../../utils/requirements";
import { useQuestEditor } from "../../context/QuestEditorContext";
import { BitFlagField } from "../../components/BitFlags";

export function QuestInfoTab() {
  const { form } = useQuestEditor();

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <GroupCard title="Quest">
        <InputField
          label="Quest ID"
          type="number"
          name="quest_type_flags.main_quest_prop.quest_id"
          control={form.control}
        />
        <InputField
          label="Max Deaths"
          type="number"
          name="quest_type_flags.main_quest_prop.max_death"
          control={form.control}
        />
        <InputField
          label="Quest Fee"
          type="number"
          name="quest_type_flags.main_quest_prop.quest_fee"
          control={form.control}
        />
        <InputField
          label="Quest Time"
          type="number"
          name="quest_type_flags.main_quest_prop.quest_time"
          control={form.control}
        />
        <InputField
          label="Post rank min"
          type="number"
          name="quest_type_flags.main_quest_prop.post_rank_min"
          control={form.control}
        />
        <InputField
          label="Join rank min"
          type="number"
          name="quest_type_flags.main_quest_prop.join_rank_min"
          control={form.control}
        />
        <SelectField
          label="Locale flags"
          options={locale_flags}
          name="quest_type_flags.main_quest_prop.quest_locale_flags"
          control={form.control}
        />
        <div className="flex justify-center items-center m-2 gap-4">
          <BitFlagField
            label="Master Quest"
            bitValue={0b1000000}
            control={form.control}
            name="quest_type_flags.main_quest_prop.quest_locale_flags"
          />
          <BitFlagField
            label="Return in 20 seconds"
            bitValue={32}
            control={form.control}
            name="quest_type_flags.main_quest_prop.unk2"
          />
        </div>
      </GroupCard>
      <GroupCard title="Objectives" >
        <div className="w-full">
          <SelectField
            name="quest_type_flags.main_quest_prop.requirement_to_finish"
            label="Requirement to finish quest"
            options={requirement_to_finish_quest}
            className="mt-2 w-full max-w-lg"
            control={form.control}
          />
        </div>
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
          control={form.control}
        />
        <InputField
          label="Reward A"
          type="number"
          name="quest_type_flags.main_quest_prop.reward_a"
          control={form.control}
        />
        <InputField
          label="Reward B"
          type="number"
          name="quest_type_flags.main_quest_prop.reward_b"
          control={form.control}
        />
        <InputField
          label="Main rank points"
          type="number"
          name="gen_quest_prop.main_rank_points"
          control={form.control}
        />
        <InputField
          label="Sub A rank points"
          type="number"
          name="gen_quest_prop.sub_arank_points"
          control={form.control}
        />
        <InputField
          label="Sub B rank points"
          type="number"
          name="gen_quest_prop.sub_brank_points"
          control={form.control}
        />
      </GroupCard>
      <GroupCard title="Player Spawn">
        <div className="w-full">
          <SelectField
            name="gen_quest_prop.skip1.0"
            label="Player Spawn Flag"
            options={[
              { label: 'Fixed', value: 0 },
              { label: 'Random', value: 1 },
              { label: 'Monster Area', value: 2 },
            ]}
            className="mt-2 px-2 w-full"
            control={form.control}
          />
        </div>
        <PlayerSpawn />
      </GroupCard>
      <GroupCard title="Monster Icons (Only for Diva Defense)">
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon1"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
          control={form.control}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon2"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
          control={form.control}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon3"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
          control={form.control}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon4"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
          control={form.control}
        />
        <SelectField
          name="quest_type_flags.rewards_focus.monster_icon5"
          label="Monster"
          options={monster_options}
          className="mt-2 px-2"
          filterOption={createFilter({ ignoreAccents: false })}
          control={form.control}
        />
      </GroupCard>
      <GroupCard title="Requirements">
        <SelectField
          label="Requirement"
          options={requirements}
          name="quest_type_flags.main_quest_prop.unkk"
          control={form.control}
        />
        <SelectField
          label="Required Item"
          name="quest_type_flags.variants.required_item_type"
          options={item_options}
          className="mt-2"
          filterOption={createFilter({ ignoreAccents: false })}
          control={form.control}
        />
        <InputField
          label="Required count"
          type="number"
          name="quest_type_flags.variants.required_item_count"
          control={form.control}
        />
      </GroupCard>
    </div>
  );
}
