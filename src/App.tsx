import { useState, type FormEvent } from 'react'
import './App.css'
import GameRow from './GameRow'


function App() {

  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentGuess.length !== 5) {
      return
    }

    if (guesses.length >= 6) {
      return
    }

    setGuesses([...guesses, currentGuess])
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
          onChange={(e) => setCurrentGuess(e.target.value.toLocaleUpperCase())} />
      </form>
    </main>
  )
}

export default App
