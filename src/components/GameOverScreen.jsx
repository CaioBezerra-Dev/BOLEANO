import { useGameStore } from '../store/useGameStore'

export default function GameOverScreen() {
  const { score, getPrecision, getRunTime, resetGame } = useGameStore()

  const precision = getPrecision()
  const runTime = getRunTime()

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full min-h-[100dvh] min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 font-mono text-gh-false">
          GAME OVER
        </h1>

        <div className="bg-black/30 border border-gh-text/20 rounded-lg p-4 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Estatísticas da Run</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-black/20 rounded-lg p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-gh-text mb-2">{score}</div>
              <div className="text-gh-text/70 text-sm sm:text-base">Score Final</div>
            </div>

            <div className="bg-black/20 rounded-lg p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-gh-text mb-2">{formatTime(runTime)}</div>
              <div className="text-gh-text/70 text-sm sm:text-base">Tempo</div>
            </div>

            <div className="bg-black/20 rounded-lg p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-gh-text mb-2">{precision}%</div>
              <div className="text-gh-text/70 text-sm sm:text-base">Precisão</div>
            </div>
          </div>

          <button
            type="button"
            onClick={resetGame}
            className="
              w-full py-4 text-xl sm:text-2xl font-bold font-mono rounded-lg
              bg-gh-true/20 border-4 border-gh-true text-gh-true
              transition-all duration-200
              hover:bg-gh-true/30 hover:scale-105
              active:scale-95
            "
          >
            NOVA RUN
          </button>
        </div>
      </div>
    </div>
  )
}
