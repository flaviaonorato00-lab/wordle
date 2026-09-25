import GameRow from './GameRow'
import { evaluateGuess } from './utils/evaluateGuess'

type GameBoardProps = {
  guesses: string[]
  currentGuess: string
  secretWord: string
}

function GameBoard({
  guesses,
  currentGuess,
  secretWord
}: GameBoardProps) {
  return (
    <div className="game-board">
      {Array.from({ length: 6 }).map((_, index) => (
        <GameRow
          key={index}
          word={
            guesses[index] ??
            (index === guesses.length ? currentGuess : "")
          }
          evaluation={
            guesses[index]
              ? evaluateGuess(guesses[index], secretWord)
              : undefined
          }
        />
      ))}
    </div>
  )
}

export default GameBoard