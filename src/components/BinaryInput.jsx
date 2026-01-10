import React, { useEffect } from 'react'
import { useGameStore } from '../store/useGameStore'
import { useGameLoop } from '../engine/GameLoop'

export default function BinaryInput() {
  const { currentQuestion, feedback, submitAnswer, gameState } = useGameStore()
  const { loadNextQuestion } = useGameLoop()
  
  const handleAnswer = (answer) => {
    if (feedback !== null || !currentQuestion) return
    
    submitAnswer(answer)
    
    // Carrega próxima pergunta após feedback
    setTimeout(() => {
      const state = useGameStore.getState()
      if (state.gameState === 'playing' && state.feedback === null && state.lives > 0) {
        loadNextQuestion()
      }
    }, 500)
  }
  
  // Handlers de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      const state = useGameStore.getState()
      if (state.gameState !== 'playing') return
      if (state.feedback !== null || !state.currentQuestion) return
      
      if (e.key === '1' || e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        e.preventDefault()
        state.submitAnswer(1)
        setTimeout(() => {
          const newState = useGameStore.getState()
          if (newState.gameState === 'playing' && newState.feedback === null && newState.lives > 0) {
            loadNextQuestion()
          }
        }, 500)
      } else if (e.key === '0' || e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        e.preventDefault()
        state.submitAnswer(0)
        setTimeout(() => {
          const newState = useGameStore.getState()
          if (newState.gameState === 'playing' && newState.feedback === null && newState.lives > 0) {
            loadNextQuestion()
          }
        }, 500)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [loadNextQuestion])
  
  const isDisabled = feedback !== null || !currentQuestion
  
  return (
    <div className="flex gap-8 justify-center items-center">
      <button
        onClick={() => handleAnswer(0)}
        disabled={isDisabled}
        className={`
          w-32 h-32 rounded-full 
          bg-gh-false/20 border-4 border-gh-false
          text-gh-false text-6xl font-bold font-mono
          transition-all duration-150
          hover:bg-gh-false/30 hover:scale-105
          active:scale-95 active:bg-gh-false/40
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          focus:outline-none focus:ring-4 focus:ring-gh-false/50
        `}
      >
        0
      </button>
      
      <div className="text-gh-text/50 text-2xl font-mono">vs</div>
      
      <button
        onClick={() => handleAnswer(1)}
        disabled={isDisabled}
        className={`
          w-32 h-32 rounded-full 
          bg-gh-true/20 border-4 border-gh-true
          text-gh-true text-6xl font-bold font-mono
          transition-all duration-150
          hover:bg-gh-true/30 hover:scale-105
          active:scale-95 active:bg-gh-true/40
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          focus:outline-none focus:ring-4 focus:ring-gh-true/50
        `}
      >
        1
      </button>
    </div>
  )
}
