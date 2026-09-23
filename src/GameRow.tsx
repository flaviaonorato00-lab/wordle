type GameRowProps = {
    word: string
}

function GameRow({ word }: GameRowProps) {

    return(
        <div className="game-row">
            {Array.from({ length: 5 }).map((_, index) => (
                <div className="letter-box" key={index}>
                    {word[index]}
                </div>
            ))}
        </div>
    )
}

export default GameRow