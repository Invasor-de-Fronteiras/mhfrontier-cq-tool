
export interface RewardItem {
    rate: number;
    item: number;
    quantity: number;
}


export interface RewardTableHeader {
    table_id: number;
    unk_0: number;
    unk_1: number;
    table_offset: number;
}


export interface RewardTable {
    table_header: RewardTableHeader,
    items: RewardItem[];
}