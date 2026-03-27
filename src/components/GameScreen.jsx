import { useEffect } from 'react'
import { useGameStore } from '../store/useGameStore'
import { useGameLoop } from '../engine/GameLoop'
import Terminal from './Terminal'
import CodeBlock from './CodeBlock'
import BinaryInput from './BinaryInput'

export default function GameScreen() {
  const { currentQuestion, score, lives, getRunTime, timeRemaining } = useGameStore()
  const { loadNextQuestion } = useGameLoop()

  const { feedback, gameState } = useGameStore()

  useEffect(() => {
    if (!currentQuestion && gameState === 'playing') {
      loadNextQuestion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (feedback === null && currentQuestion && gameState === 'playing') {
    } else if (feedback === null && !currentQuestion && gameState === 'playing') {
      const timer = setTimeout(() => {
        loadNextQuestion()
      }, 100)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Terminal>
      <div className="flex flex-wrap justify-between items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="text-lg sm:text-2xl font-bold font-mono shrink-0">
          Score: <span className="text-gh-true">{score}</span>
        </div>

        <div className="flex gap-1 sm:gap-2 shrink-0">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className={`text-2xl sm:text-3xl ${i < lives ? 'text-gh-false' : 'text-gh-text/20'}`}
            >
              ❤️
            </span>
          ))}
        </div>

        <div className="flex flex-col items-end gap-0.5 sm:gap-1 w-full sm:w-auto sm:ml-auto">
          <div className="text-base sm:text-xl font-mono text-gh-text/70">
            {formatTime(getRunTime())}
          </div>
          {currentQuestion && (
            <div
              className={`text-lg sm:text-2xl font-bold font-mono ${
                timeRemaining > 10
                  ? 'text-gh-true'
                  : timeRemaining > 5
                    ? 'text-yellow-500'
                    : 'text-gh-false animate-pulse'
              }`}
            >
              {timeRemaining}s
            </div>
          )}
        </div>
      </div>

      {currentQuestion && (
        <>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 sm:gap-4 items-center mb-2">
              <span className="px-2 sm:px-3 py-1 bg-gh-text/10 rounded text-xs sm:text-sm font-mono">
                {currentQuestion.language}
              </span>
              <span className="px-2 sm:px-3 py-1 bg-gh-text/10 rounded text-xs sm:text-sm font-mono">
                Nível {currentQuestion.difficulty}
              </span>
              <span className="px-2 sm:px-3 py-1 bg-gh-text/10 rounded text-xs sm:text-sm font-mono">
                {currentQuestion.category}
              </span>
            </div>
          </div>

          <CodeBlock
            content={currentQuestion.content}
            statementType={currentQuestion.statement_type}
          />

          <div className="bg-black/20 border border-gh-text/10 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
            <p className="text-base sm:text-xl text-gh-text/80 font-mono leading-relaxed">
              {currentQuestion.context}
            </p>
          </div>

          <BinaryInput />
        </>
      )}

      {!currentQuestion && (
        <div className="text-center text-lg sm:text-2xl text-gh-text/50">
          Carregando pergunta...
        </div>
      )}
    </Terminal>
  )
}
