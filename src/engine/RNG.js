/**
 * Calcula a afinidade entre o nível da pergunta e o nível do jogador
 * @param {number} questionLevel - Nível da pergunta (1-3)
 * @param {number} playerLevel - Nível do jogador (1-3)
 * @returns {number} Peso de afinidade (maior = mais provável)
 */
function calculateAffinity(questionLevel, playerLevel) {
  const diff = Math.abs(questionLevel - playerLevel)
  
  // Pesos ajustados para dar mais ênfase em perguntas adequadas ao nível
  if (diff === 0) return 150  // Perfeito match - alta prioridade
  if (diff === 1) return 75   // Um nível acima/abaixo - boa opção
  return 5   // Dois níveis de diferença - muito fácil/difícil, baixa prioridade
}

/**
 * Calcula o peso de probabilidade para uma pergunta
 * @param {Object} question - Objeto da pergunta
 * @param {Object} profile - Perfil do jogador com linguagens e níveis
 * @returns {number} Peso de probabilidade
 */
function calculateWeight(question, profile) {
  const playerLevel = profile.levels[question.language] || 1
  const affinity = calculateAffinity(question.difficulty, playerLevel)
  
  // Fator caos: 5-15% de chance aleatória para variedade
  // Isso garante que ocasionalmente apareçam perguntas muito fáceis/difíceis
  const chaos = Math.random() * (affinity * 0.15)
  
  // Fórmula: Afinidade é o fator principal, caos adiciona variação
  // Multiplicar por dificuldade dá um pequeno boost a perguntas mais difíceis do mesmo nível
  const baseWeight = affinity + (question.difficulty * 5)
  
  return baseWeight + chaos
}

/**
 * Seleciona a próxima pergunta usando algoritmo de roleta viciada
 * @param {Array} questions - Array de todas as perguntas
 * @param {Set} usedQuestions - Set com IDs das perguntas já usadas
 * @param {Object} profile - Perfil do jogador
 * @returns {Object|null} Próxima pergunta ou null se não houver mais perguntas
 */
export function selectNextQuestion(questions, usedQuestions, profile) {
  // Filtra perguntas disponíveis (não usadas e que o jogador conhece a linguagem)
  const availableQuestions = questions.filter(q => 
    !usedQuestions.has(q.id) && 
    profile.languages.includes(q.language)
  )
  
  if (availableQuestions.length === 0) {
    // Se não há mais perguntas, reinicia o set de usadas (exceto a atual)
    const allExceptCurrent = questions.filter(q => 
      !usedQuestions.has(q.id) || usedQuestions.size === questions.length
    )
    
    if (allExceptCurrent.length === 0) {
      // Se todas foram usadas, reseta tudo
      return selectNextQuestion(
        questions, 
        new Set(), 
        profile
      )
    }
    
    return selectNextQuestion(
      questions, 
      new Set(), 
      profile
    )
  }
  
  // Calcula pesos para todas as perguntas disponíveis
  const weights = availableQuestions.map(q => calculateWeight(q, profile))
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  
  // Seleção por roleta viciada
  let random = Math.random() * totalWeight
  
  for (let i = 0; i < availableQuestions.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      return availableQuestions[i]
    }
  }
  
  // Fallback (não deveria acontecer)
  return availableQuestions[0]
}
