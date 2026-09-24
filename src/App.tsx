import { useState, type FormEvent } from 'react'
import './App.css'
import GameRow from './GameRow'
import { evaluateGuess } from './utils/evaluateGuess'
import { validWords } from './data/words'

const secretWord = validWords[Math.floor(Math.random() * validWords.length)];

type GameStatus = "playing" | "won" | "lost";

function App() {

  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (gameStatus !== "playing") {
      return
    }

    if (currentGuess.length !== 5) {
      return
    }

    if (!validWords.includes(currentGuess)) {
      setErrorMessage("Not in word list")
      return
    }

    if (guesses.length >= 6) {
      return
    }

    const evaluation = evaluateGuess(currentGuess, secretWord)

    console.log(evaluation)

    setGuesses([...guesses, currentGuess])

    if (currentGuess === secretWord) {
      setGameStatus("won")
    } else if (guesses.length === 5) {
      setGameStatus("lost")
    }

    setCurrentGuess("")
  }

  return (
    <main className="app">
      <h1>WORDLE</h1>

      <div className="game-board">
        {Array.from({ length: 6 }).map((_, index) => (
          <GameRow
            key={index}
            word={
              guesses[index] ?? /* nullish coalescing operator => if the left is "null" or undefined" then use the code on the right*/
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

      <form onSubmit={handleSubmit}>
        <input type="text"
          value={currentGuess}
          maxLength={5}
          disabled={gameStatus !== "playing"}
          onChange={(e) => {
            const value = e.target.value.toLocaleUpperCase()

            if (/^[A-Z]*$/.test(value)) { /* (RegExp) regular expression to controlo a string (value) */
              setCurrentGuess(value)
              setErrorMessage("")
            }
          }} />
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      {gameStatus === "won" && <p>You won!</p>}
      {gameStatus === "lost" && <p>You lost!</p>}


      <p>{secretWord}</p>
    </main>
  )
}

export default App
