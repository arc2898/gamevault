import { useState, useEffect } from 'react'

export default function SpaceInvaders() {
  const [player, setPlayer] = useState(4)
  const [bullets, setBullets] = useState<number[]>([])
  const [aliens, setAliens] = useState<number[][]>([])
  const [alienDir, setAlienDir] = useState(1)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  const reset = () => {
    const newAliens: number[][] = []
    for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) newAliens.push([r, c])
    setAliens(newAliens)
    setPlayer(4)
    setBullets([])
    setScore(0)
    setGameOver(false)
    setWon(false)
    setAlienDir(1)
  }

  useEffect(() => reset(), [])

  useEffect(() => {
    if (gameOver || won) return
    const interval = setInterval(() => {
      setAliens(prev => {
        let newAliens = prev.map(([r, c]) => [r, c + alienDir])
        const hitEdge = newAliens.some(([_, c]) => c <= 0 || c >= 8)
        if (hitEdge) {
          newAliens = prev.map(([r, c]) => [r + 1, c])
          setAlienDir(d => -d)
          if (newAliens.some(([r]) => r >= 10)) setGameOver(true)
        }
        return newAliens
      })
      setBullets(prev => prev.map(b => b - 1).filter(b => b > 0))
      setAliens(prev => {
        prev.forEach(([r, c]) => {
          if (bullets.some(b => b === c * 32 + r * 32)) {
            setScore(s => s + 10)
          }
        })
        return prev
      })
    }, 500)
    return () => clearInterval(interval)
  }, [alienDir, bullets, gameOver, won])

  const shoot = () => {
    setBullets(b => [...b, player])
  }

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && player > 0) setPlayer(p => p - 1)
      if (e.key === 'ArrowRight' && player < 8) setPlayer(p => p + 1)
      if (e.key === ' ') { e.preventDefault(); shoot() }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [player])

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-white">Score: {score}</span>
        <button onClick={reset} className="px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-500">Restart</button>
      </div>
      <div className="inline-block bg-white/5 rounded-2xl p-4">
        <div className="relative" style={{ width: 288, height: 320 }}>
          {aliens.map(([r, c], i) => (
            <div
              key={i}
              className="absolute text-2xl"
              style={{ top: r * 32, left: c * 32 }}
            >
              👾
            </div>
          ))}
          <div
            className="absolute text-2xl"
            style={{ top: 288, left: player * 32 }}
          >
            🚀
          </div>
          {bullets.map((b, i) => (
            <div key={i} className="absolute w-1 h-3 bg-yellow-400" style={{ top: 256, left: b * 32 + 16 }} />
          ))}
          {gameOver && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-red-400 text-2xl font-bold">Game Over</span></div>}
          {won && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-green-400 text-2xl font-bold">You Win!</span></div>}
        </div>
      </div>
      <p className="text-white/50 mt-2 text-sm">←/→ to move, Space to shoot</p>
    </div>
  )
}