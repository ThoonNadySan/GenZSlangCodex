import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Globe2,
  Lightbulb,
  LockKeyhole,
  LogOut,
  MessageCircle,
  Music2,
  Settings,
  ShieldCheck,
  UserRoundPen,
  Volume2
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'
import { AvatarDisplay } from './ui'

function Toggle({ label, enabled, onChange }) {
  return (
    <button
      type="button"
      className={`settings-toggle ${enabled ? 'is-on' : ''}`}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
    >
      <span>{enabled ? 'ON' : 'OFF'}</span>
      <i aria-hidden="true" />
    </button>
  )
}

function VolumeControl({ label, icon: Icon, enabled, volume, onToggle, onVolumeChange }) {
  return (
    <div className="settings-volume-control">
      <div className="settings-control-heading">
        <span><Icon size={15} />{label}</span>
        <Toggle label={label} enabled={enabled} onChange={onToggle} />
      </div>
      <label className="settings-range-label">
        <span>{label} volume</span>
        <strong>{volume}%</strong>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          aria-label={`${label} volume`}
          style={{ '--settings-range-progress': `${volume}%` }}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
        />
        <span className="settings-range-limits"><small>0%</small><small>100%</small></span>
      </label>
    </div>
  )
}

function PreferenceRow({ icon: Icon, label, enabled, onChange }) {
  return (
    <div className="settings-preference-row">
      <span><Icon size={15} />{label}</span>
      <Toggle label={label} enabled={enabled} onChange={onChange} />
    </div>
  )
}

function SettingsSection({ className = '', icon: Icon, title, children }) {
  return (
    <section className={`settings-section ${className}`}>
      <h2><span><Icon size={15} /></span>{title}</h2>
      <div className="settings-section-content">{children}</div>
    </section>
  )
}

export default function SettingsScreen() {
  const {
    settings,
    setSettings,
    player,
    xp,
    setActiveScreen,
    setModal,
    setAvatarReturnScreen
  } = useGame()
  const [infoDialog, setInfoDialog] = useState(null)
  const [signOutOpen, setSignOutOpen] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const level = Math.floor(xp / 100) + 1
  const musicVolume = settings.musicVolume ?? 70
  const soundVolume = settings.soundVolume ?? 50
  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }))
    setSaveMessage('')
  }
  const saveSettings = () => {
    try {
      window.localStorage.setItem('genz-slang-codex-settings', JSON.stringify(settings))
      setSaveMessage('Settings saved!')
    } catch (error) {
      console.error('Unable to save game settings.', error)
      setSaveMessage('Could not save settings in this browser.')
    }
  }
  const changeAvatar = () => {
    setAvatarReturnScreen('settings')
    setActiveScreen('avatar')
  }
  useEffect(() => {
    if (!signOutOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSignOutOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [signOutOpen])

  return (
    <main className="settings-page account-page">
      <div className="settings-layout">
        <header className="settings-page-header">
          <button type="button" className="settings-back" onClick={() => setActiveScreen('map')}>
            <ArrowLeft size={16} /> BACK TO MAP
          </button>
          <div className="settings-brand" aria-label="GenZ Slang Codex">
            <span className="account-brand-top">GenZ</span>
            <span className="account-brand-bottom"><span>Slang</span> <strong>Codex</strong></span>
          </div>
          <div className="settings-title">
            <h1>GAME SETTINGS <Settings size={22} aria-hidden="true" /></h1>
            <p>Make your adventure your way!</p>
          </div>
          <img className="settings-monkey" src="/cheerful-monkey-trophy-sticker.png" alt="Cheerful explorer monkey holding a trophy" />
        </header>

        <section className="settings-panel" aria-label="Game settings">
          <p className="settings-panel-kicker">UI PREVIEW · NOT CONNECTED</p>
          <div className="settings-grid">
            <SettingsSection className="settings-audio" icon={Volume2} title="SOUND & AUDIO">
              <div className="settings-audio-grid">
                <VolumeControl
                  label="Background Music"
                  icon={Music2}
                  enabled={settings.music}
                  volume={musicVolume}
                  onToggle={(value) => updateSetting('music', value)}
                  onVolumeChange={(value) => updateSetting('musicVolume', value)}
                />
                <VolumeControl
                  label="Sound Effects"
                  icon={Volume2}
                  enabled={settings.sound}
                  volume={soundVolume}
                  onToggle={(value) => updateSetting('sound', value)}
                  onVolumeChange={(value) => updateSetting('soundVolume', value)}
                />
              </div>
            </SettingsSection>

            <SettingsSection className="settings-gameplay" icon={Lightbulb} title="GAMEPLAY">
              <div className="settings-preference-list">
                <PreferenceRow icon={Lightbulb} label="Show hints" enabled={settings.hints} onChange={(value) => updateSetting('hints', value)} />
                <PreferenceRow icon={MessageCircle} label="Show answer feedback" enabled={settings.answerFeedback} onChange={(value) => updateSetting('answerFeedback', value)} />
                <PreferenceRow icon={ShieldCheck} label="Confirm before leaving a quiz" enabled={settings.confirmLeave} onChange={(value) => updateSetting('confirmLeave', value)} />
              </div>
            </SettingsSection>

            <SettingsSection icon={Globe2} title="LANGUAGE">
              <label className="settings-language">
                <Globe2 size={14} />
                <select value={settings.language} aria-label="Language" onChange={(event) => updateSetting('language', event.target.value)}>
                  <option value="English">English</option>
                  <option value="မြန်မာ">မြန်မာ</option>
                </select>
              </label>
            </SettingsSection>

            <SettingsSection className="settings-adventure" icon={UserRoundPen} title="MY ADVENTURE">
              <div className="settings-player">
                <div className="settings-player-avatar"><AvatarDisplay avatar={player.avatar} /></div>
                <div className="settings-player-info">
                  <strong>{player.name || 'New Explorer'}</strong>
                  <b>LV {String(level).padStart(2, '0')}</b>
                  <div className="settings-xp-track"><span style={{ width: `${Math.min(100, (xp / 500) * 100)}%` }} /></div>
                  <small>{xp} / 500 XP · Explorer</small>
                </div>
                <div className="settings-player-actions">
                  <button type="button" onClick={changeAvatar}>CHANGE AVATAR</button>
                  <button type="button" onClick={() => setModal('profile')}>EDIT PROFILE</button>
                </div>
              </div>
            </SettingsSection>

            <SettingsSection className="settings-notifications" icon={Bell} title="NOTIFICATIONS">
              <PreferenceRow icon={Bell} label="Game reminders" enabled={settings.gameReminders} onChange={(value) => updateSetting('gameReminders', value)} />
            </SettingsSection>

            <SettingsSection className="settings-account" icon={LockKeyhole} title="ACCOUNT & PRIVACY">
              <div className="settings-account-actions">
                <button type="button" onClick={() => setInfoDialog('account')}>
                  <span><UserRoundPen size={14} />Account Information</span><ChevronRight size={15} />
                </button>
                <button type="button" onClick={() => setInfoDialog('privacy')}>
                  <span><ShieldCheck size={14} />Privacy Information</span><ChevronRight size={15} />
                </button>
              </div>
            </SettingsSection>
          </div>

          <footer className="settings-footer">
            <div className="settings-save-status" role="status" aria-live="polite">{saveMessage}</div>
            <button type="button" className="settings-save" onClick={saveSettings}>
              SAVE SETTINGS <Check size={14} />
            </button>
            <button type="button" className="settings-signout" onClick={() => setSignOutOpen(true)}>
              <LogOut size={14} /> SIGN OUT
            </button>
          </footer>
        </section>
      </div>

      {infoDialog && (
        <div className="settings-dialog-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setInfoDialog(null)
        }}>
          <section className="settings-dialog" role="dialog" aria-modal="true" aria-labelledby="settings-dialog-title">
            <button type="button" className="settings-dialog-close" aria-label="Close" onClick={() => setInfoDialog(null)}>×</button>
            <h2 id="settings-dialog-title">{infoDialog === 'account' ? 'Account Information' : 'Privacy Information'}</h2>
            {infoDialog === 'account' ? (
              <div className="settings-dialog-content">
                <p><strong>Explorer name</strong><span>{player.name || 'New Explorer'}</span></p>
                <p><strong>Email address</strong><span>{player.email || 'Not added yet'}</span></p>
                <button type="button" onClick={() => { setInfoDialog(null); setModal('profile') }}>Manage profile <ChevronRight size={14} /></button>
              </div>
            ) : (
              <p className="settings-privacy-copy">Your adventure profile details are shown only in this game. Settings are saved in this browser, and no account or privacy service is connected yet.</p>
            )}
          </section>
        </div>
      )}

      {signOutOpen && (
        <div className="settings-signout-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSignOutOpen(false)
        }}>
          <section className="settings-signout-dialog" role="dialog" aria-modal="true" aria-labelledby="settings-signout-title" aria-describedby="settings-signout-description">
            <p className="settings-signout-kicker">Adventure pause</p>
            <div className="settings-signout-monkey-frame" aria-hidden="true">
              <img className="settings-signout-monkey" src="/generated/leaderboard-monkey-sticker.png" alt="" />
            </div>
            <h2 id="settings-signout-title">Leaving your adventure?</h2>
            <p id="settings-signout-description">Are you sure you want to sign out?</p>
            <div className="settings-signout-actions">
              <button type="button" className="settings-signout-stay" onClick={() => setSignOutOpen(false)}>STAY HERE</button>
              <button type="button" className="settings-signout-confirm" onClick={() => setActiveScreen('welcome')}>SIGN OUT</button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
