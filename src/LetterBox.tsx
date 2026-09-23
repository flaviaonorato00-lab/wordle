import type { LetterStatus } from './utils/evaluateGuess'

type LetterBoxProps = {
  letter: string
  status?: LetterStatus
}

function LetterBox({ letter, status }: LetterBoxProps) {
  return (
    <div className={`letter-box ${status ?? ""}`}>
      {letter}
    </div>
  )
}

export default LetterBox