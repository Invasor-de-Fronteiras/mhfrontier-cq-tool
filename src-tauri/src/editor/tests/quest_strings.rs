use crate::editor::quest::quest_file::QuestFile;
use crate::editor::tests::utils::{prepare_mock_files, MOCK_QUEST};

#[test]
pub fn load_strings() {
    prepare_mock_files();
    let quest = QuestFile::from_path(MOCK_QUEST).unwrap();

    assert_eq!(
        quest.strings.title,
        String::from(
            "≪Ｇ★７花畑探索≫
百花の地に舞降りし華鳳鳥"
        )
    );

    assert_eq!(
        quest.strings.clear_reqs,
        String::from("メインターゲットの達成")
    );
    assert_eq!(quest.strings.contractor, String::from("ハンターズギルド"));
    assert_eq!(
        quest.strings.description,
        String::from(
            "花畑に≪フォロクルル≫がa
現れました。報告によれば蜜
を摂取し体質変化させる、
非常に珍しいモンスターのよ
うです。調査の協力をお願い
します。また、花畑の獣人族
ですが、ハンターを敵視して
いる様子はなく危険は少ない
という報告も届いています。A"
        )
    );
    assert_eq!(
        quest.strings.fail_reqs,
        String::from(
            "３回力尽きる
タイムアップ"
        )
    );
    assert_eq!(
        quest.strings.main_objective,
        String::from("フォロクルル１頭の狩猟")
    );
    assert_eq!(quest.strings.sub_a_objective, String::from("なし"));
    assert_eq!(quest.strings.sub_b_objective, String::from("なし"));
}
