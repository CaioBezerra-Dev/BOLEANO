import { useGameStore } from '../store/useGameStore'

export default function Terminal({ children }) {
  const { feedback } = useGameStore()
  
  const feedbackClasses = feedback === 'correct' 
    ? 'animate-hit' 
    : feedback === 'incorrect' 
    ? 'animate-glitch bg-gh-false/10' 
    : ''
  
  return (
    <div className={`w-full h-screen bg-gh-dark flex flex-col items-center justify-center transition-all duration-100 ${feedbackClasses}`}>
      <div className="max-w-4xl w-full px-8">
        {children}
      </div>
    </div>
  )
}
