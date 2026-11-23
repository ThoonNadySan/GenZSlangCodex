import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Check, Clock3, Lightbulb, Settings, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'
import './Destination7WordSearch.css'

const colorThemes = {
  rose: { background: '#FDE2E4', border: '#E05A6D', foreground: '#7A1C2A' },
  amber: { background: '#FEF0D5', border: '#E08E26', foreground: '#784308' },
  sky: { background: '#DDF0FF', border: '#3B82F6', foreground: '#1E3A8A' },
  lavender: { background: '#EDE4FF', border: '#8B5CF6', foreground: '#4C1D95' },
  emerald: { background: '#D8F5E5', border: '#10B981', foreground: '#065F46' },
  peach: { background: '#FFE6D5', border: '#F97316', foreground: '#7C2D12' },
  teal: { background: '#D5F5F6', border: '#06B6D4', foreground: '#164E63' },
  berry: { background: '#FCE1F3', border: '#EC4899', foreground: '#831843' },
  olive: { background: '#EAF7D5', border: '#65A30D', foreground: '#365314' },
  indigo: { background: '#E0E7FF', border: '#6366F1', foreground: '#312E81' }
}

const words = [
  {
    id: 'leader',
    theme: 'rose',
    meaning: 'Leader',
    icon: '👑',
    syllables: ['ခေါင်း', 'ဆောင်'],
    cells: [[0, 0], [0, 1]],
    hints: [
      '2 syllables: Look for ခေါင်း (heavy tone ◌း) right next to ဆောင် (level tone).',
      'Starts with ခေါင်း — highlighted on the grid!'
    ]
  },
  {
    id: 'mountain-slope',
    theme: 'amber',
    meaning: 'Mountain slope',
    icon: '⛰️',
    syllables: ['တောင်', 'စောင်း'],
    cells: [[1, 4], [2, 5]],
    hints: [
      '2 syllables: Starts with တောင် (mountain, level tone) followed by စောင်း (slope, heavy tone ◌း).',
      'Starts with တောင် — highlighted on the grid!'
    ]
  },
  {
    id: 'good',
    theme: 'sky',
    meaning: 'Good / proper',
    icon: '✨',
    syllables: ['ကောင်း', 'မွန်'],
    cells: [[2, 0], [3, 0]],
    hints: [
      '2 syllables: Combines ကောင်း (good, heavy tone ◌း) + မွန် (noble/proper, medial ◌ွ + level tone).',
      'Starts with ကောင်း — highlighted on the grid!'
    ]
  },
  {
    id: 'tribute',
    theme: 'lavender',
    meaning: 'Pay tax / tribute',
    icon: '🪙',
    syllables: ['ခွန်', 'ဆောင်'],
    cells: [[1, 1], [0, 1]],
    hints: [
      '2 syllables: Look for ခွန် (medial ◌ွ + level tone) paired with ဆောင် (level tone).',
      'Starts with ခွန် — highlighted on the grid!'
    ]
  },
  {
    id: 'sacrifice',
    theme: 'emerald',
    meaning: 'To sacrifice / discard',
    icon: '🍂',
    syllables: ['စွန့်'],
    cells: [[0, 3]],
    hints: [
      '1 syllable: Uses medial ◌ွ + final ◌န် + short creaky tone dot ◌့ at the bottom.',
      'Tap the single tile စွန့် (watch out for စွန် without the dot!).'
    ]
  },
  {
    id: 'wait',
    theme: 'peach',
    meaning: 'To wait / guard',
    icon: '⏳',
    syllables: ['စောင့်'],
    cells: [[1, 3]],
    hints: [
      '1 syllable: Starts with စ + ေ-ာင် + short creaky tone dot ◌့ underneath.',
      "Tap the single tile စောင့် (don't confuse it with စောင်း!)."
    ]
  },
  {
    id: 'corner',
    theme: 'teal',
    meaning: 'Corner',
    icon: '📐',
    syllables: ['ထောင့်'],
    cells: [[2, 3]],
    hints: [
      '1 syllable: Aspirated ထ + ေ-ာင် + short creaky tone dot ◌့ at the bottom.',
      'Tap the single tile ထောင့် (not ထောင်!).'
    ]
  },
  {
    id: 'net',
    theme: 'berry',
    meaning: 'Fishing net / network',
    icon: '🕸️',
    syllables: ['ကွန်'],
    cells: [[3, 3]],
    hints: [
      '1 syllable: Base consonant က + medial ◌ွ + final ◌န် with a level tone (no ◌့ or ◌း).',
      'Tap the single tile ကွန် on the grid.'
    ]
  },
  {
    id: 'push',
    theme: 'olive',
    meaning: 'To push',
    icon: '💪',
    syllables: ['တွန်း'],
    cells: [[4, 3]],
    hints: [
      '1 syllable: Consonant တ + medial ◌ွ + final ◌န် + heavy tone ◌း.',
      'Tap the single tile တွန်း on the grid.'
    ]
  },
  {
    id: 'peacock',
    theme: 'indigo',
    meaning: 'Peacock',
    icon: '🦚',
    syllables: ['ဒေါင်း'],
    cells: [[5, 3]],
    hints: [
      '1 syllable: Consonant ဒ + ေ-ာင် + heavy tone ◌း.',
      'Tap the single tile ဒေါင်း on the grid.'
    ]
  }
]

const grid = [
  ['ခေါင်း', 'ဆောင်', 'လွန်', 'စွန့်', 'လောင်', 'ပွန်'],
  ['ထွန်', 'ခွန်', 'သွန်', 'စောင့်', 'တောင်', 'ထောင်'],
  ['ကောင်း', 'ကွန်း', 'ရောင်', 'ထောင့်', 'ဟောင်', 'စောင်း'],
  ['မွန်', 'ကွန့်', 'ဟောင်း', 'ကွန်', 'မောင်', 'လွန်း'],
  ['ညွှန်း', 'မွန်း', 'ဘောင်', 'တွန်း', 'သွန်း', 'လွန့်'],
  ['စွန်', 'ဖောင်', 'ဆောင်း', 'ဒေါင်း', 'ခွန်း', 'ပေါင်း']
]

const cellKey = ([row, column]) => `${row}-${column}`
const wordColorStyle = (theme) => {
  const colors = colorThemes[theme]
  return {
    '--word-background': colors.background,
    '--word-border': colors.border,
    '--word-foreground': colors.foreground
  }
}

function createLine(start, end) {
  const rowDistance = end[0] - start[0]
  const columnDistance = end[1] - start[1]
  if (rowDistance === 0 && columnDistance === 0) return [start]

  const length = Math.max(Math.abs(rowDistance), Math.abs(columnDistance))
  if (rowDistance !== 0 && columnDistance !== 0 && Math.abs(rowDistance) !== Math.abs(columnDistance)) return null

  const rowStep = Math.sign(rowDistance)
  const columnStep = Math.sign(columnDistance)
  return Array.from({ length: length + 1 }, (_, index) => [
    start[0] + rowStep * index,
    start[1] + columnStep * index
  ])
}

function samePath(first, second) {
  return first.length === second.length
    && first.every(([row, column], index) => row === second[index][0] && column === second[index][1])
}

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

export default function Destination7WordSearch() {
  const { player, xp, addXp, completeDestination, setActiveScreen, setModal } = useGame()
  const [seconds, setSeconds] = useState(0)
  const [foundWords, setFoundWords] = useState(() => new Set())
  const [activeWordId, setActiveWordId] = useState(null)
  const [hintSteps, setHintSteps] = useState({})
  const [hintText, setHintText] = useState('')
  const [selectedCells, setSelectedCells] = useState([])
  const [hintedCell, setHintedCell] = useState(null)
  const [shakenCells, setShakenCells] = useState([])
  const [feedback, setFeedback] = useState('')
  const [lastFound, setLastFound] = useState(null)
  const [complete, setComplete] = useState(false)
  const dragOrigin = useRef(null)
  const dragPath = useRef([])
  const dragActive = useRef(false)
  const pointerId = useRef(null)
  const pendingTap = useRef(null)
  const suppressClick = useRef(false)

  let displayXp = xp
  let displayLevel = 4
  while (displayXp >= 500) {
    displayXp -= 500
    displayLevel += 1
  }

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!lastFound) return undefined
    const timer = window.setTimeout(() => setLastFound(null), 4200)
    return () => window.clearTimeout(timer)
  }, [lastFound])

  useEffect(() => {
    if (!hintedCell) return undefined
    const timer = window.setTimeout(() => setHintedCell(null), 1300)
    return () => window.clearTimeout(timer)
  }, [hintedCell])

  useEffect(() => {
    if (!shakenCells.length) return undefined
    const timer = window.setTimeout(() => setShakenCells([]), 650)
    return () => window.clearTimeout(timer)
  }, [shakenCells])

  useEffect(() => {
    if (!feedback || !feedback.startsWith('Not a target')) return undefined
    const timer = window.setTimeout(() => setFeedback(''), 2600)
    return () => window.clearTimeout(timer)
  }, [feedback])

  const activeWord = words.find((word) => word.id === activeWordId)

  const findWord = (word, path) => {
    if (!word || foundWords.has(word.id)) return
    const nextFound = new Set(foundWords)
    nextFound.add(word.id)
    setFoundWords(nextFound)
    setSelectedCells(path)
    setActiveWordId(word.id)
    setHintText('')
    setFeedback('')
    pendingTap.current = null
    addXp(25)
    setLastFound(word)

    if (nextFound.size === words.length) {
      setComplete(true)
      completeDestination()
    }
  }

  const rejectPath = (path) => {
    setSelectedCells(path)
    setShakenCells(path.map(cellKey))
    setFeedback('Not a target word—check the tone marks (◌့ vs ◌း) and try again!')
    pendingTap.current = null
  }

  const checkPath = (path) => {
    if (!path.length) return
    const word = words.find((candidate) => (
      samePath(path, candidate.cells) || samePath(path, [...candidate.cells].reverse())
    ))
    if (word) {
      findWord(word, path)
      return
    }
    rejectPath(path)
  }

  const handleTap = (cell) => {
    setFeedback('')
    const singleWord = words.find((word) => word.syllables.length === 1 && samePath([cell], word.cells))
    if (singleWord) {
      checkPath([cell])
      return
    }

    const previous = pendingTap.current
    if (previous) {
      const path = createLine(previous, cell)
      if (path && path.length === 2) {
        checkPath(path)
        return
      }
    }

    pendingTap.current = cell
    setSelectedCells([cell])
  }

  const handlePointerDown = (event, row, column) => {
    if (event.button !== 0) return
    const cell = [row, column]
    dragActive.current = true
    pointerId.current = event.pointerId
    dragOrigin.current = cell
    dragPath.current = [cell]
    setSelectedCells([cell])
    setFeedback('')
  }

  const handlePointerMove = (event) => {
    if (!dragActive.current || event.pointerId !== pointerId.current) return
    const targetCell = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-row][data-column]')
    if (!targetCell) return
    const path = createLine(dragOrigin.current, [Number(targetCell.dataset.row), Number(targetCell.dataset.column)])
    dragPath.current = path || []
    setSelectedCells(path || [])
  }

  const handlePointerUp = (event) => {
    if (!dragActive.current || event.pointerId !== pointerId.current) return
    const targetCell = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-row][data-column]')
    let path = dragPath.current
    if (targetCell) {
      const end = [Number(targetCell.dataset.row), Number(targetCell.dataset.column)]
      path = createLine(dragOrigin.current, end) || []
    }
    dragActive.current = false
    pointerId.current = null
    dragOrigin.current = null
    dragPath.current = []
    suppressClick.current = true
    window.setTimeout(() => {
      suppressClick.current = false
    }, 0)
    if (path.length > 1) checkPath(path)
    else if (path.length === 1) handleTap(path[0])
  }

  const cancelPointer = () => {
    dragActive.current = false
    pointerId.current = null
    dragOrigin.current = null
    dragPath.current = []
    setSelectedCells([])
  }

  const giveHint = () => {
    const candidates = [
      activeWord,
      ...words.filter((word) => word.id !== activeWordId)
    ].filter(Boolean)
    const word = candidates.find((candidate) => !foundWords.has(candidate.id) && (hintSteps[candidate.id] || 0) < candidate.hints.length)
    if (!word) return

    const step = (hintSteps[word.id] || 0) + 1
    setActiveWordId(word.id)
    setHintSteps((current) => ({ ...current, [word.id]: step }))
    setHintText(word.hints[step - 1])
    setFeedback('')
    setHintedCell(word.cells[0])
    setSelectedCells([])
  }

  const selectedPreview = selectedCells.map(([row, column]) => grid[row][column]).join(' → ')

  return (
    <main className="word-search-screen min-h-screen">
      <img className="word-search-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" />
      <div className="word-search-shade" />

      <header className="word-search-topbar">
        <div className="word-search-brand-group">
          <button type="button" className="word-search-back" onClick={() => setActiveScreen('map')} aria-label="Back to world map">
            <ArrowLeft size={17} />
          </button>
          <img className="word-search-brand" src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
        </div>

        <div className="word-search-timer" aria-label={`Elapsed time ${formatTime(seconds)}`}>
          <Clock3 size={16} aria-hidden="true" />
          <span>{formatTime(seconds)}</span>
        </div>

        <header className="word-search-profile">
          <button type="button" className="word-search-profile-button" onClick={() => setModal('profile')} aria-label="Open profile">
            <img className="word-search-avatar" src="/thiri-profile-character.png?v=2" alt="" />
            <span className="word-search-player">
              <span className="word-search-player-name"><strong>{player.name || 'Thiri'}</strong><b>LV {String(displayLevel).padStart(2, '0')}</b></span>
              <span className="word-search-xp"><span style={{ width: `${Math.min(100, (displayXp / 500) * 100)}%` }} /></span>
              <small>{displayXp} / 500 XP</small>
            </span>
          </button>
          <button type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings"><Settings size={15} /><small>Settings</small></button>
          <button type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard"><Trophy size={15} /><small>Leaderboard</small></button>
        </header>
      </header>

      <section className="word-search-card mx-auto max-w-6xl rounded-3xl border p-6 shadow-xl" aria-label="Destination 7 Word Search Puzzle">
        <header className="word-search-heading">
          <div className="word-search-heading-copy">
            <p className="word-search-eyebrow">DESTINATION 7 <span>•</span> WORD SEARCH PUZZLE</p>
            <div className="word-search-title-row">
              <h1>Word Search</h1>
              <img className="word-search-monkey-sticker" src="/happy-slang-buddy-transparent.png" alt="Monkey explorer mascot" />
            </div>
            <p className="word-search-subtitle">Find all 10 Burmese words hidden in the syllable grid! Tap 1-syllable words or drag across 2-syllable words.</p>
          </div>
          <div className="word-search-progress" aria-label={`${foundWords.size} of 10 words found`}>
            <strong>{foundWords.size} / 10 FOUND</strong>
            <div>{words.map((word) => <span key={word.id} className={foundWords.has(word.id) ? 'is-found' : ''} />)}</div>
          </div>
        </header>

        <div className="word-search-columns">
          <section className="word-search-clues" aria-label="Words to find">
            <div>
              <p className="word-search-panel-eyebrow">WORDS TO FIND (10)</p>
              <div className="word-search-clue-grid">
                {words.map((word) => {
                  const isFound = foundWords.has(word.id)
                  const isActive = activeWordId === word.id
                  return (
                    <button
                      type="button"
                      key={word.id}
                      className={`word-search-clue ${isFound ? 'is-found' : ''} ${isActive && !isFound ? 'is-active' : ''}`}
                      style={isFound ? wordColorStyle(word.theme) : undefined}
                      onClick={() => {
                        setActiveWordId(word.id)
                        setHintText('')
                        setFeedback('')
                      }}
                      aria-pressed={isActive}
                    >
                      <span className="word-search-clue-icon" aria-hidden="true">{word.icon}</span>
                      <span className="word-search-clue-copy">
                        <span className="word-search-clue-meaning">{word.meaning}</span>
                        {isFound && <span className="word-search-clue-answer" lang="my">{word.syllables.join('')}</span>}
                      </span>
                      {isFound
                        ? <span className="word-search-check-badge" aria-label="Found"><Check size={13} /></span>
                        : <span className="word-search-syllable-count">{word.syllables.length}-syl</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className={`word-search-hint-box ${feedback.startsWith('Not a target') ? 'has-error' : ''}`} role="status" aria-live="polite">
              <Lightbulb size={17} aria-hidden="true" />
              <p>{feedback || hintText || (activeWord
                ? `Focused: ${activeWord.meaning} — find its ${activeWord.syllables.length === 1 ? 'syllable' : 'two neighboring syllables'} on the grid.`
                : 'Click any clue or press HINT for a tone & spelling tip!')}</p>
            </div>
            <button type="button" className="word-search-hint-button" onClick={giveHint} disabled={complete || foundWords.size === words.length}>
              <Lightbulb size={16} /> HINT
            </button>
          </section>

          <section className="word-search-board-panel rounded-2xl" aria-label="Syllable matrix">
            <div className="word-search-board-heading">
              <div>
                <p className="word-search-panel-eyebrow">SYLLABLE MATRIX</p>
                <span>Tap single syllables or drag horizontally, vertically, or diagonally.</span>
              </div>
              <div className="word-search-selection" aria-live="polite">
                <small>{selectedPreview ? 'SELECTED' : 'YOUR GRID'}</small>
                <strong lang="my">{selectedPreview || '—'}</strong>
              </div>
            </div>

            <div className="word-search-grid" onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={cancelPointer}>
              <svg className="word-search-connectors" viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                {words.filter((word) => word.syllables.length === 2 && foundWords.has(word.id)).map((word) => {
                  const [[startRow, startColumn], [endRow, endColumn]] = word.cells
                  return (
                    <line
                      key={word.id}
                      x1={(startColumn + 0.5) * 100}
                      y1={(startRow + 0.5) * 100}
                      x2={(endColumn + 0.5) * 100}
                      y2={(endRow + 0.5) * 100}
                      stroke={colorThemes[word.theme].border}
                      strokeWidth={4}
                      strokeLinecap="round"
                    />
                  )
                })}
              </svg>
              {grid.flatMap((row, rowIndex) => row.map((syllable, columnIndex) => {
                const cell = [rowIndex, columnIndex]
                const key = cellKey(cell)
                const isSelected = selectedCells.some((selected) => selected[0] === rowIndex && selected[1] === columnIndex)
                const foundWordsForCell = words.filter((word) => (
                  foundWords.has(word.id) && word.cells.some((foundCell) => foundCell[0] === rowIndex && foundCell[1] === columnIndex)
                ))
                const isFound = foundWordsForCell.length > 0
                const tileColor = foundWordsForCell[0] ? colorThemes[foundWordsForCell[0].theme] : null
                const secondTileColor = foundWordsForCell[1] ? colorThemes[foundWordsForCell[1].theme] : null
                const tileStyle = tileColor ? {
                  '--word-background': tileColor.background,
                  '--word-border': tileColor.border,
                  '--word-foreground': tileColor.foreground,
                  ...(secondTileColor ? { '--word-background-secondary': secondTileColor.background } : {})
                } : undefined
                const isHinted = hintedCell?.[0] === rowIndex && hintedCell?.[1] === columnIndex
                const isShaken = shakenCells.includes(key)
                return (
                  <button
                    type="button"
                    key={key}
                    data-row={rowIndex}
                    data-column={columnIndex}
                    lang="my"
                    className={`word-search-tile ${isSelected ? 'is-selected' : ''} ${isFound ? 'is-found' : ''} ${foundWordsForCell.length > 1 ? 'is-shared-found' : ''} ${isHinted ? 'is-hinted' : ''} ${isShaken ? 'is-shaken' : ''}`}
                    style={tileStyle}
                    onPointerDown={(event) => handlePointerDown(event, rowIndex, columnIndex)}
                    onClick={(event) => {
                      if (suppressClick.current && event.detail !== 0) return
                      handleTap(cell)
                    }}
                    aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}: ${syllable}`}
                    aria-pressed={isSelected || isFound}
                  >
                    {syllable}
                  </button>
                )
              }))}
            </div>
            <p className="word-search-board-help">Tip: tap one syllable, then its neighbor, or drag in a straight line.</p>
          </section>
        </div>

        {complete && (
          <div className="word-search-complete" role="status">
            <span aria-hidden="true">🎉</span>
            <div><strong>All 10 words found!</strong><small>Destination 7 is complete. You earned 250 XP!</small></div>
            <button type="button" onClick={() => setActiveScreen('map')}>Complete Destination 7 <span aria-hidden="true">→</span></button>
          </div>
        )}
      </section>

      {lastFound && (
        <aside className="word-search-toast" role="status" aria-live="polite">
          <img src="/happy-slang-buddy-transparent.png" alt="" />
          <span><small>SLANG BUDDY • FOUND! +25 XP</small><strong lang="my">{lastFound.syllables.join('')} <span>=</span> {lastFound.meaning}</strong></span>
        </aside>
      )}
    </main>
  )
}
