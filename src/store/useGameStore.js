import { create } from 'zustand'

export const useGameStore = create((set, get) => ({
  // Game state
  gameState: 'config', // 'config' | 'playing' | 'gameover'
  
  // Player profile
  profile: {
    languages: [],
    levels: {} // { 'Python': 1, 'Javascript': 2, ... }
  },
  
  // Game stats
  score: 0,
  lives: 3,
  startTime: null,
  currentQuestion: null,
  usedQuestions: new Set(),
  totalQuestions: 0,
  correctAnswers: 0,
  
  // Feedback state
  feedback: null, // 'correct' | 'incorrect' | null
  feedbackTimeout: null,
  
  // Timeout state (20s por pergunta)
  questionTimeout: null,
  timeRemaining: 20,
  timeoutInterval: null,
  
  // Actions
  setProfile: (profile) => set({ profile }),
  
  startGame: () => {
    // Limpa timeouts anteriores se existirem
    const state = get()
    if (state.questionTimeout) {
      clearTimeout(state.questionTimeout)
    }
    if (state.timeoutInterval) {
      clearInterval(state.timeoutInterval)
    }
    if (state.feedbackTimeout) {
      clearTimeout(state.feedbackTimeout)
    }
    
    set({
      gameState: 'playing',
      score: 0,
      lives: 3,
      startTime: Date.now(),
      usedQuestions: new Set(),
      totalQuestions: 0,
      correctAnswers: 0,
      currentQuestion: null,
      feedback: null,
      questionTimeout: null,
      timeoutInterval: null,
      timeRemaining: 20
    })
  },
  
  setCurrentQuestion: (question) => {
    // Limpa timeout anterior
    const state = get()
    if (state.questionTimeout) {
      clearTimeout(state.questionTimeout)
    }
    if (state.timeoutInterval) {
      clearInterval(state.timeoutInterval)
    }
    
    if (!question) {
      set({ currentQuestion: null, questionTimeout: null, timeRemaining: 20, timeoutInterval: null })
      return
    }
    
    // Reseta o timer para 20s
    set({ currentQuestion: question, timeRemaining: 20 })
    
    // Inicia contador regressivo
    const interval = setInterval(() => {
      const current = get()
      const newTime = Math.max(0, current.timeRemaining - 1)
      
      set({ timeRemaining: newTime })
      
      if (newTime === 0) {
        clearInterval(interval)
      }
    }, 1000)
    
    // Timeout após 20 segundos
    const timeout = setTimeout(() => {
      const state = get()
      if (state.currentQuestion && state.gameState === 'playing') {
        // Limpa interval
        if (state.timeoutInterval) {
          clearInterval(state.timeoutInterval)
        }
        
        // Marca como timeout (resposta incorreta)
        state.submitAnswer(-1) // -1 indica timeout
        
        set({ questionTimeout: null, timeoutInterval: null, timeRemaining: 20 })
      }
    }, 20000)
    
    set({ questionTimeout: timeout, timeoutInterval: interval })
  },
  
  submitAnswer: (answer) => {
    const { currentQuestion, score, lives, correctAnswers, totalQuestions, usedQuestions, questionTimeout, timeoutInterval } = get()
    
    if (!currentQuestion) return false
    
    // Limpa timeouts
    if (questionTimeout) {
      clearTimeout(questionTimeout)
    }
    if (timeoutInterval) {
      clearInterval(timeoutInterval)
    }
    
    // Timeout usa answer = -1
    const isTimeout = answer === -1
    const isCorrect = isTimeout ? false : answer === currentQuestion.answer
    const newScore = isCorrect ? score + 1 : score
    const newLives = isCorrect ? lives : Math.max(0, lives - 1)
    const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers
    const newTotalQuestions = totalQuestions + 1
    
    // Mark question as used
    usedQuestions.add(currentQuestion.id)
    
    // Show feedback
    set({
      feedback: isCorrect ? 'correct' : 'incorrect',
      score: newScore,
      lives: newLives,
      correctAnswers: newCorrectAnswers,
      totalQuestions: newTotalQuestions,
      usedQuestions: new Set(usedQuestions)
    })
    
    // Clear feedback after animation
    if (get().feedbackTimeout) {
      clearTimeout(get().feedbackTimeout)
    }
    
    const timeout = setTimeout(() => {
      set({ 
        feedback: null, 
        feedbackTimeout: null,
        questionTimeout: null,
        timeoutInterval: null,
        timeRemaining: 20
      })
      
      // Check game over
      if (newLives === 0) {
        set({ gameState: 'gameover' })
      }
    }, 300)
    
    set({ 
      feedbackTimeout: timeout,
      questionTimeout: null,
      timeoutInterval: null,
      timeRemaining: 20
    })
    
    return isCorrect
  },
  
  resetGame: () => {
    const state = get()
    // Limpa timeouts
    if (state.questionTimeout) {
      clearTimeout(state.questionTimeout)
    }
    if (state.timeoutInterval) {
      clearInterval(state.timeoutInterval)
    }
    if (state.feedbackTimeout) {
      clearTimeout(state.feedbackTimeout)
    }
    
    set({
      gameState: 'config',
      score: 0,
      lives: 3,
      startTime: null,
      currentQuestion: null,
      usedQuestions: new Set(),
      totalQuestions: 0,
      correctAnswers: 0,
      feedback: null,
      questionTimeout: null,
      timeoutInterval: null,
      timeRemaining: 20
    })
  },
  
  getPrecision: () => {
    const { totalQuestions, correctAnswers } = get()
    if (totalQuestions === 0) return 0
    return Math.round((correctAnswers / totalQuestions) * 100)
  },
  
  getRunTime: () => {
    const { startTime } = get()
    if (!startTime) return 0
    return Math.floor((Date.now() - startTime) / 1000)
  }
}))
