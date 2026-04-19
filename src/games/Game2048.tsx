import { useState, useEffect } from 'react'

export default function Game2048() {
  const [grid, setGrid] = useState(() => {
    const g = Array(4).fill(null).map(() => Array(4).fill(0))
    const addTile = () => {
      const empty = []
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (!g[r][c]) empty.push([r, c])
      if (empty.length) { const [r, c] = empty[Math.floor(Math.random() * empty.length)]; g[r][c] = Math.random() < 0.9 ? 2 : 4 }
    }
    addTile(); addTile()
    return g
  })
  const [score, setScore] = useState(0)

  const addRandomTile = (g: number[][]) => {
    const empty: [number, number][] = []
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (!g[r][c]) empty.push([r, c])
    if (empty.length) { const [r, c] = empty[Math.floor(Math.random() * empty.length)]; g[r][c] = Math.random() < 0.9 ? 2 : 4 }
    return g
  }

  const transpose = (g: number[][]) => g[0].map((_, i) => g.map(r => r[i]))
  const reverse = (g: number[][]) => g.map(r => [...r].reverse())

  const merge = (g: number[][]): [number[][], number] => {
    let points = 0
    const newG = g.map(row => {
      const filtered = row.filter(x => x)
      const merged: number[] = []
      for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i] * 2)
          points += filtered[i] * 2
          i++
        } else {
          merged.push(filtered[i])
        }
      }
      while (merged.length < 4) merged.push(0)
      return merged
    })
    return [newG, points]
  }

  const move = (dir: string) => {
    let g = grid.map(r => [...r])
    let moved = false

    if (dir === 'up' || dir === 'down') g = transpose(g)
    if (dir === 'right' || dir === 'down') g = reverse(g)

    const [newG, points] = merge(g)
    const afterMove = newG.map(row => [...row])

    if (dir === 'right' || dir === 'down') g = reverse(afterMove)
    if (dir === 'up' || dir === 'down') g = transpose(g)

    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (grid[r][c] !== g[r][c]) moved = true

    if (moved) {
      const finalG = addRandomTile(g.map(r => [...r]))
      setGrid(finalG)
      setScore(s => s + points)
    }
  }

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        const dir = e.key.replace('Arrow', '').toLowerCase()
        move(dir)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [grid])

  const colors = ['', '#f59e0b', '#f97316', '#ef4444', '#ec4899', '#a855f7', '#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4']

  const reset = () => {
    const g = Array(4).fill(null).map(() => Array(4).fill(0))
    const addTile = () => {
      const empty: [number, number][] = []
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (!g[r][c]) empty.push([r, c])
      if (empty.length) { const [r, c] = empty[Math.floor(Math.random() * empty.length)]; g[r][c] = Math.random() < 0.9 ? 2 : 4 }
    }
    addTile(); addTile()
    setGrid(g)
    setScore(0)
  }

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-white">Score: {score}</span>
        <button onClick={reset} className="px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-500">New Game</button>
      </div>
      <div className="grid grid-cols-4 gap-2 p-4 bg-white/5 rounded-2xl w-fit mx-auto">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold"
              style={{ background: cell ? colors[Math.log2(cell) % 10] + '80' : 'rgba(255,255,255,0.1)', color: cell ? '#fff' : '#666' }}
            >
              {cell || ''}
            </div>
          ))
        )}
      </div>
      <p className="text-white/50 mt-4 text-sm">Use arrow keys to play</p>
    </div>
  )
}