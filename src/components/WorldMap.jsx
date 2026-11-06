import { BookOpen, Check, Lock } from 'lucide-react'
import { useState } from 'react'
import { useGame } from '../context/GameContext'

const mapStops = [
  { id: 'bagan', number: 5, className: 'map-stop-bagan' },
  { id: 'mandalay', number: 6, className: 'map-stop-mandalay' },
  { id: 'inle', number: 4, className: 'map-stop-inle' },
  { id: 'naypyitaw', number: 1, className: 'map-stop-naypyitaw' },
  { id: 'mawlamyine', number: 2, className: 'map-stop-mawlamyine' },
  { id: 'yangon', number: 3, className: 'map-stop-yangon' }
]
const collectionOrder = ['naypyitaw', 'mawlamyine', 'yangon', 'inle', 'bagan', 'mandalay']

export default function WorldMap() {
  const { destinations, openDestination, setActiveScreen, setModal, collectedCards } = useGame()
  const [lockedMessage, setLockedMessage] = useState('')
  const [collectionOpen, setCollectionOpen] = useState(true)
  const [selectedStamp, setSelectedStamp] = useState(null)
  const [poppedStop, setPoppedStop] = useState(null)
  const [castlePopped, setCastlePopped] = useState(false)
  const byId = Object.fromEntries(destinations.map((destination) => [destination.id, destination]))
  const castleUnlocked = collectedCards.length === 6
  const stickerMatchesProgress = collectedCards.length === 2
    && collectedCards.includes('naypyitaw')
    && collectedCards.includes('mawlamyine')
    && destinations.every((destination) => destination.unlocked === ['yangon', 'mawlamyine', 'naypyitaw'].includes(destination.id))

  const visit = (destination) => {
    if (!destination.unlocked) {
      setLockedMessage(`${destination.name} is locked. Complete the previous destination to unlock it.`)
      window.setTimeout(() => setLockedMessage(''), 3500)
      window.setTimeout(() => setPoppedStop(null), 400)
      return
    }
    window.setTimeout(() => openDestination(destination), 350)
  }
  const openCastle = () => {
    if (!castleUnlocked) {
      setLockedMessage('AI Castle is locked. Collect all 6 slang cards to unlock it.')
      window.setTimeout(() => setLockedMessage(''), 3500)
      window.setTimeout(() => setCastlePopped(false), 400)
      return
    }
    window.setTimeout(() => setActiveScreen('castle'), 350)
  }
  return (
    <main className="world-map-screen">
      <section className="world-map-stage" aria-label="GenZ Slang Codex world map">
        <img className="world-map-background" src="/continuous-myanmar-storybook-world.png" alt="Illustrated Myanmar jungle world map" />
        <div className="world-map-brand"><img src="/generated/codex-logo.png" alt="GenZ Slang Codex" /></div>

        <header className="world-map-profile">
          <img src="/generated/setting-bar-transparent.png" alt="Thiri profile, XP, settings and leaderboard" />
          <button className="profile-hitbox" onClick={() => setModal('profile')} aria-label="Open profile" />
          <button className="settings-hitbox" onClick={() => setActiveScreen('settings')} aria-label="Settings" />
          <button className="leaderboard-hitbox" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
        </header>

        <button className={`castle-sticker ${castleUnlocked ? '' : 'is-locked'} ${castlePopped ? 'is-popped' : ''}`} onClick={() => { setCastlePopped(false); window.setTimeout(() => { setCastlePopped(true); openCastle() }, 20) }} aria-label="Open AI Castle" aria-disabled={!castleUnlocked}><img src="/generated/floating-castle-academy-icon.png" alt="AI Castle illustration" /></button>
        <button className={`map-castle-card ${castleUnlocked ? '' : 'is-locked'}`} onClick={openCastle} aria-label="Open AI Castle" aria-disabled={!castleUnlocked}><strong><Lock size={13} />AI Castle</strong><small>Complete all 6 destinations<br />to unlock</small><i><span /><span /><span /><span /><span /><span /></i></button>
        <section className={`map-collection-card ${collectionOpen ? 'is-open' : 'is-closed'}`} aria-label="Slang Collection">
          <button className="collection-toggle" onClick={() => setCollectionOpen((open) => !open)} aria-expanded={collectionOpen}>
            <h2><BookOpen size={18} /> Slang Collection</h2>
            <span className="collection-toggle-icon">{collectionOpen ? '−' : '+'}</span>
          </button>
          {collectionOpen && <div className="collection-popup-content">
            <p>Collect words as you explore!</p><b>{collectedCards.length} / 6 stamps collected</b><div className="collection-progress">{[0, 1, 2, 3, 4, 5].map((item) => <span className={item < collectedCards.length ? 'filled' : ''} key={item} />)}</div>
            <div className="stamp-grid">{collectionOrder.map((id) => { const destination = byId[id]; const collected = collectedCards.includes(id); return <div className={`stamp-card ${collected ? 'collected' : ''} ${selectedStamp === id ? 'selected' : ''}`} key={id} role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); setSelectedStamp(id) }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedStamp(id) }}>{collected ? <img className="stamp-art stamp-art-full" src={`/generated/${id}-slang-card.png`} alt={`${destination.name} slang sticker`} /> : <><span className="stamp-art stamp-art-locked">?</span><b>Undiscovered</b><small>{destination.name}</small></>}</div> })}</div>
            {selectedStamp && <div className="stamp-detail"><strong>{byId[selectedStamp].name}</strong><span>{collectedCards.includes(selectedStamp) ? `${byId[selectedStamp].slang} · ${byId[selectedStamp].meaning}` : 'Explore this destination to discover its slang!'}</span></div>}
            <button className="collection-book-link" onClick={() => setActiveScreen('collection')}>Open Slang Book <span>→</span></button>
          </div>}
        </section>

        {stickerMatchesProgress
          ? <img className="map-sticker" src="/Myanmar adventure map.png" alt="Adventure route with completed, current, and locked destination markers" />
          : <img className="map-route" src="/generated/worldmap-destination-route-reference.png" alt="" aria-hidden="true" />}
        <div className={`map-stops ${stickerMatchesProgress ? 'map-stops-sticker' : ''}`}>
          {mapStops.map(({ id, number, className }) => {
            const destination = byId[id]
            if (!destination) return null
            const current = id === 'yangon'
            return <button key={id} className={`map-stop ${className} ${current ? 'current' : destination.unlocked ? 'unlocked' : 'locked'} ${poppedStop === id ? 'is-popped' : ''}`} onClick={() => { setPoppedStop(null); window.setTimeout(() => { setPoppedStop(id); visit(destination) }, 20) }} aria-label={`${destination.name}, ${current ? 'current' : destination.unlocked ? 'completed' : 'locked'}`}>
              {stickerMatchesProgress && <span className="map-stop-pop" aria-hidden="true" />}
              {!stickerMatchesProgress && <><span className="map-stop-number">{number}</span>{current ? <span className="map-stop-status map-stop-play">▶</span> : destination.unlocked ? <Check className="map-stop-status" size={17} /> : <Lock className="map-stop-status" size={16} />}<strong>{destination.name}</strong><small>{current ? 'YOU ARE HERE · START' : destination.unlocked ? 'COMPLETED' : 'LOCKED'}</small></>}
            </button>
          })}
        </div>
        {lockedMessage && <div className="world-map-locked-message" role="status">{lockedMessage}</div>}
      </section>
    </main>
  )
}
