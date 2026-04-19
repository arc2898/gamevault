import { create } from 'zustand'

interface GameState {
  favorites: string[]
  recent: string[]
  searchQuery: string
  category: string
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  addRecent: (id: string) => void
  setSearchQuery: (q: string) => void
  setCategory: (c: string) => void
}

export const useGameStore = create<GameState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  recent: JSON.parse(localStorage.getItem('recent') || '[]'),
  searchQuery: '',
  category: 'All',
  addFavorite: (id) => {
    const favs = [...get().favorites, id]
    localStorage.setItem('favorites', JSON.stringify(favs))
    set({ favorites: favs })
  },
  removeFavorite: (id) => {
    const favs = get().favorites.filter(f => f !== id)
    localStorage.setItem('favorites', JSON.stringify(favs))
    set({ favorites: favs })
  },
  addRecent: (id) => {
    const rec = [id, ...get().recent.filter(r => r !== id)].slice(0, 5)
    localStorage.setItem('recent', JSON.stringify(rec))
    set({ recent: rec })
  },
  setSearchQuery: (q) => set({ searchQuery: q }),
  setCategory: (c) => set({ category: c }),
}))