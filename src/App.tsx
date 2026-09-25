import { useState, useEffect, useRef, type FormEvent } from 'react'
import './App.css'
import GameBoard from './GameBoard'
import { validWords, solutionWords } from './data/words'
import Keyboard from './Keyboard'

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * solutionWords.length)
  return solutionWords[randomIndex]
}

type GameStatus = "playing" | "won" | "lost";

function App() {

  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [secretWord, setSecretWord] = useState<string>(getRandomWord())

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (gameStatus === "playing") {
      inputRef.current?.focus()
    }
  }, [gameStatus]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    inputRef.current?.focus()

    if (gameStatus !== "playing") {
      return
    }

    if (currentGuess.length !== 5) {
      setErrorMessage("Word must be 5 letters")
      return
    }

    if (!validWords.includes(currentGuess)) {
      setErrorMessage("Not in word list")
      return
    }

    if (guesses.length >= 6) {
      return
    }

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

  function handleNewGame() {
    setCurrentGuess("")
    setGuesses([])
    setGameStatus("playing")
    setErrorMessage("")
    setSecretWord(getRandomWord())
  }

  return (
    <main className="app" translate="no">
      <h1>WORDLE</h1>

      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        secretWord={secretWord}
      />

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      {gameStatus !== "playing" && (
        <div className="game-result">

          <p className="game-message">
            {gameStatus === "won"
              ? "You won! 🎉"
              : `You lost! The word was ${secretWord}`}
          </p>

          <button type="button"
            className="new-game-button"
            onClick={handleNewGame}>
            NEW GAME
          </button>

        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="hidden-input"
          type="text"
          inputMode="none"
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
          guesses={guesses}
          secretWord={secretWord}
        />

      </form>

    </main>
  )
}

export default App
