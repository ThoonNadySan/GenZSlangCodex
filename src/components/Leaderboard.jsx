import { useMemo, useState } from 'react'
import { ArrowLeft, BookOpen, LockKeyhole, Map, Medal, Sparkles, Trophy, X } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { AvatarDisplay } from './ui'

const periods = [
  { id: 'all-time', label: 'All-time' },
  { id: 'this-week', label: 'This week' }
]

const leadersByPeriod = {
  'all-time': [
    { name: 'JungleKing', score: 2450, avatar: '🧑🏽‍🚀' },
    { name: 'SlangMaster', score: 2180, avatar: '👩🏽‍🎤' },
    { name: 'WordExplorer', score: 1960, avatar: '🧑🏽‍🎨' },
    { name: 'HappyLearner', score: 1750, avatar: '👩🏽‍🚀' },
    { name: 'QuickChampion', score: 1520, avatar: '🧑🏽‍🎤' }
  ],
  'this-week': [
    { name: 'JungleKing', score: 1240, avatar: '🧑🏽‍🚀' },
    { name: 'SlangMaster', score: 1080, avatar: '👩🏽‍🎤' },
    { name: 'WordExplorer', score: 940, avatar: '🧑🏽‍🎨' },
    { name: 'HappyLearner', score: 870, avatar: '👩🏽‍🚀' },
    { name: 'QuickChampion', score: 760, avatar: '🧑🏽‍🎤' }
  ]
}

const podiumOrder = [1, 0, 2]
const podiumStickers = [
  '/generated/leaderboard-competitor-monkey.png',
  '/generated/leaderboard-competitor-elephant.png',
  '/generated/leaderboard-competitor-tiger.png'
]
const explorerStickers = [
  ...podiumStickers,
  '/generated/leaderboard-competitor-monkey.png',
  '/generated/leaderboard-competitor-tiger.png'
]

function formatScore(value) {
  return new Intl.NumberFormat().format(value)
}

export default function Leaderboard() {
  const { player, score, xp, collectedCards, setModal } = useGame()
  const [period, setPeriod] = useState('all-time')
  const [selectedExplorer, setSelectedExplorer] = useState(null)
  const isTitleMonkeySelected = selectedExplorer === 'title-monkey'

  const rankedPlayers = useMemo(() => [
    ...leadersByPeriod[period],
    { name: player.name || 'You', score, avatar: player.avatar, isCurrentUser: true }
  ].sort((first, second) => second.score - first.score), [period, player.name, player.avatar, score])

  const topPlayers = rankedPlayers.slice(0, 3)
  const currentUser = rankedPlayers.find((item) => item.isCurrentUser)
  const currentUserRank = rankedPlayers.findIndex((item) => item.isCurrentUser) + 1
  const listPlayers = rankedPlayers.slice(0, 5)
  if (currentUserRank > 5) listPlayers.push(currentUser)

  return (
    <main className="leaderboard-page">
      <section className="leaderboard-frame" aria-labelledby="leaderboard-title">
        <header className="leaderboard-header">
          <div className="leaderboard-brand">
            <img src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
          </div>
          <button className="leaderboard-close" onClick={() => setModal(null)} aria-label="Close leaderboard">
            <X size={19} />
          </button>
        </header>
        <button className="leaderboard-back" onClick={() => setModal(null)}>
          <ArrowLeft size={15} />
          <span>Back to map</span>
        </button>

        <div className="leaderboard-intro">
          <div className="leaderboard-title-copy">
            <p className="leaderboard-eyebrow"><Sparkles size={13} /> Explorer leaderboard</p>
            <h1 id="leaderboard-title">Who will become the ultimate slang master?</h1>
          </div>
          <button
            className={`leaderboard-title-monkey ${isTitleMonkeySelected ? 'is-selected' : ''}`}
            type="button"
            aria-label="Show explorer guide"
            aria-pressed={isTitleMonkeySelected}
            onClick={() => setSelectedExplorer(isTitleMonkeySelected ? null : 'title-monkey')}
          >
            <img src="/generated/leaderboard-title-monkey.png" alt="" />
            {isTitleMonkeySelected && <span className="leaderboard-title-monkey-popover">Ready to explore?</span>}
          </button>
        </div>

        <nav className="leaderboard-periods" aria-label="Leaderboard period">
          {periods.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`leaderboard-period ${period === id ? 'is-active' : ''}`}
              aria-pressed={period === id}
              onClick={() => setPeriod(id)}
            >
              <Trophy size={13} />
              {label}
            </button>
          ))}
          <button className="leaderboard-period is-locked" type="button" disabled title="Friends leaderboard coming soon">
            Friends
            <LockKeyhole size={13} aria-hidden="true" />
          </button>
        </nav>

        <section className="leaderboard-podium" aria-label="Top three explorers">
          {podiumOrder.map((playerIndex) => {
            const explorer = topPlayers[playerIndex]
            if (!explorer) return null
            const rank = playerIndex + 1
            const isSelected = selectedExplorer === `podium-${rank}`
            return (
              <button
                className={`leaderboard-podium-card podium-rank-${rank} ${isSelected ? 'is-selected' : ''}`}
                key={explorer.name}
                type="button"
                aria-label={`Rank ${rank}: ${explorer.name}, ${formatScore(explorer.score)} XP`}
                aria-pressed={isSelected}
                onClick={() => setSelectedExplorer(isSelected ? null : `podium-${rank}`)}
              >
                <span className="leaderboard-podium-sticker">
                  <img src={podiumStickers[playerIndex]} alt="" />
                </span>
                {isSelected && <span className="leaderboard-podium-popover">{explorer.name} · {formatScore(explorer.score)} XP</span>}
                <span className="leaderboard-podium-rank">#{rank}</span>
                <strong className="leaderboard-podium-name">{explorer.isCurrentUser ? 'You' : explorer.name}</strong>
                <span className="leaderboard-podium-score">{formatScore(explorer.score)} XP</span>
              </button>
            )
          })}
        </section>

        <section className="leaderboard-list" aria-labelledby="leaderboard-list-title">
          <div className="leaderboard-list-heading">
            <h2 id="leaderboard-list-title">Top explorers <Trophy size={14} /></h2>
            <span>{periods.find((item) => item.id === period)?.label}</span>
          </div>
          <ol className="leaderboard-rows">
            {listPlayers.map((explorer) => {
              const rank = rankedPlayers.indexOf(explorer) + 1
              return (
                <li className={`leaderboard-row ${explorer.isCurrentUser ? 'is-current-user' : ''}`} key={explorer.name}>
                  <span className="leaderboard-row-rank">#{rank}</span>
                  <button
                    className={`leaderboard-row-avatar ${explorer.isCurrentUser ? 'is-player-avatar' : ''}`}
                    type="button"
                    aria-label={`Show ${explorer.name}'s score`}
                    aria-pressed={selectedExplorer === `row-${rank}`}
                    onClick={() => setSelectedExplorer(selectedExplorer === `row-${rank}` ? null : `row-${rank}`)}
                  >
                    {explorer.isCurrentUser
                      ? <AvatarDisplay avatar={explorer.avatar} />
                      : <img src={explorerStickers[rank - 1]} alt="" />}
                    {selectedExplorer === `row-${rank}` && <span className="leaderboard-row-popover">{explorer.name} · {formatScore(explorer.score)} XP</span>}
                  </button>
                  <strong className="leaderboard-row-name">{explorer.name}</strong>
                  {explorer.isCurrentUser && <span className="leaderboard-you-tag">YOU</span>}
                  <span className="leaderboard-row-score">{formatScore(explorer.score)} XP</span>
                </li>
              )
            })}
          </ol>
        </section>

        <footer className="leaderboard-stats" aria-label="Your adventure stats">
          <div><Map size={15} /><span><b>{collectedCards.length}</b><small>Destinations cleared</small></span></div>
          <div><BookOpen size={15} /><span><b>{collectedCards.length}</b><small>Slang words collected</small></span></div>
          <div><Medal size={15} /><span><b>{formatScore(xp)} XP</b><small>Total XP earned</small></span></div>
        </footer>
      </section>
    </main>
  )
}
