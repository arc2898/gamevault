import { useState, useEffect } from 'react'

export default function Flappy() {
  const [bird, setBird] = useState(8)
  const [pipes, setPipes] = useState<[number, number][]>([[15, 6]])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const reset = () => {
    setBird(8)
    setPipes([[15, 6]])
    setScore(0)
    setGameOver(false)
  }

  useEffect(() => {
    if (gameOver) return
    const interval = setInterval(() => {
      setBird(b => Math.min(b + 1, 17))
      setPipes(prev => {
        const newPipes: [number, number][] = prev.map(([pos, gap]): [number, number] => [pos - 1, gap])
        if (newPipes[0][0] < 0) {
          setScore(s => s + 1)
          return [[15, 6] as [number, number], ...newPipes.slice(1)]
        }
        return newPipes
      })
      const birdY = bird
      const hitPipe = pipes[0]
      if (hitPipe && hitPipe[0] <= 2 && (birdY < hitPipe[1] - 1 || birdY > hitPipe[1] + gap + 1)) {
        setGameOver(true)
      }
      if (birdY >= 17) setGameOver(true)
    }, 200)
    return () => clearInterval(interval)
  }, [bird, pipes, gameOver])

  const gap = 4

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === ' ') { e.preventDefault(); if (gameOver) reset(); else setBird(b => Math.max(b - 3, 0)) }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [gameOver])

  return (
    <div className="text-center">
      <div className="mb-4">
        <span className="text-2xl font-bold text-white">Score: {score}</span>
        <button onClick={reset} className="ml-4 px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-500">Restart</button>
      </div>
      <div className="inline-block bg-white/5 rounded-2xl p-4" style={{ width: 288, height: 360 }}>
        <div className="relative" style={{ width: 256, height: 320 }}>
          <div
            className="absolute w-8 h-6 bg-yellow-400 rounded-full"
            style={{ top: bird * 16, left: 64, transition: 'top 0.1s' }}
          />
          {pipes[0] && (
            <>
              <div className="absolute bg-green-500" style={{ top: 0, left: pipes[0][0] * 16, width: 32, height: pipes[0][1] * 16 }} />
              <div className="absolute bg-green-500" style={{ top: (pipes[0][1] + gap) * 16, left: pipes[0][0] * 16, width: 32, height: 320 - (pipes[0][1] + gap) * 16 }} />
            </>
          )}
          {gameOver && <div className="absolute inset-0 flex items-center justify-center bg-black/50"><span className="text-white text-2xl font-bold">Game Over</span></div>}
        </div>
      </div>
      <p className="text-white/50 mt-2 text-sm">Space to flap</p>
    </div>
  )
}