import { motion } from 'framer-motion'
import { games } from '../data/games'
import { useGameStore } from '../store/gameStore'
import GameCard from './GameCard'

interface Props {
  onGameSelect: (id: string) => void
}

export default function GameGrid({ onGameSelect }: Props) {
  const { searchQuery, category } = useGameStore()

  const filtered = games.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'All' || g.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.05 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      {filtered.map((game) => (
        <GameCard key={game.id} game={game} onClick={() => onGameSelect(game.id)} />
      ))}
    </motion.div>
  )
}