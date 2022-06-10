export interface Quantity {
    gathering_tables_qty: number;
    unk0: number;
    area1zones: number;
    area2zones: number;
    area3zones: number;
    area4zones: number;
}

export interface GenQuestProp {
    big_monster_size_multi: number;
    size_range: number;
    mons_stat_table1: number;
    main_rank_points: number;
    kn: number;
    sub_arank_points: number;
    sub_brank_points: number;
    monster_class_id: number;
    // skip 4
    skip1: number[];
    little_mons_stat_table: number;
    // skip 9
    skip2: number[];
    quest_kn0: number;
    // skip 7
    skip3: number[];
    quest_kn1: number;
    quest_kn2: number;
    quest_kn3: number;
    quantity: Quantity,
    unk3: number;
    unk4: number;
    unk5: number;
}

