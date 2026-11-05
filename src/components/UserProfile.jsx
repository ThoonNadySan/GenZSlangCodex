import { ArrowLeft, Check, Lock, LogOut, Pencil, ShieldCheck, Sparkles, Star, KeyRound, UserRoundPen } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { AvatarDisplay } from './ui'

const collectionCards = [
  { name: 'Naypyitaw', stamp: 'naypyitaw', collected: true },
  { name: 'Yangon', stamp: 'yangon', collected: true },
  { name: 'Mawlamyine', collected: false },
  { name: 'Inle Lake', collected: false },
  { name: 'Bagan', collected: false },
  { name: 'Mandalay', collected: false },
]

export default function UserProfile() {
  const { player, setPlayer, xp, setModal, setActiveScreen, setAvatarReturnScreen } = useGame()
  const level = Math.floor(xp / 100) + 1
  const levelProgress = xp % 100

  const changeAvatar = () => {
    setAvatarReturnScreen('profile')
    setModal(null)
    setActiveScreen('avatar')
  }

  const goBack = () => {
    setModal(null)
    setActiveScreen('map')
  }

  return (
    <main className="profile-page">
      <header className="profile-header">
        <button type="button" className="profile-back" onClick={goBack} aria-label="Back to map"><ArrowLeft size={17} /> Back</button>
        <div className="profile-brand" aria-label="GenZ Slang Codex">
          <span>♔ GenZ</span>
          <strong><b>Slang</b> Codex</strong>
        </div>
        <div className="profile-title">
          <span className="profile-title-star">☆</span>
          <h1>YOUR ADVENTURE PROFILE</h1>
          <span className="profile-title-star">☆</span>
        </div>
        <span className="profile-badge">🌿 MY ADVENTURE</span>
      </header>

      <p className="profile-tagline">Your Profile, Your Adventure!</p>

      <section className="profile-card">
        <div className="profile-identity">
          <div className="profile-avatar-frame"><AvatarDisplay avatar={player.avatar} /></div>
          <h2>{player.name || 'New Explorer'}</h2>
          <span className="profile-level">LV 0{level} · Trail explorer</span>
          <Star className="profile-star" size={18} />
          <button type="button" className="profile-change-avatar" onClick={changeAvatar}><UserRoundPen size={15} /> CHANGE AVATAR</button>
          <small>{player.avatar.startsWith('/') ? 'Selected avatar' : 'Base explorer'} · Avatar selection →</small>
        </div>

        <div className="profile-details">
          <h3>YOUR DETAILS</h3>
          <label htmlFor="profile-name">PLAYER NAME</label>
          <div className="profile-input-wrap"><input id="profile-name" value={player.name} onChange={(event) => setPlayer({ ...player, name: event.target.value })} /><Pencil size={15} /></div>
          <small>Your adventure name · 2-20 characters.</small>
          <label htmlFor="profile-email">EMAIL ADDRESS</label>
          <div className="profile-input-wrap profile-input-muted"><input id="profile-email" value={player.email || 'thiri@example.com'} readOnly /><ShieldCheck size={15} /></div>
          <button type="button" className="profile-password"><KeyRound size={15} /> CHANGE PASSWORD</button>
          <small>use 8+ characters with letters &amp; numbers</small>
          <div className="profile-quest"><span className="profile-quest-icon">★</span><div><b>DAILY QUEST</b><small>Collect 1 new slang stamp today</small></div><strong>+50 XP</strong><em>0 / 1</em></div>
        </div>

        <div className="profile-adventure">
          <h3>YOUR ADVENTURE <Sparkles size={14} /></h3>
          <div className="profile-xp-label"><b>Level 0{level}</b><span>{xp} / {level * 100} XP</span></div>
          <div className="profile-xp-bar"><span style={{ width: `${Math.max(8, levelProgress)}%` }} /></div>
          <small>{Math.max(0, level * 100 - xp)} XP to your next level. Keep exploring!</small>
          <h3 className="profile-collection-title">SLANG COLLECTION 📚</h3>
          <b className="profile-collection-count">{collectionCards.filter((card) => card.collected).length} / 6 stamps collected</b>
          <div className="profile-collection-grid">
            {collectionCards.map((card) => <div key={card.name} className={`profile-collection-card ${card.collected ? 'is-collected' : 'is-locked'}`}>
              {card.collected ? <span className={`profile-stamp profile-stamp-${card.stamp}`} aria-label={`${card.name} stamp`} /> : <span className="profile-locked-stamp">?</span>}
              <b>{card.name}</b>
              <small>{card.collected ? <><Check size={10} /> COLLECTED</> : <><Lock size={10} /> LOCKED</>}</small>
            </div>)}
          </div>
        </div>

        <div className="profile-actions">
          <div className="profile-action-buttons">
            <button type="button" onClick={goBack}>← BACK</button>
            <button type="button" className="profile-save">SAVE CHANGES ✓</button>
            <button type="button" onClick={goBack}><LogOut size={14} /> SIGN OUT</button>
          </div>
          <small>No changes yet · Edit your name to save.</small>
        </div>
      </section>
    </main>
  )
}
