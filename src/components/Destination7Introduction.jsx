import { ArrowLeft, ArrowRight, Award, BookOpen, FileText, Grid2X2, Search } from 'lucide-react'
import { useGame } from '../context/GameContext'
import './Destination7Introduction.css'

const examples = {
  medial: 'ကွန် • စွန့် • တွန်း',
  split: 'ခေါင်း • တောင် • စောင်း • ဒေါင်း'
}

function DiagramCell({ label, children }) {
  return (
    <div className="destination7-diagram-cell">
      <small>{label}</small>
      <span lang="my">{children}</span>
    </div>
  )
}

export default function Destination7Introduction() {
  const { player, xp, setActiveScreen, setModal } = useGame()
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
    <main className="destination-intro-page">
      <section className="destination-intro-scene" aria-label="Myitkyina destination introduction">
        <img
          className="destination-intro-background"
          src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png"
          alt=""
          aria-hidden="true"
        />
        <img className="destination-intro-brand" src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
        <div className="destination-intro-tagline"><BookOpen size={13} /> YOUR SLANG ADVENTURE</div>

        <header className="world-map-profile destination-intro-profile">
          <img src="/generated/setting-bar-transparent.png" alt={`${player.name || 'Thiri'}, level ${displayLevel}, ${displayXp} XP, settings and leaderboard`} />
          <button className="profile-hitbox" type="button" onClick={() => setModal('profile')} aria-label="Open profile" />
          <button className="settings-hitbox" type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings" />
          <button className="leaderboard-hitbox" type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
        </header>

        <article className="destination-intro-card destination7-intro-card">
          <div className="destination-intro-art destination7-intro-art" aria-label="Myitkyina landmark and monkey explorer">
            <img className="destination-intro-landmark" src="/Myitkyina-sticker.png" alt="Traditional Kachin longhouse and river island" />
            <span className="destination7-intro-sparkle destination7-intro-sparkle-one" aria-hidden="true">✦</span>
            <span className="destination7-intro-sparkle destination7-intro-sparkle-two" aria-hidden="true">✦</span>
            <span className="destination7-intro-sparkle destination7-intro-sparkle-three" aria-hidden="true">✦</span>
            <span className="destination-intro-monkey-shadow" aria-hidden="true" />
            <img className="destination-intro-monkey" src="/happy-slang-buddy-transparent.png" alt="Monkey explorer mascot" />
          </div>

          <div className="destination-intro-content destination7-intro-content">
            <div className="destination-intro-heading">
              <p>DESTINATION 7</p>
              <h1>Myitkyina</h1>
              <strong>Spot 3-tone medial &amp; split-vowel words in the grid! Find all 10.</strong>
            </div>

            <section className="destination-intro-lesson">
              <span className="destination-intro-lesson-icon"><BookOpen size={17} /></span>
              <div>
                <small>AT THIS DESTINATION</small>
                <p>Master medial ◌ွ and split-vowel spellings with creaky ◌့, level, and heavy ◌း tones.</p>
              </div>
            </section>

            <div className="destination-intro-features">
              <div className="destination-intro-feature"><FileText size={15} /><span>10 WORDS TO FIND</span></div>
              <div className="destination-intro-feature"><Grid2X2 size={15} /><span>WORD SEARCH</span></div>
              <div className="destination-intro-feature"><Award size={15} /><span>2-STEP HINTS</span></div>
            </div>

            <section className="destination7-intro-diagrams" aria-label="Burmese spelling patterns">
              <div className="destination7-intro-diagram">
                <strong>A. MEDIAL + FINAL</strong>
                <div className="destination7-diagram-flow">
                  <DiagramCell label="BASE">က / စ / တ</DiagramCell>
                  <span className="destination7-diagram-plus" aria-hidden="true">+</span>
                  <DiagramCell label="MEDIAL">◌ွ</DiagramCell>
                  <span className="destination7-diagram-plus" aria-hidden="true">+</span>
                  <DiagramCell label="FINAL">◌န်</DiagramCell>
                  <span className="destination7-diagram-plus" aria-hidden="true">+</span>
                  <DiagramCell label="TONE">◌့ / ◌း</DiagramCell>
                </div>
                <small className="destination7-diagram-example" lang="my">{examples.medial}</small>
              </div>
              <div className="destination7-intro-diagram">
                <strong>B. SPLIT VOWEL + FINAL</strong>
                <div className="destination7-diagram-flow">
                  <DiagramCell label="PRE-VOWEL">ေ</DiagramCell>
                  <span className="destination7-diagram-plus" aria-hidden="true">+</span>
                  <DiagramCell label="BASE">ခ / တ / စ / ဒ</DiagramCell>
                  <span className="destination7-diagram-plus" aria-hidden="true">+</span>
                  <DiagramCell label="POST-VOWEL + FINAL">ာင်</DiagramCell>
                  <span className="destination7-diagram-plus" aria-hidden="true">+</span>
                  <DiagramCell label="TONE">◌့ / ◌း</DiagramCell>
                </div>
                <small className="destination7-diagram-example" lang="my">{examples.split}</small>
              </div>
            </section>

            <p className="destination-intro-note">
              <Search size={14} aria-hidden="true" />
              Tap 1-syllable words or drag across 2-syllable words. Every found word gets its own color!
            </p>
          </div>

          <footer className="destination-intro-actions">
            <button type="button" className="destination-intro-back" onClick={() => setActiveScreen('map')}>
              <ArrowLeft size={15} /> BACK TO MAP
            </button>
            <button type="button" className="destination-intro-start" onClick={() => setActiveScreen('destination7')}>
              START CHALLENGE <ArrowRight size={16} />
            </button>
          </footer>
        </article>
      </section>
    </main>
  )
}
