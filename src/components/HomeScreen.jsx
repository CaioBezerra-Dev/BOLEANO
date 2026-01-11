import { useGameStore } from '../store/useGameStore'

export default function HomeScreen() {
  const { setGameState } = useGameStore()
  
  const handleStart = () => {
    setGameState('config')
  }
  
  return (
    <div className="w-full h-screen bg-gh-dark flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold mb-8 font-mono text-gh-true">
          BOLEANO
        </h1>
        
        <button
          onClick={handleStart}
          className="
            px-12 py-4 text-3xl font-bold font-mono rounded-lg
            bg-gh-true/20 border-4 border-gh-true text-gh-true
            transition-all duration-200
            hover:bg-gh-true/30 hover:scale-105
            active:scale-95
          "
        >
          INICIAR
        </button>
      </div>
    </div>
  )
}
