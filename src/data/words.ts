import  englishWords from "an-array-of-english-words"
import { solutionWords } from "./solutionWords"

export { solutionWords }

export const validWords = englishWords
  .filter((word) => word.length === 5)
  .map((word) => word.toUpperCase())