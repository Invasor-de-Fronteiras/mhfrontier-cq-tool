interface Polynomial {
  a: number;
  b: number;
}

interface MapStage {
  id: number;
  areaNumber: string;
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
      { id: 10, areaNumber: "Base" },
      { id: 14, areaNumber: "Area 1" },
      { id: 30, areaNumber: "Area 2" },
      { id: 28, areaNumber: "Area 3" },
      { id: 11, areaNumber: "Area 4" },
      { id: 12, areaNumber: "Area 5" },
      { id: 31, areaNumber: "Area 6" },
    ],
  },
  {
    id: 2,
    name: "Forest and Hills Day",
    stages: [
      { id: 21, areaNumber: "Base" },
      { id: 39, areaNumber: "Area 1" },
      { id: 38, areaNumber: "Area 2" },
      { id: 33, areaNumber: "Area 3" },
      { id: 37, areaNumber: "Area 4" },
      { id: 40, areaNumber: "Area 5" },
      { id: 32, areaNumber: "Area 6" },
      { id: 41, areaNumber: "Area 7" },
      { id: 35, areaNumber: "Area 8" },
      { id: 36, areaNumber: "Area 9" },
      { id: 34, areaNumber: "Area 10" },
      { id: 42, areaNumber: "Area 11" },
      { id: 43, areaNumber: "Area 12" },
    ],
  },
  {
    id: 3,
    name: "Desert Day",
    stages: [
      { id: 140, areaNumber: "Base" },
      { id: 146, areaNumber: "Area 1" },
      { id: 141, areaNumber: "Area 2" },
      { id: 143, areaNumber: "Area 3" },
      { id: 147, areaNumber: "Area 4" },
      { id: 145, areaNumber: "Area 5" },
      { id: 144, areaNumber: "Area 6" },
      { id: 142, areaNumber: "Area 7" },
      { id: 148, areaNumber: "Area 8" },
      { id: 149, areaNumber: "Area 9" },
      { id: 150, areaNumber: "Area 10" },
      { id: 7, areaNumber: "Secret" },
    ],
  },
  {
    id: 4,
    name: "Swamp Day",
    stages: [
      { id: 151, areaNumber: "Base" },
      { id: 152, areaNumber: "Area 1" },
      { id: 153, areaNumber: "Area 2" },
      { id: 154, areaNumber: "Area 3" },
      { id: 160, areaNumber: "Area 4" },
      { id: 158, areaNumber: "Area 5" },
      { id: 157, areaNumber: "Area 6" },
      { id: 159, areaNumber: "Area 7" },
      { id: 156, areaNumber: "Area 8" },
      { id: 155, areaNumber: "Area 9" },
      { id: 9, areaNumber: "Secret" },
    ],
  },
  {
    id: 5,
    name: "Volcano Day",
    stages: [
      { id: 161, areaNumber: "Base" },
      { id: 164, areaNumber: "Area 1" },
      { id: 165, areaNumber: "Area 2" },
      { id: 166, areaNumber: "Area 3" },
      { id: 162, areaNumber: "Area 4" },
      { id: 163, areaNumber: "Area 5" },
      { id: 168, areaNumber: "Area 6" },
      { id: 167, areaNumber: "Area 7" },
      { id: 169, areaNumber: "Area 8" },
      { id: 74, areaNumber: "Secret" },
    ],
  },
  {
    id: 6,
    name: "Jungle Day",
    stages: [
      {
        id: 110,
        areaNumber: "Base",
        calculationX: {
          a: 100,
          b: 2846.875,
        },
        calculationY: {
          a: 80.95238095238095,
          b: 4823.809523809524,
        },
      },
      { id: 111, areaNumber: "Area 1" },
      { id: 112, areaNumber: "Area 2" },
      { id: 113, areaNumber: "Area 3" },
      { id: 114, areaNumber: "Area 4" },
      { id: 115, areaNumber: "Area 5" },
      { id: 119, areaNumber: "Area 6" },
      {
        id: 118,
        areaNumber: "Area 7",
        calculationX: {
          a: 96.48275862068965,
          b: 4973.640086206897,
        },
        calculationY: {
          a: 228.6315789473684,
          b: -1065.3684210526317,
        },
      },
      {
        id: 117,
        areaNumber: "Area 8",
        calculationX: {
          a: 50,
          b: 11398.4375,
        },
        calculationY: {
          a: 83.26315789473684,
          b: -175.26315789473665,
        },
      },
      { id: 116, areaNumber: "Area 9" },
      { id: 120, areaNumber: "Area 10" },
    ],
  },
  {
    id: 7,
    name: "Castle Schrade",
    stages: [
      { id: 20, areaNumber: "Base" },
      { id: 25, areaNumber: "Area 1" },
    ],
  },
  {
    id: 8,
    name: "Crimson Battleground",
    stages: [
      { id: 8, areaNumber: "Base" },
      { id: 88, areaNumber: "Area 1" },
    ],
  },
  {
    id: 9,
    name: "Arena with Ledge Day",
    stages: [
      { id: 89, areaNumber: "Base" },
      { id: 90, areaNumber: "Area 1" },
    ],
  },
  {
    id: 10,
    name: "Arena with Pillar Day",
    stages: [
      { id: 89, areaNumber: "Base" },
      { id: 91, areaNumber: "Area 1" },
    ],
  },
  {
    id: 11,
    name: "Snowy Mountains Day",
    stages: [
      { id: 98, areaNumber: "Base" },
      { id: 99, areaNumber: "Area 1" },
      { id: 95, areaNumber: "Area 2" },
      { id: 94, areaNumber: "Area 3" },
      { id: 92, areaNumber: "Area 4" },
      { id: 93, areaNumber: "Area 5" },
      { id: 100, areaNumber: "Area 6" },
      { id: 96, areaNumber: "Area 7" },
      { id: 97, areaNumber: "Area 8" },
      { id: 6, areaNumber: "Secret" },
    ],
  },
  { 
    id: 12,
    name: "Town Siege Day",
    stages: [
      { id: 179, areaNumber: "Base" },
      { id: 176, areaNumber: "Area 1" },
      { id: 177, areaNumber: "Area 2" },
      { id: 178, areaNumber: "Area 3" },
    ],
  },
  {
    id: 13,
    name: "Tower 1",
    stages: [
      { id: 121, areaNumber: "Base" },
      { id: 122, areaNumber: "Area 1" },
      { id: 123, areaNumber: "Area 2" },
      { id: 130, areaNumber: "Area 3" },
      { id: 128, areaNumber: "Area 4" },
      { id: 129, areaNumber: "Area 5" },
      { id: 127, areaNumber: "Area 6" },
      { id: 125, areaNumber: "Area 7" },
      { id: 126, areaNumber: "Area 8" },
    ],
  },
  {
    id: 14,
    name: "Tower 2",
    stages: [
      { id: 121, areaNumber: "Base" },
      { id: 122, areaNumber: "Area 1" },
      { id: 123, areaNumber: "Area 2" },
      { id: 130, areaNumber: "Area 3" },
      { id: 128, areaNumber: "Area 4" },
      { id: 129, areaNumber: "Area 5" },
      { id: 127, areaNumber: "Area 6" },
      { id: 125, areaNumber: "Area 7" },
      { id: 126, areaNumber: "Area 8" },
      { id: 138, areaNumber: "Secret" },
    ],
  },
  {
    id: 15,
    name: "Tower 3",
    stages: [
      { id: 121, areaNumber: "Base" },
      { id: 122, areaNumber: "Area 1" },
      { id: 123, areaNumber: "Area 2" },
      { id: 130, areaNumber: "Area 3" },
      { id: 129, areaNumber: "Area 4", },
      { id: 128, areaNumber: "Area 5" },
      { id: 125, areaNumber: "Area 6" },
      { id: 127, areaNumber: "Area 7" },
      { id: 83, areaNumber: "Area 8" },
      { id: 84, areaNumber: "Area 9" },
      { id: 124, areaNumber: "Area 10" },

    ],
  },
  {
    id: 16,
    name: "Forest and Hills Night",
    stages: [
      { id: 184, areaNumber: "Base" },
      { id: 192, areaNumber: "Area 1" },
      { id: 191, areaNumber: "Area 2" },
      { id: 186, areaNumber: "Area 3" },
      { id: 190, areaNumber: "Area 4" },
      { id: 193, areaNumber: "Area 5" },
      { id: 185, areaNumber: "Area 6" },
      { id: 194, areaNumber: "Area 7" },
      { id: 188, areaNumber: "Area 8" },
      { id: 189, areaNumber: "Area 9" },
      { id: 187, areaNumber: "Area 10" },
      { id: 195, areaNumber: "Area 11" },
      { id: 196, areaNumber: "Area 12" },
    ],
  },
  {
    id: 17,
    name: "Desert Night",
    stages: [
      { id: 45, areaNumber: "Base" },
      { id: 52, areaNumber: "Area 1" },
      { id: 47, areaNumber: "Area 2" },
      { id: 49, areaNumber: "Area 3" },
      { id: 53, areaNumber: "Area 4" },
      { id: 51, areaNumber: "Area 5" },
      { id: 50, areaNumber: "Area 6" },
      { id: 48, areaNumber: "Area 7" },
      { id: 54, areaNumber: "Area 8" },
      { id: 55, areaNumber: "Area 9" },
      { id: 56, areaNumber: "Area 10" },
      { id: 24, areaNumber: "Secret" },
    ],
  },
  {
    id: 18,
    name: "Swamp Night",
    stages: [
      { id: 16, areaNumber: "Base" },
      { id: 44, areaNumber: "Area 1" },
      { id: 67, areaNumber: "Area 2" },
      { id: 68, areaNumber: "Area 3" },
      { id: 75, areaNumber: "Area 4" },
      { id: 72, areaNumber: "Area 5" },
      { id: 71, areaNumber: "Area 6" },
      { id: 73, areaNumber: "Area 7" },
      { id: 70, areaNumber: "Area 8" },
      { id: 69, areaNumber: "Area 9" },
      { id: 29, areaNumber: "Secret" },
    ],
  },
  {
    id: 19,
    name: "Volcano Night",
    stages: [
      { id: 58, areaNumber: "Base" },
      { id: 61, areaNumber: "Area 1" },
      { id: 62, areaNumber: "Area 2" },
      { id: 63, areaNumber: "Area 3" },
      { id: 59, areaNumber: "Area 4" },
      { id: 60, areaNumber: "Area 5" },
      { id: 65, areaNumber: "Area 6" },
      { id: 64, areaNumber: "Area 7" },
      { id: 27, areaNumber: "Secret" },
    ],
  },
  {
    id: 20,
    name: "Jungle Night",
    stages: [
      { id: 1, areaNumber: "Base" },
      { id: 2, areaNumber: "Area 1" },
      { id: 3, areaNumber: "Area 2" },
      { id: 4, areaNumber: "Area 3" },
      { id: 5, areaNumber: "Area 4" },
      { id: 18, areaNumber: "Area 5" },
      { id: 26, areaNumber: "Area 6" },
      { id: 23, areaNumber: "Area 7" },
      { id: 22, areaNumber: "Area 8" },
      { id: 19, areaNumber: "Area 9" },
    ],
  },
  {
    id: 21,
    name: "Snowy Mountains Night",
    stages: [
      { id: 107, areaNumber: "Base" },
      { id: 108, areaNumber: "Area 1" },
      { id: 104, areaNumber: "Area 2" },
      { id: 103, areaNumber: "Area 3" },
      { id: 101, areaNumber: "Area 4" },
      { id: 102, areaNumber: "Area 5" },
      { id: 109, areaNumber: "Area 6" },
      { id: 105, areaNumber: "Area 7" },
      { id: 106, areaNumber: "Area 8" },
      { id: 15, areaNumber: "Secret" },
    ],
  },
  {
    id: 22,
    name: "Town Siege night",
    stages: [{ id: 183, areaNumber: "Base" }],
  },
  {
    id: 23,
    name: "Siege Fortress Night",
    stages: [
      { id: 79, areaNumber: "Base" },
      { id: 14, areaNumber: "Area 1" },
      { id: 30, areaNumber: "Area 2" },
      { id: 28, areaNumber: "Area 3" },
      { id: 11, areaNumber: "Area 4" },
      { id: 12, areaNumber: "Area 5" },
      { id: 31, areaNumber: "Area 6" },
    ],
  },
  {
    id: 24,
    name: "Arena with Ledge Night",
    stages: [
      { id: 46, areaNumber: "Base" },
      { id: 90, areaNumber: "Area 1" },
    ],
  },
  {
    id: 25,
    name: "Arena with Pillar Night",
    stages: [
      { id: 46, areaNumber: "Base" },
      { id: 66, areaNumber: "Area 1" },
    ],
  },
  {
    id: 26,
    name: "Great Forest Day",
    stages: [
      { id: 224, areaNumber: "Base" },
      { id: 226, areaNumber: "Area 1" },
      { id: 228, areaNumber: "Area 2" },
      { id: 230, areaNumber: "Area 3" },
      { id: 232, areaNumber: "Area 4" },
      { id: 234, areaNumber: "Area 5" },
      { id: 236, areaNumber: "Area 6" },
      { id: 238, areaNumber: "Area 7" },
      { id: 240, areaNumber: "Area 8" },
    ],
  },
  {
    id: 27,
    name: "Great Forest Night",
    stages: [
      { id: 225, areaNumber: "Base" },
      { id: 227, areaNumber: "Area 1" },
      { id: 229, areaNumber: "Area 2" },
      { id: 231, areaNumber: "Area 3" },
      { id: 233, areaNumber: "Area 4" },
      { id: 235, areaNumber: "Area 5" },
      { id: 237, areaNumber: "Area 6" },
      { id: 239, areaNumber: "Area 7" },
      { id: 241, areaNumber: "Area 8" },
    ],
  },
  {
    id: 28,
    name: "Volcano 2 Day",
    stages: [
      { id: 161, areaNumber: "Base" },
      { id: 164, areaNumber: "Area 1" },
      { id: 165, areaNumber: "Area 2" },
      { id: 166, areaNumber: "Area 3" },
      { id: 162, areaNumber: "Area 4" },
      { id: 163, areaNumber: "Area 5" },
      { id: 168, areaNumber: "Area 6" },
      { id: 167, areaNumber: "Area 7" },
      { id: 169, areaNumber: "Area 8" },
      { id: 222, areaNumber: "Area 10" },
      { id: 220, areaNumber: "Area 11" },
      { id: 74, areaNumber: "Secret" },
    ],
  },
  {
    id: 29,
    name: "Volcano 2 Night",
    stages: [
      { id: 58, areaNumber: "Base" },
      { id: 59, areaNumber: "Area 1" },
      { id: 60, areaNumber: "Area 2" },
      { id: 61, areaNumber: "Area 3" },
      { id: 62, areaNumber: "Area 4" },
      { id: 63, areaNumber: "Area 5" },
      { id: 64, areaNumber: "Area 6" },
      { id: 65, areaNumber: "Area 7" },
      { id: 221, areaNumber: "Area 9" },
      { id: 223, areaNumber: "Area 10" },
      { id: 27, areaNumber: "Secret" },
    ],
  },
  {
    id: 30,
    name: "Jungle Dream",
    stages: [{ id: 120, areaNumber: "Base" }],
  },
  {
    id: 31,
    name: "Gorge Day",
    stages: [
      { id: 288, areaNumber: "Base" },
      { id: 290, areaNumber: "Area 1" },
      { id: 292, areaNumber: "Area 2" },
      { id: 294, areaNumber: "Area 3" },
      { id: 296, areaNumber: "Area 4" },
      { id: 298, areaNumber: "Area 5" },
      { id: 300, areaNumber: "Area 6" },
    ],
  },
  {
    id: 32,
    name: "Gorge Night",
    stages: [
      { id: 289, areaNumber: "Base" },
      { id: 291, areaNumber: "Area 1" },
      { id: 293, areaNumber: "Area 2" },
      { id: 295, areaNumber: "Area 3" },
      { id: 297, areaNumber: "Area 4" },
      { id: 299, areaNumber: "Area 5" },
      { id: 301, areaNumber: "Area 6" },
    ],
  },
  {
    id: 35,
    name: "Battlefield Day",
    stages: [
      { id: 8, areaNumber: "Base" },
      { id: 197, areaNumber: "Area 1" },
    ],
  },
  {
    id: 44,
    name: "Top of Great Forest",
    stages: [
      { id: 245, areaNumber: "Base" },
      { id: 246, areaNumber: "Area 1" },
    ],
  },
  {
    id: 45,
    name: "Caravan Balloon Day",
    stages: [{ id: 258, areaNumber: "Base" }],
  },
  {
    id: 46,
    name: "Caravan Balloon Night",
    stages: [{ id: 259, areaNumber: "Base" }],
  },
  {
    id: 47,
    name: "Solitude Isle 1",
    stages: [
      { id: 311, areaNumber: "Base" },
      { id: 314, areaNumber: "Area 1" },
    ],
  },
  {
    id: 48,
    name: "Solitude Isle 2",
    stages: [
      { id: 311, areaNumber: "Base" },
      { id: 317, areaNumber: "Area 1" },
    ],
  },
  {
    id: 49,
    name: "Solitude Isle 3",
    stages: [
      { id: 311, areaNumber: "Base" },
      { id: 320, areaNumber: "Area 1" },
    ],
  },
  {
    id: 50,
    name: "Highlands Day",
    stages: [
      { id: 247, areaNumber: "Base" },
      { id: 249, areaNumber: "Area 1" },
      { id: 251, areaNumber: "Area 2" },
      { id: 253, areaNumber: "Area 3" },
      { id: 255, areaNumber: "Area 4" },
      { id: 303, areaNumber: "Area 5" },
      { id: 305, areaNumber: "Area 6" },
      { id: 307, areaNumber: "Area 7" },
    ],
  },
  {
    id: 51,
    name: "Highlands Night",
    stages: [
      { id: 248, areaNumber: "Base" },
      { id: 250, areaNumber: "Area 1" },
      { id: 252, areaNumber: "Area 2" },
      { id: 254, areaNumber: "Area 3" },
      { id: 302, areaNumber: "Area 4" },
      { id: 304, areaNumber: "Area 5" },
      { id: 306, areaNumber: "Area 6" },
      { id: 308, areaNumber: "Area 7" },
    ],
  },
  {
    id: 52,
    name: "Tower with Nesthole",
    stages: [
      { id: 121, areaNumber: "Base" },
      { id: 122, areaNumber: "Area 1" },
      { id: 123, areaNumber: "Area 2" },
      { id: 130, areaNumber: "Area 3" },
      { id: 128, areaNumber: "Area 4" },
      { id: 129, areaNumber: "Area 5" },
      { id: 127, areaNumber: "Area 6" },
      { id: 125, areaNumber: "Area 7" },
      { id: 126, areaNumber: "Area 8" },
      { id: 139, areaNumber: "Secret" },
    ],
  },
  {
    id: 53,
    name: "Arena with Moat Day",
    stages: [
      { id: 280, areaNumber: "Base" },
      { id: 13, areaNumber: "Area 1" },
    ],
  },
  {
    id: 54,
    name: "Arena with Moat Night",
    stages: [
      { id: 281, areaNumber: "Base" },
      { id: 17, areaNumber: "Area 1" },
    ],
  },
  {
    id: 55,
    name: "Fortress Day",
    stages: [
      { id: 272, areaNumber: "Base" },
      { id: 274, areaNumber: "Area 1" },
      { id: 276, areaNumber: "Area 2" },
      { id: 278, areaNumber: "Area 3" },
    ],
  },
  {
    id: 56,
    name: "Fortress Night",
    stages: [
      { id: 273, areaNumber: "Base" },
      { id: 275, areaNumber: "Area 1" },
      { id: 277, areaNumber: "Area 2" },
      { id: 279, areaNumber: "Area 3" },
    ],
  },
  {
    id: 57,
    name: "Tidal Island Day",
    stages: [
      { id: 322, areaNumber: "Base" },
      { id: 323, areaNumber: "Area 1" },
      { id: 324, areaNumber: "Area 2" },
      { id: 325, areaNumber: "Area 3" },
      { id: 334, areaNumber: "Area 4" },
      { id: 335, areaNumber: "Area 5" },
    ],
  },
  {
    id: 58,
    name: "Tidal Island Night",
    stages: [
      { id: 330, areaNumber: "Base" },
      { id: 331, areaNumber: "Area 1" },
      { id: 332, areaNumber: "Area 2" },
      { id: 333, areaNumber: "Area 3" },
      { id: 338, areaNumber: "Area 4" },
      { id: 339, areaNumber: "Area 5" },
    ],
  },
  {
    id: 60,
    name: "Polar Sea Day",
    stages: [
      { id: 345, areaNumber: "Base" },
      { id: 347, areaNumber: "Area 1" },
      { id: 349, areaNumber: "Area 2" },
      { id: 351, areaNumber: "Area 3" },
      { id: 353, areaNumber: "Area 4" },
      { id: 355, areaNumber: "Area 5" },
      { id: 357, areaNumber: "Area 6" },
    ],
  },
  {
    id: 61,
    name: "Polar Sea Night",
    stages: [
      { id: 346, areaNumber: "Base" },
      { id: 348, areaNumber: "Area 1" },
      { id: 350, areaNumber: "Area 2" },
      { id: 352, areaNumber: "Area 3" },
      { id: 354, areaNumber: "Area 4" },
      { id: 356, areaNumber: "Area 5" },
      { id: 358, areaNumber: "Area 6" },
    ],
  },
  {
    id: 62,
    name: "World's End",
    stages: [
      { id: 359, areaNumber: "Base" },
      { id: 360, areaNumber: "Area 1" },
    ],
  },
  {
    id: 63,
    name: "Large Airship",
    stages: [
      { id: 342, areaNumber: "Base" },
      { id: 343, areaNumber: "Area 1" }
    ],
  },
  {
    id: 64,
    name: "Flower Field Day",
    stages: [
      { id: 361, areaNumber: "Base" },
      { id: 363, areaNumber: "Area 1" },
      { id: 365, areaNumber: "Area 2" },
      { id: 367, areaNumber: "Area 3" },
      { id: 369, areaNumber: "Area 4" },
      { id: 371, areaNumber: "Area 5" },
    ],
  },
  {
    id: 65,
    name: "Flower Field Night",
    stages: [
      { id: 362, areaNumber: "Base" },
      { id: 364, areaNumber: "Area 1" },
      { id: 366, areaNumber: "Area 2" },
      { id: 368, areaNumber: "Area 3" },
      { id: 370, areaNumber: "Area 4" },
      { id: 372, areaNumber: "Area 5" },
    ],
  },
  {
    id: 66,
    name: "Deep Crater",
    stages: [
      { id: 374, areaNumber: "Area 1" },
      { id: 380, areaNumber: "Base" },
    ],
  },
  {
    id: 67,
    name: "Bamboo Forest Day",
    stages: [
      { id: 375, areaNumber: "Base" },
      { id: 377, areaNumber: "Area 1" },
    ],
  },
  {
    id: 68,
    name: "Bamboo Forest Night",
    stages: [
      { id: 376, areaNumber: "Base" },
      { id: 378, areaNumber: "Area 1" },
    ],
  },
  {
    id: 69,
    name: "Battlefield 2 Day",
    stages: [
      { id: 8, areaNumber: "Base" },
      { id: 396, areaNumber: "Area 1" },
    ],
  },
  { id: 70, name: "Unimplemented map", stages: [] },
  {
    id: 71,
    name: "1st Dist Tower 1",
    stages: [
      { id: 391, areaNumber: "Base" },
      { id: 392, areaNumber: "Area 1" },
      { id: 399, areaNumber: "Area 2" },
    ],
  },
  {
    id: 72,
    name: "1st Dist Tower 2",
    stages: [
      { id: 391, areaNumber: "Base" },
      { id: 392, areaNumber: "Area 1" },
      { id: 399, areaNumber: "Area 2" },
    ],
  },
  {
    id: 73,
    name: "2nd Dist Tower 1",
    stages: [
      { id: 391, areaNumber: "Base" },
      { id: 392, areaNumber: "Area 1" },
      { id: 414, areaNumber: "Area 2" },
    ],
  },
  {
    id: 74,
    name: "2nd Dist Tower 2",
    stages: [
      { id: 391, areaNumber: "Base" },
      { id: 392, areaNumber: "Area 1" },
      { id: 414, areaNumber: "Area 2" },
    ],
  },
  {
    id: 75,
    name: "Urgent Tower",
    stages: [
      { id: 391, areaNumber: "Base" },
      { id: 392, areaNumber: "Area 1" },
      { id: 399, areaNumber: "Area 2" },
    ],
  },
  {
    id: 76,
    name: "3rd Dist Tower 1",
    stages: [
      { id: 391, areaNumber: "Base" },
      { id: 392, areaNumber: "Area 1" },
      { id: 399, areaNumber: "Area 2" },
    ],
  },
  {
    id: 77,
    name: "3rd Dist Tower 2",
    stages: [
      { id: 391, areaNumber: "Base" },
      { id: 392, areaNumber: "Area 1" },
      { id: 399, areaNumber: "Area 2" },
    ],
  },
  {
    id: 78,
    name: "4th Dist Tower",
    stages: [
      { id: 391, areaNumber: "Base" },
      { id: 392, areaNumber: "Area 1" },
      { id: 399, areaNumber: "Area 2" },
    ],
  },
  {
    id: 79,
    name: "White Lake Day",
    stages: [
      { id: 400, areaNumber: "Base" },
      { id: 402, areaNumber: "Area 1" },
      { id: 404, areaNumber: "Area 2" },
      { id: 406, areaNumber: "Area 3" },
      { id: 408, areaNumber: "Area 4" },
      { id: 410, areaNumber: "Area 5" },
      { id: 412, areaNumber: "Area 6" },
    ],
  },
  {
    id: 80,
    name: "White Lake Night",
    stages: [
      { id: 401, areaNumber: "Base" },
      { id: 403, areaNumber: "Area 1" },
      { id: 405, areaNumber: "Area 2" },
      { id: 407, areaNumber: "Area 3" },
      { id: 409, areaNumber: "Area 4" },
      { id: 411, areaNumber: "Area 5" },
      { id: 413, areaNumber: "Area 6" },
    ],
  },
  {
    id: 81,
    name: "Solitude Depths Slay 1",
    stages: [
      { id: 417, areaNumber: "Base" },
      { id: 418, areaNumber: "Area 1" },
    ],
  },
  {
    id: 82,
    name: "Solitude Depths Slay 2",
    stages: [{ id: 417, areaNumber: "Base" }],
  },
  {
    id: 83,
    name: "Solitude Depths Slay 3",
    stages: [{ id: 417, areaNumber: "Base" }],
  },
  {
    id: 84,
    name: "Solitude Depths Slay 4",
    stages: [{ id: 417, areaNumber: "Base" }],
  },
  {
    id: 85,
    name: "Solitude Depths Slay 5",
    stages: [{ id: 417, areaNumber: "Base" }],
  },
  {
    id: 86,
    name: "Solitude Depths Support 1",
    stages: [
      { id: 417, areaNumber: "Base" },
      { id: 440, areaNumber: "Area 1" },
    ],
  },
  {
    id: 87,
    name: "Solitude Depths Support 2",
    stages: [{ id: 417, areaNumber: "Base" }],
  },
  {
    id: 88,
    name: "Solitude Depths Support 3",
    stages: [{ id: 417, areaNumber: "Base" }],
  },
  {
    id: 89,
    name: "Solitude Depths Support 4",
    stages: [{ id: 417, areaNumber: "Base" }],
  },
  {
    id: 90,
    name: "Solitude Depths Support 5",
    stages: [{ id: 417, areaNumber: "Base" }],
  },
  {
    id: 91,
    name: "Cloud Viewing Fortress",
    stages: [
      { id: 438, areaNumber: "Base" },
      { id: 439, areaNumber: "Area 1" },
    ],
  },
  {
    id: 92,
    name: "Painted Falls Day",
    stages: [
      { id: 423, areaNumber: "Base" },
      { id: 425, areaNumber: "Area 1" },
      { id: 427, areaNumber: "Area 2" },
      { id: 429, areaNumber: "Area 3" },
      { id: 431, areaNumber: "Area 4" },
      { id: 433, areaNumber: "Area 5" },
      { id: 435, areaNumber: "Area 6" },
    ],
  },
  {
    id: 93,
    name: "Painted Falls Nigh",
    stages: [
      { id: 424, areaNumber: "Base" },
      { id: 426, areaNumber: "Area 1" },
      { id: 428, areaNumber: "Area 2" },
      { id: 430, areaNumber: "Area 3" },
      { id: 432, areaNumber: "Area 4" },
      { id: 434, areaNumber: "Area 5" },
      { id: 436, areaNumber: "Area 6" },
    ],
  },
  {
    id: 94,
    name: "Sanctuary",
    stages: [
      { id: 448, areaNumber: "Base" },
      { id: 449, areaNumber: "Area 1" },
    ],
  },
  {
    id: 95,
    name: "Hunter's Road",
    stages: [{ id: 459, areaNumber: "Base" }],
  },
  {
    id: 96,
    name: "Sacred Pinnacle",
    stages: [
      { id: 446, areaNumber: "Base" },
      { id: 447, areaNumber: "Area 1" },
    ],
  },
  {
    id: 97,
    name: "Historic Site",
    stages: [
      { id: 460, areaNumber: "Base" },
      { id: 461, areaNumber: "Area 1" },
    ],
  },
];

export const findMap = (mapId: number): Map | undefined => {
  const map = maps.find((map) => map.id === mapId);
  return map;
};

export const findStage = (map: Map, stageId: number): MapStage | undefined => {
  const stage = map.stages.find((stage) => stage.id === stageId);
  return stage;
};

export const getStageName = (map: Map, stageId: number): string => {
  const stage = findStage(map, stageId);
  if (stage) {
    return stage.areaNumber;
  }

  return "--";
};

export const findMapAndStage = (
  mapId: number,
  stageId: number
): { map?: Map; stage?: MapStage } => {
  const map = findMap(mapId);
  const stage = map ? findStage(map, stageId) : undefined;
  return { map, stage };
};
