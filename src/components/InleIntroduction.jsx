import { ArrowLeft, ArrowRight, BookOpen, Check, Search, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'

export default function InleIntroduction() {
  const { setActiveScreen, setModal } = useGame()

  return (
    <main className="destination-intro-page">
      <section className="destination-intro-scene" aria-label="Inle Lake destination introduction">
        <img className="destination-intro-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" aria-hidden="true" />
        <img className="destination-intro-brand" src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
        <header className="world-map-profile destination-intro-profile">
          <img src="/generated/setting-bar-transparent.png" alt="Player profile, XP, settings and leaderboard" />
          <button className="profile-hitbox" type="button" onClick={() => setModal('profile')} aria-label="Open profile" />
          <button className="settings-hitbox" type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings" />
          <button className="leaderboard-hitbox" type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
        </header>

        <article className="destination-intro-card">
          <div className="destination-intro-art destination-intro-art-inle" aria-label="Inle Lake landmarks and guide">
            <span className="destination-intro-inle-sparkle destination-intro-inle-sparkle-one" aria-hidden="true">✦</span>
            <span className="destination-intro-inle-sparkle destination-intro-inle-sparkle-two" aria-hidden="true">✦</span>
            <span className="destination-intro-inle-sparkle destination-intro-inle-sparkle-three" aria-hidden="true">✦</span>
            <span className="destination-intro-inle-sparkle destination-intro-inle-sparkle-four" aria-hidden="true">✦</span>
            <img className="destination-intro-landmark destination-intro-landmark-inle" src="/generated/inle-lake-destination-transparent.png" alt="Inle Lake floating villages and stilt houses" />
            <span className="destination-intro-monkey-shadow" aria-hidden="true" />
            <img className="destination-intro-monkey" src="/monkeyIntroDes1-sticker.png" alt="" aria-hidden="true" />
          </div>

          <div className="destination-intro-content">
            <div className="destination-intro-heading">
              <p>DESTINATION 4</p>
              <h1>Inle Lake</h1>
              <strong>Master nasal finals &amp; 3-tone marks. Aim for 8 out of 10!</strong>
            </div>

            <section className="destination-intro-lesson">
              <span className="destination-intro-lesson-icon"><BookOpen size={19} /></span>
              <div>
                <small>AT THIS DESTINATION</small>
                <p>Master –𖷟 / –ᵭ Finals &amp; Creaky / Level / Heavy Tones</p>
              </div>
            </section>

            <div className="destination-intro-features">
              <div className="destination-intro-feature"><BookOpen size={16} /><span>10 QUESTIONS</span></div>
              <div className="destination-intro-feature"><Check size={16} /><span>WORD SEARCH</span></div>
              <div className="destination-intro-feature"><Trophy size={16} /><span>REWARDS</span></div>
            </div>

            <section className="destination-intro-spelling-map destination-intro-spelling-map-inle" aria-label="Base consonant, final and tone spelling positions">
              <div className="destination-intro-position destination-intro-position-base">
                <small>BASE CONSONANT</small>
                <strong lang="my">က</strong>
              </div>
              <span className="destination-intro-diagram-arrow destination-intro-inle-arrow-one" aria-hidden="true">←</span>
              <div className="destination-intro-position destination-intro-position-postbase">
                <small>FINAL</small>
                <strong lang="my">န် / င်</strong>
              </div>
              <span className="destination-intro-diagram-arrow destination-intro-inle-arrow-two" aria-hidden="true">←</span>
              <div className="destination-intro-position destination-intro-position-tone">
                <small>HEAVY TONE</small>
                <strong lang="my">◌း</strong>
              </div>
              <span className="destination-intro-diagram-arrow destination-intro-inle-arrow-down" aria-hidden="true">↑</span>
              <div className="destination-intro-position destination-intro-position-creaky">
                <small>CREAKY TONE</small>
                <strong lang="my">◌့</strong>
              </div>
              <div className="destination-intro-inle-example" lang="my">ကန့် ကန် ကန်း + ကင့် ကင် ကင်း</div>
            </section>

            <p className="destination-intro-note">
              <Search size={16} aria-hidden="true" />
              In this lesson, assemble words using –ᵭ vs –ᵭ် and contrast short (–့), level, and heavy (–း) tones.
            </p>
          </div>

          <footer className="destination-intro-actions">
            <button type="button" className="destination-intro-back" onClick={() => setActiveScreen('map')}>
              <ArrowLeft size={15} /> BACK TO MAP
            </button>
            <button type="button" className="destination-intro-start" onClick={() => setActiveScreen('inle-quiz')}>
              START CHALLENGE <ArrowRight size={16} />
            </button>
          </footer>
        </article>
      </section>
    </main>
  )
}
