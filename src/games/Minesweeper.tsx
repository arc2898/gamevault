import { useState, useEffect } from 'react'

export default function Minesweeper() {
  const [grid, setGrid] = useState<{ mine: boolean; revealed: boolean; count: number }[][]>([])
  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)

  const init = () => {
    const g: typeof grid = Array(8).fill(null).map(() => Array(8).fill(null).map(() => ({ mine: false, revealed: false, count: 0 })))
    // Place 10 mines
    let mines = 0
    while (mines < 10) {
      const r = Math.floor(Math.random() * 8)
      const c = Math.floor(Math.random() * 8)
      if (!g[r][c].mine) { g[r][c].mine = true; mines++ }
    }
    // Count neighbors
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (!g[r][c].mine) {
      let cnt = 0
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr, nc = c + dc
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && g[nr][nc].mine) cnt++
      }
      g[r][c].count = cnt
    }
    setGrid(g)
    setLost(false)
    setWon(false)
  }

  useEffect(() => init(), [])

  const reveal = (r: number, c: number) => {
    if (grid[r][c].revealed || lost || won) return
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })))
    if (newGrid[r][c].mine) { setLost(true); return }
    newGrid[r][c].revealed = true
    if (newGrid[r][c].count === 0) {
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr, nc = c + dc
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) reveal(nr, nc)
      }
    }
    setGrid(newGrid)
    if (newGrid.every(row => row.every(cell => cell.mine || cell.revealed))) setWon(true)
  }

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-white">{lost ? '💥' : won ? '🎉' : '💣'}</span>
        <button onClick={init} className="px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-500">New Game</button>
      </div>
      <div className="inline-block bg-white/5 rounded-2xl p-3">
        <div className="grid grid-cols-8 gap-0.5">
          {grid.map((row, ri) =>
            row.map((cell, ci) => (
              <button
                key={`${ri}-${ci}`}
                onClick={() => reveal(ri, ci)}
                className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                  cell.revealed ? (cell.mine ? 'bg-red-600' : 'bg-white/20') : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {cell.revealed && (cell.mine ? '💣' : cell.count ? cell.count : '')}
              </button>
            ))
          )}
        </div>
      </div>
      {lost && <p className="text-red-400 text-xl font-bold mt-4">Game Over!</p>}
      {won && <p className="text-green-400 text-xl font-bold mt-4">You Win!</p>}
    </div>
  )
}