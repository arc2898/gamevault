import { useState } from 'react'

type Piece = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | null
type Board = Piece[][]

const initBoard: Board = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

const pieceSymbols: Record<string, string> = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
}

export default function Chess() {
  const [board, setBoard] = useState<Board>(initBoard.map(r => [...r]))
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [turn, setTurn] = useState<'white' | 'black'>('white')
  const [message, setMessage] = useState('White to move')

  const isWhite = (p: Piece) => p && p === p.toUpperCase()
  const isBlack = (p: Piece) => p && p === p.toLowerCase()

  const selectPiece = (r: number, c: number) => {
    const piece = board[r][c]
    if (!selected) {
      if (piece && ((turn === 'white' && isWhite(piece)) || (turn === 'black' && isBlack(piece)))) {
        setSelected([r, c])
      }
      return
    }
    if (selected[0] === r && selected[1] === c) {
      setSelected(null)
      return
    }
    // Simple move - just allow any move for now
    const newBoard = board.map(row => [...row])
    newBoard[r][c] = board[selected[0]][selected[1]]
    newBoard[selected[0]][selected[1]] = null
    setBoard(newBoard)
    setSelected(null)
    const nextTurn = turn === 'white' ? 'black' : 'white'
    setTurn(nextTurn)
    setMessage(`${nextTurn === 'white' ? 'White' : 'Black'} to move`)
  }

  const reset = () => {
    setBoard(initBoard.map(r => [...r]))
    setSelected(null)
    setTurn('white')
    setMessage('White to move')
  }

  return (
    <div className="text-center">
      <p className="text-lg mb-2 text-white/70">{message}</p>
      <div className="inline-block bg-white/5 rounded-2xl p-2">
        {board.map((row, ri) => (
          <div key={ri} className="flex">
            {row.map((piece, ci) => (
              <button
                key={ci}
                onClick={() => selectPiece(ri, ci)}
                className={`w-12 h-12 flex items-center justify-center text-3xl transition-colors ${
                  (ri + ci) % 2 === 0 ? 'bg-[#b58863]' : 'bg-[#f0d9b5]'
                } ${selected?.[0] === ri && selected?.[1] === ci ? 'ring-4 ring-yellow-400' : ''} hover:opacity-80`}
              >
                {piece && <span className={isWhite(piece) ? 'text-white drop-shadow' : 'text-black'}>{pieceSymbols[piece]}</span>}
              </button>
            ))}
          </div>
        ))}
      </div>
      <p className="text-white/50 mt-4 text-sm">Click piece then destination (simplified rules)</p>
      <button onClick={reset} className="mt-4 px-6 py-3 bg-violet-600 rounded-xl font-semibold hover:bg-violet-500">New Game</button>
    </div>
  )
}