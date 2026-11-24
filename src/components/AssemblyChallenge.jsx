import { useEffect, useState } from 'react'
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
const spellingQuestions = [
  {
    word: 'Fire',
    answer: 'မီး',
    image: '/firelogoDes1-sticker.png',
    artClass: 'is-fire',
    parts,
    spellingOrder,
    initialOrder: initialSpellingOrder
  },
  {
    word: 'Umbrella',
    answer: 'ထီး',
    image: '/UmbrellaLogoDes1.png',
    artClass: 'is-umbrella',
    parts: [
      { id: 'consonant', label: 'Consonant', value: 'ထ', tileValue: 'ထ' },
      { id: 'vowel', label: 'Vowel', value: 'ီ', tileValue: '◌ီ' },
      { id: 'tone', label: 'Tone', value: 'း', tileValue: '◌း' }
    ],
    spellingOrder: ['consonant', 'vowel', 'tone'],
    initialOrder: ['vowel', 'consonant', 'tone']
  },
  {
    word: 'Oil',
    answer: 'ဆီ',
    image: '/OilLogoDes1.png',
    artClass: 'is-oil',
    parts: [
      { id: 'consonant', label: 'Consonant', value: 'ဆ', tileValue: 'ဆ' },
      { id: 'vowel', label: 'Vowel', value: 'ီ', tileValue: '◌ီ' }
    ],
    spellingOrder: ['consonant', 'vowel'],
    initialOrder: ['vowel', 'consonant']
  },
  {
    word: 'Play the instrument',
    answer: 'တီး',
    image: '/PlayLogoDes1-sticker.png',
    artClass: 'is-play',
    parts: [
      { id: 'consonant', label: 'Consonant', value: 'တ', tileValue: 'တ' },
      { id: 'vowel', label: 'Vowel', value: 'ီ', tileValue: '◌ီ' },
      { id: 'tone', label: 'Tone', value: 'း', tileValue: '◌း' }
    ],
    spellingOrder: ['consonant', 'vowel', 'tone'],
    initialOrder: ['vowel', 'consonant', 'tone']
  },
  {
    word: 'Car',
    answer: 'ကား',
    image: '/CarLogoDes1.png',
    artClass: 'is-car',
    parts: [
      { id: 'consonant', label: 'Consonant', value: 'က', tileValue: 'က' },
      { id: 'vowel', label: 'Vowel', value: 'ာ', tileValue: '◌ာ' },
      { id: 'tone', label: 'Tone', value: 'း', tileValue: '◌း' }
    ],
    spellingOrder: ['consonant', 'vowel', 'tone'],
    initialOrder: ['vowel', 'consonant', 'tone']
  },
  {
    word: 'Bamboo',
    answer: 'ဝါး',
    image: '/bambooLogoDes1.png',
    artClass: 'is-bamboo',
    parts: [
      { id: 'consonant', label: 'Consonant', value: 'ဝ', tileValue: 'ဝ' },
      { id: 'vowel', label: 'Vowel', value: 'ာ', tileValue: '◌ာ' },
      { id: 'tone', label: 'Tone', value: 'း', tileValue: '◌း' }
    ],
    spellingOrder: ['consonant', 'vowel', 'tone'],
    initialOrder: ['vowel', 'consonant', 'tone']
  },
  {
    word: 'Ear',
    answer: 'နား',
    image: '/EarLogoDes1.png',
    artClass: 'is-ear',
    parts: [
      { id: 'consonant', label: 'Consonant', value: 'န', tileValue: 'န' },
      { id: 'vowel', label: 'Vowel', value: 'ာ', tileValue: '◌ာ' },
      { id: 'tone', label: 'Tone', value: 'း', tileValue: '◌း' }
    ],
    spellingOrder: ['consonant', 'vowel', 'tone'],
    initialOrder: ['vowel', 'consonant', 'tone']
  },
  {
    word: 'Eat',
    answer: 'စား',
    image: '/EatLogoDes1.png',
    artClass: 'is-eat',
    parts: [
      { id: 'consonant', label: 'Consonant', value: 'စ', tileValue: 'စ' },
      { id: 'vowel', label: 'Vowel', value: 'ာ', tileValue: '◌ာ' },
      { id: 'tone', label: 'Tone', value: 'း', tileValue: '◌း' }
    ],
    spellingOrder: ['consonant', 'vowel', 'tone'],
    initialOrder: ['vowel', 'consonant', 'tone']
  },
  {
    word: 'Son',
    answer: 'သား',
    image: '/SonLogoDes1.png',
    artClass: 'is-son',
    parts: [
      { id: 'consonant', label: 'Consonant', value: 'သ', tileValue: 'သ' },
      { id: 'vowel', label: 'Vowel', value: 'ာ', tileValue: '◌ာ' },
      { id: 'tone', label: 'Tone', value: 'း', tileValue: '◌း' }
    ],
    spellingOrder: ['consonant', 'vowel', 'tone'],
    initialOrder: ['vowel', 'consonant', 'tone']
  },
  {
    word: 'Dragon',
    answer: 'နဂါး',
    image: '/DragonLogoDes1.png',
    artClass: 'is-dragon',
    parts: [
      { id: 'consonant-na', label: 'Consonant', value: 'န', tileValue: 'န' },
      { id: 'consonant-ga', label: 'Consonant', value: 'ဂ', tileValue: 'ဂ' },
      { id: 'vowel', label: 'Vowel', value: 'ာ', tileValue: '◌ာ' },
      { id: 'tone', label: 'Tone', value: 'း', tileValue: '◌း' }
    ],
    spellingOrder: ['consonant-na', 'consonant-ga', 'vowel', 'tone'],
    initialOrder: ['consonant-ga', 'consonant-na', 'vowel', 'tone']
  }
]
const successConfettiPieces = [
  [-46, 74, -120, 0, '#f15b43'],
  [-40, 108, 95, 35, '#f4b942'],
  [-34, 88, 185, 70, '#50a876'],
  [-28, 122, 265, 105, '#52b9ca'],
  [-22, 96, 345, 140, '#d76bb3'],
  [-16, 116, 140, 20, '#f4b942'],
  [-10, 82, 230, 55, '#f15b43'],
  [-4, 104, 320, 90, '#50a876'],
  [4, 92, 40, 125, '#52b9ca'],
  [10, 118, 130, 15, '#d76bb3'],
  [16, 78, 220, 50, '#f4b942'],
  [22, 112, 310, 85, '#f15b43'],
  [28, 90, 30, 120, '#50a876'],
  [34, 124, 120, 10, '#52b9ca'],
  [40, 84, 210, 45, '#d76bb3'],
  [46, 106, 300, 80, '#f4b942']
]
const successScreenConfettiPieces = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  x: (index * 37 + 11) % 101,
  delay: (index * 53) % 520,
  duration: 2200 + ((index * 101) % 1000),
  drift: -140 + ((index * 71) % 280),
  rotation: 180 + ((index * 113) % 720),
  color: ['#f15b43', '#f4b942', '#50a876', '#52b9ca', '#d76bb3', '#8e79e8'][index % 6]
}))

export default function AssemblyChallenge() {
  const { selectedDestination } = useGame()
  if (selectedDestination.id === 'naypyitaw') return <NaypyitawSpellingBuilder />
  if (selectedDestination.id === 'mawlamyine') return <MawlamyineFallingCharacters />
  return <LegacyAssemblyChallenge />
}

function NaypyitawSpellingBuilder() {
  const { setModal, setActiveScreen: navigate, reward, completeDestination } = useGame()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [tileOrder, setTileOrder] = useState(initialSpellingOrder)
  const [selectedTile, setSelectedTile] = useState(null)
  const [swapCount, setSwapCount] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const question = spellingQuestions[questionIndex]
  const readyToCheck = tileOrder.every((part, index) => part === question.spellingOrder[index])

  const swapTiles = (index) => {
    if (showSuccess) return
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
    if (showSuccess) return
    const shuffled = [...question.spellingOrder]
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const other = Math.floor(Math.random() * (index + 1))
      ;[shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]]
    }
    if (shuffled.every((part, index) => part === question.spellingOrder[index])) {
      ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
    }
    setTileOrder(shuffled)
    setSelectedTile(null)
    setFeedback('')
  }

  const resetTiles = () => {
    if (showSuccess) return
    setTileOrder(question.initialOrder)
    setSelectedTile(null)
    setSwapCount(0)
    setFeedback('')
  }

  const checkAnswer = () => {
    if (showSuccess) return
    if (!readyToCheck) {
      setFeedback('Not quite yet. Swap the tiles into the target order.')
      return
    }
    setFeedback('')
    setShowSuccess(true)
  }

  const continueChallenge = () => {
    if (!showSuccess) return
    if (questionIndex >= spellingQuestions.length - 1) {
      reward(80)
      completeDestination()
      navigate('naypyitaw-clear')
      return
    }
    const nextQuestionIndex = questionIndex + 1
    setQuestionIndex(nextQuestionIndex)
    setTileOrder(spellingQuestions[nextQuestionIndex].initialOrder)
    setSelectedTile(null)
    setSwapCount(0)
    setFeedback('')
    setShowHint(false)
    setShowSuccess(false)
  }

  return <main className="spelling-page">
    <section className="spelling-scene" aria-label="Naypyitaw spelling builder">
      {showSuccess && (
        <div className="spelling-screen-confetti" aria-hidden="true">
          {successScreenConfettiPieces.map((piece) => (
            <span
              className="spelling-screen-confetti-piece"
              key={piece.id}
              style={{
                '--screen-confetti-start': `${piece.x}vw`,
                '--screen-confetti-drift': `${piece.drift}px`,
                '--screen-confetti-rotation': `${piece.rotation}deg`,
                '--screen-confetti-delay': `${piece.delay}ms`,
                '--screen-confetti-duration': `${piece.duration}ms`,
                '--screen-confetti-color': piece.color
              }}
            />
          ))}
        </div>
      )}
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

      <section className={`spelling-card ${showSuccess ? 'has-success' : ''}`}>
        <header className="spelling-card-heading">
        <p>NAYPYITAW · {questionIndex + 1} / 10</p>
          <div className="spelling-heading-row">
            <h1>Spelling Builder</h1>
            <div className="spelling-monkey" aria-hidden="true"><img src="/MonkeyDes1.png" alt="" /></div>
          </div>
        <div className="spelling-progress" aria-label={`Question ${questionIndex + 1} of 10`}>
          {Array.from({ length: 10 }, (_, step) => <span className={step === questionIndex ? 'is-current' : step < questionIndex ? 'is-complete' : ''} key={step} />)}
          </div>
        </header>

        <div className="spelling-main">
          <section className="spelling-word-card" aria-label="Word to spell">
            <p>SPELL IT IN BURMESE</p>
            <h2>{question.word}</h2>
            <div className={`spelling-art ${question.artClass}`}><img src={question.image} alt={`${question.word} illustration`} /></div>
            <span>{question.parts.length} spelling parts · 1 word</span>
          </section>

          <section className="spelling-board" aria-label="Arrange the Burmese spelling parts">
            <div className="spelling-board-top">
              <div>
                <p>{readyToCheck ? 'READY TO CHECK' : 'TAP TO SWAP'}</p>
                <span>{readyToCheck ? 'The tiles are arranged. Check your spelling.' : 'Tap one tile, then another to swap their positions.'}</span>
              </div>
              <b className="spelling-swap-count">{swapCount} {swapCount === 1 ? 'swap' : 'swaps'}</b>
            </div>
            <button type="button" className="spelling-shuffle" onClick={readyToCheck ? resetTiles : shuffleTiles} disabled={showSuccess}><RotateCcw size={12} /> {readyToCheck ? 'Reset' : 'Shuffle'}</button>
            <div className={`spelling-tiles ${question.parts.length === 4 ? 'is-four-part' : ''}`}>
              {tileOrder.map((id, index) => {
                const part = question.parts.find((item) => item.id === id)
                return <button
                  type="button"
                  key={id}
                  className={`spelling-tile spelling-tile-${id} ${selectedTile === index ? 'is-selected' : ''}`}
                  onClick={() => swapTiles(index)}
                  disabled={showSuccess}
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

        <footer className={`spelling-card-footer ${showSuccess ? 'has-success' : ''}`}>
          {showSuccess ? (
            <div className="spelling-success-panel" role="status">
              <div className="spelling-celebration-confetti" aria-hidden="true">
                {successConfettiPieces.map(([x, rise, rotation, delay, color], index) => (
                  <span
                    className="spelling-confetti-piece"
                    key={index}
                    style={{
                      '--confetti-x': `${x}%`,
                      '--confetti-rise': `${rise}px`,
                      '--confetti-rotation': `${rotation}deg`,
                      '--confetti-delay': `${delay}ms`,
                      '--confetti-color': color
                    }}
                  />
                ))}
              </div>
              <div className="spelling-success-monkey"><img src="/generated/naypyitaw-success-monkey.png" alt="" /></div>
              <div className="spelling-success-copy">
                <small>SLANG BUDDY · ✓ CORRECT</small>
                <p>Great build! 🎉 You spelled <strong lang="my">{question.answer}</strong> correctly!</p>
              </div>
              <button type="button" className="spelling-continue" onClick={continueChallenge}>
                {questionIndex >= spellingQuestions.length - 1 ? 'Complete destination' : 'Continue'}
              </button>
            </div>
          ) : (
            <>
              <button type="button" className="spelling-hint" onClick={() => setShowHint((visible) => !visible)}>{showHint ? 'Hide hint' : 'Get a hint'}</button>
              <div className="spelling-target-order">
                <small>{readyToCheck ? 'YOUR SPELLING' : 'TARGET ORDER'}</small>
                {readyToCheck
                  ? <strong lang="my">{question.answer}</strong>
                  : <span>{question.spellingOrder.map((id) => question.parts.find((part) => part.id === id).label).join(' → ')}</span>}
                {showHint && !readyToCheck && <strong lang="my">{question.spellingOrder.map((id) => question.parts.find((part) => part.id === id).tileValue).join(' → ')}</strong>}
              </div>
              <button type="button" className="spelling-check" onClick={checkAnswer}><span>Check answer</span><Check size={15} /></button>
            </>
          )}
        </footer>
      </section>
    </section>
  </main>
}

function MawlamyineFallingCharacters() {
  const { setModal, setActiveScreen: navigate } = useGame()
  const [caught, setCaught] = useState([])
  const [feedback, setFeedback] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasMistake, setHasMistake] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const questions = [
    {
      targetParts: [
        { id: 'consonant', label: 'Pa', value: 'ပ', tileValue: 'ပ' },
        { id: 'vowel', label: 'Auu', value: 'ူ', tileValue: '◌ူ' }
      ],
      name: 'Hot',
      nameBurmese: 'ပူ',
      targetImage: '/HotLogoDes2-sticker.png',
      consonantName: 'Pa'
    },
    {
      targetParts: [
        { id: 'consonant', label: 'La', value: 'လ', tileValue: 'လ' },
        { id: 'vowel', label: 'Auu', value: 'ူ', tileValue: '◌ူ' }
      ],
      name: 'Human',
      nameBurmese: 'လူ',
      targetImage: '/humanLodoDes2-centered-sticker.png',
      consonantName: 'La',
      targetArtClass: 'is-human'
    },
    {
      targetParts: [
        { id: 'consonant', label: 'Ka', value: 'က', tileValue: 'က' },
        { id: 'vowel', label: 'Auu', value: 'ူ', tileValue: '◌ူ' },
        { id: 'final', label: 'Final mark', value: 'း', tileValue: 'း' }
      ],
      name: 'Cross the road',
      nameBurmese: 'ကူး',
      targetImage: '/CrossLogoDes2-sticker.png',
      consonantName: 'Ka',
      targetArtClass: 'is-cross'
    },
    {
      targetParts: [
        { id: 'consonant', label: 'Ka', value: 'က', tileValue: 'က' },
        { id: 'top-vowel', label: 'Top vowel', value: 'ိ', tileValue: '◌ိ' },
        { id: 'bottom-vowel', label: 'Bottom vowel', value: 'ု', tileValue: '◌ု' },
        { id: 'final', label: 'Final mark', value: 'း', tileValue: 'း' }
      ],
      name: 'Nine',
      nameBurmese: 'ကိုး',
      targetImage: '/NineLogoDes2-sticker.png',
      consonantName: 'Ka',
      targetArtClass: 'is-nine'
    },
    {
      targetParts: [
        { id: 'consonant', label: 'A', value: 'အ', tileValue: 'အ' },
        { id: 'vowel', label: 'Uu', value: 'ူ', tileValue: '◌ူ' }
      ],
      name: 'Intestine',
      nameBurmese: 'အူ',
      targetImage: '/IntestineLogoDes2-sticker.png',
      consonantName: 'A',
      targetArtClass: 'is-intestine'
    },
    {
      targetParts: [
        { id: 'consonant', label: 'Kha', value: 'ခ', tileValue: 'ခ' },
        { id: 'top-vowel', label: 'Top vowel', value: 'ိ', tileValue: '◌ိ' },
        { id: 'bottom-vowel', label: 'Bottom vowel', value: 'ု', tileValue: '◌ု' },
        { id: 'final', label: 'Final mark', value: 'း', tileValue: 'း' }
      ],
      name: 'Steal',
      nameBurmese: 'ခိုး',
      targetImage: '/ThiefLogoDes2-sticker.png',
      consonantName: 'Kha',
      targetArtClass: 'is-thief'
    },
    {
      targetParts: [
        { id: 'consonant', label: 'Sa', value: 'ဆ', tileValue: 'ဆ' },
        { id: 'top-vowel', label: 'Top vowel', value: 'ိ', tileValue: '◌ိ' },
        { id: 'bottom-vowel', label: 'Bottom vowel', value: 'ု', tileValue: '◌ု' },
        { id: 'final', label: 'Final mark', value: 'း', tileValue: 'း' }
      ],
      name: 'Naughty',
      nameBurmese: 'ဆိုး',
      targetImage: '/NaughtyLogoDes2-sticker.png',
      consonantName: 'Sa',
      targetArtClass: 'is-naughty'
    },
    {
      targetParts: [
        { id: 'consonant', label: 'Ka', value: 'က', tileValue: 'က' },
        { id: 'top-vowel', label: 'Top vowel', value: 'ိ', tileValue: '◌ိ' },
        { id: 'bottom-vowel', label: 'Bottom vowel', value: 'ု', tileValue: '◌ု' }
      ],
      name: 'Elder Brother',
      nameBurmese: 'ကို',
      targetImage: '/BrotherLogoDes2-sticker.png',
      consonantName: 'Ka',
      targetArtClass: 'is-brother'
    },
    {
      targetParts: [
        { id: 'consonant', label: 'Sa', stepLabel: 'Consonant', value: 'စ', tileValue: 'စ' },
        { id: 'vowel', label: 'U', stepLabel: 'Bottom vowel', value: 'ု', tileValue: '◌ု' },
        { id: 'consonant-2', label: 'Ba', stepLabel: 'Consonant', value: 'ဘ', tileValue: 'ဘ' },
        { id: 'vowel-2', label: 'Uu vowel', stepLabel: 'Bottom vowel', value: 'ူ', tileValue: '◌ူ' },
        { id: 'final', label: 'Final mark', stepLabel: 'Final mark', value: 'း', tileValue: 'း' }
      ],
      name: 'Savings Box',
      nameBurmese: 'စုဘူး',
      targetImage: '/SavingsBoxLogoDes2-sticker.png',
      consonantName: 'Sa',
      targetArtClass: 'is-savings-box',
      groupBreakAfter: 2
    },
    {
      targetParts: [
        { id: 'consonant', label: 'Ta', stepLabel: 'Consonant', value: 'တ', tileValue: 'တ' },
        { id: 'top-vowel', label: 'Top vowel', value: 'ိ', tileValue: '◌ိ' },
        { id: 'bottom-vowel', label: 'Bottom vowel', value: 'ု', tileValue: '◌ု' },
        { id: 'final-1', label: 'Final mark', stepLabel: 'Final mark', value: '◌့', tileValue: '◌့' },
        { id: 'consonant-2', label: 'Pha', stepLabel: 'Consonant', value: 'ဖ', tileValue: 'ဖ' },
        { id: 'vowel-2', label: 'Uu', stepLabel: 'Bottom vowel', value: 'ူ', tileValue: '◌ူ' },
        { id: 'final-2', label: 'Final mark', stepLabel: 'Final mark', value: 'း', tileValue: 'း' }
      ],
      name: 'ToFu (Food)',
      nameBurmese: 'တို့ဖူး',
      targetImage: '/TofuLogoDes2-sticker.png',
      consonantName: 'Ta',
      targetArtClass: 'is-tofu',
      groupBreakAfter: 4,
      stackedGroups: true
    }
  ]
  const question = questions[questionIndex]
  const targetParts = question.targetParts
  const targetPartIds = new Set(targetParts.map((part) => part.id))
  const targetPartValues = new Set(targetParts.map((part) => part.value))
  const fallingPool = [
    ...targetParts.map((part) => ({
      id: part.id,
      value: part.value,
      tone: part.id.startsWith('consonant') ? 'consonant' : part.id.startsWith('final') ? 'final' : 'vowel',
      ariaLabel: part.id === 'consonant' ? question.consonantName : part.id.startsWith('consonant') ? part.label : part.id === 'vowel' ? `${part.label} vowel` : part.label
    })),
    { id: 'd1', value: 'က', tone: 'consonant' },
    { id: 'd2', value: '◌ာ', tone: 'vowel' },
    { id: 'd11', value: '◌ံ', tone: 'final' },
    { id: 'd3', value: 'မ', tone: 'consonant' },
    { id: 'd4', value: '◌ိ', tone: 'vowel' },
    { id: 'd5', value: 'တ', tone: 'consonant' },
    { id: 'd6', value: '◌ေ', tone: 'vowel' },
    { id: 'd7', value: 'ဆ', tone: 'consonant' },
    { id: 'd8', value: '◌ဲ', tone: 'vowel' },
    { id: 'd9', value: 'သ', tone: 'consonant' },
    { id: 'd10', value: '◌ံ', tone: 'vowel' }
  ]

  const catchCharacter = (tile) => {
    if (showSuccess) return
    const target = targetParts.find((part) => part.id === tile.id)
    if (!target) {
      setHasMistake(true)
      setFeedback(`Not that character. Catch the parts that spell ${question.name}.`)
      return
    }
    if (caught.includes(tile.id)) return
    const next = [...caught, tile.id]
    setCaught(next)
    if (next.length === targetParts.length) setShowSuccess(true)
    setFeedback('')
  }

  const renderProgressStep = (part, index) => {
    const isCaught = caught.includes(part.id)
    return (
      <span className={`falling-progress-step ${isCaught ? 'is-current' : ''}`} key={part.id}>
        <b>{index + 1}</b>
        <small>{part.stepLabel || (part.id === 'consonant' ? 'Consonant' : part.id === 'top-vowel' ? 'Top vowel' : part.id === 'bottom-vowel' ? 'Bottom vowel' : part.id.startsWith('final') ? 'Final mark' : 'Vowel')}</small>
      </span>
    )
  }

  const reset = () => {
    setCaught([])
    setFeedback('')
    setShowSuccess(false)
    setHasMistake(false)
  }

  const goToNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((index) => index + 1)
      reset()
      return
    }
    navigate('mawlamyine-clear')
  }

  return (
    <main className="falling-page">
      <section className="falling-scene" aria-label="Mawlamyine character falling challenge">
        <img className="falling-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" aria-hidden="true" />
        <img className="falling-brand" src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
        <button type="button" className="falling-scene-back" onClick={() => navigate('map')} aria-label="Back to world map"><ArrowLeft size={18} /></button>
        <div className="falling-timer">00:20</div>
        <header className="world-map-profile falling-player-bar">
          <img src="/generated/setting-bar-transparent.png" alt="Player profile, XP, settings and leaderboard" />
          <button className="profile-hitbox" type="button" onClick={() => setModal('profile')} aria-label="Open profile" />
          <button className="settings-hitbox" type="button" onClick={() => navigate('settings')} aria-label="Settings" />
          <button className="leaderboard-hitbox" type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
        </header>

        <article className={`falling-card ${showSuccess ? 'has-success' : ''}`}>
          <header className="falling-heading">
            <div>
              <p>MAWLAMYINE · {questionIndex + 1} / 10</p>
              <div className="falling-heading-row">
                <h1>Character Falling</h1>
                <img src="/MonkeyDes1-falling-sticker.png" alt="" aria-hidden="true" />
              </div>
              <span>Consonant &amp; Vowel Challenge</span>
            </div>
            <div className="falling-header-status">
              <div className="falling-question-progress" role="img" aria-label={`Question ${questionIndex + 1} of 10`}>
                {Array.from({ length: 10 }, (_, index) => (
                  <span
                    className={index === questionIndex
                      ? `is-current ${showSuccess ? 'is-correct' : hasMistake ? 'is-wrong' : ''}`
                      : index < questionIndex ? 'is-complete' : ''}
                    key={index}
                  />
                ))}
              </div>
              <div className="falling-score">
                <div className="falling-progress-box">
                  <small>{caught.length} of {targetParts.length} challenges complete</small>
                </div>
              </div>
            </div>
          </header>

          <div className="falling-content">
            <aside className="falling-target">
              <p>{caught.length === targetParts.length ? 'WORD COMPLETE' : 'YOUR TARGET'}</p>
              <h2>{question.name}</h2>
              <div className={`falling-target-art ${question.targetArtClass || ''}`}><img src={question.targetImage} alt={question.name} /></div>
              <small>{caught.length} / {targetParts.length} challenges complete</small>
              <div className={`falling-progress falling-progress-labeled ${question.stackedGroups ? 'is-stacked' : question.groupBreakAfter ? 'is-grouped' : ''}`}>
                {question.stackedGroups ? (
                  <>
                    <div className="falling-progress-group-row">
                      {targetParts.slice(0, question.groupBreakAfter).map(renderProgressStep)}
                    </div>
                    <span className="falling-progress-group-plus" aria-hidden="true">+</span>
                    <div className="falling-progress-group-row">
                      {targetParts.slice(question.groupBreakAfter).map((part, index) => renderProgressStep(part, index + question.groupBreakAfter))}
                    </div>
                  </>
                ) : targetParts.flatMap((part, index) => [
                  renderProgressStep(part, index),
                  ...(question.groupBreakAfter === index + 1
                    ? [<span className="falling-progress-group-plus" aria-hidden="true" key={`group-plus-${index}`}>+</span>]
                    : [])
                ])}
              </div>
              <strong className={`falling-word-equation ${question.stackedGroups ? 'is-stacked' : ''}`}>
                {question.stackedGroups ? (
                  <>
                    <span className="falling-equation-group">
                      {targetParts.slice(0, question.groupBreakAfter).map((part, index) => (
                        <span lang="my" key={part.id}>
                          {index > 0 && <span lang="en" aria-hidden="true">+ </span>}
                          {caught.includes(part.id) ? part.tileValue : '?'}
                        </span>
                      ))}
                    </span>
                    <span className="falling-equation-group-plus" aria-hidden="true">+</span>
                    <span className="falling-equation-group">
                      {targetParts.slice(question.groupBreakAfter).map((part, index) => (
                        <span lang="my" key={part.id}>
                          {index > 0 && <span lang="en" aria-hidden="true">+ </span>}
                          {caught.includes(part.id) ? part.tileValue : '?'}
                        </span>
                      ))}
                      <span lang="en" aria-hidden="true">=</span>
                      <span lang="my">{caught.length === targetParts.length ? question.nameBurmese : '?'}</span>
                    </span>
                  </>
                ) : (
                  <>
                    {targetParts.map((part, index) => (
                      <span lang="my" key={part.id}>
                        {index > 0 && <span lang="en" aria-hidden="true">+ </span>}
                        {caught.includes(part.id) ? part.tileValue : '?'}
                      </span>
                    ))}
                    <span>=</span>
                    <span lang="my">{caught.length === targetParts.length ? question.nameBurmese : '?'}</span>
                  </>
                )}
              </strong>
            </aside>

            <section className="falling-field" aria-label="Falling Burmese characters">
              {!showSuccess && (
                <div className="falling-field-heading">
                  <p>SYLLABLE PRACTICE</p>
                  <h2>Tap the falling Burmese characters in the correct order!</h2>
                </div>
              )}
              {!showSuccess && (
                <>
                  <div className="falling-characters" aria-label="Character tiles">
                    {fallingPool.map((tile, index) => {
                      const duplicateTargetCharacter = !targetPartIds.has(tile.id) && targetPartValues.has(tile.value)
                      if (caught.includes(tile.id) || duplicateTargetCharacter) return null
                      return (
                        <button
                          type="button"
                          className={`falling-character falling-character-${tile.tone}`}
                          style={{
                            '--fall-delay': `${(index % 6) * 0.18}s`,
                            '--fall-duration': `${3.8 + (index % 5) * 0.32}s`,
                            '--fall-left': `${4 + ((index * 23) % 88)}%`,
                            '--fall-sway': `${-38 + ((index * 31) % 76)}px`
                          }}
                          key={`${tile.id}-${index}`}
                          onClick={() => catchCharacter(tile)}
                          disabled={showSuccess || caught.includes(tile.id)}
                          lang="my"
                          aria-label={tile.ariaLabel || 'Other character'}
                        >
                          {tile.value}
                        </button>
                      )
                    })}
                  </div>
                  {feedback && <p className="falling-feedback" role="status">{feedback}</p>}
                </>
              )}

              {showSuccess && (
                <div className="falling-success" role="status">
                  <div className="falling-success-sparkles" aria-hidden="true">
                    {Array.from({ length: 18 }, (_, index) => (
                      <span
                        key={index}
                        style={{
                          '--sparkle-x': `${8 + ((index * 29) % 84)}%`,
                          '--sparkle-y': `${12 + ((index * 37) % 70)}%`,
                          '--sparkle-delay': `${(index % 6) * 180}ms`,
                          '--sparkle-color': ['#f15b43', '#f4b942', '#50a876', '#52b9ca', '#d76bb3'][index % 5]
                        }}
                      />
                    ))}
                  </div>
                  <div className="falling-success-confetti" aria-hidden="true">
                    {successConfettiPieces.map(([x, rise, rotation, delay, color], index) => (
                      <span
                        key={index}
                        style={{
                          '--confetti-x': `${x}%`,
                          '--confetti-rise': `${rise}px`,
                          '--confetti-rotation': `${rotation}deg`,
                          '--confetti-delay': `${delay}ms`,
                          '--confetti-color': color
                        }}
                      />
                    ))}
                  </div>
                  <small>LEVEL {questionIndex + 1} COMPLETE</small>
                  <h2>You caught them all!</h2>
                  <strong className="falling-success-answer" lang="my">{question.nameBurmese}</strong>
                  <button type="button" onClick={goToNextQuestion}>Next →</button>
                </div>
              )}
            </section>
          </div>
        </article>
      </section>
    </main>
  )
}

function LegacyAssemblyChallenge() {
  const { selectedDestination, setActiveScreen, reward, completeDestination, settings } = useGame()
  const [selected, setSelected] = useState({ consonant: '', vowel: '', tone: '' })
  const [feedback, setFeedback] = useState(null)
  const [hint, setHint] = useState(false)
  const [confirmLeave, setConfirmLeave] = useState(false)
  const choose = (part, value) => setSelected((current) => ({ ...current, [part]: value }))
  const check = () => {
    const correct = Object.values(selected).every(Boolean)
    if (settings.answerFeedback) setFeedback(correct ? 'success' : 'retry')
    if (correct) {
      reward(80)
      completeDestination()
    }
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
