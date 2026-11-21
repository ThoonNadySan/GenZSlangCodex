import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'

const emptyMark = '∅'
const orbitSlots = [
  {
    id: 'left',
    label: 'LEFT · 5 PRE-BASE',
    nodes: [
      { value: 'ေ', angle: 180 },
      { value: 'ိ', angle: 252 },
      { value: 'ီ', angle: 324 },
      { value: 'ူ', angle: 36 },
      { value: 'ံ', angle: 108 }
    ]
  }
]
const vowelTiles = [
  ...orbitSlots.flatMap(({ id, label, nodes }) =>
    nodes.map((node) => ({ ...node, radius: node.radius ?? 24, position: id, label })))
]
const toneNodes = [
  { value: emptyMark, angle: 270 },
  { value: '့', angle: 180 },
  { value: 'း', angle: 90 },
  { value: '်', angle: 0 }
]

const questions = [
  { type: 'syllable_orbit', word: 'ရေ', meaning: 'Water', icon: '💧', base: 'ရ', vowel: 'ေ', tone: '∅' },
  { type: 'syllable_orbit', word: 'နေ', meaning: 'Sun', icon: '☀️', base: 'န', vowel: 'ေ', tone: '∅' },
  { type: 'syllable_orbit', word: 'ဈေး', meaning: 'Market', icon: '🛍️', base: 'ဈ', vowel: 'ေ', tone: 'း' },
  { type: 'syllable_orbit', word: 'တော', meaning: 'Forest', icon: '🌳', base: 'တ', vowel: 'ော', tone: '∅' },
  { type: 'syllable_orbit', word: 'ခေါ်', meaning: 'Call', icon: '📣', base: 'ခ', vowel: 'ော်', tone: '∅' },
  { type: 'syllable_orbit', word: 'လေ', meaning: 'Wind', icon: '🍃', base: 'လ', vowel: 'ေ', tone: '∅' },
  { type: 'syllable_orbit', word: 'ဆေး', meaning: 'Medicine', icon: '💊', base: 'ဆ', vowel: 'ေ', tone: 'း' },
  { type: 'syllable_orbit', word: 'မေ့', meaning: 'Forget', icon: '💭', base: 'မ', vowel: 'ေ', tone: '့' },
  { type: 'syllable_orbit', word: 'စော', meaning: 'Early', icon: '🌅', base: 'စ', vowel: 'ော', tone: '∅' },
  { type: 'syllable_orbit', word: 'အေး', meaning: 'Calm / Relaxed', icon: '🌿', base: 'အ', vowel: 'ေ', tone: 'း' }
]

function shuffleTrailNodes(question) {
  if (!question?.components) return []
  const answers = question.components.map((value, index) => ({ id: `answer-${index}`, value }))
  const distractors = question.distractors.map((value, index) => ({ id: `extra-${index}`, value }))
  const nodes = [...answers, ...distractors]

  for (let index = nodes.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[nodes[index], nodes[other]] = [nodes[other], nodes[index]]
  }

  return nodes
}

function orbitPoint(index, count, radius) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2
  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`
  }
}

function orbitPointAtAngle(angle, radius) {
  const radians = (angle * Math.PI) / 180
  return {
    left: `${50 + Math.cos(radians) * radius}%`,
    top: `${50 + Math.sin(radians) * radius}%`
  }
}

function orbitPointForPosition(position, radius) {
  const angles = { right: 0, bottom: 90, left: 180, top: 270 }
  return orbitPointAtAngle(angles[position], radius)
}

function getRotationStops(tiles, positions) {
  const angles = { right: 0, bottom: 90, left: 180, top: 270 }
  return tiles.flatMap(({ angle }) => [...positions].map((position) => {
    const rotation = (angles[position] - angle) % 360
    return (rotation + 360) % 360
  }))
}

function nextOrbitStop(currentAngle, direction, stops) {
  const normalizedAngle = ((currentAngle % 360) + 360) % 360
  const step = Math.min(...stops.map((stop) => {
    const distance = direction > 0
      ? (stop - normalizedAngle + 360) % 360
      : (normalizedAngle - stop + 360) % 360
    return distance || 360
  }))
  return currentAngle + direction * step
}

function getOrthographicPosition(angle) {
  const normalizedAngle = ((angle % 360) + 360) % 360
  const cardinalPositions = [
    [0, 'right'],
    [90, 'bottom'],
    [180, 'left'],
    [270, 'top']
  ]

  return cardinalPositions.find(([cardinalAngle]) => {
    const difference = Math.abs(((normalizedAngle - cardinalAngle + 540) % 360) - 180)
    return difference < 0.00001
  })?.[1] ?? null
}

function createEmptyOrbitMarks() {
  return { top: emptyMark, left: emptyMark, right: emptyMark, bottom: emptyMark }
}

function targetOrbitMarks(question) {
  const marks = {
    ...createEmptyOrbitMarks(),
    tone: question.tone === 'Ø' || question.tone === emptyMark ? emptyMark : question.tone
  }

  if (question.vowel === 'ေ') marks.left = 'ေ'
  if (question.vowel === 'ော') {
    marks.left = 'ေ'
    marks.right = 'ာ'
  }
  if (question.vowel === 'ော်') {
    marks.left = 'ေ'
    marks.right = 'ါ'
    marks.tone = '်'
  }
  if (['ိ', 'ီ', 'ံ'].includes(question.vowel)) marks.top = question.vowel
  if (['ု', 'ူ'].includes(question.vowel)) marks.bottom = question.vowel

  return marks
}

function assembleSyllable(base, marks, tone) {
  const innerMarks = ['left', 'top', 'right', 'bottom']
    .map((position) => marks[position])
    .filter((mark) => mark !== emptyMark)
    .join('')
  return `${base}${innerMarks}${tone === null || tone === emptyMark ? '' : tone}`
}

function wrongPreVowelIndex(question) {
  return question.vowel === 'ေ' ? 1 : 0
}

function wrongToneRotation(question) {
  if (question.tone === '့') return 270
  if (question.tone === 'း') return 180
  return 180
}

function wrongPostVowelIndex(question) {
  if (question.vowel === 'ော') return 1
  if (question.vowel === 'ော်') return 0
  return 0
}

function OrbitPosition({ position, label, value, angle, radius, rotationDeg, isInTarget }) {
  const isCompound = value === 'ော' || value === 'ော်'
  return (
    <span
      className={`yangon-orbit-position-slot is-${position}${isCompound ? ' is-compound' : ''}${radius > 24 ? ' is-outer-vowel' : ''}${isInTarget ? ' is-in-target' : ''}`}
      style={{ ...orbitPointAtAngle(angle, radius), '--counter-rotation': `${-rotationDeg}deg` }}
      role="img"
      aria-label={`${value} vowel at the ${label.toLowerCase()} position`}
    >
      <span className="yangon-orbit-position-label" aria-hidden="true">{label}</span>
      <span className="yangon-orbit-slot-glyph" lang="my" aria-hidden="true">
        {value === emptyMark || isCompound ? value : `◌${value}`}
      </span>
    </span>
  )
}

function OrbitToneSlot({ value, angle, rotationDeg, isInTarget }) {
  return (
    <span
      className={`yangon-orbit-tone-slot${isInTarget ? ' is-in-target' : ''}`}
      style={{ ...orbitPointAtAngle(angle, 52), '--counter-rotation': `${-rotationDeg}deg` }}
      role="img"
      aria-label={`Outer tone ${value}`}
    >
      <span className="yangon-orbit-position-label" aria-hidden="true">OUTER TONE</span>
      <span className="yangon-orbit-slot-glyph" lang="my" aria-hidden="true">{value === emptyMark ? value : `◌${value}`}</span>
    </span>
  )
}

function OrbitRingControl({ label, onRotate, disabled }) {
  return (
    <div className="yangon-orbit-control">
      <button type="button" aria-label={`Rotate ${label.toLowerCase()} ring backwards`} disabled={disabled} onClick={() => onRotate(-1)}>
        <ChevronLeft size={17} />
      </button>
      <span>{label}</span>
      <button type="button" aria-label={`Rotate ${label.toLowerCase()} ring forwards`} disabled={disabled} onClick={() => onRotate(1)}>
        <ChevronRight size={17} />
      </button>
    </div>
  )
}

export default function YangonQuiz() {
  const { player, xp, setActiveScreen, setModal, collectedCards, reward } = useGame()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [vowelRotationDeg, setVowelRotationDeg] = useState(0)
  const [toneRotationDeg, setToneRotationDeg] = useState(wrongToneRotation(questions[0]))
  const [preVowelIndex, setPreVowelIndex] = useState(wrongPreVowelIndex(questions[0]))
  const [postVowelIndex, setPostVowelIndex] = useState(wrongPostVowelIndex(questions[0]))
  const [selectedTrailNodes, setSelectedTrailNodes] = useState([])
  const [trailNodes, setTrailNodes] = useState([])
  const [hintedNode, setHintedNode] = useState(null)
  const [phase, setPhase] = useState('playing')
  const [feedback, setFeedback] = useState('')
  const [result, setResult] = useState(null)

  const preVowels = ['ေ', 'ိ', 'ီ', 'ူ', 'ံ']
  const postVowels = ['ာ', 'ါ']
  const question = questions[questionIndex]
  const isOrbit = question.type === 'syllable_orbit'
  const roundNumber = isOrbit ? questionIndex + 1 : questionIndex - 8
  const positionedVowels = vowelTiles.map((tile) => ({
    ...tile,
    currentPosition: getOrthographicPosition(tile.angle + vowelRotationDeg)
  }))
  const positionedTones = toneNodes.map((tile) => ({
    ...tile,
    currentPosition: getOrthographicPosition(tile.angle + toneRotationDeg)
  }))
  const expectedOrbitMarks = isOrbit ? targetOrbitMarks(question) : null
  const expectedVowels = expectedOrbitMarks
    ? ['left', 'top', 'right', 'bottom']
      .flatMap((position) => expectedOrbitMarks[position] === emptyMark ? [] : [{ value: expectedOrbitMarks[position], position }])
    : []
  const targetVowelPositions = new Set(expectedVowels.map(({ position }) => position))
  const vowelRotationStops = getRotationStops(vowelTiles, targetVowelPositions)
  const toneRotationStops = getRotationStops(toneNodes, new Set(['right']))
  const alignedMarks = createEmptyOrbitMarks()
  alignedMarks.left = preVowels[preVowelIndex]
  if (expectedOrbitMarks?.right !== emptyMark) {
    alignedMarks.right = postVowels[postVowelIndex]
  }
  const alignedVowels = expectedVowels.filter(({ value, position }) =>
    alignedMarks[position] === value)
  const alignedTone = positionedTones.some((tile) =>
    tile.value === expectedOrbitMarks?.tone && tile.currentPosition === 'right')
    ? expectedOrbitMarks.tone
    : null
  const assembledAnswer = isOrbit ? assembleSyllable(question.base, alignedMarks, alignedTone) : ''
  const orbitAnswerCorrect = isOrbit
    && alignedVowels.length === expectedVowels.length
    && alignedTone === expectedOrbitMarks?.tone
  const orbitParts = isOrbit
    ? [
        alignedMarks.left !== emptyMark ? alignedMarks.left : null,
        alignedMarks.right !== emptyMark ? alignedMarks.right : null,
        alignedTone !== null ? alignedTone : null
      ].filter(Boolean)
    : []
  const defaultStatus = isOrbit
    ? 'Rotate the arrows until the correct vowel and tone reach their spelling positions.'
    : 'Connect the pieces in order.'
  const statusMessage = phase === 'correct'
    ? 'Ready to continue!'
    : feedback || defaultStatus

  useEffect(() => {
    if (phase !== 'playing' || !orbitAnswerCorrect) return
    setPhase('correct')
    setFeedback('Perfect alignment!')
    setScore((value) => value + 1)
  }, [phase, orbitAnswerCorrect])

  const rotateVowelRing = (direction) => {
    if (phase !== 'playing') return
    setPreVowelIndex((index) => {
      const nextIndex = (index + direction + preVowels.length) % preVowels.length
      const nextNodeAngle = orbitSlots[0].nodes[nextIndex].angle
      setVowelRotationDeg((180 - nextNodeAngle + 360) % 360)
      return nextIndex
    })
    if (expectedOrbitMarks?.right !== emptyMark) {
      setPostVowelIndex((index) => (index + direction + postVowels.length) % postVowels.length)
    }
    setFeedback('')
    setHintedNode(null)
  }

  const rotateOrbitTone = (direction) => {
    if (phase !== 'playing') return
    setToneRotationDeg((angle) => nextOrbitStop(angle, direction, toneRotationStops))
    setFeedback('')
  }

  const selectTrailNode = (nodeId) => {
    if (phase !== 'playing' || selectedTrailNodes.includes(nodeId)) return

    const node = trailNodes.find((item) => item.id === nodeId)
    const nextPart = question.components[selectedTrailNodes.length]
    if (!node || node.value !== nextPart) {
      setFeedback('That piece comes later. Follow the word one step at a time.')
      return
    }

    const nextNodes = [...selectedTrailNodes, nodeId]
    setSelectedTrailNodes(nextNodes)
    setFeedback('')
    setHintedNode(null)

    if (nextNodes.length === question.components.length) {
      setScore((value) => value + 1)
      setPhase('correct')
      setFeedback('Beautiful trail!')
    }
  }

  const handleTrailDrop = (event) => {
    event.preventDefault()
    const nodeId = event.dataTransfer.getData('text/plain')
    if (nodeId) selectTrailNode(nodeId)
  }

  const giveHint = () => {
    if (isOrbit) {
      setFeedback('Hint: rotate both rings until the word is aligned.')
      return
    }

    const nextValue = question.components[selectedTrailNodes.length]
    const nextNode = trailNodes.find((node) => node.value === nextValue && !selectedTrailNodes.includes(node.id))
    setHintedNode(nextNode?.id ?? null)
    setFeedback(nextNode ? `Hint: connect “${nextValue}” next.` : 'All the trail pieces are connected.')
  }

  const clearTrail = () => {
    setSelectedTrailNodes([])
    setHintedNode(null)
    setFeedback('')
  }

  const continueQuiz = () => {
    if (questionIndex === questions.length - 1) {
      const passed = score >= 8
      if (passed && !collectedCards.includes('yangon')) reward(80)
      setResult({ score, passed })
      setPhase('results')
      return
    }

    const nextIndex = questionIndex + 1
    setQuestionIndex(nextIndex)
    setVowelRotationDeg(0)
    setPreVowelIndex(wrongPreVowelIndex(questions[nextIndex]))
    setPostVowelIndex(wrongPostVowelIndex(questions[nextIndex]))
    setToneRotationDeg(wrongToneRotation(questions[nextIndex]))
    setSelectedTrailNodes([])
    setTrailNodes(questions[nextIndex].type === 'letter_trail' ? shuffleTrailNodes(questions[nextIndex]) : [])
    setHintedNode(null)
    setPhase('playing')
    setFeedback('')
  }

  const retryQuiz = () => {
    setQuestionIndex(0)
    setScore(0)
    setVowelRotationDeg(0)
    setPreVowelIndex(wrongPreVowelIndex(questions[0]))
    setPostVowelIndex(wrongPostVowelIndex(questions[0]))
    setToneRotationDeg(wrongToneRotation(questions[0]))
    setSelectedTrailNodes([])
    setTrailNodes([])
    setHintedNode(null)
    setPhase('playing')
    setFeedback('')
    setResult(null)
  }

  const pathPoints = selectedTrailNodes.map((nodeId) => {
    const nodeIndex = trailNodes.findIndex((node) => node.id === nodeId)
    const point = orbitPoint(nodeIndex, trailNodes.length, 38)
    return `${Number.parseFloat(point.left)},${Number.parseFloat(point.top)}`
  }).join(' ')

  if (phase === 'results' && result) {
    return (
      <main className="destination-quiz-page">
        <img className="destination-quiz-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" aria-hidden="true" />
        <img className="destination-quiz-brand" src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
        <section className="destination-quiz-results" aria-labelledby="yangon-results-heading">
          <span className={`destination-quiz-results-icon ${result.passed ? 'is-passed' : ''}`}>{result.passed ? <Check size={34} /> : <Sparkles size={34} />}</span>
          <p>DESTINATION 3 · YANGON</p>
          <h1 id="yangon-results-heading">{result.passed ? 'Challenge complete!' : 'One more try?'}</h1>
          <strong>{result.score} / 10</strong>
          <span>{result.passed ? 'You reached the 8 out of 10 goal and earned your Yangon stamp.' : 'Score 8 out of 10 to earn your Yangon stamp.'}</span>
          <div className="destination-quiz-results-actions">
            <button type="button" className="destination-quiz-secondary" onClick={retryQuiz}><RotateCcw size={16} /> TRY AGAIN</button>
            <button type="button" className="destination-quiz-primary" onClick={() => setActiveScreen('map')}>BACK TO MAP <ArrowRight size={16} /></button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="destination-quiz-page">
      <section className="destination-quiz-scene" aria-label="Yangon Burmese spelling challenge">
        <img className="destination-quiz-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" aria-hidden="true" />
        <img className="destination-quiz-brand" src="/generated/codex-logo.png" alt="GenZ Slang Codex" />

        <header className="world-map-profile destination-intro-profile destination-quiz-profile">
          <img src="/generated/setting-bar-transparent.png" alt={`${player.name}, ${xp} XP, settings and leaderboard`} />
          <button className="profile-hitbox" type="button" onClick={() => setModal('profile')} aria-label="Open profile" />
          <button className="settings-hitbox" type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings" />
          <button className="leaderboard-hitbox" type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
        </header>

        <article className="destination-quiz-card">
          <header className="destination-quiz-heading">
            <div className="destination-quiz-heading-title">
              <button type="button" className="destination-quiz-exit" onClick={() => setActiveScreen('yangon-intro')} aria-label="Back to Yangon destination details"><ArrowLeft size={17} /></button>
              <div>
                <p>YANGON · {isOrbit ? 'ORBIT' : 'TRAIL'} {roundNumber}/{isOrbit ? 9 : 1} · QUESTION {questionIndex + 1}/10</p>
                <h1>{isOrbit ? 'Syllable Orbit' : 'Letter Trail'}</h1>
              </div>
              <img src="/monkeyIntroDes1-sticker.png" alt="" aria-hidden="true" />
            </div>
            <div className="destination-quiz-progress">
              <div className="destination-quiz-dots" aria-label={`${score} correct answers out of 10`}>
                {questions.map((item, index) => (
                  <span key={item.word} className={`${index < questionIndex ? 'is-done' : ''} ${index === questionIndex ? 'is-current' : ''}`} />
                ))}
              </div>
              <span>SCORE <b>{score}</b> / 10 <i>·</i> AIM 8</span>
            </div>
          </header>

          <div className="destination-quiz-layout">
            <aside className="destination-quiz-prompt">
              <p className="destination-quiz-kicker">SPELL IN BURMESE</p>
              <h2>{question.meaning}</h2>
              <div className="destination-quiz-art" aria-hidden="true">{question.icon}</div>
              {question.type === 'letter_trail' && phase === 'correct' && (
                <div className="destination-quiz-reveal">
                  <small>YOU BUILT</small>
                  <strong lang="my">{question.word}</strong>
                </div>
              )}
              <div className={`destination-quiz-status ${phase === 'correct' ? 'is-correct' : ''}`} role="status">
                {phase === 'correct' ? <Check size={13} /> : <Sparkles size={13} />}
                <span>{statusMessage}</span>
              </div>
            </aside>

            <section className="destination-quiz-game-panel" aria-label={isOrbit ? 'Syllable Orbit game' : 'Letter Trail game'}>
              {isOrbit ? (
                <div className="yangon-orbit-workspace">
                  <div className="yangon-orbit-tools">
                    <div className="yangon-game-instructions">
                      <strong>SPIN &amp; SPELL</strong>
                      <span>Rotate the arrows; the answer checks automatically when the marks align.</span>
                    </div>
                    <OrbitRingControl label="VOWEL" onRotate={rotateVowelRing} disabled={phase !== 'playing'} />
                    <OrbitRingControl label="TONE" onRotate={rotateOrbitTone} disabled={phase !== 'playing'} />
                    <div className="yangon-orbit-direction">
                      <span>Vowel ↑</span>
                      <span>Tone →</span>
                    </div>
                  </div>

                  <div className="yangon-orbit-board" aria-label="Rotate vowel marks around the consonant">
                    <div className="yangon-orbit-rotor yangon-orbit-rotor-outer" style={{ transform: `rotate(${toneRotationDeg}deg)` }}>
                      <span className="yangon-orbit-ring yangon-orbit-ring-outer" />
                      {positionedTones.map(({ value, angle, currentPosition }) => (
                        <OrbitToneSlot
                          key={value}
                          value={value}
                          angle={angle}
                          rotationDeg={toneRotationDeg}
                          isInTarget={currentPosition === 'right'}
                        />
                      ))}
                    </div>
                    {expectedVowels.map(({ value, position }) => {
                      const radius = vowelTiles.find((tile) => tile.value === value)?.radius ?? 24
                      const selectedVowel = position === 'right'
                        ? postVowels[postVowelIndex]
                        : preVowels[preVowelIndex]
                      return (
                        <span
                          key={`${value}-${position}`}
                          className="yangon-orbit-target-slot yangon-orbit-target-slot-vowel"
                          style={orbitPointForPosition(position, radius)}
                          aria-hidden="true"
                        >
                          <strong lang="my" className="yangon-orbit-target-glyph">{selectedVowel}</strong>
                        </span>
                      )
                    })}
                    <span
                      className="yangon-orbit-target-slot yangon-orbit-target-slot-tone"
                      style={orbitPointForPosition('right', 52)}
                      aria-hidden="true"
                    >
                      {positionedTones.find((tile) => tile.currentPosition === 'right')?.value && (
                        <strong lang="my" className="yangon-orbit-target-glyph">
                          {positionedTones.find((tile) => tile.currentPosition === 'right').value}
                        </strong>
                      )}
                    </span>
                    <div className="yangon-orbit-rotor yangon-orbit-rotor-inner" style={{ transform: `rotate(${vowelRotationDeg}deg)` }}>
                      <span className="yangon-orbit-ring yangon-orbit-ring-inner" />
                      {positionedVowels.map(({ value, angle, radius, position, label, currentPosition }) => (
                        <OrbitPosition
                          key={value}
                          position={position}
                          label={label}
                          value={value}
                          angle={angle}
                          radius={radius}
                          rotationDeg={vowelRotationDeg}
                          isInTarget={value === preVowels[preVowelIndex] && currentPosition === 'left'}
                        />
                      ))}
                    </div>
                    <div className="yangon-orbit-center">
                      <small>BASE</small>
                      <strong lang="my">{question.base}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="yangon-trail-workspace">
                  <div className="yangon-trail-answer-slots" aria-label="Word components in selected order">
                    {question.components.map((component, index) => {
                      const selectedNode = trailNodes.find((node) => node.id === selectedTrailNodes[index])
                      return <span key={`${component}-${index}`} className={selectedNode ? 'is-filled' : ''} lang="my">{selectedNode?.value ?? ''}</span>
                    })}
                  </div>

                  <div className="yangon-trail-board" onDragOver={(event) => event.preventDefault()} onDrop={handleTrailDrop}>
                    <span className="yangon-trail-ring" />
                    <svg className="yangon-trail-lines" viewBox="0 0 100 100" aria-hidden="true">
                      {pathPoints && <polyline points={pathPoints} />}
                    </svg>
                    {trailNodes.map((node, index) => (
                      <button
                        key={node.id}
                        type="button"
                        draggable={phase === 'playing' && !selectedTrailNodes.includes(node.id)}
                        onDragStart={(event) => event.dataTransfer.setData('text/plain', node.id)}
                        className={`yangon-trail-node ${selectedTrailNodes.includes(node.id) ? 'is-used' : ''} ${hintedNode === node.id ? 'is-hinted' : ''}`}
                        style={orbitPoint(index, trailNodes.length, 39)}
                        onClick={() => selectTrailNode(node.id)}
                        disabled={phase !== 'playing' || selectedTrailNodes.includes(node.id)}
                        aria-label={`Connect ${node.value}`}
                      >
                        <span lang="my">{node.value}</span>
                      </button>
                    ))}
                    <div className="yangon-trail-center"><Sparkles size={19} /><span>CONNECT<br />IN ORDER</span></div>
                  </div>

                  <button type="button" className="yangon-trail-reset" onClick={clearTrail} disabled={!selectedTrailNodes.length}>
                    <RotateCcw size={13} /> RESET / CLEAR
                  </button>
                </div>
              )}
            </section>
          </div>

          <footer className={`destination-quiz-footer ${isOrbit ? '' : 'is-trail'}`}>
            <button type="button" className="destination-quiz-hint" onClick={giveHint} disabled={phase !== 'playing'}>
              <Lightbulb size={15} /> GET A HINT
            </button>
            {isOrbit ? (
              <div className="destination-quiz-aligned">
                <small>ALIGNED:</small>
                <div className="destination-quiz-combination" lang="my" aria-label="Selected spelling combination">
                  <strong>{question.base}</strong>
                  {orbitParts.map((part, index) => (
                    <span className="destination-quiz-combination-part" key={`${part}-${index}`}>
                      <b>+</b><strong>{part}</strong>
                    </span>
                  ))}
                  <b className="destination-quiz-combination-equals">=</b>
                  <strong className="destination-quiz-combination-answer">{assembledAnswer}</strong>
                </div>
              </div>
            ) : (
              <div className="destination-quiz-trail-progress">
                <small>TRAIL</small>
                <strong>{selectedTrailNodes.length} / {question.components.length} connected</strong>
              </div>
            )}
            {phase === 'correct' ? (
              <button type="button" className="destination-quiz-primary" onClick={continueQuiz}>CONTINUE <ArrowRight size={16} /></button>
            ) : isOrbit ? (
              <div className="destination-quiz-auto-check"><Sparkles size={14} /> AUTO-CHECK WHEN ALIGNED</div>
            ) : (
              <span className="destination-quiz-trail-action">Select a ring piece</span>
            )}
          </footer>

        </article>
      </section>
    </main>
  )
}
