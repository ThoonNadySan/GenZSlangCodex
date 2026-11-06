import { useState } from 'react'
import { Check, HelpCircle, RotateCcw } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { Button, Modal, TopBar } from './ui'

const parts = [{ id: 'consonant', label: 'Consonant', value: 'မ' }, { id: 'vowel', label: 'Vowel', value: 'ို' }, { id: 'tone', label: 'Tone mark', value: 'က်' }]
export default function AssemblyChallenge() {
  const { selectedDestination, setActiveScreen, reward, settings } = useGame()
  const [selected, setSelected] = useState({ consonant: '', vowel: '', tone: '' })
  const [feedback, setFeedback] = useState(null)
  const [hint, setHint] = useState(false)
  const [confirmLeave, setConfirmLeave] = useState(false)
  const choose = (part, value) => setSelected((current) => ({ ...current, [part]: value }))
  const check = () => {
    const correct = Object.values(selected).every(Boolean)
    if (settings.answerFeedback) setFeedback(correct ? 'success' : 'retry')
    if (correct) reward(80)
  }
  const leaveQuiz = () => {
    if (settings.confirmLeave) setConfirmLeave(true)
    else setActiveScreen('map')
  }

  return <main className="screen-bg min-h-screen">
    <TopBar title={`${selectedDestination.name} · Challenge 01`} onBack={leaveQuiz} />
    <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div><p className="text-xs font-black uppercase tracking-[.2em] text-mint">Script assembly</p><h1 className="mt-2 text-3xl font-black sm:text-5xl">Build the slang</h1></div>
        {settings.hints && <button type="button" onClick={() => setHint(true)} className="rounded-2xl bg-gold/15 p-3 text-gold" aria-label="Show hint"><HelpCircle /></button>}
      </div>
      <div className="mb-7 flex items-center justify-between text-xs font-bold text-white/60"><span>Question 1 of 10</span><span>10% complete</span></div>
      <div className="mb-10 h-2 rounded-full bg-white/10"><div className="h-full w-[10%] rounded-full bg-mint" /></div>
      <section className="glass rounded-[2rem] p-5 text-center sm:p-10">
        <p className="text-sm text-white/60">Arrange the pieces to say:</p><p className="mt-2 text-3xl font-black text-gold">“That is cool!”</p>
        <div className="mx-auto my-10 flex min-h-28 max-w-xl flex-wrap items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-white/20 bg-black/10 p-5">
          {parts.map((part) => <div key={part.id} className="grid h-16 min-w-20 place-items-center rounded-2xl bg-white/10 text-3xl font-black text-mint">{selected[part.id] || <span className="text-sm text-white/30">drop {part.label}</span>}</div>)}
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {parts.map((part) => <div key={part.id}><p className="mb-2 text-xs font-bold text-white/50">{part.label}</p><div className="flex justify-center gap-2">{[part.value, part.id === 'tone' ? '့' : part.id === 'vowel' ? 'ာ' : 'ခ'].map((value) => <button draggable onClick={() => choose(part.id, value)} key={value} className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-plum text-2xl font-black hover:border-mint">{value}</button>)}</div></div>)}
        </div>
        <Button className="mt-10 w-full sm:w-auto" onClick={check}>Check answer <Check className="ml-2 inline" size={18} /></Button>
      </section>
    </div>
    {hint && <Modal title="A little nudge" onClose={() => setHint(false)}><div className="rounded-2xl bg-gold/10 p-5 text-sm leading-6 text-white/80">Start with the consonant <b className="text-gold">မ</b>. The tone mark belongs at the end of the word. You have got this!</div><Button className="mt-5 w-full" onClick={() => setHint(false)}>Got it</Button></Modal>}
    {feedback && <Modal title={feedback === 'success' ? 'Perfect assembly!' : 'Almost there'} onClose={() => setFeedback(null)}><div className={`grid place-items-center rounded-2xl p-6 ${feedback === 'success' ? 'bg-mint/10' : 'bg-coral/10'}`}>{feedback === 'success' ? <Check className="text-mint" size={45} /> : <RotateCcw className="text-coral" size={45} />}<p className="mt-3 text-center text-sm text-white/70">{feedback === 'success' ? 'You earned +80 score and a new card.' : 'Fill each tile, then try checking again.'}</p></div><Button className="mt-5 w-full" onClick={() => { setFeedback(null); if (feedback === 'success') setActiveScreen('collection') }}>{feedback === 'success' ? 'Open collection' : 'Try again'}</Button></Modal>}
    {confirmLeave && <Modal title="Leave this quiz?" onClose={() => setConfirmLeave(false)}><p className="text-sm text-white/70">Your current answers will be lost if you leave now.</p><div className="mt-5 grid grid-cols-2 gap-3"><Button variant="secondary" onClick={() => setConfirmLeave(false)}>Stay here</Button><Button variant="gold" onClick={() => { setConfirmLeave(false); setActiveScreen('map') }}>Leave quiz</Button></div></Modal>}
  </main>
}
