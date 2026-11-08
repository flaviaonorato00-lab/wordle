import type { GameStats } from './utils/stats'

type StatsModalProps = {
  stats: GameStats
  // number of guesses of the game just won, to highlight its bar (null if no win to highlight)
  highlightRow: number | null
  onClose: () => void
  onNewGame?: () => void
  resultMessage?: string // e.g. "You won! 🎉", shown at the top when a game just ended
}

function StatsModal({ stats, highlightRow, onClose, onNewGame, resultMessage }: StatsModalProps) {
  const winPercent = stats.played === 0 ? 0 : Math.round((stats.wins / stats.played) * 100)
  const maxCount = Math.max(1, ...stats.guessDistribution) // the longest bar is 100% wide

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation: a click inside the box must not close the modal */}
      <div className="modal" role="dialog" aria-labelledby="stats-title" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        {resultMessage && <p className="game-message modal-result">{resultMessage}</p>}

        <h2 id="stats-title">STATISTICS</h2>

        <div className="stats-summary">
          <div className="stat">
            <span className="stat-value">{stats.played}</span>
            <span className="stat-label">Played</span>
          </div>
          <div className="stat">
            <span className="stat-value">{winPercent}</span>
            <span className="stat-label">Win %</span>
          </div>
          <div className="stat">
            <span className="stat-value">{stats.currentStreak}</span>
            <span className="stat-label">Current Streak</span>
          </div>
          <div className="stat">
            <span className="stat-value">{stats.maxStreak}</span>
            <span className="stat-label">Max Streak</span>
          </div>
        </div>

        <h3>GUESS DISTRIBUTION</h3>

        <div className="distribution">
          {stats.guessDistribution.map((count, index) => (
            <div className="distribution-row" key={index}>
              <span className="distribution-label">{index + 1}</span>
              <div className="distribution-track">
                <div
                  className={`distribution-bar ${highlightRow === index + 1 ? "highlight" : ""}`}
                  style={{ width: `${Math.max(7, (count / maxCount) * 100)}%` }}
                >
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>

        {onNewGame && (
          <button type="button" className="new-game-button" onClick={onNewGame}>
            NEW GAME
          </button>
        )}
      </div>
    </div>
  )
}

export default StatsModal
