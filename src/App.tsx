import { useState } from 'react'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import GameGrid from './components/GameGrid'
import { games } from './data/games'

// Import all games first
import TicTacToe from './games/TicTacToe'
import Game2048 from './games/Game2048'
import Memory from './games/Memory'
import Snake from './games/Snake'
import Pong from './games/Pong'
import Breakout from './games/Breakout'
import Flappy from './games/Flappy'
import SpaceInvaders from './games/SpaceInvaders'
import Sudoku from './games/Sudoku'
import Minesweeper from './games/Minesweeper'
import Hangman from './games/Hangman'
import RockPaperScissors from './games/RockPaperScissors'
import Darts from './games/Darts'
import Chess from './games/Chess'
import Checkers from './games/Checkers'
import Crossword from './games/Crossword'
import Mahjong from './games/Mahjong'
import Go from './games/Go'

const gameComponents: Record<string, () => React.ReactElement> = {
  tictactoe: () => <TicTacToe />,
  2048: () => <Game2048 />,
  memory: () => <Memory />,
  snake: () => <Snake />,
  pong: () => <Pong />,
  breakout: () => <Breakout />,
  flappy: () => <Flappy />,
  spaceinvaders: () => <SpaceInvaders />,
  sudoku: () => <Sudoku />,
  minesweeper: () => <Minesweeper />,
  hangman: () => <Hangman />,
  rps: () => <RockPaperScissors />,
  darts: () => <Darts />,
  chess: () => <Chess />,
  checkers: () => <Checkers />,
  crossword: () => <Crossword />,
  mahjong: () => <Mahjong />,
  go: () => <Go />,
}

function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null)

  const handleBack = () => setCurrentGame(null)

  if (currentGame && gameComponents[currentGame]) {
    const GameComponent = gameComponents[currentGame]
    return (
      <div className="min-h-screen bg-[#0f0f1a]">
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f0f1a]/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              ← Back to Games
            </button>
            <h2 className="font-bold text-white">{games.find(g => g.id === currentGame)?.name}</h2>
            <div className="w-20" />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)] p-4">
          <GameComponent />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-8">
          <CategoryFilter />
        </section>
        <section>
          <GameGrid onGameSelect={setCurrentGame} />
        </section>
      </main>
    </div>
  )
}

export default App