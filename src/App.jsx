import { useGameStore } from './store/useGameStore'
import ConfigScreen from './components/ConfigScreen'
import GameScreen from './components/GameScreen'
import GameOverScreen from './components/GameOverScreen'

function App() {
  const { gameState } = useGameStore()
  
  return (
    <>
      {gameState === 'config' && <ConfigScreen />}
      {gameState === 'playing' && <GameScreen />}
      {gameState === 'gameover' && <GameOverScreen />}
    </>
  )
}

export default App
