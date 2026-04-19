import { useState } from 'react'

type Board = (string | null)[][]
const initBoard: Board = [
  [null, 'b', null, 'b', null, 'b', null, 'b'],
  ['b', null, 'b', null, 'b', null, 'b', null],
  [null, 'b', null, 'b', null, 'b', null, 'b'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['w', null, 'w', null, 'w', null, 'w', null],
  [null, 'w', null, 'w', null, 'w', null, 'w'],
  ['w', null, 'w', null, 'w', null, 'w', null],
]

export default function Checkers() {
  const [board, setBoard] = useState<Board>(initBoard.map(r => [...r]))
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [turn, setTurn] = useState<'white' | 'black'>('white')

  const isWhite = (p: string | null) => p?.startsWith('w')
  const isBlack = (p: string | null) => p?.startsWith('b')

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
    // Simple diagonal move
    const dr = r - selected[0]
    const dc = Math.abs(c - selected[1])
    if (Math.abs(dr) === 1 && dc === 1) {
      const newBoard = board.map(row => [...row])
      newBoard[r][c] = board[selected[0]][selected[1]]
      newBoard[selected[0]][selected[1]] = null
      setBoard(newBoard)
      setSelected(null)
      setTurn(turn === 'white' ? 'black' : 'white')
    }
  }

  const reset = () => {
    setBoard(initBoard.map(r => [...r]))
    setSelected(null)
    setTurn('white')
  }

  return (
    <div className="text-center">
      <p className="text-lg mb-2 text-white/70">{turn === 'white' ? 'White' : 'Black'} to move</p>
      <div className="inline-block bg-white/5 rounded-2xl p-2">
        {board.map((row, ri) => (
          <div key={ri} className="flex">
            {row.map((piece, ci) => (
              <button
                key={ci}
                onClick={() => selectPiece(ri, ci)}
                className={`w-12 h-12 flex items-center justify-center transition-colors ${
                  (ri + ci) % 2 === 0 ? 'bg-[#7e5134]' : 'bg-[#deb887]'
                } ${selected?.[0] === ri && selected?.[1] === ci ? 'ring-4 ring-yellow-400' : ''} hover:opacity-80`}
              >
                {piece && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    piece.startsWith('w') ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    {piece.endsWith('k') ? '♔' : ''}
                  </div>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button onClick={reset} className="mt-4 px-6 py-3 bg-violet-600 rounded-xl font-semibold hover:bg-violet-500">New Game</button>
    </div>
  )
}