import { ArrowLeft, Settings, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'
import './BaganIntroduction.css'

export default function BaganIntroduction() {
  const { xp, player, setActiveScreen, setModal } = useGame()
  let displayXp = xp
  let displayLevel = 4
  while (displayXp >= 500) {
    displayXp -= 500
    displayLevel += 1
  }

  return (
    <main className="bagan-intro-page">
      <img className="bagan-intro-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="" />
      <button className="bagan-intro-back" type="button" onClick={() => setActiveScreen('map')} aria-label="Back to world map">
        <ArrowLeft size={18} />
      </button>
      <div className="bagan-intro-brand">
        <img src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
      </div>

      <header className="bagan-intro-profile">
        <div className="bagan-intro-avatar"><img src="/thiri-profile-character.png?v=2" alt="Thiri" /></div>
        <div className="bagan-intro-player">
          <strong><span>{player.name || 'Thiri'}</span><small>LV {String(displayLevel).padStart(2, '0')}</small></strong>
          <div className="bagan-intro-xp"><span style={{ width: `${Math.min(100, (displayXp / 500) * 100)}%` }} /></div>
          <small>{displayXp} / 500 XP</small>
        </div>
        <button type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings"><Settings size={16} /></button>
        <button type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard"><Trophy size={16} /></button>
      </header>

      <section className="bagan-intro-card" aria-label="Bagan destination introduction">
        <div className="bagan-intro-layout">
          <aside className="bagan-intro-art">
            <div className="bagan-temple-wrap">
              <span className="bagan-sparkle bagan-sparkle-one">✦</span>
              <span className="bagan-sparkle bagan-sparkle-two">✦</span>
              <span className="bagan-sparkle bagan-sparkle-three">✦</span>
              <span className="bagan-sparkle bagan-sparkle-four">✦</span>
              <span className="bagan-sparkle bagan-sparkle-five">✦</span>
              <img className="bagan-temple-sticker" src="/bagan-transparent.png" alt="Illustrated Bagan pagodas" />
            </div>
            <span className="bagan-monkey-shadow" aria-hidden="true" />
            <img className="bagan-intro-monkey" src="/happy-slang-buddy-transparent.png" alt="Happy Slang Buddy" />
          </aside>

          <div className="bagan-intro-content">
            <p className="bagan-intro-kicker"><span>D5</span> DESTINATIONS</p>
            <h1>Bagan</h1>
            <h2>Master tricky final spellings &amp; 3-tone marks. Aim for 8 out of 10!</h2>

            <div className="bagan-intro-objective">
              <span className="bagan-intro-objective-icon">▣</span>
              <div><small>AT THIS DESTINATION</small><strong>Master –မ့ / –န် Finals &amp; Creaky / Heavy Tones</strong></div>
            </div>

            <div className="bagan-intro-stats">
              <div><span>▣</span><small>10 QUESTIONS</small></div>
              <div><span>◉</span><small>VIDEO-ASSISTED</small></div>
              <div><span>∿</span><small>REWARD</small></div>
            </div>

            <div className="bagan-intro-diagram" aria-label="Assembly structure example">
              <div className="bagan-intro-diagram-title">UPPER VOWEL</div>
              <div className="bagan-intro-diagram-center">
                <div className="bagan-intro-vowel"><span>◌ိ</span></div>
                <div className="bagan-intro-base">
                  <div><small>BASE CONSONANT</small><span>မ</span></div>
                  <b>←</b>
                  <div><small>FINAL</small><span>န်</span></div>
                  <b>＋</b>
                  <div><small>HEAVY TONE</small><span>း</span></div>
                </div>
              </div>
              <div className="bagan-intro-example">မ + ွ + ၼ် + ၸး</div>
              <div className="bagan-intro-creaky">မိန့်, မယ့်, မဲ, ကိန်း</div>
            </div>

            <p className="bagan-intro-description">
              <span>i</span> In this lesson, assemble words using –◌ိ –, –◌န် –, –◌ယ် – and contrast short ( – ) , level ( – ) , and heavy ( –း ) tones.
            </p>
          </div>
        </div>

        <footer className="bagan-intro-footer">
          <button type="button" className="bagan-intro-back-button" onClick={() => setActiveScreen('map')}>
            <ArrowLeft size={16} /> BACK TO MAP
          </button>
          <button type="button" className="bagan-intro-start-button" onClick={() => setActiveScreen('bagan')}>
            START CHALLENGE
          </button>
        </footer>
      </section>
    </main>
  )
}
