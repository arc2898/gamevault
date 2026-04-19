import { useState, useEffect } from 'react'

export default function Breakout() {
  const [paddle, setPaddle] = useState(4)
  const [ball, setBall] = useState<[number, number]>([10, 5])
  const [ballDir, setBallDir] = useState<[number, number]>([1, -1])
  const [bricks, setBricks] = useState<boolean[][]>(Array(5).fill(null).map(() => Array(9).fill(true)))
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [paused, setPaused] = useState(true)

  const reset = () => {
    setBricks(Array(5).fill(null).map(() => Array(9).fill(true)))
    setBall([10, 4])
    setBallDir([1, -1])
    setPaddle(4)
    setScore(0)
    setGameOver(false)
    setPaused(true)
  }

  useEffect(() => {
    if (paused || gameOver) return
    const interval = setInterval(() => {
      setBall(prev => {
        let [r, c] = prev
        let [vr, vc] = ballDir
        const newR = r + vr
        const newC = c + vc

        if (newR === 10 && newC >= paddle && newC <= paddle + 2) { vr = -1; setBallDir([vr, vc]) }
        if (newR <= 0) { vr = 1; setBallDir([vr, vc]) }
        if (newC <= 0 || newC >= 8) { vc = -vc; setBallDir([vr, vc]) }
        if (newR === 11) { setGameOver(true); return prev }

        if (newR >= 1 && newR <= 5 && bricks[newR - 1]?.[newC]) {
          const newBricks = bricks.map(row => [...row])
          newBricks[newR - 1][newC] = false
          setBricks(newBricks)
          setScore(s => s + 10)
          vr = 1
          setBallDir([vr, vc])
        }

        return [newR, newC]
      })
    }, 150)
    return () => clearInterval(interval)
  }, [paused, gameOver, ballDir, bricks, paddle])

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === ' ') { e.preventDefault(); setPaused(p => !p); return }
      if (e.key === 'ArrowLeft' && paddle > 0) setPaddle(p => p - 1)
      if (e.key === 'ArrowRight' && paddle < 6) setPaddle(p => p + 1)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [paddle])

  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6']

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-white">Score: {score}</span>
        <button onClick={reset} className="px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-500">Restart</button>
      </div>
      <div className="inline-block bg-white/5 rounded-2xl p-4">
        <div className="grid grid-cols-9 gap-1 mb-4">
          {bricks.map((row, ri) =>
            row.map((brick, ci) => (
              <div
                key={`${ri}-${ci}`}
                className={`w-8 h-4 rounded-sm ${brick ? '' : 'opacity-0'}`}
                style={{ background: brick ? colors[ri] : 'transparent' }}
              />
            ))
          )}
        </div>
        <div className="relative" style={{ width: 216, height: 240 }}>
          {Array(12).fill(null).map((_, r) => (
            <div key={r} className="flex">
              {Array(9).fill(null).map((_, c) => {
                const isPaddle = r === 10 && c >= paddle && c <= paddle + 2
                const isBall = ball[0] === r && ball[1] === c
                return (
                  <div key={c} className="w-8 h-8 flex items-center justify-center text-lg">
                    {isPaddle && <div className="w-full h-2 bg-cyan-400 rounded" />}
                    {isBall && '●'}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      {gameOver && <p className="text-red-400 text-xl font-bold mt-4">Game Over!</p>}
      <p className="text-white/50 mt-2 text-sm">←/→ to move, Space to start</p>
    </div>
  )
}