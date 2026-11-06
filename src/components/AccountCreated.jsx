import { CheckCircle2, Sparkles } from 'lucide-react'
import { useGame } from '../context/GameContext'

const sparkles = [
  { left: '7%', top: '20%', size: 24, delay: '.1s', duration: '1.5s', glyph: '✦' },
  { left: '91%', top: '17%', size: 18, delay: '.8s', duration: '1.9s', glyph: '✧' },
  { left: '3%', top: '35%', size: 15, delay: '.5s', duration: '1.7s', glyph: '✧' },
  { left: '95%', top: '34%', size: 25, delay: '1.2s', duration: '1.6s', glyph: '✦' },
  { left: '8%', top: '49%', size: 20, delay: '.9s', duration: '1.8s', glyph: '✦' },
  { left: '90%', top: '51%', size: 16, delay: '.2s', duration: '1.5s', glyph: '✧' },
  { left: '4%', top: '66%', size: 23, delay: '1.4s', duration: '2s', glyph: '✦' },
  { left: '94%', top: '68%', size: 19, delay: '.6s', duration: '1.7s', glyph: '✧' },
  { left: '16%', top: '79%', size: 17, delay: '.3s', duration: '1.8s', glyph: '✦' },
  { left: '82%', top: '80%', size: 22, delay: '1s', duration: '1.6s', glyph: '✦' },
  { left: '22%', top: '30%', size: 13, delay: '1.6s', duration: '1.9s', glyph: '✧' },
  { left: '76%', top: '28%', size: 14, delay: '.7s', duration: '1.5s', glyph: '✦' },
  { left: '20%', top: '62%', size: 15, delay: '1.1s', duration: '1.7s', glyph: '✧' },
  { left: '78%', top: '62%', size: 13, delay: '.4s', duration: '2s', glyph: '✦' },
  { left: '33%', top: '87%', size: 12, delay: '1.3s', duration: '1.6s', glyph: '✧' },
  { left: '69%', top: '87%', size: 16, delay: '.1s', duration: '1.9s', glyph: '✦' }
]
const sparkleColors = ['#e987b5', '#9c8bdf', '#69bde2', '#68b99b', '#eca477', '#d2ad54']

export default function AccountCreated() {
  const { setActiveScreen } = useGame()

  return (
    <main className="account-page account-created-page">
      <section className="account-created-shell" aria-label="Account created">
        <div className="account-created-brand" aria-label="GenZ Slang Codex">
          <span className="account-brand-top">GenZ</span>
          <span className="account-brand-bottom"><span>Slang</span> <strong>Codex</strong></span>
        </div>
        <div className="account-created-card">
          <div className="account-created-sparkles" aria-hidden="true">
            {sparkles.map((sparkle, index) => (
              <span
                key={index}
                style={{
                  left: sparkle.left,
                  top: sparkle.top,
                  fontSize: `${sparkle.size}px`,
                  color: sparkleColors[index % sparkleColors.length],
                  animationDelay: sparkle.delay,
                  animationDuration: sparkle.duration
                }}
              >
                {sparkle.glyph}
              </span>
            ))}
          </div>
          <span className="account-created-badge"><CheckCircle2 size={13} /> ACCOUNT CREATED</span>
          <h1>YOU’RE IN, EXPLORER! <span aria-hidden="true">🎉</span></h1>
          <p className="account-created-subtitle">Your adventure is about to begin!</p>
          <div className="account-created-mascot">
            <img src="/slang-buddy-sticker.png" alt="Slang Buddy, your cheerful explorer guide" />
          </div>
          <span className="account-created-mascot-tag">Slang Buddy</span>
          <button type="button" className="account-created-continue" onClick={() => setActiveScreen('avatar')}>
            LET&apos;S EXPLORE! <span aria-hidden="true">→</span> <Sparkles size={14} />
          </button>
        </div>
      </section>
    </main>
  )
}
