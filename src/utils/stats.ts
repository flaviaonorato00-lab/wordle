export type GameStats = {
  played: number
  wins: number
  currentStreak: number
  maxStreak: number
  // guessDistribution[0] = games won in 1 guess, ... guessDistribution[5] = won in 6
  guessDistribution: number[]
}

const STORAGE_KEY = "wordle-stats"

export const emptyStats: GameStats = {
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
}

export function loadStats(): GameStats {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return emptyStats
    const parsed = JSON.parse(saved) as Partial<GameStats>
    // merge with defaults in case the saved data is old or incomplete
    return {
      ...emptyStats,
      ...parsed,
      guessDistribution:
        Array.isArray(parsed.guessDistribution) && parsed.guessDistribution.length === 6
          ? parsed.guessDistribution
          : emptyStats.guessDistribution,
    }
  } catch {
    return emptyStats
  }
}

export function saveStats(stats: GameStats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // storage can be blocked (e.g. private mode): stats just won't persist
  }
}

// returns a NEW stats object with the finished game added (it doesn't modify the old one)
export function recordGame(stats: GameStats, won: boolean, guessCount: number): GameStats {
  const currentStreak = won ? stats.currentStreak + 1 : 0
  const guessDistribution = [...stats.guessDistribution]
  if (won) {
    guessDistribution[guessCount - 1] += 1
  }

  return {
    played: stats.played + 1,
    wins: stats.wins + (won ? 1 : 0),
    currentStreak,
    maxStreak: Math.max(stats.maxStreak, currentStreak),
    guessDistribution,
  }
}
