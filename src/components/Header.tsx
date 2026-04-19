import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function Header() {
  const { searchQuery, setSearchQuery } = useGameStore()

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f0f1a]/80 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <motion.h1
          className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          GameVault
        </motion.h1>
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-white placeholder-white/40 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
        </div>
      </div>
    </motion.header>
  )
}