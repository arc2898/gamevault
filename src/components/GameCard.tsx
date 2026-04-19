import { motion } from 'framer-motion'
import { Game } from '../data/games'
import { useGameStore } from '../store/gameStore'

interface Props {
  game: Game
}

export default function GameCard({ game }: Props) {
  const { favorites, addFavorite, removeFavorite } = useGameStore()
  const isFav = favorites.includes(game.id)

  const toggleFav = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isFav) removeFavorite(game.id)
    else addFavorite(game.id)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer group"
    >
      <div
        className="aspect-square rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-shadow group-hover:shadow-2xl"
        style={{ background: `linear-gradient(135deg, ${game.color}40, ${game.color}20)` }}
      >
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
          style={{ background: `${game.color}40` }}
        >
          🎮
        </div>
        <h3 className="font-semibold text-white text-center">{game.name}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">{game.category}</span>
        <p className="text-xs text-white/50 text-center">{game.description}</p>
      </div>
      <button
        onClick={toggleFav}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
      >
        {isFav ? '❤️' : '🤍'}
      </button>
    </motion.div>
  )
}