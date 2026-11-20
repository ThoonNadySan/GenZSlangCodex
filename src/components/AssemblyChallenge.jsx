import { useState } from 'react'
import { ArrowLeft, Check, HelpCircle, RotateCcw } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { Button, Modal, TopBar } from './ui'

const parts = [
  { id: 'consonant', label: 'Consonant', value: 'မ', tileValue: 'မ' },
  { id: 'vowel', label: 'Vowel', value: 'ီ', tileValue: '◌ီ' },
  { id: 'tone', label: 'Tone', value: 'း', tileValue: '◌း' }
]
const spellingOrder = ['consonant', 'vowel', 'tone']
const initialSpellingOrder = ['vowel', 'consonant', 'tone']

export default function AssemblyChallenge() {
  const { selectedDestination } = useGame()
  return selectedDestination.id === 'naypyitaw'
    ? <NaypyitawSpellingBuilder />
    : <LegacyAssemblyChallenge />
}

function NaypyitawSpellingBuilder() {
  const { setModal, setActiveScreen: navigate } = useGame()
  const [tileOrder, setTileOrder] = useState(initialSpellingOrder)
  const [selectedTile, setSelectedTile] = useState(null)
  const [swapCount, setSwapCount] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [showHint, setShowHint] = useState(false)
  const readyToCheck = tileOrder.every((part, index) => part === spellingOrder[index])

  const swapTiles = (index) => {
    if (selectedTile === null) {
      setSelectedTile(index)
      return
    }
    if (selectedTile === index) {
      setSelectedTile(null)
      return
    }
    setTileOrder((current) => {
      const next = [...current]
      ;[next[selectedTile], next[index]] = [next[index], next[selectedTile]]
      return next
    })
    setSwapCount((count) => count + 1)
    setSelectedTile(null)
    setFeedback('')
  }

  const shuffleTiles = () => {
    const shuffled = [...spellingOrder]
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const other = Math.floor(Math.random() * (index + 1))
      ;[shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]]
    }
    if (shuffled.every((part, index) => part === spellingOrder[index])) {
      ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
    }
    setTileOrder(shuffled)
    setSelectedTile(null)
    setFeedback('')
  }

  const resetTiles = () => {
    setTileOrder(initialSpellingOrder)
    setSelectedTile(null)
    setSwapCount(0)
    setFeedback('')
  }

  const checkAnswer = () => {
    setFeedback(readyToCheck ? 'Correct! မီး (mee) — Fire!' : 'Not quite yet. Swap the tiles into the target order.')
  }

  return <main className="spelling-page">
    <section className="spelling-scene" aria-label="Naypyitaw spelling builder">
      <img className="spelling-world-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" aria-hidden="true" />
      <img className="spelling-brand" src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
      <button type="button" className="spelling-scene-back" onClick={() => navigate('map')} aria-label="Back to world map"><ArrowLeft size={18} /></button>
      <div className="spelling-timer" aria-label="Timer">00:00</div>
      <header className="world-map-profile spelling-player-bar">
        <img src="/generated/setting-bar-transparent.png" alt="Player profile, XP, settings and leaderboard" />
        <button className="profile-hitbox" type="button" onClick={() => setModal('profile')} aria-label="Open profile" />
        <button className="settings-hitbox" type="button" onClick={() => navigate('settings')} aria-label="Settings" />
        <button className="leaderboard-hitbox" type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
      </header>

      <section className="spelling-card">
        <header className="spelling-card-heading">
          <p>NAYPYITAW · 1 / 10</p>
          <div className="spelling-heading-row">
            <h1>Spelling Builder</h1>
            <div className="spelling-monkey" aria-hidden="true"><img src="/MonkeyDes1.png" alt="" /></div>
          </div>
          <div className="spelling-progress" aria-label="Question 1 of 10">
            {Array.from({ length: 10 }, (_, step) => <span className={step === 0 ? 'is-current' : ''} key={step} />)}
          </div>
        </header>

        <div className="spelling-main">
          <section className="spelling-word-card" aria-label="Word to spell">
            <p>SPELL IT IN BURMESE</p>
            <h2>Fire</h2>
            <div className="spelling-flame-art"><img src="/firelogoDes1.png" alt="Flame illustration" /></div>
            <span>3 spelling parts · 1 word</span>
          </section>

          <section className="spelling-board" aria-label="Arrange the Burmese spelling parts">
            <div className="spelling-board-top">
              <div>
                <p>{readyToCheck ? 'READY TO CHECK' : 'TAP TO SWAP'}</p>
                <span>{readyToCheck ? 'The tiles are arranged. Check your spelling.' : 'Tap one tile, then another to swap their positions.'}</span>
              </div>
              <b className="spelling-swap-count">{swapCount} {swapCount === 1 ? 'swap' : 'swaps'}</b>
            </div>
            <button type="button" className="spelling-shuffle" onClick={readyToCheck ? resetTiles : shuffleTiles}><RotateCcw size={12} /> {readyToCheck ? 'Reset' : 'Shuffle'}</button>
            <div className="spelling-tiles">
              {tileOrder.map((id, index) => {
                const part = parts.find((item) => item.id === id)
                return <button
                  type="button"
                  key={id}
                  className={`spelling-tile spelling-tile-${id} ${selectedTile === index ? 'is-selected' : ''}`}
                  onClick={() => swapTiles(index)}
                  aria-pressed={selectedTile === index}
                  aria-label={`${part.label}: ${part.value}`}
                >
                  <strong lang="my">{part.tileValue}</strong>
                  <small>{part.label === 'Tone mark' ? 'TONE' : part.label.toUpperCase()}</small>
                </button>
              })}
            </div>
            {feedback && <p className={`spelling-feedback ${feedback.startsWith('Correct') ? 'is-correct' : ''}`} role="status">{feedback}</p>}
          </section>
        </div>

        <footer className="spelling-card-footer">
          <button type="button" className="spelling-hint" onClick={() => setShowHint((visible) => !visible)}>{showHint ? 'Hide hint' : 'Get a hint'}</button>
          <div className="spelling-target-order">
            <small>{readyToCheck ? 'YOUR SPELLING' : 'TARGET ORDER'}</small>
            {readyToCheck
              ? <strong lang="my">မီး</strong>
              : <span>Consonant <b>→</b> vowel <b>→</b> tone</span>}
            {showHint && !readyToCheck && <strong lang="my">မ → ီ → ◌း</strong>}
          </div>
          <button type="button" className="spelling-check" onClick={checkAnswer}><span>Check answer</span><Check size={15} /></button>
        </footer>
      </section>
    </section>
  </main>
}

function LegacyAssemblyChallenge() {
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
