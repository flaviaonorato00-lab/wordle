import './App.css'
import GameRow from './GameRow'


function App() {


  return (
      <main className="app">
        <h1>WORDLE</h1>

        <div className="game-board">
          {Array.from({ length: 6 }).map((_, index) => (
            <GameRow key={index} />
          ))}
        </div>
      </main>
  )
}

export default App
