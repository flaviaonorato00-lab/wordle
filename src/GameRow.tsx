function GameRow() {

    return(
        <div className="game-row">
            {Array.from({ length: 5 }).map((_, index) => (
                <div className="letter-box" key={index}></div>
            ))}
        </div>
    )
}

export default GameRow