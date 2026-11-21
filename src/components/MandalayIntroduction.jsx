import { ArrowLeft, Award, BookOpen, FileText, Grid2X2, Search, Settings, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'
import './MandalayIntroduction.css'

export default function MandalayIntroduction() {
  const { xp, player, setActiveScreen, setModal } = useGame()
  let displayXp = xp
  let displayLevel = 4
  while (displayXp >= 500) {
    displayXp -= 500
    displayLevel += 1
  }
  const profileAvatar = !player.avatar || player.avatar === '/girl.png'
    ? '/thiri-avatar.png'
    : player.avatar

  return (
    <main className="mandalay-intro-page">
      <img className="mandalay-intro-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" />

      <div className="mandalay-intro-brand">
        <img src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
        <span><BookOpen size={10} /> YOUR SLANG ADVENTURE</span>
      </div>

      <header className="mandalay-intro-profile">
        <div className="mandalay-intro-avatar">
          <img
            className={profileAvatar === '/thiri-avatar.png' ? 'is-portrait' : ''}
            src={profileAvatar}
            alt=""
          />
        </div>
        <div className="mandalay-intro-player">
          <strong><span>{player.name || 'Thiri'}</span><small>LV {String(displayLevel).padStart(2, '0')}</small></strong>
          <div className="mandalay-intro-xp"><span style={{ width: `${Math.min(100, (displayXp / 500) * 100)}%` }} /></div>
          <small>{displayXp} / 500 XP</small>
        </div>
        <button type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings"><Settings size={15} /><span>Settings</span></button>
        <button type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard"><Trophy size={15} /><span>Leaderboard</span></button>
      </header>

      <section className="mandalay-intro-card" aria-label="Mandalay destination details">
        <div className="mandalay-intro-layout">
          <aside className="mandalay-intro-art" aria-label="Mandalay Royal Palace illustration">
            <div className="mandalay-palace-wrap">
              <span className="mandalay-sparkle mandalay-sparkle-one">✦</span>
              <span className="mandalay-sparkle mandalay-sparkle-two">✦</span>
              <span className="mandalay-sparkle mandalay-sparkle-three">✦</span>
              <span className="mandalay-sparkle mandalay-sparkle-four">✦</span>
              <span className="mandalay-sparkle mandalay-sparkle-five">✦</span>
              <img className="mandalay-palace" src="/generated/mandalay-intro-cutout.png" alt="Mandalay Royal Palace" />
            </div>
            <span className="mandalay-monkey-shadow" aria-hidden="true" />
            <img className="mandalay-intro-monkey" src="/happy-slang-buddy-transparent.png" alt="Monkey explorer mascot" />
          </aside>

          <div className="mandalay-intro-content">
            <p className="mandalay-intro-kicker">DESTINATION 6</p>
            <h1>Mandalay</h1>
            <h2>Connect 3-tone rhymes &amp; compound words! Aim for 8 out of 10.</h2>

            <div className="mandalay-intro-objective">
              <span className="mandalay-objective-icon"><BookOpen size={17} /></span>
              <div><small>AT THIS DESTINATION</small><strong>Master -ုန် / -ိုင် Finals &amp; Creaky / Level / Heavy Tones</strong></div>
            </div>

            <div className="mandalay-intro-features">
              <div><FileText size={15} /><span>10 QUESTIONS</span></div>
              <div><Grid2X2 size={15} /><span>LETTER TRAIL</span></div>
              <div><Award size={15} /><span>3-STEP HINTS</span></div>
            </div>

            <section className="mandalay-syllable-diagram" aria-label="Burmese syllable anatomy">
              <div className="mandalay-diagram-cell mandalay-upper-vowel">
                <small>UPPER VOWEL</small>
                <span lang="my">◌ု &nbsp;/&nbsp; ◌ို</span>
              </div>
              <span className="mandalay-diagram-down" aria-hidden="true">↓</span>
              <div className="mandalay-diagram-cell mandalay-base-consonant">
                <small>BASE CONSONANT</small>
                <span lang="my">မ</span>
                <em lang="my">e.g. မုန် • မုန့် • မုန်တိုင်း</em>
              </div>
              <span className="mandalay-diagram-arrow mandalay-arrow-one" aria-hidden="true">←</span>
              <div className="mandalay-diagram-cell mandalay-final">
                <small>FINAL</small>
                <span lang="my">◌န် &nbsp;/&nbsp; ◌င်</span>
              </div>
              <span className="mandalay-diagram-arrow mandalay-arrow-two" aria-hidden="true">←</span>
              <div className="mandalay-diagram-cell mandalay-heavy-tone">
                <small>HEAVY TONE</small>
                <span lang="my">◌း</span>
              </div>
              <div className="mandalay-diagram-cell mandalay-creaky-tone">
                <small><span aria-hidden="true">↑</span> CREAKY TONE</small>
                <span lang="my">◌့</span>
              </div>
            </section>

            <p className="mandalay-intro-helper">
              <Search size={13} />
              <span>Trace -ုန့်/-ုန်/-ုန်း and -ိုင့်/-ိုင်/-ိုင်း words. Hints: tone clue → syllable split → auto-trail node.</span>
            </p>
          </div>
        </div>

        <footer className="mandalay-intro-footer">
          <button type="button" className="mandalay-back-button" onClick={() => setActiveScreen('map')}>
            <ArrowLeft size={16} /> BACK TO MAP
          </button>
          <button type="button" className="mandalay-start-button" onClick={() => setActiveScreen('letter-trail')}>
            START CHALLENGE!
          </button>
        </footer>
      </section>
    </main>
  )
}
