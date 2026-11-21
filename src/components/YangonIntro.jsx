import { ArrowLeft, ArrowRight, BookOpen, Check, Search, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'

const introFeatures = [
  { icon: BookOpen, label: '10 QUESTIONS' },
  { icon: Check, label: 'CHARACTER PRACTICE' },
  { icon: Trophy, label: 'REWARDS' }
]

const spellingPositions = [
  { area: 'prebase', label: 'PRE-BASE (V_pre)', value: 'ေ' },
  { area: 'base', label: 'BASE CONSONANT (C)', value: 'က' },
  { area: 'postbase', label: 'POST-BASE (V_post)', value: 'ာ / ါ' },
  { area: 'tone', label: 'TONES (T)', value: '◌့ / ◌း / ◌်' }
]

export default function YangonIntro() {
  const { setActiveScreen, setModal } = useGame()

  return <main className="destination-intro-page">
    <section className="destination-intro-scene" aria-label="Yangon destination introduction">
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
        <div className="destination-intro-art" aria-label="Yangon landmarks and guide">
          <img className="destination-intro-landmark" src="/generated/yangon-intro-landmark.png" alt="Yangon landmark illustration" />
          <span className="destination-intro-monkey-shadow" aria-hidden="true" />
          <img className="destination-intro-monkey" src="/monkeyIntroDes1-sticker.png" alt="" aria-hidden="true" />
        </div>

        <div className="destination-intro-content">
          <div className="destination-intro-heading">
            <p>DESTINATION 3</p>
            <h1>Yangon</h1>
            <strong>Aim for 8 out of 10. You&apos;ve got this!</strong>
          </div>

          <section className="destination-intro-lesson">
            <span className="destination-intro-lesson-icon"><BookOpen size={19} /></span>
            <div>
              <small>AT THIS DESTINATION</small>
              <p>Master Pre-base Spellings &amp; 3-tone Marks</p>
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

          <section className="destination-intro-spelling-map destination-intro-spelling-map-yangon" aria-label="Pre-base, base, post-base, and tone spelling positions">
            {spellingPositions.map(({ area, label, value }) => (
              <div className={`destination-intro-position destination-intro-position-${area}`} key={area}>
                <small>{label}</small>
                <span className="destination-intro-yangon-value">
                  <strong lang="my">{value}</strong>
                </span>
              </div>
            ))}
            <span className="destination-intro-diagram-arrow destination-intro-arrow-pre-base" aria-hidden="true">→</span>
            <span className="destination-intro-diagram-arrow destination-intro-arrow-post-base" aria-hidden="true">←</span>
            <span className="destination-intro-diagram-arrow destination-intro-arrow-tone" aria-hidden="true">←</span>
            <div className="destination-intro-spelling-example" lang="my" aria-label="Example vowel and tone spelling sequence">
              ကေ့ • ကေ • ကေး &nbsp;&nbsp; + &nbsp;&nbsp; ကော့ • ကော • ကော်
            </div>
          </section>

          <p className="destination-intro-note">
            <Search size={16} aria-hidden="true" />
            In this lesson, spell words using pre-base <b lang="my">ေ</b> and post-base <b lang="my">ာ</b> / <b lang="my">ါ</b> with the tone marks shown above.
          </p>
        </div>

        <footer className="destination-intro-actions">
          <button type="button" className="destination-intro-back" onClick={() => setActiveScreen('map')}>
            <ArrowLeft size={15} /> BACK TO MAP
          </button>
          <button type="button" className="destination-intro-start" onClick={() => setActiveScreen('yangon-quiz')}>
            START CHALLENGE <ArrowRight size={16} />
          </button>
        </footer>
      </article>
    </section>
  </main>
}
