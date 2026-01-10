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
  
  // Carrega primeira pergunta ao montar
  useEffect(() => {
    if (!currentQuestion && gameState === 'playing') {
      loadNextQuestion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // Carrega próxima pergunta quando feedback termina
  useEffect(() => {
    if (feedback === null && currentQuestion && gameState === 'playing') {
      // Feedback acabou, mas já temos uma pergunta (pode ter sido carregada pelo BinaryInput)
      // Não faz nada aqui para evitar loops
    } else if (feedback === null && !currentQuestion && gameState === 'playing') {
      // Feedback acabou e não temos pergunta, carrega próxima
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
      {/* Header com stats */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold font-mono">
          Score: <span className="text-gh-true">{score}</span>
        </div>
        
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className={`text-3xl ${i < lives ? 'text-gh-false' : 'text-gh-text/20'}`}
            >
              ❤️
            </span>
          ))}
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="text-xl font-mono text-gh-text/70">
            {formatTime(getRunTime())}
          </div>
          {currentQuestion && (
            <div className={`text-2xl font-bold font-mono ${
              timeRemaining > 10 
                ? 'text-gh-true' 
                : timeRemaining > 5 
                ? 'text-yellow-500' 
                : 'text-gh-false animate-pulse'
            }`}>
              {timeRemaining}s
            </div>
          )}
        </div>
      </div>
      
      {/* Pergunta */}
      {currentQuestion && (
        <>
          <div className="mb-4">
            <div className="flex gap-4 items-center mb-2">
              <span className="px-3 py-1 bg-gh-text/10 rounded text-sm font-mono">
                {currentQuestion.language}
              </span>
              <span className="px-3 py-1 bg-gh-text/10 rounded text-sm font-mono">
                Nível {currentQuestion.difficulty}
              </span>
              <span className="px-3 py-1 bg-gh-text/10 rounded text-sm font-mono">
                {currentQuestion.category}
              </span>
            </div>
          </div>
          
          <CodeBlock 
            content={currentQuestion.content}
            statementType={currentQuestion.statement_type}
          />
          
          <div className="bg-black/20 border border-gh-text/10 rounded-lg p-4 mb-8">
            <p className="text-xl text-gh-text/80 font-mono">
              {currentQuestion.context}
            </p>
          </div>
          
          <BinaryInput />
        </>
      )}
      
      {!currentQuestion && (
        <div className="text-center text-2xl text-gh-text/50">
          Carregando pergunta...
        </div>
      )}
    </Terminal>
  )
}
