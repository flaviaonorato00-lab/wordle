type KeyboardProps = {
  onLetter: (letter: string) => void
  onDelete: () => void
  disabled: boolean
}

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
]

function Keyboard({
  onLetter,
  onDelete,
  disabled
}: KeyboardProps) {

  return (
    <div className="keyboard">

      {keyboardRows.map((row, index) => (
        <div className="keyboard-row" key={index}>

          {row.map((letter) => (
            <button
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
          type="submit"
          disabled={disabled}
        >
          ENTER
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={onDelete}
        >
          DELETE
        </button>
      </div>

    </div>
  )
}

export default Keyboard