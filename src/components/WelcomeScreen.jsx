import { useState } from 'react'
import { Code2, Play } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { Button, Modal } from './ui'

export default function WelcomeScreen() {
  const { setActiveScreen, modal, setModal, player, setPlayer } = useGame()
  const [authMode, setAuthMode] = useState('register')
  const [avatar, setAvatar] = useState(player.avatar)
  const avatars = ['🧑🏽‍🚀', '👩🏽‍🎤', '🧑🏾‍🎨', '👩🏾‍💻']

  const start = () => {
    setPlayer({ ...player, avatar })
    setActiveScreen('map')
  }

  return (
    <main className="welcome-bg">
      <section className="welcome-card" aria-label="GenZ Slang Codex world map">
        <header className="welcome-toolbar">
          <h1>GenZ Slang Codex <span aria-hidden="true">·</span> World map</h1>
          <div className="welcome-actions">
            <button type="button" aria-label="View code" title="View code">
              <Code2 size={24} strokeWidth={2.2} />
            </button>
            <button type="button" aria-label="Start your journey" title="Start your journey" onClick={() => setModal('avatar')}>
              <Play size={24} fill="currentColor" strokeWidth={2.2} />
            </button>
          </div>
        </header>

        <div className="welcome-map">
          <img src="/continuous-myanmar-storybook-world.png" alt="Illustrated Myanmar world map" />
          <div className="welcome-title" aria-label="GenZ Slang Codex">
            <span className="welcome-title-top">GenZ</span>
            <span className="welcome-title-bottom">
              <span>Slang</span> <strong>Codex</strong>
            </span>
          </div>
        </div>
      </section>

      {modal === 'avatar' && (
        <Modal title="Choose your explorer" onClose={() => setModal(null)}>
          <p className="mb-5 text-sm text-white/60">You can change this anytime from your profile.</p>
          <div className="grid grid-cols-2 gap-3">
            {avatars.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setAvatar(item)}
                className={`rounded-2xl border p-5 text-5xl transition ${avatar === item ? 'border-mint bg-mint/15' : 'border-white/10 bg-white/5'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <Button className="mt-6 w-full" onClick={start}>Enter the CodeX <span>→</span></Button>
          <button type="button" className="mt-3 w-full text-center text-sm font-bold text-white/60" onClick={() => setModal('auth')}>Sign up or log in</button>
        </Modal>
      )}

      {modal === 'auth' && (
        <Modal title={authMode === 'register' ? 'Create your account' : 'Welcome back'} onClose={() => setModal(null)}>
          <div className="space-y-3">
            <input className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none focus:border-mint" placeholder="Your explorer name" onChange={(event) => setPlayer({ ...player, name: event.target.value })} />
            <input className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none focus:border-mint" placeholder="Email address" type="email" onChange={(event) => setPlayer({ ...player, email: event.target.value })} />
            <input className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none focus:border-mint" placeholder="Password" type="password" />
          </div>
          <Button className="mt-5 w-full" onClick={start}>{authMode === 'register' ? 'Create account' : 'Log in'}</Button>
          <button type="button" className="mt-4 w-full text-sm text-white/60" onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')}>
            {authMode === 'register' ? 'Already have an account? Log in' : 'New here? Create an account'}
          </button>
        </Modal>
      )}
    </main>
  )
}
