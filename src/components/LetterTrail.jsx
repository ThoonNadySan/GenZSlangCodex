import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Settings, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'
import './LetterTrail.css'

const DOT = '\u25CC'

const questions = [
  {
    meaning: 'Traditional Orchestra',
    icon: '🥁',
    pieces: ['ဆ', '◌ိုင်', '◌း', 'ဝ', '◌ိုင်', '◌း'],
    hints: [
      'First syllable is ဆိုင်း: start with ဆ + ◌ိုင် + heavy tone ◌း.',
      'Second syllable is ဝိုင်း: connect ဝ + ◌ိုင် + heavy tone ◌း.'
    ]
  },
  {
    meaning: 'To own / possess',
    icon: '💎',
    pieces: ['ပ', '◌ိုင်', 'ဆ', '◌ိုင်'],
    hints: [
      'First syllable is ပိုင် (ပ + ◌ိုင်) with a level tone—no tone marks needed.',
      'Second syllable is ဆိုင် (ဆ + ◌ိုင်), also level tone.'
    ]
  },
  {
    meaning: 'Rude / impolite',
    icon: '🙊',
    pieces: ['ရ', '◌ိုင်', '◌း', 'စ', '◌ိုင်', '◌း'],
    hints: [
      'First syllable is ရိုင်း: connect ရ + ◌ိုင် + heavy tone ◌း.',
      'Second syllable is စိုင်း: connect စ + ◌ိုင် + heavy tone ◌း.'
    ]
  },
  {
    meaning: 'Storm / tempest',
    icon: '⛈️',
    pieces: ['မ', '◌ုန်', 'တ', '◌ိုင်', '◌း'],
    hints: [
      'First syllable is မုန် (မ + ◌ုန်)—notice there is no tone mark on မုန်!',
      'Second syllable is တိုင်း (တ + ◌ိုင် + heavy tone ◌း).'
    ]
  },
  {
    meaning: 'Bakery / snack shop',
    icon: '🥨',
    pieces: ['မ', '◌ုန်', '◌့', 'ဆ', '◌ိုင်'],
    hints: [
      'First syllable is မုန့် (snack): connect မ + ◌ုန် + creaky tone ◌့.',
      'Second syllable is ဆိုင် (shop): connect ဆ + ◌ိုင်.'
    ]
  },
  {
    meaning: 'To order / instruct',
    icon: '🗣️',
    pieces: ['ခ', '◌ိုင်', '◌း'],
    hints: [
      'Starts with the aspirated consonant ခ (kha).',
      'Connect ◌ိုင် and finish with the heavy tone ◌း.'
    ]
  },
  {
    meaning: 'Wine',
    icon: '🍷',
    pieces: ['ဝ', '◌ိုင်'],
    hints: [
      'Starts with the round consonant ဝ (wa).',
      'Connect ◌ိုင် with no extra tone marks.'
    ]
  },
  {
    meaning: 'Milestone',
    icon: '🪧',
    pieces: ['မ', '◌ိုင်', 'တ', '◌ိုင်'],
    hints: [
      'First syllable is မိုင် (mile): connect မ + ◌ိုင် with a level tone (no tone marks).',
      'Second syllable is တိုင် (post/pillar): connect တ + ◌ိုင် to complete မိုင်တိုင် (milestone).'
    ]
  },
  {
    meaning: 'To jump',
    icon: '🦘',
    pieces: ['ခ', '◌ုန်'],
    hints: [
      'Starts with ခ (kha).',
      'Connect ◌ုန် for a level tone—do not add ◌့ or ◌း.'
    ]
  },
  {
    meaning: 'Phone line / signal',
    icon: '📶',
    pieces: ['ဖ', '◌ုန်', '◌း', 'လ', '◌ိုင်', '◌း'],
    hints: [
      'First syllable is ဖုန်း (phone): connect ဖ + ◌ုန် + heavy tone ◌း.',
      'Second syllable is လိုင်း (line): connect လ + ◌ိုင် + heavy tone ◌း to complete ဖုန်းလိုင်း.'
    ]
  }
]

const distractorPieces = ['က', 'တ', 'င', '◌ုန်', '◌့', '◌း', '◌ယ်']
const confettiPieces = Array.from({ length: 42 }, (_, index) => ({
  symbol: ['✦', '★', '●'][index % 3],
  x: `${2 + ((index * 43) % 96)}%`,
  drift: `${((index * 29) % 90) - 45}px`,
  delay: `${(index * 17) % 280}ms`,
  duration: `${950 + ((index * 31) % 350)}ms`,
  color: ['#e9a43c', '#43a56b', '#e8735d', '#72bfd0'][index % 4]
}))
const removeDottedCircles = (piece) => piece.replaceAll(DOT, '')

function makeWheel(question, questionIndex) {
  const answers = question.pieces.map((label, index) => ({
    id: `answer-${questionIndex}-${index}`,
    label,
    answer: true
  }))
  const availableDistractors = distractorPieces.filter((piece) => !question.pieces.includes(piece))
  const distractorCount = Math.min(8 - answers.length, Math.max(2, 6 - answers.length))
  const distractors = availableDistractors.slice(0, distractorCount).map((label, index) => ({
    id: `distractor-${questionIndex}-${index}`,
    label,
    answer: false
  }))
  const nodes = [...answers, ...distractors]
  for (let index = nodes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const node = nodes[index]
    nodes[index] = nodes[swapIndex]
    nodes[swapIndex] = node
  }
  return nodes
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remainder = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainder}`
}

function getNodePoint(index, count) {
  const angle = (2 * Math.PI * index / count) - Math.PI / 2
  return { x: 50 + 39 * Math.cos(angle), y: 50 + 39 * Math.sin(angle) }
}

export default function LetterTrail() {
  const { xp, player, setActiveScreen, setModal, reward } = useGame()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [trail, setTrail] = useState([])
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [hintStep, setHintStep] = useState(0)
  const [hintText, setHintText] = useState('')
  const [results, setResults] = useState([])
  const [correctCount, setCorrectCount] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [complete, setComplete] = useState(false)
  const [awarded, setAwarded] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [pointerPoint, setPointerPoint] = useState(null)
  const [snappedNodeId, setSnappedNodeId] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showXpPopup, setShowXpPopup] = useState(false)
  const wheelRef = useRef(null)
  const svgRef = useRef(null)
  const trailRef = useRef([])
  const pointerSessionRef = useRef(null)
  const suppressClickRef = useRef(false)
  const wheel = useMemo(() => makeWheel(questions[questionIndex], questionIndex), [questionIndex])
  const question = questions[questionIndex]
  const selectedPieces = trail.map((id) => wheel.find((node) => node.id === id)).filter(Boolean)
  const trailPoints = trail.map((id) => {
    const nodeIndex = wheel.findIndex((node) => node.id === id)
    return getNodePoint(nodeIndex, wheel.length)
  })
  const preview = selectedPieces.map((piece) => removeDottedCircles(piece.label)).join('')
  const isFull = trail.length === question.pieces.length
  const isCorrectTrail = isFull && selectedPieces.every((piece, index) => piece.answer && piece.label === question.pieces[index])
  const profileAvatar = !player.avatar || player.avatar === '/girl.png'
    ? '/thiri-avatar.png'
    : player.avatar

  let displayXp = xp
  let displayLevel = 4
  while (displayXp >= 500) {
    displayXp -= 500
    displayLevel += 1
  }

  const updateTrail = (nextTrail) => {
    trailRef.current = nextTrail
    setTrail(nextTrail)
  }

  const getPointerPoint = (event) => {
    const bounds = svgRef.current?.getBoundingClientRect()
    if (!bounds || !bounds.width || !bounds.height) return null
    return {
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100
    }
  }

  const finishPointer = (event) => {
    const session = pointerSessionRef.current
    if (!session || session.pointerId !== event.pointerId) return
    if (!session.moved) {
      if (session.replacedTrail) {
        updateTrail([...session.originTrail, session.nodeId].slice(0, question.pieces.length))
      } else if (!session.selectedOnDown && session.nodeId) {
        selectNode(session.nodeId)
      }
      suppressClickRef.current = true
    } else {
      suppressClickRef.current = true
    }
    pointerSessionRef.current = null
    setDragging(false)
    setPointerPoint(null)
  }

  const beginPointer = (event, nodeId = null) => {
    if (checked) return
    const currentTrail = trailRef.current
    const selectedIndex = nodeId ? currentTrail.indexOf(nodeId) : -1
    const selectedOnDown = Boolean(nodeId && currentTrail.length === 0)
    const point = getPointerPoint(event)
    const replacedTrail = Boolean(
      nodeId
      && currentTrail.length > 0
      && currentTrail.length < question.pieces.length
      && selectedIndex < 0
    )
    if (selectedOnDown || replacedTrail) updateTrail([nodeId])
    suppressClickRef.current = false
    pointerSessionRef.current = {
      pointerId: event.pointerId,
      nodeId,
      originTrail: currentTrail,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      selectedOnDown: selectedOnDown || replacedTrail,
      replacedTrail,
      truncateOnMove: Boolean(nodeId && selectedIndex >= 0 && selectedIndex < currentTrail.length - 1)
    }
    if (point) setPointerPoint(point)
    setDragging(true)
    wheelRef.current?.setPointerCapture(event.pointerId)
  }

  const selectNode = (nodeId) => {
    if (checked) return
    const current = trailRef.current
    const selectedIndex = current.indexOf(nodeId)
    if (selectedIndex === current.length - 1) {
      updateTrail(current.slice(0, -1))
      return
    }
    if (selectedIndex >= 0 || current.length >= question.pieces.length) return
    updateTrail([...current, nodeId])
  }

  const movePointer = (event) => {
    const point = getPointerPoint(event)
    if (point) setPointerPoint(point)
    const session = pointerSessionRef.current
    if (!session || session.pointerId !== event.pointerId || checked) return

    if (!session.moved) {
      session.moved = Math.hypot(event.clientX - session.startX, event.clientY - session.startY) > 3
      if (!session.moved) return
      if (session.truncateOnMove && session.nodeId) {
        const index = trailRef.current.indexOf(session.nodeId)
        if (index >= 0) updateTrail(trailRef.current.slice(0, index + 1))
        session.truncateOnMove = false
      }
    }

    if (!point) return
    const nearestNode = wheel.reduce((nearest, node) => {
      const element = wheelRef.current?.querySelector(`[data-node-id="${node.id}"]`)
      const bounds = element?.getBoundingClientRect()
      if (!bounds) return nearest
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY)
      const hitRadius = bounds.width / 2 + 6
      return distance <= hitRadius && (!nearest || distance < nearest.distance)
        ? { node, distance }
        : nearest
    }, null)
    if (!nearestNode) return

    const current = trailRef.current
    if (current.length > 1 && nearestNode.node.id === current[current.length - 2]) {
      updateTrail(current.slice(0, -1))
      setSnappedNodeId(null)
      return
    }
    if (current.includes(nearestNode.node.id) || current.length >= question.pieces.length) return
    updateTrail([...current, nearestNode.node.id])
    setSnappedNodeId(nearestNode.node.id)
  }

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed((time) => time + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!showConfetti) return undefined
    const timer = window.setTimeout(() => setShowConfetti(false), 1700)
    return () => window.clearTimeout(timer)
  }, [showConfetti])

  useEffect(() => {
    if (!showXpPopup) return undefined
    const timer = window.setTimeout(() => setShowXpPopup(false), 1500)
    return () => window.clearTimeout(timer)
  }, [showXpPopup])

  const getHint = () => {
    if (checked || hintStep >= question.hints.length) return
    let correctPrefixLength = 0
    while (
      correctPrefixLength < trailRef.current.length
      && correctPrefixLength < question.pieces.length
      && trailRef.current[correctPrefixLength] === `answer-${questionIndex}-${correctPrefixLength}`
    ) {
      correctPrefixLength += 1
    }
    const nextIndex = Math.min(question.pieces.length - 1, Math.max(hintStep, correctPrefixLength))
    updateTrail(question.pieces.slice(0, nextIndex + 1).map((_, index) => `answer-${questionIndex}-${index}`))
    setHintText(question.hints[hintStep])
    setHintStep((step) => step + 1)
  }

  const checkAnswer = () => {
    const answerIsCorrect = isCorrectTrail
    setCorrect(answerIsCorrect)
    setChecked(true)
    setResults((current) => [...current, answerIsCorrect ? 'correct' : 'incorrect'])
    if (answerIsCorrect) {
      setShowConfetti(true)
      setShowXpPopup(true)
      setCorrectCount((count) => count + 1)
      if (!awarded) {
        reward(35)
        setAwarded(true)
      }
    }
  }

  const continueChallenge = () => {
    if (questionIndex === questions.length - 1) {
      setComplete(true)
      return
    }
    setQuestionIndex((index) => index + 1)
    updateTrail([])
    setChecked(false)
    setCorrect(false)
    setShowConfetti(false)
    setShowXpPopup(false)
    setHintStep(0)
    setHintText('')
    setAwarded(false)
  }

  return (
    <main className="letter-trail-page">
      <img className="letter-trail-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" />
      <button className="letter-trail-back" type="button" onClick={() => setActiveScreen('map')} aria-label="Back to world map"><ArrowLeft size={18} /></button>
      <div className="letter-trail-brand"><img src="/generated/codex-logo.png" alt="GenZ Slang Codex" /></div>
      <div className="letter-trail-timer" aria-label="Elapsed time">{formatTime(elapsed)}</div>
      <header className="letter-trail-profile">
        <div className="letter-trail-avatar">
          <img
            className={profileAvatar === '/thiri-avatar.png' ? 'is-portrait' : ''}
            src={profileAvatar}
            alt=""
          />
        </div>
        <div className="letter-trail-player">
          <strong><span>{player.name || 'Thiri'}</span><small>LV {String(displayLevel).padStart(2, '0')}</small></strong>
          <div className="letter-trail-xp"><span style={{ width: `${Math.min(100, (displayXp / 500) * 100)}%` }} /></div>
          <small>{displayXp} / 500 XP</small>
        </div>
        <button type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings"><Settings size={15} /><span>Settings</span></button>
        <button type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard"><Trophy size={15} /><span>Leaderboard</span></button>
      </header>
      {showXpPopup && <div className="letter-trail-xp-popup" role="status">+35 XP</div>}
      {showConfetti && (
        <div className="letter-trail-confetti-screen" aria-hidden="true">
          {confettiPieces.map((piece, index) => (
            <span
              key={index}
              className="letter-trail-confetti-piece"
              style={{
                left: piece.x,
                '--confetti-drift': piece.drift,
                '--confetti-delay': piece.delay,
                '--confetti-duration': piece.duration,
                color: piece.color
              }}
            >
              {piece.symbol}
            </span>
          ))}
        </div>
      )}

      <section className="letter-trail-card" aria-label="Letter Trail">
        <header className="letter-trail-heading">
          <div className="letter-trail-heading-copy">
            <p>DESTINATION 6 <span>•</span> QUESTION {questionIndex + 1} OF 10</p>
            <div className={`letter-trail-title-row ${checked ? (correct ? 'answer-correct' : 'answer-incorrect') : ''}`}>
              <h1>Letter Trail</h1>
              <img src="/happy-slang-buddy-transparent.png" alt="" />
            </div>
            <span className="letter-trail-subtitle">Connect the letters to build the Burmese word.</span>
          </div>
          <div className="letter-trail-progress">
            <span className="letter-trail-count">{question.pieces.length} LETTERS</span>
            <div className="letter-trail-progress-pills" aria-label={`${results.length} of 10 questions completed`}>
              {questions.map((_, index) => <span key={index} className={results[index] || (index === questionIndex ? 'current' : '')} />)}
            </div>
          </div>
        </header>

        <div className="letter-trail-game-grid">
          <section className="letter-trail-clue">
            <p className="letter-trail-eyebrow">SPELL IN BURMESE</p>
            <h2>{question.meaning}</h2>
            <div className={`letter-trail-illustration ${checked ? (correct ? 'is-correct' : 'is-incorrect') : ''}`} aria-hidden="true">{question.icon}</div>
            <p className="letter-trail-question">What is this word in Burmese?</p>
            <div className="letter-trail-word-preview">
              <small>YOUR WORD</small>
              <strong lang="my" aria-live="polite">{preview || '◌'}</strong>
            </div>
            <p className={`letter-trail-helper ${hintText ? 'has-hint' : ''}`} role={hintText ? 'status' : undefined}>
              {hintText || 'Start with the first consonant, then connect the marks in order!'}
            </p>
          </section>

          <section className="letter-trail-board">
            <div className="letter-trail-board-heading">
              <div><p className="letter-trail-eyebrow">CONNECT &amp; SPELL</p><span>Drag a path or tap the letters in order.</span></div>
              <strong>{trail.length} / {question.pieces.length} LETTERS</strong>
            </div>

            <div className={`letter-trail-slots ${checked && !correct ? 'answer-incorrect' : ''}`} aria-label="Selected letters">
              {question.pieces.map((_, index) => {
                const piece = selectedPieces[index]
                return (
                  <button
                    key={index}
                    type="button"
                    className={`letter-trail-slot ${piece ? 'filled' : ''}`}
                    onClick={() => {
                      if (checked || !piece) return
                      updateTrail(trailRef.current.slice(0, index))
                    }}
                    aria-label={piece ? `Remove ${piece.label} and later letters` : `Letter ${index + 1}`}
                    lang="my"
                  >
                    {piece ? removeDottedCircles(piece.label) : ''}
                  </button>
                )
              })}
            </div>

            <div
              ref={wheelRef}
              className={`letter-trail-wheel select-none touch-none ${dragging ? 'is-dragging' : ''} ${checked ? (correct ? 'answer-correct' : 'answer-incorrect') : ''}`}
              onPointerDown={(event) => beginPointer(event)}
              onPointerMove={movePointer}
              onPointerUp={finishPointer}
              onPointerCancel={finishPointer}
              onPointerLeave={() => { if (!pointerSessionRef.current) setPointerPoint(null) }}
            >
              <svg ref={svgRef} className="letter-trail-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {trailPoints.length > 1 && (
                  <polyline points={trailPoints.map(({ x, y }) => `${x},${y}`).join(' ')} />
                )}
                {dragging && pointerPoint && trailPoints.length > 0 && (
                  <line
                    className="letter-trail-elastic-line"
                    x1={trailPoints[trailPoints.length - 1].x}
                    y1={trailPoints[trailPoints.length - 1].y}
                    x2={pointerPoint.x}
                    y2={pointerPoint.y}
                  />
                )}
              </svg>
              {wheel.map((node, index) => {
                const { x, y } = getNodePoint(index, wheel.length)
                const selectedIndex = trail.indexOf(node.id)
                return (
                  <button
                    key={node.id}
                    type="button"
                    data-node-id={node.id}
                    className={`letter-trail-node select-none touch-none ${selectedIndex >= 0 ? 'selected' : ''} ${snappedNodeId === node.id ? 'snapped' : ''}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => {
                      if (suppressClickRef.current) {
                        suppressClickRef.current = false
                        return
                      }
                      selectNode(node.id)
                    }}
                    onPointerDown={(event) => {
                      event.stopPropagation()
                      beginPointer(event, node.id)
                    }}
                    aria-label={`${node.label}${selectedIndex >= 0 ? `, selected ${selectedIndex + 1}` : ''}`}
                    aria-pressed={selectedIndex >= 0}
                    lang="my"
                  >
                    {node.label}
                    {selectedIndex >= 0 && <span className="letter-trail-node-number">{selectedIndex + 1}</span>}
                  </button>
                )
              })}
              <div className="letter-trail-sequence" aria-live="polite">
                {selectedPieces.map((_, index) => <span key={trail[index]}>{index ? ' → ' : ''}{index + 1}</span>)}
              </div>
            </div>

            <div className="letter-trail-board-controls">
              <button type="button" onClick={getHint} disabled={checked || hintStep >= question.hints.length}>HINT</button>
              <button type="button" onClick={() => updateTrail([])} disabled={checked || trail.length === 0}>Clear trail</button>
            </div>
          </section>
        </div>

        <footer className="letter-trail-footer">
          {checked && (
            <div className={`letter-trail-feedback ${correct ? 'is-correct' : 'is-wrong'}`} role="status">
              <img src="/happy-slang-buddy-transparent.png" alt="" />
              <div>
                <small>{correct ? 'SLANG BUDDY • CORRECT! +35 XP' : 'SLANG BUDDY • NOT QUITE'}</small>
                <strong>
                  {correct
                    ? 'Great trail! 🎉 You nailed it!'
                    : `Almost! The correct trail is: ${question.pieces.join(' → ')}`}
                </strong>
              </div>
            </div>
          )}
          {checked
            ? <button type="button" className="letter-trail-primary is-continue" onClick={continueChallenge}>Continue <span>→</span></button>
            : <button type="button" className="letter-trail-primary" onClick={checkAnswer} disabled={!isFull}>Check answer <span>✓</span></button>}
        </footer>
      </section>

      {complete && (
        <div className="letter-trail-modal-backdrop" role="presentation">
          <section className="letter-trail-modal" role="dialog" aria-modal="true" aria-label="Letter Trail complete">
            <div className="letter-trail-modal-badge">✓</div>
            <h2>Letter Trail complete!</h2>
            <p>You explored all 10 Burmese words.</p>
            <div><strong>{correctCount}</strong><span>correct answers</span><strong>{correctCount * 35}</strong><span>XP earned</span></div>
            <button type="button" onClick={() => setActiveScreen('map')}>BACK TO MAP</button>
          </section>
        </div>
      )}
    </main>
  )
}
