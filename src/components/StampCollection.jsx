import { ArrowLeft, Check, Lock, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'

const collectionOrder = ['naypyitaw', 'mawlamyine', 'yangon', 'inle', 'bagan', 'mandalay']
const destinationStampImages = {
  naypyitaw: '/generated/naypyitaw-stamp-transparent.png',
  mawlamyine: '/generated/mawlamyine-stamp-transparent.png',
  yangon: '/generated/yangon-stamp-transparent.png'
}
const lockedStampImages = {
  inle: '/generated/inle-lock-stamp-transparent.png',
  bagan: '/generated/bagan-lock-stamp-transparent.png',
  mandalay: '/generated/mandalay-lock-stamp-transparent.png'
}
export default function StampCollection() {
  const { destinations, collectedCards, player, xp, setActiveScreen, setSelectedDestination, setModal } = useGame()
  const [detailDestination, setDetailDestination] = useState(null)
  const orderedDestinations = collectionOrder
    .map((id) => destinations.find((destination) => destination.id === id))
    .filter(Boolean)

  useEffect(() => {
    if (!detailDestination) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setDetailDestination(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [detailDestination])

  const viewInBook = (destination) => {
    if (!destination.unlocked) return
    setDetailDestination(null)
    setSelectedDestination(destination)
    setActiveScreen('collection')
  }

  return (
    <main className="stamp-collection-screen">
      <section className="stamp-collection-canvas" aria-label="Stamp collection">
        <img className="stamp-collection-background" src="/continuous-myanmar-storybook-world.png" alt="" />
        <div className="stamp-collection-shade" />
        <div className="world-map-brand"><img src="/generated/codex-logo.png" alt="GenZ Slang Codex" /></div>

        <header className="world-map-profile">
          <img src="/generated/setting-bar-transparent.png" alt={`${player.name}, level 4, ${xp} XP, settings and leaderboard`} />
          <button className="profile-hitbox" onClick={() => setModal('profile')} aria-label="Open profile" />
          <button className="settings-hitbox" onClick={() => setActiveScreen('settings')} aria-label="Settings" />
          <button className="leaderboard-hitbox" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
        </header>

        <section className="stamp-collection-panel">
          <header className="stamp-collection-heading">
            <Sparkles className="stamp-collection-star stamp-collection-star-left" aria-hidden="true" />
            <div>
              <p className="stamp-collection-count">{collectedCards.length} of {orderedDestinations.length} collected</p>
              <h1>Stamp Collection</h1>
              <p>Collect all the stamps on your adventure!</p>
            </div>
            <Sparkles className="stamp-collection-star stamp-collection-star-right" aria-hidden="true" />
          </header>

          <div className="stamp-collection-grid">
            {orderedDestinations.map((destination, index) => {
              const isCollected = collectedCards.includes(destination.id)
              const isLocked = !destination.unlocked
              const stampImage = destinationStampImages[destination.id] ?? lockedStampImages[destination.id]
              const meaning = destination.meaning ?? `A local slang phrase from ${destination.region}`
              return (
                <article
                  key={destination.id}
                  className={`stamp-collection-card ${isLocked ? 'is-locked' : isCollected ? 'is-collected' : 'is-unlocked'}`}
                  style={{ '--stamp-delay': `${index * 80}ms` }}
                >
                  <span className="stamp-collection-spark stamp-collection-spark-one" aria-hidden="true" />
                  <span className="stamp-collection-spark stamp-collection-spark-two" aria-hidden="true" />
                  <div className="stamp-collection-art">
                    <button
                      type="button"
                      className="stamp-collection-stamp-button"
                      onClick={() => !isLocked && setDetailDestination(destination)}
                      disabled={isLocked}
                      aria-label={isLocked ? `${destination.name} stamp is locked` : `View ${destination.name} stamp details`}
                    >
                      <img src={stampImage} alt="" />
                    </button>
                  </div>
                  {isLocked
                    ? <span className="stamp-collection-lock" aria-label="Locked"><Lock size={16} /></span>
                    : <span className="stamp-collection-check" aria-label={isCollected ? 'Collected' : 'Unlocked'}><Check size={14} /></span>}
                  <h2 className="stamp-collection-name">{destination.name}</h2>
                  {isLocked ? (
                    <>
                      <p className="stamp-collection-status">Locked</p>
                      <p className="stamp-collection-hint">Keep exploring to unlock</p>
                    </>
                  ) : (
                    <>
                      <p className="stamp-collection-slang" lang="my">{destination.slang}</p>
                      <p className="stamp-collection-meaning">{meaning}</p>
                    </>
                  )}
                  <button
                    type="button"
                    className="stamp-collection-view"
                    onClick={() => viewInBook(destination)}
                    disabled={isLocked}
                    aria-label={`${isLocked ? 'Locked' : 'View'} ${destination.name} in book`}
                  >
                    {isLocked ? 'View in book' : 'View in book'}
                  </button>
                </article>
              )
            })}
          </div>
          <p className="stamp-collection-total">{collectedCards.length} / {orderedDestinations.length} Collected</p>
        </section>

        <button type="button" className="slang-book-back stamp-collection-back" onClick={() => setActiveScreen('map')}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to map
        </button>

        {detailDestination && (
          <div
            className="stamp-detail-overlay"
            onClick={(event) => {
              if (event.target === event.currentTarget) setDetailDestination(null)
            }}
          >
            <section
              className="stamp-detail-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="stamp-detail-title"
              aria-describedby="stamp-detail-meaning"
            >
              <p className="stamp-detail-status">
                <Check size={14} aria-hidden="true" />
                {collectedCards.includes(detailDestination.id) ? 'Destination collected' : 'Destination unlocked'}
              </p>
              <button
                type="button"
                className="stamp-detail-close"
                onClick={() => setDetailDestination(null)}
                aria-label="Close stamp details"
                autoFocus
              >
                <X size={16} aria-hidden="true" />
              </button>
              <Sparkles className="stamp-detail-spark stamp-detail-spark-left" aria-hidden="true" />
              <Sparkles className="stamp-detail-spark stamp-detail-spark-right" aria-hidden="true" />
              <img
                className="stamp-detail-art"
                src={destinationStampImages[detailDestination.id] ?? lockedStampImages[detailDestination.id]}
                alt={`${detailDestination.name} destination stamp`}
              />
              <h2 id="stamp-detail-title">{detailDestination.name}</h2>
              <p className="stamp-detail-slang" lang="my">{detailDestination.slang}</p>
              <p className="stamp-detail-meaning" id="stamp-detail-meaning">
                {detailDestination.meaning ?? `A local slang phrase from ${detailDestination.region}`}
              </p>
              <div className="stamp-detail-example">
                <p>Try it in a sentence</p>
                <p lang="my">{detailDestination.slang}</p>
                <p>{detailDestination.id === 'naypyitaw' ? "He's exaggerating again." : detailDestination.meaning ?? `A local slang phrase from ${detailDestination.region}`}</p>
              </div>
              <button
                type="button"
                className="stamp-detail-view"
                onClick={() => viewInBook(detailDestination)}
              >
                View in book
              </button>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}
