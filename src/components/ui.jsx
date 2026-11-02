import { ArrowLeft, ChevronRight, Coins, Heart, Sparkles, Trophy, X } from 'lucide-react'
import { useGame } from '../context/GameContext'

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = { primary: 'bg-mint text-ink hover:bg-white', secondary: 'bg-white/10 text-white hover:bg-white/20', gold: 'bg-gold text-ink hover:bg-yellow-200', danger: 'bg-coral text-ink hover:bg-red-200' }
  return <button className={`rounded-2xl px-5 py-3 font-black transition ${styles[variant]} ${className}`} {...props}>{children}</button>
}
export function TopBar({ back = true, title = 'GenZ Slang CodeX' }) {
  const { setActiveScreen, xp, lives, coins, player, setModal } = useGame()
  return <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8">
    <div className="flex items-center gap-3">{back && <button onClick={() => setActiveScreen('map')} className="rounded-xl bg-white/10 p-2" aria-label="Go back"><ArrowLeft size={19} /></button>}<span className="text-sm font-black tracking-wide sm:text-base">{title}</span></div>
    <div className="flex items-center gap-2 text-xs font-bold sm:gap-4 sm:text-sm"><span className="hidden text-mint sm:inline">⚡ {xp} XP</span><span className="flex items-center gap-1"><Heart size={16} className="fill-coral text-coral" />{lives}</span><span className="flex items-center gap-1"><Coins size={16} className="text-gold" />{coins}</span><button onClick={() => setModal('profile')} className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-lilac text-lg">{player.avatar}</button></div>
  </header>
}
export function Modal({ title, children, onClose, wide = false }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"><div className={`glass relative max-h-[90vh] w-full overflow-auto rounded-3xl p-6 shadow-card sm:p-8 ${wide ? 'max-w-3xl' : 'max-w-md'}`}><button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/10 p-2" aria-label="Close"><X size={18} /></button><h2 className="mb-5 text-2xl font-black">{title}</h2>{children}</div></div>
}
export function SectionTitle({ eyebrow, title, action }) { return <div className="mb-6 flex items-end justify-between"><div><p className="mb-1 text-xs font-black uppercase tracking-[.2em] text-mint">{eyebrow}</p><h1 className="text-3xl font-black sm:text-5xl">{title}</h1></div>{action}</div> }
export function Stat({ icon, value, label }) { return <div className="glass rounded-2xl px-4 py-3"><div className="mb-1 flex items-center gap-2 text-gold">{icon}<b>{value}</b></div><p className="text-xs text-white/60">{label}</p></div> }
export const IconNext = () => <ChevronRight size={18} />
export const IconSparkles = () => <Sparkles size={18} />
export const IconTrophy = () => <Trophy size={18} />
