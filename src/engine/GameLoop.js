import { useGameStore } from '../store/useGameStore'
import { selectNextQuestion } from './RNG'
import questionsData from '../data/questions.json'

/**
 * Hook para controlar o loop do jogo
 */
export function useGameLoop() {
  const {
    gameState,
    profile,
    currentQuestion,
    usedQuestions,
    setCurrentQuestion,
    startGame
  } = useGameStore()
  
  /**
   * Carrega a próxima pergunta
   */
  const loadNextQuestion = () => {
    if (gameState !== 'playing') return
    
    const nextQuestion = selectNextQuestion(
      questionsData.questions,
      usedQuestions,
      profile
    )
    
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion)
    }
  }
  
  /**
   * Inicia o jogo e carrega a primeira pergunta
   */
  const start = () => {
    if (profile.languages.length === 0) {
      alert('Selecione pelo menos uma linguagem!')
      return
    }
    
    startGame()
    // Pequeno delay para garantir que o estado foi atualizado
    setTimeout(() => {
      loadNextQuestion()
    }, 100)
  }
  
  return {
    loadNextQuestion,
    start
  }
}
