import { useMemo } from "react";
import { GroupCard } from "../components/CardGroup";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { useEditor, useGenQuestProp, useMainQuestProp } from "../context/EditorContext";
import { GenQuestProp, LargeMonsterSpawn, MainQuestProp, maps, monsters, QuestTypeFlags, quest_type_options, Variants } from "../utils";

export function QuestInfoTab() {
  const { data, onChangeData } = useEditor();
  const { genQuestProp, changeGenQuest } = useGenQuestProp();
  const { mainQuestProp, changeMainQuestProp } = useMainQuestProp();

  // const monster_class_selected = useMemo(() => {
  //   if (!data) return null;
  //   return quest_type_options.find(v => v.value === data.gen_quest_prop.monster_class_id) || null;
  // }, [data?.gen_quest_prop.monster_class_id]);

  if (!data) return null;
  
  // const changeGenQuest = (key: keyof GenQuestProp) => (value: number) => {
  //   onChangeData((prev) => ({
  //     ...prev,
  //     gen_quest_prop: {
  //       ...prev.gen_quest_prop,
  //       [key]: value,
  //     }
  //   }));
  // };
  
  const onChangeGenQuest = (key: keyof GenQuestProp) => (event: React.ChangeEvent<HTMLInputElement>) => {
    changeGenQuest((prev) => ({
      ...prev,
      [key]: (parseInt(event.target.value, 10))
    }));
  };

  // const changeQuestProp = (handler: (data: MainQuestProp) => MainQuestProp) => {
  //   onChangeData((prev) => ({
  //     ...prev,
  //     quest_type_flags: {
  //       ...prev.quest_type_flags,
  //       main_quest_prop: handler(prev.quest_type_flags.main_quest_prop),
  //     }
  //   }));
  // };

  const onChangeMainQuestProp = (key: keyof MainQuestProp) => (event: React.ChangeEvent<HTMLInputElement>) => {
    changeMainQuestProp((prev) => ({
      ...prev,
      [key]: parseInt(event.target.value, 10),
    }));
  };

  // const change =
  //   (key: keyof LargeMonsterSpawn) =>
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     changeVal(key)(parseInt(event.target.value, 10));
  //   };

  // const handleChangeMonster =
  //   (index: number) => (monster: LargeMonsterSpawn) => {
  //     onChangeData((prev) => ({
  //       ...prev,
  //       large_monster_spawns: prev.large_monster_spawns.map((v, i) =>
  //         i === index ? monster : v
  //       ),
  //     }));
  //   };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <GroupCard title="Quest">
        <Input
          label="Quest ID"
          type="number"
          onChange={onChangeMainQuestProp("quest_id")}
          value={mainQuestProp?.quest_id}
        />
        <Input
          label="Deathtime"
          type="number"
          onChange={onChangeMainQuestProp("deathtime")}
          value={mainQuestProp?.deathtime}
        />
        <Input
          label="Quest Fee"
          type="number"
          onChange={onChangeMainQuestProp("quest_fee")}
          value={mainQuestProp?.quest_fee}
        />
        <Input
          label="Quest Time"
          type="number"
          onChange={onChangeMainQuestProp("quest_time")}
          value={mainQuestProp?.quest_time}
        />
        {/* <Input
          label="Main rank points"
          type="number"
          onChange={onChangeMainQuestProp("deathtime")}
          value={mainQuestProp?.objectives}
        /> */}
      </GroupCard>
      <GroupCard title="Points">
        <Input
          label="Main rank points"
          type="number"
          onChange={onChangeGenQuest("main_rank_points")}
          value={data.gen_quest_prop.main_rank_points}
        />
        <Input
          label="Sub A rank points"
          type="number"
          onChange={onChangeGenQuest("sub_arank_points")}
          value={data.gen_quest_prop.sub_arank_points}
        />
        <Input
          label="Sub B rank points"
          type="number"
          onChange={onChangeGenQuest("sub_brank_points")}
          value={data.gen_quest_prop.sub_brank_points}
        />
      </GroupCard>
      <GroupCard title="Monsters">
        <Input
          label="Monster size multiplier"
          type="number"
          onChange={onChangeGenQuest("big_monster_size_multi")}
          value={data.gen_quest_prop.big_monster_size_multi}
        />
        <Input
          label="Monster size range"
          type="number"
          onChange={onChangeGenQuest("size_range")}
          value={data.gen_quest_prop.size_range}
        />
        <Input
          label="Monster Status table"
          type="number"
          onChange={onChangeGenQuest("mons_stat_table1")}
          value={data.gen_quest_prop.mons_stat_table1}
        />
        <Input
          label="Small Monster Status table"
          type="number"
          onChange={onChangeGenQuest("little_mons_stat_table")}
          value={data.gen_quest_prop.little_mons_stat_table}
        />
        <Select
          label="Monster class id"
          options={quest_type_options}
          onChange={(v) => changeGenQuest((prev) => ({
            ...prev,
            monster_class_id: v ? parseInt(v.value, 10) : 0
          }))}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
          value={(genQuestProp?.monster_class_id.toString()) || '0'}
        />
      </GroupCard>
    </div>
  );
}
