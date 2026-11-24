import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import { useGame } from '../context/GameContext'

const questions = [
  { type: 'letter_trail', word: 'ပန်း', meaning: 'Flower', icon: '🌸', components: ['ပ', 'န်', 'း'], distractors: ['င်', '့'] },
  { type: 'letter_trail', word: 'လန့်', meaning: 'Startled / Scared', icon: '😱', components: ['လ', 'န်', '့'], distractors: ['င်', 'း'] },
  { type: 'letter_trail', word: 'ဖန်', meaning: 'Glass', icon: '🥛', components: ['ဖ', 'န်'], distractors: ['င်', '့', 'း'] },
  { type: 'letter_trail', word: 'ဆင်', meaning: 'Elephant', icon: '🐘', components: ['ဆ', 'င်'], distractors: ['န်', '့', 'း'] },
  { type: 'letter_trail', word: 'ဆန်', meaning: 'Uncooked Rice', icon: '🌾', components: ['ဆ', 'န်'], distractors: ['င်', '့', 'း'] },
  { type: 'letter_trail', word: 'ဟင်း', meaning: 'Curry', icon: '🍲', components: ['ဟ', 'င်', 'း'], distractors: ['န်', '့'] },
  { type: 'letter_trail', word: 'ငန်', meaning: 'Salty', icon: '🧂', components: ['င', 'န်'], distractors: ['င်', '့', 'း'] },
  { type: 'letter_trail', word: 'သန့်စင်', meaning: 'Clean / Purify', icon: '🧼', components: ['သ', 'န်', '့', 'စ', 'င်'], distractors: ['း'] },
  { type: 'letter_trail', word: 'ပန်းပင်', meaning: 'Flower Plant', icon: '🪴', components: ['ပ', 'န်', 'း', 'ပ', 'င်'], distractors: ['့'] },
  { type: 'letter_trail', word: 'လန်းဆန်း', meaning: 'Fresh / Refreshed', icon: '🌿', components: ['လ', 'န်', 'း', 'ဆ', 'န်', 'း'], distractors: ['င်', '့'] }
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

export default function InleQuiz() {
  const { player, xp, setActiveScreen, setModal, collectedCards, reward, completeDestination } = useGame()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedTrailNodes, setSelectedTrailNodes] = useState([])
  const [trailNodes, setTrailNodes] = useState(() => shuffleTrailNodes(questions[0]))
  const [hintedNode, setHintedNode] = useState(null)
  const [phase, setPhase] = useState('playing')
  const [feedback, setFeedback] = useState('')
  const [result, setResult] = useState(null)

  const question = questions[questionIndex]
  const statusMessage = phase === 'correct'
    ? 'Ready to continue!'
    : phase === 'checked-correct'
      ? 'Great trail! You got it right!'
      : phase === 'checked-wrong'
        ? 'Almost! Clear the trail and try again.'
    : feedback || 'Connect the pieces in order.'

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

  }

  const handleTrailDrop = (event) => {
    event.preventDefault()
    const nodeId = event.dataTransfer.getData('text/plain')
    if (nodeId) selectTrailNode(nodeId)
  }

  const giveHint = () => {
    const nextValue = question.components[selectedTrailNodes.length]
    const nextNode = trailNodes.find((node) => node.value === nextValue && !selectedTrailNodes.includes(node.id))
    setHintedNode(nextNode?.id ?? null)
    setFeedback(nextNode ? `Hint: connect “${nextValue}” next.` : 'All the trail pieces are connected.')
  }

  const clearTrail = () => {
    setSelectedTrailNodes([])
    setHintedNode(null)
    setFeedback('')
    setPhase('playing')
  }

  const checkAnswer = () => {
    const answerIsCorrect = selectedTrailNodes.every((nodeId, index) => {
      const node = trailNodes.find((item) => item.id === nodeId)
      return node?.value === question.components[index]
    }) && selectedTrailNodes.length === question.components.length

    setPhase(answerIsCorrect ? 'checked-correct' : 'checked-wrong')
    setFeedback(answerIsCorrect ? 'Beautiful trail!' : 'Almost! Try the pieces in a different order.')
    if (answerIsCorrect) setScore((value) => value + 1)
  }

  const continueQuiz = () => {
    if (questionIndex === questions.length - 1) {
      const passed = score >= 8
      if (passed) {
        if (!collectedCards.includes('inle')) reward(80)
        completeDestination()
      }
      setResult({ score, passed })
      setPhase('results')
      return
    }

    const nextIndex = questionIndex + 1
    setQuestionIndex(nextIndex)
    setSelectedTrailNodes([])
    setTrailNodes(shuffleTrailNodes(questions[nextIndex]))
    setHintedNode(null)
    setPhase('playing')
    setFeedback('')
  }

  const retryQuiz = () => {
    setQuestionIndex(0)
    setScore(0)
    setSelectedTrailNodes([])
    setTrailNodes(shuffleTrailNodes(questions[0]))
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
        <section className="destination-quiz-results" aria-labelledby="inle-results-heading">
          <span className={`destination-quiz-results-icon ${result.passed ? 'is-passed' : ''}`}>{result.passed ? <Check size={34} /> : <Sparkles size={34} />}</span>
          <p>DESTINATION 4 · INLE LAKE</p>
          <h1 id="inle-results-heading">{result.passed ? 'Challenge complete!' : 'One more try?'}</h1>
          <strong>{result.score} / 10</strong>
          <span>{result.passed ? 'You reached the 8 out of 10 goal and earned your Inle Lake stamp.' : 'Score 8 out of 10 to earn your Inle Lake stamp.'}</span>
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
      <section className="destination-quiz-scene" aria-label="Inle Lake Letter Trail challenge">
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
              <button type="button" className="destination-quiz-exit" onClick={() => setActiveScreen('inle-intro')} aria-label="Back to Inle Lake destination details"><ArrowLeft size={17} /></button>
              <div>
                <p>INLE LAKE · TRAIL · QUESTION {questionIndex + 1}/10</p>
                <h1>Letter Trail</h1>
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
              {(phase === 'correct' || phase === 'checked-correct') && (
                <div className="destination-quiz-reveal">
                  <small>YOU BUILT</small>
                  <strong lang="my">{question.word}</strong>
                </div>
              )}
              <div className={`destination-quiz-status ${phase.includes('correct') ? 'is-correct' : phase === 'checked-wrong' ? 'is-wrong' : ''}`} role="status">
                {phase.includes('correct') ? <Check size={13} /> : <Sparkles size={13} />}
                <span>{statusMessage}</span>
              </div>
            </aside>

            <section className="destination-quiz-game-panel" aria-label="Letter Trail game">
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
            </section>
          </div>

          <footer className={`destination-quiz-footer is-trail ${phase === 'checked-correct' ? 'has-success' : phase === 'checked-wrong' ? 'has-retry' : ''}`}>
            {phase === 'checked-correct' ? (
              <div className="destination-quiz-success-panel" role="status">
                <div className="destination-quiz-success-confetti" aria-hidden="true">
                  {Array.from({ length: 18 }, (_, index) => <span key={index} style={{ '--confetti-index': index, left: `${(index * 37) % 100}%` }} />)}
                </div>
                <img src="/happy-slang-buddy-transparent.png" alt="" />
                <div><small>SLANG BUDDY · ✓ CORRECT</small><strong>Great trail! You got it right!</strong></div>
                <button type="button" className="destination-quiz-primary" onClick={continueQuiz}>CONTINUE <ArrowRight size={16} /></button>
              </div>
            ) : phase === 'checked-wrong' ? (
              <div className="destination-quiz-retry-panel" role="status">
                <img src="/happy-slang-buddy-transparent.png" alt="" />
                <div><small>SLANG BUDDY · NOT QUITE</small><strong>Almost! Clear the trail and try again.</strong></div>
                <button type="button" className="destination-quiz-primary" onClick={clearTrail}>TRY AGAIN <RotateCcw size={15} /></button>
              </div>
            ) : (
              <>
                <button type="button" className="destination-quiz-hint" onClick={giveHint} disabled={phase !== 'playing'}>
                  <Lightbulb size={15} /> GET A HINT
                </button>
                <div className="destination-quiz-trail-progress">
                  <small>TRAIL</small>
                  <strong>{selectedTrailNodes.length} / {question.components.length} connected</strong>
                </div>
                <button type="button" className="destination-quiz-primary" onClick={checkAnswer}>CHECK ANSWER <Check size={15} /></button>
              </>
            )}
          </footer>
        </article>
      </section>
    </main>
  )
}
