import { useState, useEffect, useCallback } from 'react'

export default function Snake() {
  const [snake, setSnake] = useState<[number, number][]>([[5, 5]])
  const [food, setFood] = useState<[number, number]>([10, 10])
  const [dir, setDir] = useState<[number, number]>([1, 0])
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [paused, setPaused] = useState(false)

  const reset = useCallback(() => {
    setSnake([[5, 5]])
    setFood([Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)])
    setDir([1, 0])
    setGameOver(false)
    setScore(0)
    setPaused(false)
  }, [])

  const newFood = useCallback(() => {
    let f: [number, number]
    do {
      f = [Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)]
    } while (snake.some(([s, s2]) => s === f[0] && s2 === f[1]))
    return f
  }, [snake])

  useEffect(() => {
    if (gameOver || paused) return
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = prev[0]
        const newHead: [number, number] = [head[0] + dir[0], head[1] + dir[1]]

        if (newHead[0] < 0 || newHead[0] >= 15 || newHead[1] < 0 || newHead[1] >= 15) {
          setGameOver(true)
          return prev
        }
        if (prev.some(([s, s2], i) => i > 0 && s === newHead[0] && s2 === newHead[1])) {
          setGameOver(true)
          return prev
        }

        let newSnake = [newHead, ...prev]
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(s => s + 10)
          setFood(newFood())
        } else {
          newSnake = newSnake.slice(0, -1)
        }
        return newSnake
      })
    }, 150)
    return () => clearInterval(interval)
  }, [dir, food, gameOver, paused, newFood])

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === ' ') { e.preventDefault(); setPaused(p => !p); return }
      const moves: Record<string, [number, number]> = {
        ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
        w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
      }
      if (moves[e.key]) {
        const newDir = moves[e.key]
        if (newDir[0] !== -dir[0] || newDir[1] !== -dir[1]) setDir(newDir)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [dir])

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-white">Score: {score}</span>
        <button onClick={reset} className="px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-500">Restart</button>
      </div>
      <div className="inline-grid gap-1 p-4 bg-white/5 rounded-2xl">
        {Array(15).fill(null).map((_, r) => (
          <div key={r} className="flex gap-1">
            {Array(15).fill(null).map((_, c) => {
              const isSnake = snake.some(([s, s2]) => s === r && s2 === c)
              const isFood = food[0] === r && food[1] === c
              return (
                <div
                  key={c}
                  className={`w-6 h-6 rounded-sm ${isSnake ? 'bg-green-400' : isFood ? 'bg-red-400' : 'bg-white/5'}`}
                />
              )
            })}
          </div>
        ))}
      </div>
      {gameOver && <p className="text-red-400 text-xl font-bold mt-4">Game Over!</p>}
      {paused && <p className="text-yellow-400 text-xl font-bold mt-4">Paused</p>}
      <p className="text-white/50 mt-2 text-sm">WASD or Arrow keys to move, Space to pause</p>
    </div>
  )
}