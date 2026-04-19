import { useState } from 'react'

const puzzle = [
  ['J', 'A', 'V', 'A', 'S', 'C', 'R', 'I', 'P', 'T'],
  ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
  ['T', 'Y', 'P', 'E', 'S', 'C', 'R', 'I', 'P', 'T'],
  ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
  ['R', 'E', 'A', 'C', 'T', '_', 'N', 'O', 'D', 'E'],
  ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
  ['V', 'I', 'T', 'E', '_', 'B', 'U', 'I', 'L', 'D'],
  ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
  ['Z', 'U', 'S', 'T', 'A', 'N', 'D', '_', 'S', 'T'],
]

const answers: Record<string, [number, number][]> = {
  'JAVASCRIPT': [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,8], [0,9]],
  'TYPESCRIPT': [[2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6], [2,7], [2,8], [2,9]],
  'REACT': [[4,0], [4,1], [4,2], [4,3], [4,4]],
  'NODE': [[4,6], [4,7], [4,8], [4,9]],
  'VITE': [[6,0], [6,1], [6,2], [6,3]],
  'BUILD': [[6,5], [6,6], [6,7], [6,8]],
  'ZUSTAND': [[8,0], [8,1], [8,2], [8,3], [8,4], [8,5]],
  'STATE': [[8,7], [8,8], [8,9]],
}

export default function Crossword() {
  const [guessed, setGuessed] = useState<Set<string>>(new Set())
  const [found, setFound] = useState<Set<string>>(new Set())

  const toggleWord = (word: string) => {
    const newGuessed = new Set(guessed)
    if (newGuessed.has(word)) newGuessed.delete(word)
    else newGuessed.add(word)
    setGuessed(newGuessed)
    if (Object.keys(answers).includes(word)) {
      const newFound = new Set(found)
      newFound.add(word)
      setFound(newFound)
    }
  }

  const reset = () => { setGuessed(new Set()); setFound(new Set()) }

  return (
    <div className="text-center">
      <p className="mb-4 text-white/70">Find: {Array.from(Object.keys(answers)).join(', ')}</p>
      <div className="inline-block bg-white/5 rounded-2xl p-4">
        {puzzle.map((row, ri) => (
          <div key={ri} className="flex">
            {row.map((char, ci) => {
              const isInAnswer = Array.from(Object.values(answers)).some(cells =>
                cells.some(([r, c]) => r === ri && c === ci)
              )
              const matchingWords = Object.entries(answers).filter(([_, cells]) =>
                cells.some(([r, c]) => r === ri && c === ci)
              ).map(([word]) => word)
              const isGuessed = matchingWords.some(w => guessed.has(w))
              return (
                <div
                  key={ci}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-bold border border-white/10 ${
                    isInAnswer ? 'bg-violet-600/40' : 'bg-black/20'
                  } ${isGuessed && isInAnswer ? 'text-green-400' : 'text-white'}`}
                >
                  {char === '_' ? '' : char}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2 flex-wrap">
        {Object.keys(answers).map(word => (
          <button
            key={word}
            onClick={() => toggleWord(word)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              found.has(word) ? 'bg-green-600 text-white' : guessed.has(word) ? 'bg-violet-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {word}
          </button>
        ))}
      </div>
      {found.size === Object.keys(answers).length && (
        <p className="text-green-400 text-xl font-bold mt-4">All found!</p>
      )}
      <button onClick={reset} className="mt-4 px-6 py-3 bg-violet-600 rounded-xl font-semibold hover:bg-violet-500">Reset</button>
    </div>
  )
}