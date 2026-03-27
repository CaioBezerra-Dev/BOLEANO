import { useGameStore } from '../store/useGameStore'

export default function HomeScreen() {
  const { setGameState } = useGameStore()

  const handleStart = () => {
    setGameState('config')
  }

  return (
    <div className="w-full min-h-[100dvh] min-h-screen bg-gh-dark flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center max-w-[min(100%,28rem)]">
        <h1 className="text-5xl sm:text-6xl sm:text-8xl md:text-9xl font-bold mb-6 sm:mb-8 font-mono text-gh-true leading-none">
          BOLEANO
        </h1>

        <button
          type="button"
          onClick={handleStart}
          className="
            px-8 sm:px-12 py-3 sm:py-4 text-2xl sm:text-3xl font-bold font-mono rounded-lg
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
