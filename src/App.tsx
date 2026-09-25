import { useState, useRef, type FormEvent } from 'react'
import './App.css'
import GameBoard from './GameBoard'
import { evaluateGuess } from './utils/evaluateGuess'
import { validWords } from './data/words'
import Keyboard from './Keyboard'

const secretWord = validWords[Math.floor(Math.random() * validWords.length)];

type GameStatus = "playing" | "won" | "lost";

function App() {

  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    inputRef.current?.focus()

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

  function handleKeyboardLetter(letter: string) {
    if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + letter)
      setErrorMessage("")
    }

    inputRef.current?.focus() // find the input connected with "inputRef" and give it the new focus
  }

  function handleKeyboardDelete() {
    setCurrentGuess(currentGuess.slice(0, -1))
    setErrorMessage("")

    inputRef.current?.focus()
  }

  return (
    <main className="app">
      <h1>WORDLE</h1>

      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        secretWord={secretWord}
      />

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          autoFocus
          className="hidden-input"
          type="text"
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

        <Keyboard
          onLetter={handleKeyboardLetter}
          onDelete={handleKeyboardDelete}
          disabled={gameStatus !== "playing"}
        />
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      {gameStatus === "won" && <p>You won!</p>}
      {gameStatus === "lost" && <p>You lost!</p>}



    </main>
  )
}

export default App
