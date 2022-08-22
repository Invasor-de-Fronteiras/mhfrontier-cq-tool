export interface QuestStringsPointers {
    title: number;
    main_objective: number;
    sub_a_objective: number;
    sub_b_objective: number;
    clear_reqs: number;
    fail_reqs: number;
    contractor: number;
    description: number;
}

export interface QuestStrings {
    pointers: QuestStringsPointers,
    title: string;
    main_objective: string;
    sub_a_objective: string;
    sub_b_objective: string;
    clear_reqs: string;
    fail_reqs: string;
    contractor: string;
    description: string;
}
