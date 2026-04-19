export interface Game {
  id: string
  name: string
  category: string
  color: string
  description: string
}

export const games: Game[] = [
  { id: 'tictactoe', name: 'Tic Tac Toe', category: 'Mini', color: '#8b5cf6', description: 'Classic 3 in a row' },
  { id: '2048', name: '2048', category: 'Puzzle', color: '#f59e0b', description: 'Slide and merge tiles' },
  { id: 'memory', name: 'Memory', category: 'Puzzle', color: '#22c55e', description: 'Match the cards' },
  { id: 'snake', name: 'Snake', category: 'Arcade', color: '#ef4444', description: 'Eat apples, grow longer' },
  { id: 'pong', name: 'Pong', category: 'Arcade', color: '#06b6d4', description: 'AI vs Player' },
  { id: 'breakout', name: 'Breakout', category: 'Arcade', color: '#ec4899', description: 'Break the bricks' },
  { id: 'flappy', name: 'Flappy Bird', category: 'Arcade', color: '#84cc16', description: 'Dodge the pipes' },
  { id: 'spaceinvaders', name: 'Space Invaders', category: 'Arcade', color: '#a855f7', description: 'Shoot the aliens' },
  { id: 'sudoku', name: 'Sudoku', category: 'Puzzle', color: '#14b8a6', description: 'Number puzzle' },
  { id: 'minesweeper', name: 'Minesweeper', category: 'Puzzle', color: '#64748b', description: 'Find the mines' },
  { id: 'hangman', name: 'Hangman', category: 'Mini', color: '#f97316', description: 'Guess the word' },
  { id: 'rps', name: 'Rock Paper Scissors', category: 'Mini', color: '#eab308', description: 'Quick rounds' },
  { id: 'darts', name: 'Darts', category: 'Mini', color: '#dc2626', description: 'Score targets' },
  { id: 'chess', name: 'Chess', category: 'Board', color: '#1e3a5f', description: 'vs AI opponent' },
  { id: 'checkers', name: 'Checkers', category: 'Board', color: '#7c3aed', description: 'vs AI opponent' },
  { id: 'crossword', name: 'Crossword', category: 'Puzzle', color: '#0ea5e9', description: 'Word puzzle grid' },
  { id: 'mahjong', name: 'Mahjong', category: 'Board', color: '#059669', description: 'Tile matching' },
  { id: 'go', name: 'Go', category: 'Board', color: '#1f2937', description: 'vs AI opponent' },
]

export const categories = ['All', 'Arcade', 'Puzzle', 'Board', 'Mini']