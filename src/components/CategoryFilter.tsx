import { motion } from 'framer-motion'
import { categories } from '../data/games'
import { useGameStore } from '../store/gameStore'

export default function CategoryFilter() {
  const { category, setCategory } = useGameStore()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-2 flex-wrap"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            category === cat
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          {cat}
        </button>
      ))}
    </motion.div>
  )
}