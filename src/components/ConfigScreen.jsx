import { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import { useGameLoop } from '../engine/GameLoop'
import questionsData from '../data/questions.json'

const LANGUAGES = ['Python', 'Javascript', 'C', 'Java', 'Go']
const LEVELS = [
  { value: 1, label: 'Junior' },
  { value: 2, label: 'Pleno' },
  { value: 3, label: 'Senior' }
]

export default function ConfigScreen() {
  const { setProfile, profile } = useGameStore()
  const { start } = useGameLoop()
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [levels, setLevels] = useState({})
  
  const toggleLanguage = (lang) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== lang))
      const newLevels = { ...levels }
      delete newLevels[lang]
      setLevels(newLevels)
    } else {
      setSelectedLanguages([...selectedLanguages, lang])
      setLevels({ ...levels, [lang]: 1 })
    }
  }
  
  const setLevel = (lang, level) => {
    setLevels({ ...levels, [lang]: level })
  }
  
  const handleStart = () => {
    if (selectedLanguages.length === 0) {
      alert('Selecione pelo menos uma linguagem!')
      return
    }
    
    setProfile({
      languages: selectedLanguages,
      levels: levels
    })
    
    start()
  }
  
  // Verifica quais linguagens estão disponíveis no banco
  const availableLanguages = LANGUAGES.filter(lang => 
    questionsData.questions.some(q => q.language === lang)
  )
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-5xl font-bold text-center mb-4 font-mono">
          BOLEANO
        </h1>
        <p className="text-xl text-center mb-12 text-gh-text/70">
          O Compilador Mental
        </p>
      
      <div className="bg-black/30 border border-gh-text/20 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Selecione suas Linguagens</h2>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {availableLanguages.map(lang => (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={`
                px-6 py-3 rounded-lg border-2 font-mono transition-all
                ${selectedLanguages.includes(lang)
                  ? 'bg-gh-true/20 border-gh-true text-gh-true'
                  : 'bg-black/20 border-gh-text/30 text-gh-text/70 hover:border-gh-text/50'
                }
              `}
            >
              {lang}
            </button>
          ))}
        </div>
        
        {selectedLanguages.length > 0 && (
          <>
            <h3 className="text-xl font-bold mb-4">Defina seu Nível</h3>
            <div className="space-y-4">
              {selectedLanguages.map(lang => (
                <div key={lang} className="bg-black/20 rounded-lg p-4">
                  <div className="font-bold mb-3 text-lg">{lang}</div>
                  <div className="flex gap-3">
                    {LEVELS.map(level => (
                      <button
                        key={level.value}
                        onClick={() => setLevel(lang, level.value)}
                        className={`
                          px-4 py-2 rounded border-2 font-mono transition-all
                          ${levels[lang] === level.value
                            ? 'bg-gh-true/30 border-gh-true text-gh-true'
                            : 'bg-black/20 border-gh-text/20 text-gh-text/70 hover:border-gh-text/40'
                          }
                        `}
                      >
                        {level.label} ({level.value})
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      <button
        onClick={handleStart}
        disabled={selectedLanguages.length === 0}
        className={`
          w-full py-4 text-2xl font-bold font-mono rounded-lg
          bg-gh-true/20 border-4 border-gh-true text-gh-true
          transition-all duration-200
          hover:bg-gh-true/30 hover:scale-105
          active:scale-95
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
        `}
      >
        INICIAR RUN
      </button>
      
      <div className="mt-8 text-center text-gh-text/50 text-sm">
        <p>Use as teclas: <kbd className="px-2 py-1 bg-black/30 rounded">0</kbd> ou <kbd className="px-2 py-1 bg-black/30 rounded">←</kbd> para FALSE</p>
        <p><kbd className="px-2 py-1 bg-black/30 rounded">1</kbd> ou <kbd className="px-2 py-1 bg-black/30 rounded">→</kbd> para TRUE</p>
      </div>
      </div>
    </div>
  )
}
