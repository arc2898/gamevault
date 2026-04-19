import { useState } from 'react'

type Choice = 'rock' | 'paper' | 'scissors'

export default function RockPaperScissors() {
  const [player, setPlayer] = useState<Choice | null>(null)
  const [computer, setComputer] = useState<Choice | null>(null)
  const [score, setScore] = useState({ player: 0, computer: 0, draw: 0 })
  const [result, setResult] = useState<string | null>(null)

  const choices: Choice[] = ['rock', 'paper', 'scissors']
  const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' }

  const play = (choice: Choice) => {
    const comp = choices[Math.floor(Math.random() * 3)]
    setPlayer(choice)
    setComputer(comp)
    if (choice === comp) { setResult("Draw!"); setScore(s => ({ ...s, draw: s.draw + 1 })) }
    else if (
      (choice === 'rock' && comp === 'scissors') ||
      (choice === 'paper' && comp === 'rock') ||
      (choice === 'scissors' && comp === 'paper')
    ) { setResult("You Win!"); setScore(s => ({ ...s, player: s.player + 1 })) }
    else { setResult("You Lose!"); setScore(s => ({ ...s, computer: s.computer + 1 })) }
  }

  return (
    <div className="text-center">
      <div className="mb-6 flex justify-center gap-8 text-lg">
        <span className="text-cyan-400">You: {score.player}</span>
        <span className="text-white/50">Draw: {score.draw}</span>
        <span className="text-pink-400">Computer: {score.computer}</span>
      </div>
      <div className="mb-8 flex justify-center gap-8 text-6xl">
        <div className="w-24 h-24 flex items-center justify-center bg-white/10 rounded-2xl">
          {player ? emojis[player] : '?'}
        </div>
        <div className="w-24 h-24 flex items-center justify-center bg-white/10 rounded-2xl">
          {computer ? emojis[computer] : '?'}
        </div>
      </div>
      {result && <p className={`text-2xl font-bold mb-6 ${result.includes('Win') ? 'text-green-400' : result.includes('Lose') ? 'text-red-400' : 'text-yellow-400'}`}>{result}</p>}
      <div className="flex justify-center gap-4">
        {choices.map(c => (
          <button
            key={c}
            onClick={() => play(c)}
            className="w-20 h-20 text-4xl bg-white/10 rounded-2xl hover:bg-white/20 transition-all hover:scale-110"
          >
            {emojis[c]}
          </button>
        ))}
      </div>
    </div>
  )
}