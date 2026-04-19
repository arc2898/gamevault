import { useState, useEffect } from 'react'

const tileTypes = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒', '🥝', '🍑']

export default function Mahjong() {
  const [tiles, setTiles] = useState<{ id: number; type: string; removed: boolean }[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [matched, setMatched] = useState(0)

  const init = () => {
    const pairs = [...tileTypes, ...tileTypes, ...tileTypes, ...tileTypes]
    const shuffled = pairs.map((type, i) => ({ id: i, type, removed: false })).sort(() => Math.random() - 0.5)
    setTiles(shuffled)
    setSelected(null)
    setMatched(0)
  }

  useEffect(() => init(), [])

  const handleClick = (id: number) => {
    if (tiles[id].removed) return
    if (selected === null) {
      setSelected(id)
    } else if (selected === id) {
      setSelected(null)
    } else {
      if (tiles[selected].type === tiles[id].type) {
        const newTiles = tiles.map(t => t.id === selected || t.id === id ? { ...t, removed: true } : t)
        setTiles(newTiles)
        setMatched(m => m + 1)
        setSelected(null)
      } else {
        setSelected(id)
      }
    }
  }

  return (
    <div className="text-center">
      <p className="mb-4 text-white/70">Matched: {matched}/{tiles.length / 2}</p>
      <div className="inline-block bg-white/5 rounded-2xl p-4">
        <div className="grid grid-cols-8 gap-2">
          {tiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => handleClick(tile.id)}
              disabled={tile.removed}
              className={`w-10 h-14 rounded-lg text-2xl flex items-center justify-center transition-all ${
                tile.removed ? 'opacity-0' : selected === tile.id ? 'bg-violet-600 ring-2 ring-yellow-400' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {tile.type}
            </button>
          ))}
        </div>
      </div>
      {matched === tiles.length / 2 && (
        <p className="text-green-400 text-xl font-bold mt-4">You Win!</p>
      )}
      <button onClick={init} className="mt-4 px-6 py-3 bg-violet-600 rounded-xl font-semibold hover:bg-violet-500">Shuffle</button>
    </div>
  )
}