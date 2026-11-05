import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useGame } from '../context/GameContext'

const avatarOptions = [
  { id: 'boy', image: '/boy.png', name: 'BASE BOY', description: 'Everyday explorer' },
  { id: 'girl', image: '/girl.png', name: 'BASE GIRL', description: 'Everyday explorer' },
  { id: 'traditional-boy', image: '/Traditional boy.png', name: 'TRADITIONAL MALE', description: 'Gaung baung & longyi' },
  { id: 'traditional-girl', image: '/tradition girl.png', name: 'TRADITIONAL FEMALE', description: 'Htamein & jewelry' },
]

export default function AvatarSelection() {
  const { player, setPlayer, setActiveScreen, avatarReturnScreen, setAvatarReturnScreen, setModal, setProfileNeedsSave } = useGame()
  const [selectedAvatar, setSelectedAvatar] = useState(player.avatar.startsWith('/') ? player.avatar : avatarOptions[0].image)

  const continueToMap = () => {
    setPlayer({ ...player, avatar: selectedAvatar })
    if (avatarReturnScreen === 'profile') {
      setProfileNeedsSave(true)
      setAvatarReturnScreen(null)
      setModal('profile')
    }
    setActiveScreen('map')
  }

  const cancelSelection = () => {
    if (avatarReturnScreen === 'profile') {
      setAvatarReturnScreen(null)
      setModal('profile')
      setActiveScreen('map')
      return
    }
    setActiveScreen('create-account')
  }

  return (
    <main className="avatar-page">
      <div className="avatar-brand" aria-label="GenZ Slang Codex">
        <span className="account-brand-top">GenZ</span>
        <span className="account-brand-bottom"><span>Slang</span> <strong>Codex</strong></span>
      </div>
      <section className="avatar-panel" aria-labelledby="avatar-title">
        <div className="avatar-heading">
          <h1 id="avatar-title">CHOOSE YOUR AVATAR! <span className="avatar-gamepad" aria-hidden="true">🎮</span></h1>
          <p>Pick your look and get ready for adventure!</p>
          <span className="avatar-progress">Ready to collect some slang! <Sparkles aria-hidden="true" size={11} /></span>
        </div>

        <div className="avatar-options">
          {avatarOptions.map((option) => {
            const selected = selectedAvatar === option.image
            return (
              <button
                key={option.id}
                type="button"
                className={`avatar-option ${selected ? 'is-selected' : ''}`}
                aria-pressed={selected}
                onClick={() => setSelectedAvatar(option.image)}
              >
                <span className="avatar-image-frame"><img src={option.image} alt={option.name.toLowerCase()} /></span>
                <span className="avatar-option-name">{option.name}</span>
                <span className="avatar-option-description">{option.description}</span>
                <span className="avatar-option-action">{selected ? 'SELECTED' : 'CHOOSE AVATAR'}</span>
              </button>
            )
          })}
        </div>

        <p className="avatar-helper">Choose one avatar to join your slang quest.</p>
        <div className="avatar-actions">
          <button type="button" className="avatar-cancel" onClick={cancelSelection}>← CANCEL</button>
          <button type="button" className="avatar-continue" onClick={continueToMap}>SAVE &amp; CONTINUE! <Sparkles aria-hidden="true" size={12} /></button>
        </div>
      </section>
    </main>
  )
}
