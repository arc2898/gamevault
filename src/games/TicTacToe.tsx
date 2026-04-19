import { useState } from 'react'

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isX, setIsX] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  const checkWinner = (b: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ]
    for (const [a, c, d] of lines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]
    }
    return null
  }

  const handleClick = (i: number) => {
    if (board[i] || winner) return
    const newBoard = [...board]
    newBoard[i] = isX ? 'X' : 'O'
    setBoard(newBoard)
    const w = checkWinner(newBoard)
    if (w) setWinner(w)
    else setIsX(!isX)
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setIsX(true)
    setWinner(null)
  }

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]
  const winLine = winner ? lines.find(([a, c, d]) => board[a] === winner && board[a] === board[c] && board[a] === board[d]) : null

  return (
    <div className="text-center">
      <div className="grid grid-cols-3 gap-2 w-64 mx-auto mb-4">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`aspect-square rounded-xl text-4xl font-bold flex items-center justify-center transition-all ${
              winLine?.includes(i) ? 'bg-violet-600' : 'bg-white/10'
            } hover:bg-white/20`}
          >
            {cell === 'X' && <span className="text-cyan-400">{cell}</span>}
            {cell === 'O' && <span className="text-pink-400">{cell}</span>}
          </button>
        ))}
      </div>
      {winner && <p className="text-2xl font-bold text-violet-400 mb-4">{winner} Wins!</p>}
      {!winner && board.every(Boolean) && <p className="text-2xl font-bold text-yellow-400 mb-4">Draw!</p>}
      <button
        onClick={reset}
        className="px-6 py-3 bg-violet-600 rounded-xl font-semibold hover:bg-violet-500 transition-colors"
      >
        New Game
      </button>
    </div>
  )
}