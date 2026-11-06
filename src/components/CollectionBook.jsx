import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { useGame } from '../context/GameContext'

const destinationOrder = ['naypyitaw', 'mawlamyine', 'yangon', 'inle', 'bagan', 'mandalay']
const destinationNumbers = Object.fromEntries(destinationOrder.map((id, index) => [id, String(index + 1).padStart(2, '0')]))
const cityImages = {
  naypyitaw: '/generated/naypyitaw-sticker.png',
  mawlamyine: '/generated/mawlamyein-transparent.png',
  yangon: '/generated/yangon-transparent.png',
  inle: '/generated/inle-transparent.png',
  bagan: '/generated/bagan-transparent.png',
  mandalay: '/generated/mandalay-transparent.png'
}
const destinationStampImages = {
  mawlamyine: '/generated/mawlamyine-stamp-transparent.png',
  yangon: '/generated/yangon-stamp-transparent.png'
}

export default function CollectionBook() {
  const { destinations, collectedCards, player, xp, setActiveScreen, setSelectedDestination, setModal, selectedDestination } = useGame()
  const orderedDestinations = destinationOrder
    .map((id) => destinations.find((destination) => destination.id === id))
    .filter(Boolean)
  const defaultDestination = orderedDestinations.find((destination) => collectedCards.includes(destination.id))
    ?? orderedDestinations.find((destination) => destination.unlocked)
  const initialDestination = selectedDestination && collectedCards.includes(selectedDestination.id)
    ? selectedDestination
    : defaultDestination
  const [selectedId, setSelectedId] = useState(initialDestination?.id)
  const [bookOpen, setBookOpen] = useState(false)
  const destination = orderedDestinations.find((item) => item.id === selectedId) ?? defaultDestination
  const collected = destination ? collectedCards.includes(destination.id) : false
  const destinationIndex = destinationOrder.indexOf(destination?.id)
  const destinationStampImage = destination ? destinationStampImages[destination.id] : null
  const hasIllustratedTemplate = destination?.id === 'naypyitaw'
  const stampImage = destination && !destinationStampImage && !hasIllustratedTemplate ? cityImages[destination.id] : null

  useEffect(() => {
    const timer = window.setTimeout(() => setBookOpen(true), 180)
    return () => window.clearTimeout(timer)
  }, [])

  const selectDestination = (item) => {
    if (!item.unlocked) return
    setSelectedId(item.id)
    setSelectedDestination(item)
  }

  return (
    <main className="world-map-screen slang-book-screen">
      <section className={`world-map-stage slang-book-stage ${bookOpen ? 'is-open' : 'is-closed'}`} aria-label="Slang book">
        <img className="world-map-background" src="/continuous-myanmar-storybook-world.png" alt="" />
        <div className="world-map-brand"><img src="/generated/codex-logo.png" alt="GenZ Slang Codex" /></div>

        <header className="world-map-profile">
          <img src="/generated/setting-bar-full.png" alt={`${player.name}, level 4, ${xp} XP, settings and leaderboard`} />
          <button className="profile-hitbox" onClick={() => setModal('profile')} aria-label="Open profile" />
          <button className="settings-hitbox" onClick={() => setModal('settings')} aria-label="Settings" />
          <button className="leaderboard-hitbox" onClick={() => setModal('leaderboard')} aria-label="Leaderboard" />
        </header>

        <h1 className="slang-book-title">Slang Book</h1>
        <button
          type="button"
          className="slang-book-art-toggle"
          onClick={() => setBookOpen((open) => !open)}
          aria-label={bookOpen ? 'Close slang book' : 'Open slang book'}
          aria-expanded={bookOpen}
        >
          <img className="slang-book-art" src="/generated/book-underlay-transparent.png" alt="" />
        </button>
        <img className="slang-book-cover" src="/generated/closed-book-transparent.png" alt="" aria-hidden="true" />

        {destination && (
          <div className="slang-book-pages">
            <section className="slang-book-stamp-page" aria-label={`${destination.name} destination stamp`}>
              <p className="slang-book-eyebrow">Destination stamp</p>
              <div className={`slang-book-stamp ${destinationStampImage ? 'has-complete-art' : hasIllustratedTemplate ? 'has-template' : 'is-custom-city'}`} aria-label={`${destination.name} stamp`}>
                {destinationStampImage
                  ? <img className="slang-book-complete-stamp" src={destinationStampImage} alt={`${destination.name} destination stamp`} />
                  : <>
                    {hasIllustratedTemplate && <img className="slang-book-stamp-template" src="/generated/stamp-template-transparent.png" alt="" />}
                    <span className="slang-book-landmark-frame">
                      {stampImage
                        ? <img className="slang-book-landmark" src={stampImage} alt={`${destination.name} landmark`} />
                        : !hasIllustratedTemplate && <span className="slang-book-landmark-emoji" aria-hidden="true">{destination.icon}</span>}
                    </span>
                    {hasIllustratedTemplate && <span className="slang-book-stamp-ribbon">{destination.name}</span>}
                  </>}
              </div>
              {!destinationStampImage && !hasIllustratedTemplate && <div className="slang-book-ribbon">{destination.name}</div>}
              <span className={`slang-book-number ${destinationStampImage || hasIllustratedTemplate ? 'is-in-art' : ''}`}>{destinationNumbers[destination.id]}</span>
              <h2>{destination.name}</h2>
              <p className={`slang-book-status ${collected ? '' : 'is-available'}`}>
                {collected ? '✓ Collected' : 'Destination unlocked'}
              </p>
              <p className="slang-book-progress">{collectedCards.length} / 6 Collected</p>
            </section>

            <section className="slang-book-detail-page" aria-label={`${destination.name} slang details`}>
              <div className="slang-book-detail-heading">
                <p className="slang-book-eyebrow">Slang details</p>
                <span>{destination.name}</span>
              </div>
              <p className="slang-book-phrase" lang="my">{destination.slang}</p>
              <p className="slang-book-eyebrow">Meaning</p>
              <p className="slang-book-meaning">{destination.meaning ?? 'A local slang phrase from ' + destination.region}</p>
              <p className="slang-book-eyebrow slang-book-example-label">Try it in a sentence</p>
              <p className="slang-book-example" lang="my">{destination.slang}</p>
              <p className="slang-book-translation">
                {destination.id === 'naypyitaw' ? "He's exaggerating again." : `Try saying “${destination.slang}” in a conversation.`}
              </p>
              <span className="slang-book-page-number">{destinationIndex + 1}</span>
            </section>
          </div>
        )}

        <section className="slang-book-destinations" aria-label="Your destinations">
          <h2>Your destinations</h2>
          <div className="slang-book-destination-list">
            {orderedDestinations.map((item) => {
              const isSelected = item.id === destination?.id
              const itemCollected = collectedCards.includes(item.id)
              const itemStamp = cityImages[item.id]
              const completeStamp = destinationStampImages[item.id]
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`slang-book-destination ${isSelected ? 'is-selected' : ''} ${item.unlocked ? '' : 'is-locked'}`}
                  onClick={() => selectDestination(item)}
                  disabled={!item.unlocked}
                  aria-pressed={isSelected}
                  aria-label={`${item.name}${item.unlocked ? itemCollected ? ', collected' : ', unlocked' : ', locked'}`}
                >
                  <span className={`slang-book-destination-stamp ${completeStamp ? 'has-complete-stamp' : item.id !== 'naypyitaw' ? 'uses-custom-art' : ''}`}>
                    <img src={completeStamp ?? itemStamp} alt="" />
                    {!item.unlocked && <span className="slang-book-lock"><Lock size={12} /></span>}
                  </span>
                  <span className="slang-book-destination-name">{item.name}</span>
                </button>
              )
            })}
          </div>
        </section>

        <button className="slang-book-back slang-book-back-collection" onClick={() => setActiveScreen('map')}>
          <span aria-hidden="true">←</span> Back to collection
        </button>
        <button className="slang-book-back slang-book-back-map" onClick={() => setActiveScreen('map')}>
          <span aria-hidden="true">←</span> Back to map
        </button>
      </section>
    </main>
  )
}
