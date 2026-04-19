import { useState } from 'react'

export default function Darts() {
  const [score, setScore] = useState(0)
  const [turns, setTurns] = useState(0)
  const [clicked, setClicked] = useState<[number, number] | null>(null)

  const bullseye = { x: 150, y: 150, r: 8 }
  const rings = [
    { r: 140, color: '#22c55e' },
    { r: 110, color: '#16a34a' },
    { r: 80, color: '#15803d' },
    { r: 50, color: '#166534' },
  ]
  const sectors = 20

  const hit = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dist = Math.sqrt((x - bullseye.x) ** 2 + (y - bullseye.y) ** 2)

    let points = 0
    if (dist <= bullseye.r) points = 50
    else if (dist <= rings[0].r) points = 25
    else {
      const angle = Math.atan2(y - bullseye.y, x - bullseye.x)
      const sector = Math.floor(((angle + Math.PI) / (2 * Math.PI)) * sectors) % sectors
      const ringIndex = rings.findIndex((ring, i) => dist <= ring.r && (i === rings.length - 1 || dist > rings[i + 1]?.r))
      const ringMult = [5, 4, 3, 2][ringIndex] || 1
      points = (sector + 1) * ringMult
    }

    setScore(s => s + points)
    setTurns(t => t + 1)
    setClicked([x, y])
    setTimeout(() => setClicked(null), 500)
  }

  const reset = () => { setScore(0); setTurns(0) }

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-white">Score: {score}</span>
        <span className="text-white/50">Turns: {turns}</span>
        <button onClick={reset} className="px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-500">Reset</button>
      </div>
      <svg width="300" height="300" className="cursor-crosshair mx-auto" onClick={hit}>
        {rings.map((ring, i) => (
          <circle key={i} cx={bullseye.x} cy={bullseye.y} r={ring.r} fill={ring.color} stroke="#fff" strokeWidth="1" />
        ))}
        <circle cx={bullseye.x} cy={bullseye.y} r={bullseye.r} fill="#fff" />
        {Array(sectors).fill(null).map((_, i) => {
          const angle = (i / sectors) * 2 * Math.PI - Math.PI / 2
          const x1 = bullseye.x + Math.cos(angle) * 145
          const y1 = bullseye.y + Math.sin(angle) * 145
          const x2 = bullseye.x + Math.cos(angle + Math.PI / sectors) * 145
          const y2 = bullseye.y + Math.sin(angle + Math.PI / sectors) * 145
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1" />
        })}
        {clicked && <circle cx={clicked[0]} cy={clicked[1]} r="4" fill="red" />}
      </svg>
      <p className="text-white/50 mt-4 text-sm">Click on the target to throw darts</p>
    </div>
  )
}