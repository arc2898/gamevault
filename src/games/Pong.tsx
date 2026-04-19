import { useState, useEffect } from 'react'

export default function Pong() {
  const [ball, setBall] = useState<[number, number]>([7, 4])
  const [ballVel, setBallVel] = useState<[number, number]>([1, 1])
  const [p1, setP1] = useState(6)
  const [p2, setP2] = useState(6)
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [paused, setPaused] = useState(true)

  const reset = () => {
    setBall([7, 4])
    setBallVel([1, Math.random() > 0.5 ? 1 : -1])
    setP1(6); setP2(6)
    setPaused(true)
  }

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setBall(prev => {
        let [r, c] = prev
        let [vr, vc] = ballVel

        if (r <= 0 || r >= 14) vr = -vr
        if (c === 0 && r >= p1 - 1 && r <= p1 + 1) vc = 1
        if (c === 14 && r >= p2 - 1 && r <= p2 + 1) vc = -1

        if (c < 0) { setScore1(s => s + 1); return [7, 4] }
        if (c > 14) { setScore2(s => s + 1); return [7, 4] }

        return [r + vr, c + vc]
      })
    }, 200)
    return () => clearInterval(interval)
  }, [paused, ballVel, p1, p2])

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === ' ') { e.preventDefault(); setPaused(p => !p); return }
      if (e.key === 'w' && p1 > 1) setP1(p => p - 1)
      if (e.key === 's' && p1 < 12) setP1(p => p + 1)
      if (e.key === 'ArrowUp' && p2 > 1) setP2(p => p - 1)
      if (e.key === 'ArrowDown' && p2 < 12) setP2(p => p + 1)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [p1, p2])

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-xl font-bold text-cyan-400">You: {score1}</span>
        <button onClick={reset} className="px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-500">Restart</button>
        <span className="text-xl font-bold text-pink-400">AI: {score2}</span>
      </div>
      <div className="inline-block bg-white/5 rounded-2xl p-2">
        {Array(15).fill(null).map((_, r) => (
          <div key={r} className="flex">
            {Array(15).fill(null).map((_, c) => {
              const isP1 = c === 0 && Math.abs(r - p1) <= 1
              const isP2 = c === 14 && Math.abs(r - p2) <= 1
              const isBall = ball[0] === r && ball[1] === c
              return (
                <div key={c} className={`w-6 h-6 flex items-center justify-center text-xs ${c === 7 && r !== 7 ? 'border-r border-white/20' : ''}`}>
                  {isBall && '●'}
                  {isP1 && '█'}
                  {isP2 && '█'}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <p className="text-white/50 mt-4 text-sm">W/S to move, Space to start</p>
    </div>
  )
}