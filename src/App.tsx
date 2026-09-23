import { useState, type FormEvent } from 'react'
import './App.css'
import GameRow from './GameRow'

const secretWord = "CARTA";

type GameStatus = "playing" | "won" | "lost";

function App() {

  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (gameStatus !== "playing") {
      return
    }

    if (currentGuess.length !== 5) {
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
             />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text"
          value={currentGuess}
          maxLength={5}
          disabled={gameStatus !== "playing"}
          onChange={(e) => setCurrentGuess(e.target.value.toLocaleUpperCase())} />
      </form>
      {gameStatus === "won" && <p>You won!</p>}
      {gameStatus === "lost" && <p>You lost!</p>}
    </main>
  )
}

export default App
