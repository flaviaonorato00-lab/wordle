import  englishWords from "an-array-of-english-words"

export const solutionWords = [
  "APPLE",
  "BEACH",
  "BRAIN",
  "CHAIR",
  "CLOUD",
  "DREAM",
  "EARTH",
  "GREEN",
  "HOUSE",
  "LIGHT",
  "MONEY",
  "NIGHT",
  "PLANT",
  "RIVER",
  "STONE",
  "TABLE",
  "WATER",
  "WORLD",
]

export const validWords = englishWords
  .filter((word) => word.length === 5)
  .map((word) => word.toUpperCase())