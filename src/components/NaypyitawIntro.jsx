import { ArrowLeft, ArrowRight, BookOpen, Check, Search, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'

const introFeatures = [
  { icon: BookOpen, label: '10 QUESTIONS' },
  { icon: Check, label: 'CHARACTER PRACTICE' },
  { icon: Trophy, label: 'REWARDS' }
]

const spellingPositions = [
  { area: 'upper', label: 'UPPER (V-top)', value: 'ံ / ိ / ီ' },
  { area: 'prebase', label: 'PRE-BASE (V-pre)', value: 'ေ' },
  { area: 'base', label: 'BASE (K)', value: 'မ' },
  { area: 'postbase', label: 'POST-BASE (V-post)', value: 'ာ / ါ' },
  { area: 'medial', label: 'MEDIAL (M)', value: 'ျ / ြ' }
]

export default function NaypyitawIntro() {
  const { setActiveScreen, setModal } = useGame()

  return <main className="destination-intro-page">
    <section className="destination-intro-scene" aria-label="Naypyitaw destination introduction">
      <img
        className="destination-intro-background"
        src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png"
        alt=""
        aria-hidden="true"
      />
      <img className="destination-intro-brand" src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
      <div className="destination-intro-tagline"><BookOpen size={13} /> YOUR SLANG ADVENTURE</div>

      <header className="world-map-profile destination-intro-profile">
        <img src="/generated/setting-bar-transparent.png" alt="Player profile, XP, settings and leaderboard" />
        <button className="profile-hitbox" type="button" onClick={() => setModal('profile')} aria-label="Open profile" />
        <button className="settings-hitbox" type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings" />
        <button className="leaderboard-hitbox" type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
      </header>

      <article className="destination-intro-card">
        <div className="destination-intro-art" aria-label="Naypyitaw landmarks and guide">
          <img className="destination-intro-landmark" src="/IntroNPTDes1-sticker.png" alt="Naypyitaw landmark illustration" />
          <span className="destination-intro-monkey-shadow" aria-hidden="true" />
          <img className="destination-intro-monkey" src="/monkeyIntroDes1-sticker.png" alt="" aria-hidden="true" />
        </div>

        <div className="destination-intro-content">
          <div className="destination-intro-heading">
            <p>DESTINATION 1</p>
            <h1>Naypyitaw</h1>
            <strong>Aim for 8 out of 10. You&apos;ve got this!</strong>
          </div>

          <section className="destination-intro-lesson">
            <span className="destination-intro-lesson-icon"><BookOpen size={19} /></span>
            <div>
              <small>AT THIS DESTINATION</small>
              <p>Learn Upper Diacritics &amp; Post-base Marks</p>
            </div>
          </section>

          <div className="destination-intro-features">
            {introFeatures.map(({ icon: Icon, label }) => (
              <div className="destination-intro-feature" key={label}>
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <section className="destination-intro-spelling-map" aria-label="Burmese spelling mark positions">
            {spellingPositions.map(({ area, label, value }) => (
              <div className={`destination-intro-position destination-intro-position-${area}`} key={area}>
                <small>{label}</small>
                <strong lang="my">{value}</strong>
              </div>
            ))}
            <span className="destination-intro-diagram-arrow destination-intro-arrow-down" aria-hidden="true">↓</span>
            <span className="destination-intro-diagram-arrow destination-intro-arrow-right" aria-hidden="true">→</span>
            <span className="destination-intro-diagram-arrow destination-intro-arrow-left" aria-hidden="true">←</span>
            <span className="destination-intro-diagram-arrow destination-intro-arrow-up" aria-hidden="true">↑</span>
          </section>

          <p className="destination-intro-note">
            <Search size={16} aria-hidden="true" />
            This lesson, we will focus on Upper and Post-Base Spellings.
          </p>
        </div>

        <footer className="destination-intro-actions">
          <button type="button" className="destination-intro-back" onClick={() => setActiveScreen('map')}>
            <ArrowLeft size={15} /> BACK TO MAP
          </button>
          <button type="button" className="destination-intro-start" onClick={() => setActiveScreen('assembly')}>
            START CHALLENGE <ArrowRight size={16} />
          </button>
        </footer>
      </article>
    </section>
  </main>
}
