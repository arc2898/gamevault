import { useState, useEffect } from 'react'

const icons = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒', '🥝', '🍑']

export default function Memory() {
  const [cards, setCards] = useState<{ id: number; icon: string; flipped: boolean; matched: boolean }[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  const init = () => {
    const pairs = [...icons, ...icons].map((icon, i) => ({ id: i, icon, flipped: false, matched: false }))
    setCards(pairs.sort(() => Math.random() - 0.5))
    setSelected([])
    setMoves(0)
  }

  useEffect(() => init(), [])

  const handleClick = (id: number) => {
    if (selected.length === 2 || cards[id].flipped || cards[id].matched) return
    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)
    const newSelected = [...selected, id]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      setMoves(m => m + 1)
      const [a, b] = newSelected
      if (cards[a].icon === cards[b].icon) {
        setTimeout(() => {
          const updated = [...cards]
          updated[a].matched = true
          updated[b].matched = true
          setCards(updated)
          setSelected([])
        }, 500)
      } else {
        setTimeout(() => {
          const updated = [...cards]
          updated[a].flipped = false
          updated[b].flipped = false
          setCards(updated)
          setSelected([])
        }, 1000)
      }
    }
  }

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-white">Moves: {moves}</span>
        <button onClick={init} className="px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-500">Shuffle</button>
      </div>
      <div className="grid grid-cols-4 gap-3 w-fit mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`w-16 h-16 rounded-xl text-2xl flex items-center justify-center transition-all ${
              card.flipped || card.matched ? 'bg-violet-600' : 'bg-white/10'
            } hover:bg-violet-500`}
          >
            {(card.flipped || card.matched) ? card.icon : '?'}
          </button>
        ))}
      </div>
      {cards.every(c => c.matched) && (
        <p className="text-2xl font-bold text-green-400 mt-4">You won in {moves} moves!</p>
      )}
    </div>
  )
}