import { useState } from 'react'

type Stone = 'black' | 'white' | null
type Board = Stone[][]

const initBoard: Board = Array(9).fill(null).map(() => Array(9).fill(null))

export default function Go() {
  const [board, setBoard] = useState<Board>(initBoard.map(r => [...r]))
  const [current, setCurrent] = useState<'black' | 'white'>('black')
  const [captures, setCaptures] = useState({ black: 0, white: 0 })

  const placeStone = (r: number, c: number) => {
    if (board[r][c]) return
    const newBoard = board.map(row => [...row])
    newBoard[r][c] = current

    // Simple capture check (only adjacent)
    const neighbors = [[r-1,c], [r+1,c], [r,c-1], [r,c+1]].filter(([nr,nc]) => nr>=0&&nr<9&&nc>=0&&nc<9)
    neighbors.forEach(([nr,nc]) => {
      if (newBoard[nr][nc] && newBoard[nr][nc] !== current) {
        const captured = neighbors.filter(([nr,nc]) => newBoard[nr][nc] === current).length
        if (captured >= 2) {
          newBoard[nr][nc] = null
          setCaptures(c => ({ ...c, [current]: c[current] + 1 }))
        }
      }
    })

    setBoard(newBoard)
    setCurrent(current === 'black' ? 'white' : 'black')
  }

  const reset = () => {
    setBoard(initBoard.map(r => [...r]))
    setCurrent('black')
    setCaptures({ black: 0, white: 0 })
  }

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-black bg-white px-3 py-1 rounded-full">● Black: {captures.black}</span>
        <span className="text-white bg-black px-3 py-1 rounded-full">○ White: {captures.white}</span>
      </div>
      <div className="inline-block bg-[#dcb35c] rounded-2xl p-4">
        {board.map((row, ri) => (
          <div key={ri} className="flex">
            {row.map((stone, ci) => (
              <button
                key={ci}
                onClick={() => placeStone(ri, ci)}
                className={`w-8 h-8 flex items-center justify-center border-r border-b border-black/20 ${
                  ri === 0 ? 'border-t' : ''
                } ${ci === 0 ? 'border-l' : ''}`}
              >
                {stone && (
                  <div className={`w-6 h-6 rounded-full ${stone === 'black' ? 'bg-black' : 'bg-white'}`} />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      <p className="text-white/50 mt-4 text-sm">Click to place {current === 'black' ? '●' : '○'}</p>
      <button onClick={reset} className="mt-4 px-6 py-3 bg-violet-600 rounded-xl font-semibold hover:bg-violet-500">New Game</button>
    </div>
  )
}