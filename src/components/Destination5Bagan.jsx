import { useState } from 'react'
import { ArrowLeft, Settings, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'
import './Destination5Bagan.css'

const DOT = '\u25CC'

const questions = [
  { answer: 'မိန့်', meaning: 'To command / decree', icon: '📢', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'မ', row: 2, column: 1 },
    { role: 'top', type: 'Vowel', tile: `${DOT}ိ`, row: 1, column: 1 },
    { role: 'right', type: 'Final', tile: `${DOT}န်`, row: 2, column: 2 },
    { role: 'bottom', type: 'Tone', tile: `${DOT}့`, row: 3, column: 2 }
  ], pool: ['မ','င','ဝ','သ','စ','က','◌ိ','◌န်','◌့','◌း'], hints: [
    'Starts with the consonant မ (ma).',
    'Uses the top vowel ◌ိ (loun-gyi-tin) and right final ◌န် (na-that) for the "-ein" sound.',
    'Ends sharply with the bottom creaky tone ◌့ (auk-myit) under the final.'
  ] },
  { answer: 'ငယ်', meaning: 'Small / young', icon: '🧒', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'င', row: 2, column: 1 },
    { role: 'right', type: 'Final', tile: `${DOT}ယ်`, row: 2, column: 2 }
  ], pool: ['င','မ','ဝ','သ','ရ','◌ယ်','◌ိ','◌န်','◌ဲ','◌့'], hints: [
    'Starts with the nasal consonant င (nga).',
    'Uses the right-side final ◌ယ် (ya-that)—not the top vowel ◌ဲ—to spell "ngè".'
  ] },
  { answer: 'ဝယ်', meaning: 'To buy', icon: '🛍️', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'ဝ', row: 2, column: 1 },
    { role: 'right', type: 'Final', tile: `${DOT}ယ်`, row: 2, column: 2 }
  ], pool: ['ဝ','မ','င','ရ','ထ','စ','◌ယ်','◌ိ','◌န်','◌ဲ'], hints: [
    'Starts with the round consonant ဝ (wa).',
    'Uses the right-side final ◌ယ် (ya-that) for the level tone "wè".'
  ] },
  { answer: 'မဲ', meaning: 'To vote / dark', icon: '🗳️', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'မ', row: 2, column: 1 },
    { role: 'top', type: 'Vowel', tile: `${DOT}ဲ`, row: 1, column: 1 }
  ], pool: ['မ','သ','စ','က','ဝ','င','◌ဲ','◌ိ','◌န်','◌း'], hints: [
    'Starts with the consonant မ (ma).',
    'Uses the top vowel ◌ဲ (nauk-pyit) directly above the consonant—not ◌ယ်.'
  ] },
  { answer: 'သဲ', meaning: 'Sand', icon: '🏖️', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'သ', row: 2, column: 1 },
    { role: 'top', type: 'Vowel', tile: `${DOT}ဲ`, row: 1, column: 1 }
  ], pool: ['သ','မ','စ','က','ဝ','ရ','◌ဲ','◌ယ်','◌ိ','◌န်'], hints: [
    'Starts with the consonant သ (tha).',
    'Spelled with the top vowel ◌ဲ (nauk-pyit) sitting above သ.'
  ] },
  { answer: 'စိန်', meaning: 'Diamond', icon: '💎', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'စ', row: 2, column: 1 },
    { role: 'top', type: 'Vowel', tile: `${DOT}ိ`, row: 1, column: 1 },
    { role: 'right', type: 'Final', tile: `${DOT}န်`, row: 2, column: 2 }
  ], pool: ['စ','မ','က','ဝ','သ','ထ','◌ိ','◌န်','◌ဲ','◌့'], hints: [
    'Starts with the consonant စ (sa).',
    'Combine top vowel ◌ိ (loun-gyi-tin) + right final ◌န် (na-that) with no extra tone marks.'
  ] },
  { answer: 'ကိန်း', meaning: 'Number / digit', icon: '🔢', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'က', row: 2, column: 1 },
    { role: 'top', type: 'Vowel', tile: `${DOT}ိ`, row: 1, column: 1 },
    { role: 'right', type: 'Final', tile: `${DOT}န်`, row: 2, column: 2 },
    { role: 'right2', type: 'Tone', tile: `${DOT}း`, row: 2, column: 3 }
  ], pool: ['က','စ','မ','ထ','သ','ရ','◌ိ','◌န်','◌း','◌့'], hints: [
    'Starts with the consonant က (ka).',
    'Add top vowel ◌ိ + right final ◌န် for the base syllable "kein".',
    'Finish with the heavy tone ◌း (visarga) on the far right for "kein:".'
  ] },
  { answer: 'မယ့်', meaning: 'Will [future particle]', icon: '🔮', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'မ', row: 2, column: 1 },
    { role: 'right', type: 'Final', tile: `${DOT}ယ်`, row: 2, column: 2 },
    { role: 'bottom', type: 'Tone', tile: `${DOT}့`, row: 3, column: 2 }
  ], pool: ['မ','က','င','ဝ','ရ','ထ','◌ယ်','◌န်','◌့','◌း'], hints: [
    'Starts with the consonant မ (ma).',
    'Uses the right-side final ◌ယ် (ya-that) just like မယ်.',
    'Add the bottom creaky tone ◌့ (auk-myit) below ◌ယ် to mark future tense.'
  ] },
  { answer: 'ထိန်း', meaning: 'To care for / maintain', icon: '🧡', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'ထ', row: 2, column: 1 },
    { role: 'top', type: 'Vowel', tile: `${DOT}ိ`, row: 1, column: 1 },
    { role: 'right', type: 'Final', tile: `${DOT}န်`, row: 2, column: 2 },
    { role: 'right2', type: 'Tone', tile: `${DOT}း`, row: 2, column: 3 }
  ], pool: ['ထ','မ','က','စ','သ','ရ','◌ိ','◌န်','◌း','◌့'], hints: [
    'Starts with the aspirated consonant ထ (hta).',
    'Combine top vowel ◌ိ + right final ◌န် for "htein".',
    'Add the heavy tone ◌း (visarga) on the far right to make "htein:".'
  ] },
  { answer: 'ရယ်', meaning: 'To laugh', icon: '😄', slots: [
    { role: 'consonant', type: 'Consonant', tile: 'ရ', row: 2, column: 1 },
    { role: 'right', type: 'Final', tile: `${DOT}ယ်`, row: 2, column: 2 }
  ], pool: ['ရ','မ','င','ဝ','သ','က','◌ယ်','◌ဲ','◌ိ','◌န်'], hints: [
    'Starts with the consonant ရ (ya/ra).',
    'Spelled with the right-side final ◌ယ် (ya-that), not ◌ဲ.'
  ] }
]

const normalized = (tile) => tile.replaceAll(DOT, '')

export default function Destination5Bagan() {
  const { xp, player, setActiveScreen, setModal, reward } = useGame()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [placed, setPlaced] = useState([])
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [checkedCount, setCheckedCount] = useState(0)
  const [progressResults, setProgressResults] = useState([])
  const [awarded, setAwarded] = useState(false)
  const [complete, setComplete] = useState(false)
  const [hintStep, setHintStep] = useState(0)
  const [hintText, setHintText] = useState('')
  const [hintGlow, setHintGlow] = useState([])
  const question = questions[questionIndex]
  const isFull = placed.filter(Boolean).length === question.slots.length
  let displayXp = xp
  let displayLevel = 4
  while (displayXp >= 500) {
    displayXp -= 500
    displayLevel += 1
  }
  const preview = ['consonant', 'top', 'right', 'right2', 'bottom'].map((role) => {
    const index = question.slots.findIndex((slot) => slot.role === role)
    return index >= 0 && placed[index] ? normalized(placed[index]) : ''
  }).join('')

  const placeTile = (tile, slotIndex) => {
    if (checked || slotIndex < 0) return
    setPlaced((current) => {
      const next = [...current]
      const existing = next.indexOf(tile)
      if (existing >= 0) next[existing] = null
      next[slotIndex] = tile
      return next
    })
  }

  const placeFromPool = (tile) => {
    if (checked || placed.includes(tile)) return
    const matchingIndex = question.slots.findIndex((slot, index) => !placed[index] && tile === slot.tile)
    const openIndex = question.slots.findIndex((_, index) => !placed[index])
    placeTile(tile, matchingIndex >= 0 ? matchingIndex : openIndex)
  }

  const removeTile = (slotIndex) => {
    if (checked) return
    setPlaced((current) => current.map((tile, index) => index === slotIndex ? null : tile))
  }

  const getHint = () => {
    if (checked || hintStep >= question.hints.length) return
    const nextStep = hintStep + 1
    let roles = ['consonant']
    if (nextStep === 2) {
      const hasTop = question.slots.some((slot) => slot.role === 'top')
      const hasRight = question.slots.some((slot) => slot.role === 'right')
      roles = hasTop && hasRight
        ? ['top', 'right']
        : hasTop
          ? ['top']
          : hasRight
            ? ['right']
            : ['right']
    }
    if (nextStep >= 3) {
      roles = question.slots.some((slot) => slot.role === 'right2')
        ? ['right2']
        : question.slots.some((slot) => slot.role === 'bottom')
          ? ['bottom']
          : []
    }

    roles.forEach((role) => {
      const slotIndex = question.slots.findIndex((slot) => slot.role === role)
      if (slotIndex >= 0) placeTile(question.slots[slotIndex].tile, slotIndex)
    })
    setHintStep(nextStep)
    setHintText(question.hints[nextStep - 1])
    setHintGlow(roles)
    window.setTimeout(() => setHintGlow([]), 900)
  }

  const checkAnswer = () => {
    if (!isFull) {
      setCorrect(false)
      setChecked(true)
      return
    }
    const answer = question.slots.every((slot, index) => placed[index] === slot.tile)
    setCorrect(answer)
    setChecked(true)
    setCheckedCount((count) => count + 1)
    setProgressResults((results) => [...results, answer ? 'correct' : 'incorrect'])
    if (answer && !awarded) {
      setCorrectCount((count) => count + 1)
      setAwarded(true)
      reward(35)
    }
  }

  const continueChallenge = () => {
    if (!checked) return
    if (questionIndex === questions.length - 1) {
      setComplete(true)
      return
    }
    setQuestionIndex((index) => index + 1)
    setPlaced([])
    setChecked(false)
    setCorrect(false)
    setAwarded(false)
    setHintStep(0)
    setHintText('')
    setHintGlow([])
  }

  return (
    <main className="assembly-page">
      <img className="assembly-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" />
      <button className="assembly-back" type="button" onClick={() => setActiveScreen('map')} aria-label="Back to world map"><ArrowLeft size={18} /></button>
      <div className="assembly-brand"><img src="/generated/codex-logo.png" alt="GenZ Slang Codex" /></div>
      <header className="assembly-profile">
        <div className="assembly-avatar"><img src="/thiri-profile-character.png?v=2" alt="Thiri" /></div>
        <div className="assembly-player">
          <strong><span>{player.name || 'Thiri'}</span><small>LV {String(displayLevel).padStart(2, '0')}</small></strong>
          <div className="assembly-xp"><span style={{ width: `${Math.min(100, (displayXp / 500) * 100)}%` }} /></div>
          <small>{displayXp} / 500 XP</small>
        </div>
        <button type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings"><Settings size={16} /></button>
        <button type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard"><Trophy size={16} /></button>
      </header>

      <section className="assembly-card" aria-label="Assembly Challenge">
        <header className="assembly-heading">
          <p><b>BAGAN · QUESTION {questionIndex + 1} OF 10</b></p>
          <div className="assembly-title-row"><h1>Assembly Challenge</h1><div className="assembly-mascot-badge"><img src="/happy-slang-buddy-transparent.png" alt="Happy Slang Buddy" /></div></div>
          <div className="assembly-progress-wrap">
            <div><b>{checkedCount}/10 CHECKED</b><b>{correctCount} CORRECT</b></div>
            <div className="assembly-dashes">{questions.map((_, index) => <span key={index} className={progressResults[index] || ''} />)}</div>
          </div>
        </header>

        <div className="assembly-grid">
          <section className="assembly-clue">
            <p>BUILD THIS WORD</p><h2>{question.meaning}</h2>
            <div className="assembly-icon">
              <span role="img" aria-label={`${question.meaning} illustration`}>{question.icon}</span>
            </div>
            <small>Drag the correct Burmese character tiles into the slots!</small>
          </section>

          <section className="assembly-board">
            <p>YOUR WORD BOARD</p>
            <div className="assembly-spatial-grid">
              {question.slots.map((slot, index) => (
                <button
                  type="button"
                  key={slot.role}
                  className={`assembly-spatial-slot assembly-slot-${slot.role} ${placed[index] ? 'filled' : ''} ${hintGlow.includes(slot.role) ? 'hint-glow' : ''}`}
                  style={{ gridRow: slot.row, gridColumn: slot.column }}
                  onClick={() => placed[index] ? removeTile(index) : placeFromPool(slot.tile)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault()
                    const tile = event.dataTransfer.getData('text/plain')
                    if (tile) placeTile(tile, index)
                  }}
                  aria-label={placed[index] ? `Remove ${placed[index]} from ${slot.type}` : `Place ${slot.type}`}
                >
                  <b>{slot.type.toUpperCase()}</b>
                  <span lang="my">{placed[index] || '◌'}</span>
                </button>
              ))}
            </div>
            <button type="button" className="assembly-reset" onClick={() => setPlaced([])} disabled={checked || !placed.some(Boolean)}>Clear board</button>
          </section>

          <section className="assembly-preview">
            <div className="assembly-preview-heading"><b>PREVIEW</b><span>{placed.filter(Boolean).length} pieces • 1 word</span></div>
            <div className="assembly-preview-box" lang="my" aria-live="polite">{preview || <span>◌</span>}</div>
          </section>
        </div>

        <section className="assembly-pool" aria-label="Burmese character tile pool">
          <div className="assembly-pool-heading"><b>DRAG A TILE FROM THE POOL</b><span>{question.pool.length} tiles available • 1 answer</span></div>
          <div className="assembly-tile-row">
            {question.pool.map((tile, index) => (
              <button type="button" key={tile + index} className={`assembly-tile tile-${index % 5}`} draggable={!checked && !placed.includes(tile)} disabled={checked || placed.includes(tile)}
                onDragStart={(event) => event.dataTransfer.setData('text/plain', tile)} onClick={() => placeFromPool(tile)} lang="my" aria-label={`Place tile ${tile}`}>
                {tile}
              </button>
            ))}
          </div>
        </section>

        <footer className="assembly-footer">
          {checked ? (
            <div className={`assembly-feedback ${correct ? 'is-correct' : 'is-wrong'}`}>
              <img src="/Monkey explorer.png" alt="" />
              <div><small>SLANG BUDDY · {correct ? '✓ CORRECT' : '! TRY AGAIN'}</small><strong>{correct ? 'Great build! 🎉 You got it right!' : 'Not quite. Check the consonant, final, and tone marks.'}</strong></div>
            </div>
          ) : hintText ? (
            <div className="assembly-feedback assembly-hint-banner" role="status">
              <img src="/happy-slang-buddy-transparent.png" alt="" />
              <div><small>💡 HINT {hintStep}/{question.hints.length}</small><strong>{hintText}</strong></div>
            </div>
          ) : <div />}
          {checked ? (
            <button type="button" className="assembly-continue" onClick={continueChallenge}>CONTINUE</button>
          ) : (
            <div className="assembly-footer-actions">
              <button
                type="button"
                className="assembly-hint-button"
                onClick={getHint}
                disabled={checked || hintStep >= question.hints.length}
              >
                Get a hint <span>{question.hints.length - hintStep} left</span>
              </button>
              <button type="button" className="assembly-check" onClick={checkAnswer}>CHECK ANSWER</button>
            </div>
          )}
        </footer>
      </section>

      {complete && (
        <div className="assembly-modal-backdrop" role="presentation">
          <section className="assembly-modal" role="dialog" aria-modal="true" aria-label="Challenge complete">
            <div className="assembly-modal-badge">✓</div><h2>Assembly complete!</h2><p>You checked all 10 Burmese words.</p>
            <div><strong>{correctCount}</strong><span>correct answers</span><strong>{correctCount * 35}</strong><span>XP earned</span></div>
            <button type="button" onClick={() => setActiveScreen('map')}>BACK TO MAP</button>
          </section>
        </div>
      )}
    </main>
  )
}
