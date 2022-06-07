interface Polynomial {
  a: number;
  b: number;
}

interface MapStage {
  id: number;
  areaNumber: number;
  calculationX?: Polynomial;
  calculationY?: Polynomial;
}

interface Map {
  id: number;
  name: string;
  stages: MapStage[];
}

export const maps: Map[] = [
  { id: 0, name: "Unknown", stages: [] },
  {
    id: 1,
    name: "Siege Fortress Day",
    stages: [
      { id: 10, areaNumber: 0 },
      { id: 14, areaNumber: 1 },
      { id: 30, areaNumber: 2 },
      { id: 28, areaNumber: 3 },
      { id: 11, areaNumber: 4 },
      { id: 12, areaNumber: 5 },
      { id: 31, areaNumber: 6 },
    ],
  },
  {
    id: 2,
    name: "Forest and Hills Day",
    stages: [
      { id: 21, areaNumber: 0 },
      { id: 32, areaNumber: 1 },
      { id: 33, areaNumber: 2 },
      { id: 34, areaNumber: 3 },
      { id: 35, areaNumber: 4 },
      { id: 36, areaNumber: 5 },
      { id: 37, areaNumber: 6 },
      { id: 38, areaNumber: 7 },
      { id: 39, areaNumber: 8 },
      { id: 40, areaNumber: 9 },
      { id: 41, areaNumber: 10 },
      { id: 42, areaNumber: 11 },
      { id: 43, areaNumber: 12 },
    ],
  },
  {
    id: 3,
    name: "Desert Day",
    stages: [
      { id: 140, areaNumber: 0 },
      { id: 141, areaNumber: 1 },
      { id: 142, areaNumber: 2 },
      { id: 143, areaNumber: 3 },
      { id: 144, areaNumber: 4 },
      { id: 145, areaNumber: 5 },
      { id: 146, areaNumber: 6 },
      { id: 147, areaNumber: 7 },
      { id: 148, areaNumber: 8 },
      { id: 149, areaNumber: 9 },
      { id: 150, areaNumber: 10 },
      { id: 7, areaNumber: 11 },
    ],
  },
  {
    id: 4,
    name: "Swamp Day",
    stages: [
      { id: 151, areaNumber: 0 },
      { id: 152, areaNumber: 1 },
      { id: 153, areaNumber: 2 },
      { id: 154, areaNumber: 3 },
      { id: 155, areaNumber: 4 },
      { id: 156, areaNumber: 5 },
      { id: 157, areaNumber: 6 },
      { id: 158, areaNumber: 7 },
      { id: 159, areaNumber: 8 },
      { id: 160, areaNumber: 9 },
      { id: 9, areaNumber: 10 },
    ],
  },
  {
    id: 5,
    name: "Volcano Day",
    stages: [
      { id: 161, areaNumber: 0 },
      { id: 162, areaNumber: 1 },
      { id: 163, areaNumber: 2 },
      { id: 164, areaNumber: 3 },
      { id: 165, areaNumber: 4 },
      { id: 166, areaNumber: 5 },
      { id: 167, areaNumber: 6 },
      { id: 168, areaNumber: 7 },
      { id: 169, areaNumber: 8 },
      { id: 74, areaNumber: 9 },
    ],
  },
  {
    id: 6,
    name: "Jungle Day",
    stages: [
      {
        id: 110,
        areaNumber: 0,

        calculationX: {
          a: 0.009878628495810688,
          b: 7399.673635052247,
        },
        calculationY: {
          a: 0.0058823529411764705,
          b: 12999.491176470588,
        },
      },
      { id: 111, areaNumber: 1 },
      { id: 112, areaNumber: 2 },
      { id: 113, areaNumber: 3 },
      { id: 114, areaNumber: 4 },
      { id: 115, areaNumber: 5 },
      { id: 116, areaNumber: 6 },
      { id: 117, areaNumber: 7 },
      { id: 118, areaNumber: 8 },
      { id: 119, areaNumber: 9 },
      { id: 120, areaNumber: 10 },
    ],
  },
  {
    id: 7,
    name: "Castle Schrade",
    stages: [
      { id: 25, areaNumber: 0 },
      { id: 20, areaNumber: 1 },
    ],
  },
  {
    id: 8,
    name: "Crimson Battleground",
    stages: [
      { id: 8, areaNumber: 0 },
      { id: 88, areaNumber: 1 },
    ],
  },
  {
    id: 9,
    name: "Arena with Ledge Day",
    stages: [
      { id: 89, areaNumber: 0 },
      { id: 90, areaNumber: 1 },
    ],
  },
  {
    id: 10,
    name: "Arena with Pillar Day",
    stages: [
      { id: 89, areaNumber: 0 },
      { id: 91, areaNumber: 1 },
    ],
  },
  {
    id: 11,
    name: "Snowy Mountains Day",
    stages: [
      { id: 98, areaNumber: 0 },
      { id: 92, areaNumber: 1 },
      { id: 93, areaNumber: 2 },
      { id: 94, areaNumber: 3 },
      { id: 95, areaNumber: 4 },
      { id: 96, areaNumber: 5 },
      { id: 97, areaNumber: 6 },
      { id: 99, areaNumber: 7 },
      { id: 100, areaNumber: 8 },
      { id: 6, areaNumber: 9 },
    ],
  },
  {
    id: 12,
    name: "Town Siege Day",
    stages: [
      { id: 179, areaNumber: 0 },
      { id: 176, areaNumber: 1 },
      { id: 177, areaNumber: 2 },
      { id: 178, areaNumber: 3 },
    ],
  },
  {
    id: 13,
    name: "Tower 1",
    stages: [
      { id: 121, areaNumber: 0 },
      { id: 122, areaNumber: 1 },
      { id: 123, areaNumber: 2 },
      { id: 130, areaNumber: 3 },
      { id: 128, areaNumber: 4 },
      { id: 129, areaNumber: 5 },
      { id: 127, areaNumber: 6 },
      { id: 125, areaNumber: 7 },
    ],
  },
  {
    id: 14,
    name: "Tower 2",
    stages: [
      { id: 129, areaNumber: 0 },
      { id: 122, areaNumber: 1 },
      { id: 125, areaNumber: 2 },
      { id: 127, areaNumber: 3 },
    ],
  },
  {
    id: 15,
    name: "Tower 3",
    stages: [
      { id: 83, areaNumber: 0 },
      { id: 84, areaNumber: 1 },
      { id: 122, areaNumber: 2 },
      { id: 123, areaNumber: 3 },
      { id: 124, areaNumber: 4 },
      { id: 125, areaNumber: 5 },
      { id: 127, areaNumber: 6 },
      { id: 128, areaNumber: 7 },
      { id: 129, areaNumber: 8 },
      { id: 130, areaNumber: 9 },
    ],
  },
  {
    id: 16,
    name: "Forest and Hills Night",
    stages: [
      { id: 21, areaNumber: 0 },
      { id: 32, areaNumber: 1 },
      { id: 33, areaNumber: 2 },
      { id: 34, areaNumber: 3 },
      { id: 35, areaNumber: 4 },
      { id: 36, areaNumber: 5 },
      { id: 37, areaNumber: 6 },
      { id: 38, areaNumber: 7 },
      { id: 39, areaNumber: 8 },
      { id: 40, areaNumber: 9 },
      { id: 41, areaNumber: 10 },
      { id: 42, areaNumber: 11 },
      { id: 43, areaNumber: 12 },
    ],
  },
  {
    id: 17,
    name: "Desert Night",
    stages: [
      { id: 45, areaNumber: 0 },
      { id: 47, areaNumber: 1 },
      { id: 48, areaNumber: 2 },
      { id: 49, areaNumber: 3 },
      { id: 50, areaNumber: 4 },
      { id: 51, areaNumber: 5 },
      { id: 52, areaNumber: 6 },
      { id: 53, areaNumber: 7 },
      { id: 54, areaNumber: 8 },
      { id: 55, areaNumber: 9 },
      { id: 56, areaNumber: 10 },
    ],
  },
  {
    id: 18,
    name: "Swamp Night",
    stages: [
      { id: 16, areaNumber: 0 },
      { id: 44, areaNumber: 1 },
      { id: 67, areaNumber: 2 },
      { id: 68, areaNumber: 3 },
      { id: 69, areaNumber: 4 },
      { id: 73, areaNumber: 5 },
      { id: 75, areaNumber: 6 },
      { id: 29, areaNumber: 7 },
    ],
  },
  {
    id: 19,
    name: "Volcano Night",
    stages: [
      { id: 58, areaNumber: 0 },
      { id: 59, areaNumber: 1 },
      { id: 60, areaNumber: 2 },
      { id: 61, areaNumber: 3 },
      { id: 62, areaNumber: 4 },
      { id: 63, areaNumber: 5 },
      { id: 64, areaNumber: 6 },
      { id: 65, areaNumber: 7 },
      { id: 74, areaNumber: 8 },
    ],
  },
  {
    id: 20,
    name: "Jungle Night",
    stages: [
      { id: 1, areaNumber: 0 },
      { id: 2, areaNumber: 1 },
      { id: 3, areaNumber: 2 },
      { id: 4, areaNumber: 3 },
      { id: 5, areaNumber: 4 },
      { id: 18, areaNumber: 5 },
      { id: 19, areaNumber: 6 },
      { id: 22, areaNumber: 7 },
      { id: 23, areaNumber: 8 },
      { id: 26, areaNumber: 9 },
    ],
  },
  {
    id: 21,
    name: "Snowy Mountains Night",
    stages: [
      { id: 107, areaNumber: 0 },
      { id: 101, areaNumber: 1 },
      { id: 102, areaNumber: 2 },
      { id: 103, areaNumber: 3 },
      { id: 104, areaNumber: 4 },
      { id: 105, areaNumber: 5 },
      { id: 106, areaNumber: 6 },
      { id: 108, areaNumber: 7 },
      { id: 109, areaNumber: 8 },
      { id: 15, areaNumber: 9 },
    ],
  },
  {
    id: 22,
    name: "Town Siege night",
    stages: [{ id: 183, areaNumber: 0 }],
  },
  {
    id: 23,
    name: "Siege Fortress Night",
    stages: [
      { id: 79, areaNumber: 0 },
      { id: 14, areaNumber: 1 },
      { id: 30, areaNumber: 2 },
      { id: 28, areaNumber: 3 },
      { id: 11, areaNumber: 4 },
      { id: 12, areaNumber: 5 },
      { id: 31, areaNumber: 6 },
    ],
  },
  {
    id: 24,
    name: "Arena with Ledge Night",
    stages: [
      { id: 46, areaNumber: 0 },
      { id: 90, areaNumber: 1 },
    ],
  },
  {
    id: 25,
    name: "Arena with Pillar Night",
    stages: [
      { id: 46, areaNumber: 0 },
      { id: 91, areaNumber: 1 },
    ],
  },
  {
    id: 26,
    name: "Great Forest Day",
    stages: [
      { id: 224, areaNumber: 0 },
      { id: 226, areaNumber: 1 },
      { id: 228, areaNumber: 2 },
      { id: 230, areaNumber: 3 },
      { id: 232, areaNumber: 4 },
      { id: 234, areaNumber: 5 },
      { id: 236, areaNumber: 6 },
      { id: 238, areaNumber: 7 },
      { id: 240, areaNumber: 8 },
    ],
  },
  {
    id: 27,
    name: "Great Forest Night",
    stages: [
      { id: 225, areaNumber: 0 },
      { id: 227, areaNumber: 1 },
      { id: 229, areaNumber: 2 },
      { id: 231, areaNumber: 3 },
      { id: 233, areaNumber: 4 },
      { id: 235, areaNumber: 5 },
      { id: 237, areaNumber: 6 },
      { id: 239, areaNumber: 7 },
      { id: 241, areaNumber: 8 },
    ],
  },
  {
    id: 28,
    name: "Volcano 2 Day",
    stages: [
      { id: 161, areaNumber: 0 },
      { id: 59, areaNumber: 1 },
      { id: 60, areaNumber: 2 },
      { id: 61, areaNumber: 3 },
      { id: 60, areaNumber: 4 },
      { id: 62, areaNumber: 5 },
      { id: 63, areaNumber: 6 },
      { id: 64, areaNumber: 7 },
      { id: 65, areaNumber: 8 },
      { id: 27, areaNumber: 9 },
      { id: 221, areaNumber: 10 },
      { id: 223, areaNumber: 11 },
    ],
  },
  {
    id: 29,
    name: "Volcano 2 Night",
    stages: [
      { id: 58, areaNumber: 0 },
      { id: 59, areaNumber: 1 },
      { id: 60, areaNumber: 2 },
      { id: 61, areaNumber: 3 },
      { id: 62, areaNumber: 4 },
      { id: 63, areaNumber: 5 },
      { id: 64, areaNumber: 6 },
      { id: 65, areaNumber: 7 },
      { id: 27, areaNumber: 8 },
      { id: 221, areaNumber: 9 },
      { id: 223, areaNumber: 10 },
    ],
  },
  {
    id: 30,
    name: "Jungle Dream",
    stages: [{ id: 120, areaNumber: 0 }],
  },
  {
    id: 31,
    name: "Gorge Day",
    stages: [
      { id: 288, areaNumber: 0 },
      { id: 290, areaNumber: 1 },
      { id: 292, areaNumber: 2 },
      { id: 294, areaNumber: 3 },
      { id: 296, areaNumber: 4 },
      { id: 298, areaNumber: 5 },
      { id: 300, areaNumber: 6 },
    ],
  },
  {
    id: 32,
    name: "Gorge Night",
    stages: [
      { id: 289, areaNumber: 0 },
      { id: 291, areaNumber: 1 },
      { id: 293, areaNumber: 2 },
      { id: 295, areaNumber: 3 },
      { id: 297, areaNumber: 4 },
      { id: 299, areaNumber: 5 },
      { id: 301, areaNumber: 6 },
    ],
  },
  {
    id: 35,
    name: "Battlefield Day",
    stages: [
      { id: 8, areaNumber: 0 },
      { id: 197, areaNumber: 1 },
    ],
  },
  {
    id: 44,
    name: "Top of Great Forest",
    stages: [
      { id: 245, areaNumber: 0 },
      { id: 246, areaNumber: 1 },
    ],
  },
  {
    id: 45,
    name: "Caravan Balloon Day",
    stages: [{ id: 258, areaNumber: 0 }],
  },
  {
    id: 46,
    name: "Caravan Balloon Night",
    stages: [{ id: 259, areaNumber: 0 }],
  },
  {
    id: 47,
    name: "Solitude Isle 1",
    stages: [
      { id: 311, areaNumber: 0 },
      { id: 314, areaNumber: 1 },
    ],
  },
  {
    id: 48,
    name: "Solitude Isle 2",
    stages: [
      { id: 311, areaNumber: 0 },
      { id: 317, areaNumber: 1 },
    ],
  },
  {
    id: 49,
    name: "Solitude Isle 3",
    stages: [
      { id: 311, areaNumber: 0 },
      { id: 320, areaNumber: 1 },
    ],
  },
  {
    id: 50,
    name: "Highlands Day",
    stages: [
      { id: 247, areaNumber: 0 },
      { id: 249, areaNumber: 1 },
      { id: 251, areaNumber: 2 },
      { id: 253, areaNumber: 3 },
      { id: 255, areaNumber: 4 },
      { id: 303, areaNumber: 5 },
      { id: 305, areaNumber: 6 },
      { id: 307, areaNumber: 7 },
    ],
  },
  {
    id: 51,
    name: "Highlands Night",
    stages: [
      { id: 248, areaNumber: 0 },
      { id: 250, areaNumber: 1 },
      { id: 252, areaNumber: 2 },
      { id: 254, areaNumber: 3 },
      { id: 302, areaNumber: 4 },
      { id: 304, areaNumber: 5 },
      { id: 306, areaNumber: 6 },
      { id: 308, areaNumber: 7 },
    ],
  },
  {
    id: 52,
    name: "Tower with Nesthole",
    stages: [
      { id: 121, areaNumber: 0 },
      { id: 122, areaNumber: 1 },
      { id: 125, areaNumber: 2 },
      { id: 127, areaNumber: 3 },
      { id: 129, areaNumber: 4 },
    ],
  },
  {
    id: 53,
    name: "Arena with Moat Day",
    stages: [
      { id: 280, areaNumber: 0 },
      { id: 13, areaNumber: 1 },
    ],
  },
  {
    id: 54,
    name: "Arena with Moat Night",
    stages: [
      { id: 281, areaNumber: 0 },
      { id: 17, areaNumber: 1 },
    ],
  },
  {
    id: 55,
    name: "Fortress Day",
    stages: [
      { id: 272, areaNumber: 0 },
      { id: 274, areaNumber: 1 },
      { id: 276, areaNumber: 2 },
      { id: 278, areaNumber: 3 },
    ],
  },
  {
    id: 56,
    name: "Fortress Night",
    stages: [
      { id: 273, areaNumber: 0 },
      { id: 275, areaNumber: 1 },
      { id: 277, areaNumber: 2 },
      { id: 279, areaNumber: 3 },
    ],
  },
  {
    id: 57,
    name: "Tidal Island Day",
    stages: [
      { id: 322, areaNumber: 0 },
      { id: 323, areaNumber: 1 },
      { id: 324, areaNumber: 2 },
      { id: 325, areaNumber: 3 },
      { id: 335, areaNumber: 4 },
    ],
  },
  {
    id: 58,
    name: "Tidal Island Night",
    stages: [
      { id: 330, areaNumber: 0 },
      { id: 331, areaNumber: 1 },
      { id: 332, areaNumber: 2 },
      { id: 333, areaNumber: 3 },
      { id: 339, areaNumber: 4 },
    ],
  },
  {
    id: 60,
    name: "Polar Sea Day",
    stages: [
      { id: 345, areaNumber: 0 },
      { id: 347, areaNumber: 1 },
      { id: 349, areaNumber: 2 },
      { id: 351, areaNumber: 3 },
      { id: 353, areaNumber: 4 },
      { id: 355, areaNumber: 5 },
      { id: 357, areaNumber: 6 },
    ],
  },
  {
    id: 61,
    name: "Polar Sea Night",
    stages: [
      { id: 346, areaNumber: 0 },
      { id: 348, areaNumber: 1 },
      { id: 350, areaNumber: 2 },
      { id: 352, areaNumber: 3 },
      { id: 354, areaNumber: 4 },
      { id: 356, areaNumber: 5 },
      { id: 358, areaNumber: 6 },
    ],
  },
  {
    id: 62,
    name: "World's End",
    stages: [
      { id: 359, areaNumber: 0 },
      { id: 360, areaNumber: 1 },
    ],
  },
  {
    id: 63,
    name: "Large Airship",
    stages: [{ id: 343, areaNumber: 0 }],
  },
  {
    id: 64,
    name: "Flower Field Day",
    stages: [
      { id: 361, areaNumber: 0 },
      { id: 363, areaNumber: 1 },
      { id: 365, areaNumber: 2 },
      { id: 367, areaNumber: 3 },
      { id: 369, areaNumber: 4 },
      { id: 371, areaNumber: 5 },
    ],
  },
  {
    id: 65,
    name: "Flower Field Night",
    stages: [
      { id: 362, areaNumber: 0 },
      { id: 364, areaNumber: 1 },
      { id: 366, areaNumber: 2 },
      { id: 368, areaNumber: 3 },
      { id: 370, areaNumber: 4 },
      { id: 372, areaNumber: 5 },
    ],
  },
  {
    id: 66,
    name: "Deep Crater",
    stages: [
      { id: 374, areaNumber: 0 },
      { id: 380, areaNumber: 1 },
    ],
  },
  {
    id: 67,
    name: "Bamboo Forest Day",
    stages: [
      { id: 375, areaNumber: 0 },
      { id: 377, areaNumber: 1 },
    ],
  },
  {
    id: 68,
    name: "Bamboo Forest Night",
    stages: [
      { id: 376, areaNumber: 0 },
      { id: 378, areaNumber: 1 },
    ],
  },
  {
    id: 69,
    name: "Battlefield 2 Day",
    stages: [
      { id: 8, areaNumber: 0 },
      { id: 396, areaNumber: 1 },
    ],
  },
  { id: 70, name: "Unimplemented map", stages: [] },
  {
    id: 71,
    name: "1st Dist Tower 1",
    stages: [
      { id: 391, areaNumber: 0 },
      { id: 392, areaNumber: 1 },
      { id: 399, areaNumber: 2 },
    ],
  },
  {
    id: 72,
    name: "1st Dist Tower 2",
    stages: [
      { id: 391, areaNumber: 0 },
      { id: 392, areaNumber: 1 },
      { id: 399, areaNumber: 2 },
    ],
  },
  {
    id: 73,
    name: "2nd Dist Tower 1",
    stages: [
      { id: 391, areaNumber: 0 },
      { id: 392, areaNumber: 1 },
      { id: 414, areaNumber: 2 },
    ],
  },
  {
    id: 74,
    name: "2nd Dist Tower 2",
    stages: [
      { id: 391, areaNumber: 0 },
      { id: 392, areaNumber: 1 },
      { id: 414, areaNumber: 2 },
    ],
  },
  {
    id: 75,
    name: "Urgent Tower",
    stages: [
      { id: 391, areaNumber: 0 },
      { id: 392, areaNumber: 1 },
      { id: 399, areaNumber: 2 },
    ],
  },
  {
    id: 76,
    name: "3rd Dist Tower 1",
    stages: [
      { id: 391, areaNumber: 0 },
      { id: 392, areaNumber: 1 },
      { id: 399, areaNumber: 2 },
    ],
  },
  {
    id: 77,
    name: "3rd Dist Tower 2",
    stages: [
      { id: 391, areaNumber: 0 },
      { id: 392, areaNumber: 1 },
      { id: 399, areaNumber: 2 },
    ],
  },
  {
    id: 78,
    name: "4th Dist Tower",
    stages: [
      { id: 391, areaNumber: 0 },
      { id: 392, areaNumber: 1 },
      { id: 399, areaNumber: 2 },
    ],
  },
  {
    id: 79,
    name: "White Lake Day",
    stages: [
      { id: 400, areaNumber: 0 },
      { id: 402, areaNumber: 1 },
      { id: 404, areaNumber: 2 },
      { id: 406, areaNumber: 3 },
      { id: 408, areaNumber: 4 },
      { id: 410, areaNumber: 5 },
    ],
  },
  {
    id: 80,
    name: "White Lake Night",
    stages: [
      { id: 401, areaNumber: 0 },
      { id: 403, areaNumber: 1 },
      { id: 405, areaNumber: 2 },
      { id: 407, areaNumber: 3 },
      { id: 409, areaNumber: 4 },
      { id: 411, areaNumber: 5 },
    ],
  },
  {
    id: 81,
    name: "Solitude Depths Slay 1",
    stages: [
      { id: 417, areaNumber: 0 },
      { id: 418, areaNumber: 1 },
    ],
  },
  {
    id: 82,
    name: "Solitude Depths Slay 2",
    stages: [{ id: 417, areaNumber: 0 }],
  },
  {
    id: 83,
    name: "Solitude Depths Slay 3",
    stages: [{ id: 417, areaNumber: 0 }],
  },
  {
    id: 84,
    name: "Solitude Depths Slay 4",
    stages: [{ id: 417, areaNumber: 0 }],
  },
  {
    id: 85,
    name: "Solitude Depths Slay 5",
    stages: [{ id: 417, areaNumber: 0 }],
  },
  {
    id: 86,
    name: "Solitude Depths Support 1",
    stages: [
      { id: 417, areaNumber: 0 },
      { id: 440, areaNumber: 1 },
    ],
  },
  {
    id: 87,
    name: "Solitude Depths Support 2",
    stages: [{ id: 417, areaNumber: 0 }],
  },
  {
    id: 88,
    name: "Solitude Depths Support 3",
    stages: [{ id: 417, areaNumber: 0 }],
  },
  {
    id: 89,
    name: "Solitude Depths Support 4",
    stages: [{ id: 417, areaNumber: 0 }],
  },
  {
    id: 90,
    name: "Solitude Depths Support 5",
    stages: [{ id: 417, areaNumber: 0 }],
  },
  {
    id: 91,
    name: "Cloud Viewing Fortress",
    stages: [
      { id: 438, areaNumber: 0 },
      { id: 439, areaNumber: 1 },
    ],
  },
  {
    id: 92,
    name: "Painted Falls Day",
    stages: [
      { id: 423, areaNumber: 0 },
      { id: 425, areaNumber: 1 },
      { id: 427, areaNumber: 2 },
      { id: 429, areaNumber: 3 },
      { id: 431, areaNumber: 4 },
      { id: 433, areaNumber: 5 },
      { id: 435, areaNumber: 6 },
    ],
  },
  {
    id: 93,
    name: "Painted Falls Nigh",
    stages: [
      { id: 424, areaNumber: 0 },
      { id: 426, areaNumber: 1 },
      { id: 428, areaNumber: 2 },
      { id: 430, areaNumber: 3 },
      { id: 432, areaNumber: 4 },
      { id: 434, areaNumber: 5 },
      { id: 436, areaNumber: 6 },
    ],
  },
  {
    id: 94,
    name: "Sanctuary",
    stages: [
      { id: 448, areaNumber: 0 },
      { id: 449, areaNumber: 1 },
    ],
  },
  {
    id: 95,
    name: "Hunter's Road",
    stages: [{ id: 459, areaNumber: 0 }],
  },
  {
    id: 96,
    name: "Sacred Pinnacle",
    stages: [
      { id: 446, areaNumber: 0 },
      { id: 447, areaNumber: 1 },
    ],
  },
  {
    id: 97,
    name: "Historic Site",
    stages: [
      { id: 460, areaNumber: 0 },
      { id: 461, areaNumber: 1 },
    ],
  },
];

export const findMapAndStage = (
  mapId: number,
  stageId: number
): { map?: Map; stage?: MapStage } => {
  const map = maps.find((map) => map.id === mapId);
  const stage = map?.stages.find((stage) => stage.id === stageId);
  return { map, stage };
};
