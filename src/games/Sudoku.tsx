import { useState } from 'react'

const base = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

export default function Sudoku() {
  const [board, setBoard] = useState<(number | null)[][]>(() => base.map(r => r.map(v => v || null)))
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [error, setError] = useState(false)

  const handleClick = (r: number, c: number) => setSelected([r, c])

  const handleNum = (n: number) => {
    if (!selected) return
    const [r, c] = selected
    const newBoard = board.map(row => [...row])
    newBoard[r][c] = n
    setBoard(newBoard)
    // Simple validation
    const rowValid = newBoard[r].filter(x => x === n).length <= 1
    const colValid = newBoard.every(row => row[c] !== n || row[c] === null)
    setError(!rowValid || !colValid)
  }

  const reset = () => setBoard(base.map(r => r.map(v => v || null)))

  return (
    <div className="text-center">
      {error && <p className="text-red-400 mb-2">Invalid move!</p>}
      <div className="inline-block bg-white/5 rounded-2xl p-4">
        <div className="grid grid-cols-9 gap-0">
          {board.map((row, ri) =>
            row.map((cell, ci) => (
              <button
                key={`${ri}-${ci}`}
                onClick={() => handleClick(ri, ci)}
                className={`w-8 h-8 flex items-center justify-center text-sm font-medium border border-white/10 transition-colors ${
                  base[ri][ci] ? 'bg-violet-600/30 text-white' : 'text-cyan-400'
                } ${selected?.[0] === ri && selected?.[1] === ci ? 'bg-violet-500' : ''} ${
                  (ci + 1) % 3 === 0 && ci < 8 ? 'border-r-2 border-white/30' : ''
                } ${(ri + 1) % 3 === 0 && ri < 8 ? 'border-b-2 border-white/30' : ''
                } hover:bg-white/10`}
              >
                {cell || ''}
              </button>
            ))
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <button
            key={n}
            onClick={() => handleNum(n)}
            className="w-10 h-10 bg-white/10 rounded-lg font-bold hover:bg-white/20"
          >
            {n}
          </button>
        ))}
      </div>
      <button onClick={reset} className="mt-4 px-6 py-3 bg-violet-600 rounded-xl font-semibold hover:bg-violet-500">Reset</button>
    </div>
  )
}