import { ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'

const clearConfettiPieces = [
  [-46, 82, -120, 0, '#f15b43'], [-40, 118, 95, 35, '#f4b942'],
  [-34, 92, 185, 70, '#50a876'], [-28, 126, 265, 105, '#52b9ca'],
  [-22, 96, 345, 140, '#d76bb3'], [-16, 116, 140, 20, '#f4b942'],
  [-10, 88, 230, 55, '#f15b43'], [-4, 108, 320, 90, '#50a876'],
  [4, 98, 40, 125, '#52b9ca'], [10, 122, 130, 15, '#d76bb3'],
  [16, 84, 220, 50, '#f4b942'], [22, 112, 310, 85, '#f15b43'],
  [28, 94, 30, 120, '#50a876'], [34, 128, 120, 10, '#52b9ca'],
  [40, 88, 210, 45, '#d76bb3'], [46, 110, 300, 80, '#f4b942'],
  [-52, 104, 155, 20, '#8e79e8'], [-48, 76, 305, 85, '#ff83a8'],
  [-44, 132, 70, 115, '#8acb45'], [-36, 102, 335, 10, '#f279a6'],
  [-31, 138, 210, 55, '#ffd45c'], [-24, 86, 125, 130, '#45b7a5'],
  [-19, 124, 250, 25, '#7f86e8'], [-13, 72, 75, 95, '#ff9f43'],
  [-7, 136, 300, 150, '#ef6f87'], [1, 82, 165, 65, '#45a6d7'],
  [7, 126, 240, 5, '#ffcb57'], [13, 96, 20, 120, '#65c6a6'],
  [19, 140, 190, 40, '#ed78b5'], [25, 78, 290, 100, '#6e92ed'],
  [31, 118, 105, 150, '#98cf4f'], [37, 90, 350, 70, '#f28c73'],
  [43, 132, 225, 25, '#7e70d8'], [49, 72, 60, 110, '#ffad49'],
  [54, 112, 320, 45, '#5ac9b4'], [-50, 146, 280, 135, '#ed70a4'],
  [-21, 148, 42, 75, '#74d47e'], [21, 146, 285, 100, '#5ba8df'],
  [51, 144, 175, 145, '#f2cf55']
]

const screenConfettiColors = [
  '#f15b43', '#f4b942', '#50a876', '#52b9ca', '#d76bb3',
  '#8e79e8', '#ff83a8', '#8acb45', '#ff9f43', '#45a6d7'
]

const screenConfettiPieces = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  x: (index * 37 + 11) % 101,
  delay: (index * 83) % 900,
  duration: 2300 + ((index * 137) % 1700),
  drift: -180 + ((index * 71) % 360),
  rotation: 180 + ((index * 113) % 720),
  color: screenConfettiColors[index % screenConfettiColors.length]
}))

export default function NaypyitawClear({ destinationId = 'naypyitaw' }) {
  const { setActiveScreen, setModal } = useGame()
  const isMawlamyine = destinationId === 'mawlamyine'
  const destinationName = isMawlamyine ? 'Mawlamyine' : 'Naypyitaw'
  const introScreen = isMawlamyine ? 'mawlamyine-intro' : 'naypyitaw-intro'
  const collectibleImage = isMawlamyine ? '/MawlamyineIntro-sticker.png' : '/IntroNPTDes1-sticker.png'

  return (
    <main className="destination-clear-page">
      <section className="destination-clear-scene" aria-label={`${destinationName} destination cleared`}>
        <div className="destination-clear-screen-confetti" aria-hidden="true">
          {screenConfettiPieces.map((piece) => (
            <span
              className="destination-clear-screen-confetti-piece"
              key={`screen-${piece.id}`}
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
        <img
          className="destination-clear-background"
          src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png"
          alt=""
          aria-hidden="true"
        />
        <img className="destination-clear-brand" src="/generated/codex-logo.png" alt="GenZ Slang Codex" />
        <div className="destination-clear-tab">{destinationName.toUpperCase()} · ASSEMBLY CHALLENGE</div>

        <header className="world-map-profile destination-clear-profile">
          <img src="/generated/setting-bar-transparent.png" alt="Player profile, XP, settings and leaderboard" />
          <button className="profile-hitbox" type="button" onClick={() => setModal('profile')} aria-label="Open profile" />
          <button className="settings-hitbox" type="button" onClick={() => setActiveScreen('settings')} aria-label="Settings" />
          <button className="leaderboard-hitbox" type="button" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
        </header>

        <article className="destination-clear-card">
          <div className="destination-clear-score-title">
            <span aria-hidden="true">★</span>
            <h1>DESTINATION CLEARED!</h1>
            <span aria-hidden="true">★</span>
          </div>

          <div className="destination-clear-score" aria-label="10 out of 10 correct">
            <div className="destination-clear-score-banner">
              <strong>10 / 10</strong>
              <span>CORRECT</span>
              <div className="destination-clear-confetti" aria-hidden="true">
                {clearConfettiPieces.map(([x, rise, rotation, delay, color], index) => (
                  <span
                    className="destination-clear-confetti-piece"
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
            </div>
          </div>
          <p className="destination-clear-quest">Quest complete! One word closer to your next adventure.</p>

          <div className="destination-clear-content">
            <section className="destination-clear-feedback">
              <small>AI COACH FEEDBACK ·</small>
              <div className="destination-clear-coach">
                <img src="/monkey-another-pose-sticker.png" alt="Slang Buddy" />
                <div>
                  <h2>Great work, Explorer!</h2>
                  <p>You answered all 10 {destinationName} spelling challenges correctly. Keep practicing to improve your Burmese spelling skills!</p>
                </div>
              </div>
              <div className="destination-clear-strength">
                <strong>Strength:</strong> You solved every challenge and cleared the destination.
              </div>
              <div className="destination-clear-next">
                <strong>Next step:</strong> Revisit this stage or continue exploring the world map.
              </div>
            </section>

            <aside className="destination-clear-collectible">
              <small>YOUR COLLECTIBLE</small>
              <div className="destination-clear-collectible-art">
                <img src={collectibleImage} alt={`${destinationName} destination`} />
              </div>
              <h2>{destinationName}</h2>
              <span><Trophy size={12} /> DESTINATION COMPLETE</span>
            </aside>
          </div>

          <footer className="destination-clear-actions">
            <button type="button" className="destination-clear-retry" onClick={() => setActiveScreen(introScreen)}>
              <RotateCcw size={16} /> RETRY
            </button>
            <button type="button" className="destination-clear-continue" onClick={() => setActiveScreen('collection')}>
              COLLECT &amp; CONTINUE <ArrowRight size={16} />
            </button>
          </footer>
        </article>
      </section>
    </main>
  )
}
