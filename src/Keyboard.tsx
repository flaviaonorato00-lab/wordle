import { evaluateGuess, type LetterStatus } from './utils/evaluateGuess'

type KeyboardProps = {
    onLetter: (letter: string) => void
    onDelete: () => void
    disabled: boolean
    guesses: string[]
    secretWord: string
}

const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
]

function Keyboard({
    onLetter,
    onDelete,
    disabled,
    guesses,
    secretWord
}: KeyboardProps) {

    function getLetterStatus(letter: string) {
        let status: LetterStatus | undefined = undefined

        guesses.forEach((guess) => {
            const evaluation = evaluateGuess(guess, secretWord)

            evaluation.forEach((result) => {
                if (result.letter === letter) {

                    if (result.status === "correct") {
                        status = "correct"
                    }

                    else if (
                        result.status === "present" &&
                        status !== "correct"
                    ) {
                        status = "present"
                    }

                    else if (
                        result.status === "absent" &&
                        status === undefined
                    ) {
                        status = "absent"
                    }

                }
            })
        })

        return status
    }

    return (
        <div className="keyboard">

            {keyboardRows.map((row, index) => (
                <div className="keyboard-row" key={index}>

                    {row.map((letter) => (
                        <button
                            className={`keyboard-key ${getLetterStatus(letter) ?? ""}`}
                            type="button"
                            key={letter}
                            disabled={disabled}
                            onClick={() => onLetter(letter)}
                        >
                            {letter}
                        </button>
                    ))}

                </div>
            ))}

            <div className="keyboard-row">
                <button
                    className="keyboard-key"
                    type="button"
                    disabled={disabled}
                    onClick={onDelete}
                >
                    DELETE
                </button>

                <button
                    className="keyboard-key"
                    type="submit"
                    disabled={disabled}
                >
                    ENTER
                </button>


            </div>

        </div>
    )
}

export default Keyboard