import LetterBox from './LetterBox'
import type { LetterResult } from './utils/evaluateGuess'

type GameRowProps = {
    word: string
    evaluation?: LetterResult[]
}

function GameRow({ word, evaluation }: GameRowProps) {

    return(
        <div className="game-row">
            {Array.from({ length: 5 }).map((_, index) => (
                <LetterBox 
                key={index}
                letter={word[index] ?? ""}
                status={evaluation?.[index]?.status} /* optional chaining => try to get the element, but if it doesn't exist don't return error but undefined */
                />
            ))}
        </div>
    )
}

export default GameRow