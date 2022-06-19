import { SelectOption } from "../components/Select";

export enum ObjectiveType {
    Nothing = 0,
    Hunt = 1,
    Capture = 257,
    Slay = 513,
    Damage = 32772,
    Slay_or_Damage = 98308,
    Slay_All = 262144,
    Slay_Total = 131072,
    Deliver = 2,
    Break_Part = 16388,
    Deliver_Flag = 4098,
    Esoteric_Action = 16
}

// export const objectiveType = [
//     { label: "Nothing", value: 0, },
//     { label: "Hunt", value: 1, },
//     { label: "Capture", value: 257, },
//     { label: "Slay", value: 513, },
//     { label: "Damage", value: 32772, },
//     { label: "Slay_or_Damage", value: 98308, },
//     { label: "Slay_All", value: 262144, },
//     { label: "Slay_Total", value: 131072, },
//     { label: "Deliver", value: 2, },
//     { label: "Break_Part", value: 16388, },
//     { label: "Deliver_Flag", value: 4098, },
//     { label: "Esoteric_Action", value: 16 },
// ];

export const objective_options: SelectOption[] = Object.entries(ObjectiveType)
    .filter(([, value]) => typeof value === 'number')
    .map(([label, value]) => ({
        label,
        value: value as number,
    }));