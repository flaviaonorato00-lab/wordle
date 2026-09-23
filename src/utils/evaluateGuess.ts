export type LetterStatus = "correct" | "present" | "absent"

export type LetterResult = {
    letter: string
    status: LetterStatus
}

export function evaluateGuess(
    guess: string,
    secretWord: string
): LetterResult[] {

    const result: LetterResult[] = guess.split("").map((letter) => ({
        letter: letter,
        status: "absent"
    }))

    const secretLetters = secretWord.split("")

    const usedLetters = Array(secretWord.length).fill(false)

    guess.split("").forEach((letter, index) => {
        if (letter === secretLetters[index]) {
            result[index].status = "correct"
            usedLetters[index] = true
        }
    })

    guess.split("").forEach((letter, index) => {
        if (result[index].status === "correct") {
            return
        }

        const foundIndex = secretLetters.findIndex( /* the first element that satisfy the condition */
            (secretLetter, secretIndex) =>
                secretLetter === letter && !usedLetters[secretIndex]
        )

        if (foundIndex !== -1) {
            result[index].status = "present"
            usedLetters[foundIndex] = true
        }
    })

    return result
}