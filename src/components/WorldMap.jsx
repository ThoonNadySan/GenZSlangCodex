import { BookOpen, Check, Lock, Play } from 'lucide-react'
import { useState } from 'react'
import { useGame } from '../context/GameContext'

const mapStops = [
  { id: 'bagan', number: 5, className: 'map-stop-bagan' },
  { id: 'mandalay', number: 6, className: 'map-stop-mandalay' },
  { id: 'destination7', number: 7, className: 'map-stop-destination7' },
  { id: 'inle', number: 4, className: 'map-stop-inle' },
  { id: 'naypyitaw', number: 1, className: 'map-stop-naypyitaw' },
  { id: 'mawlamyine', number: 2, className: 'map-stop-mawlamyine' },
  { id: 'yangon', number: 3, className: 'map-stop-yangon' }
]
const collectionOrder = ['naypyitaw', 'mawlamyine', 'yangon', 'inle', 'bagan', 'mandalay', 'destination7']
const stampArtwork = {
  naypyitaw: '/generated/naypyitaw-stamp-transparent.png',
  mawlamyine: '/generated/mawlamyine-stamp-transparent.png',
  yangon: '/generated/yangon-stamp-transparent.png',
  inle: '/generated/inle-lock-stamp-transparent.png',
  bagan: '/generated/bagan-lock-stamp-transparent.png',
  mandalay: '/generated/mandalay-lock-stamp-transparent.png',
  destination7: '/generated/myitkyina-stamp-transparent.png'
}

export default function WorldMap() {
  const { destinations, openDestination, setActiveScreen, setModal, collectedCards } = useGame()
  const [lockedMessage, setLockedMessage] = useState('')
  const [collectionOpen, setCollectionOpen] = useState(true)
  const [selectedStamp, setSelectedStamp] = useState(null)
  const [poppedStop, setPoppedStop] = useState(null)
  const [castlePopped, setCastlePopped] = useState(false)
  const byId = Object.fromEntries(destinations.map((destination) => [destination.id, destination]))
  const castleUnlocked = destinations.every((destination) => collectedCards.includes(destination.id))
  const currentId = mapStops
    .slice()
    .sort((first, second) => first.number - second.number)
    .find(({ id }) => byId[id]?.unlocked && !collectedCards.includes(id))?.id

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
      setLockedMessage('AI Castle is locked. Complete all 7 destinations to unlock it.')
      window.setTimeout(() => setLockedMessage(''), 3500)
      window.setTimeout(() => setCastlePopped(false), 400)
      return
    }
    window.setTimeout(() => setActiveScreen('castle'), 350)
  }
  return (
    <main className="world-map-screen">
      <section className="world-map-stage" aria-label="GenZ Slang Codex world map">
        <img className="world-map-background" src="/Continuous Myanmar fantasy world · Seven cities and separate AI Castle 1.png" alt="Illustrated Myanmar jungle world map" />
        <div className="world-map-brand"><img src="/generated/codex-logo.png" alt="GenZ Slang Codex" /></div>

        <header className="world-map-profile">
          <img src="/generated/setting-bar-transparent.png" alt="Thiri profile, XP, settings and leaderboard" />
          <button className="profile-hitbox" onClick={() => setModal('profile')} aria-label="Open profile" />
          <button className="settings-hitbox" onClick={() => setActiveScreen('settings')} aria-label="Settings" />
          <button className="leaderboard-hitbox" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
        </header>

        <button className={`castle-sticker ${castleUnlocked ? '' : 'is-locked'} ${castlePopped ? 'is-popped' : ''}`} onClick={() => { setCastlePopped(false); window.setTimeout(() => { setCastlePopped(true); openCastle() }, 20) }} aria-label="Open AI Castle" aria-disabled={!castleUnlocked}>AI</button>
        <button className={`map-castle-card ${castleUnlocked ? '' : 'is-locked'}`} onClick={openCastle} aria-label="Open AI Castle" aria-disabled={!castleUnlocked}><strong>{castleUnlocked ? <Check size={13} /> : <Lock size={13} />}AI Castle</strong><small>{castleUnlocked ? 'UNLOCKED · START' : <>Complete all {destinations.length} destinations<br />to unlock</>}</small></button>
        <section className={`map-collection-card ${collectionOpen ? 'is-open' : 'is-closed'}`} aria-label="Slang Collection">
          <button className="collection-toggle" onClick={() => setCollectionOpen((open) => !open)} aria-expanded={collectionOpen}>
            <h2><BookOpen size={18} /> Stamp Collection</h2>
            <span className="collection-toggle-icon">{collectionOpen ? '−' : '+'}</span>
          </button>
          {collectionOpen && <div className="collection-popup-content">
            <p>All 7 destinations and slang are unlocked!</p><b>{collectedCards.length} / {destinations.length} stamps collected</b><div className="collection-progress">{destinations.map((destination) => <span className={collectedCards.includes(destination.id) ? 'filled' : ''} key={destination.id} />)}</div>
            <div className="stamp-grid">{collectionOrder.map((id) => { const destination = byId[id]; if (!destination) return null; const collected = collectedCards.includes(id); return <div className={`stamp-card ${collected ? 'collected' : ''} ${selectedStamp === id ? 'selected' : ''}`} key={id} role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); setSelectedStamp(id) }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedStamp(id) }}>            {collected ? <><img className="stamp-art stamp-art-full" src={stampArtwork[id]} alt="" /><b lang="my">{destination.slang}</b><small>{destination.meaning ?? destination.name}</small></> : <><span className="stamp-art stamp-art-locked">?</span><b>Undiscovered</b><small>{destination.name}</small></>}</div> })}</div>
            {selectedStamp && byId[selectedStamp] && <div className="stamp-detail"><strong>{byId[selectedStamp].name}</strong><span>{collectedCards.includes(selectedStamp) ? `${byId[selectedStamp].slang} · ${byId[selectedStamp].meaning ?? `A local slang phrase from ${byId[selectedStamp].region}`}` : 'Explore this destination to discover its slang!'}</span></div>}
            <button className="collection-book-link" onClick={() => setActiveScreen('stamp-collection')}>View Stamp Collection <span>→</span></button>
          </div>}
        </section>

        <svg className="map-route" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 460 650 C 560 720 660 820 660 850 C 560 900 390 890 290 840 C 280 700 430 620 680 500 C 530 490 320 610 130 540 C 150 430 220 340 300 300 C 370 250 450 210 520 210" />
        </svg>
        <div className="map-stops">
          {mapStops.map(({ id, number, className }) => {
            const destination = byId[id]
            if (!destination) return null
            const current = id === currentId
            const collected = collectedCards.includes(id)
            const ready = destination.unlocked && !collected && !current
            return <button key={id} className={`map-stop ${className} ${current ? 'current' : collected ? 'unlocked' : destination.unlocked ? 'available' : 'locked'} ${poppedStop === id ? 'is-popped' : ''}`} onClick={() => { setPoppedStop(null); window.setTimeout(() => { setPoppedStop(id); visit(destination) }, 20) }} aria-label={`${destination.name}, ${current ? 'current' : collected ? 'completed' : destination.unlocked ? 'available' : 'locked'}`}>
              <span className="map-stop-number">{number}</span>{current || ready ? <span className="map-stop-status map-stop-play"><Play size={10} fill="currentColor" /></span> : collected ? <Check className="map-stop-status" size={17} /> : <Lock className="map-stop-status" size={16} />}<strong>{destination.name}</strong><small>{current ? 'YOU ARE HERE · START' : collected ? 'COMPLETED' : destination.unlocked ? 'READY' : 'LOCKED'}</small>
            </button>
          })}
        </div>
        {lockedMessage && <div className="world-map-locked-message" role="status">{lockedMessage}</div>}
      </section>
    </main>
  )
}
