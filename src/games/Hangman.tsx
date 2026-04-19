import { useState } from 'react'

const words = ['javascript', 'typescript', 'react', 'node', 'vite', 'tailwind', 'zusta', 'electron', 'npm', 'github']

export default function Hangman() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)])
  const [guessed, setGuessed] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState(0)

  const target = new Set(word.split(''))
  const won = target.size > 0 && [...target].every(t => guessed.has(t))
  const lost = wrong >= 6

  const guess = (letter: string) => {
    if (guessed.has(letter) || won || lost) return
    const newGuessed = new Set(guessed)
    newGuessed.add(letter)
    setGuessed(newGuessed)
    if (!target.has(letter)) setWrong(w => w + 1)
  }

  const reset = () => {
    setWord(words[Math.floor(Math.random() * words.length)])
    setGuessed(new Set())
    setWrong(0)
  }

  const stages = ['🤯', '😰', '😨', '😦', '😟', '🙁', '😲']

  return (
    <div className="text-center">
      <div className="text-6xl mb-4">{stages[Math.min(wrong, 6)]}</div>
      <div className="mb-4 text-3xl tracking-widest">
        {word.split('').map(l => guessed.has(l) ? l : '_').join(' ')}
      </div>
      <div className="mb-4 text-white/50">Wrong: {wrong}/6</div>
      <div className="flex justify-center gap-2 flex-wrap max-w-md mx-auto">
        {'abcdefghijklmnopqrstuvwxyz'.split('').map(l => (
          <button
            key={l}
            onClick={() => guess(l)}
            disabled={guessed.has(l)}
            className={`w-10 h-10 rounded-lg font-bold transition-colors ${
              guessed.has(l) ? (target.has(l) ? 'bg-green-600' : 'bg-red-600/50') : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      {won && <p className="text-green-400 text-xl font-bold mt-4">You Won! The word was "{word}"</p>}
      {lost && <p className="text-red-400 text-xl font-bold mt-4">Game Over! The word was "{word}"</p>}
      <button onClick={reset} className="mt-4 px-6 py-3 bg-violet-600 rounded-xl font-semibold hover:bg-violet-500">New Word</button>
    </div>
  )
}