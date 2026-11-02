import { useEffect, useState } from 'react'
import { Medal, RefreshCw } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { Button, Modal } from './ui'
const fallback = [{ name: 'May Thu', score: 980, avatar: '🧑🏽‍🎤' }, { name: 'Nway Nway', score: 860, avatar: '👩🏽‍🚀' }, { name: 'You', score: 120, avatar: '🧑🏽‍🚀' }]
export default function Leaderboard() {
  const { setModal, score } = useGame()
  const [state, setState] = useState('loading')
  useEffect(() => { const timer = window.setTimeout(() => setState('ready'), 500); return () => window.clearTimeout(timer) }, [])
  return <Modal title="Weekly leaderboard" onClose={() => setModal(null)} wide>{state === 'loading' ? <div className="grid place-items-center py-16 text-white/50"><RefreshCw className="animate-spin text-mint" /><p className="mt-3 text-sm">Finding this week’s explorers...</p></div> : state === 'error' ? <div className="py-10 text-center"><p>Couldn’t load the leaderboard.</p><Button className="mt-4" onClick={() => setState('loading')}>Try again</Button></div> : state === 'empty' ? <div className="py-10 text-center text-white/60">No scores yet. Be the first explorer!</div> : <div className="space-y-3">{fallback.map((player, index) => <div key={player.name} className={`flex items-center gap-4 rounded-2xl p-4 ${player.name === 'You' ? 'bg-mint/15 ring-1 ring-mint/40' : 'bg-white/10'}`}><span className="w-6 text-center font-black text-gold">{index + 1}</span><span className="grid h-11 w-11 place-items-center rounded-full bg-plum text-xl">{player.avatar}</span><b className="flex-1">{player.name}</b><span className="font-black text-mint">{player.name === 'You' ? score : player.score} XP</span>{index < 3 && <Medal size={17} className="text-gold" />}</div>)}</div>}</Modal>
}
