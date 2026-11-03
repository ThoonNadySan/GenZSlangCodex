import { Code2, Eye, EyeOff, Play } from 'lucide-react'
import { useState } from 'react'
import { useGame } from '../context/GameContext'

export default function SignInScreen() {
  const { setActiveScreen, setPlayer } = useGame()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const signIn = (event) => {
    event.preventDefault()
    setPlayer((player) => ({ ...player, email }))
    setActiveScreen('map')
  }

  return (
    <main className="signin-screen">
      <section className="signin-shell" aria-label="GenZ Slang Codex sign in">
        <header className="signin-toolbar">
          <h1>GenZ Slang Codex <span aria-hidden="true">·</span> World map</h1>
          <div className="signin-actions">
            <button type="button" className="is-active" aria-label="View code" title="View code">
              <Code2 size={24} strokeWidth={2.2} />
            </button>
            <button type="button" aria-label="Start your journey" title="Start your journey">
              <Play size={24} fill="currentColor" strokeWidth={2.2} />
            </button>
          </div>
        </header>
        <div className="signin-map">
          <div className="signin-panel">
        <div className="signin-intro">
          <div className="signin-logo" aria-label="GenZ Slang Codex">
            <div className="signin-logo-genz">♧ GenZ</div>
            <div><span>Slang </span><strong>Codex</strong></div>
          </div>
          <h1>Ready for Another<br />Adventure?</h1>
          <div className="signin-buddy">
            <div className="signin-speech">Hey, bestie! Ready to<br />level up? 😎</div>
            <div className="signin-buddy-art">
              <img src="/Cheeky Jungle explorer.png" alt="Slang Buddy explorer" />
            </div>
            <span className="signin-buddy-label">Slang Buddy</span>
          </div>
          <div className="signin-features" aria-label="Adventure features">
            <span>● Quiz it</span>
            <span>● Explore it</span>
            <span>● Collect it</span>
          </div>
        </div>

        <form className="signin-card" onSubmit={signIn}>
          <div className="signin-heading">
            <p>WELCOME BACK, EXPLORER! 🌟</p>
            <h2>Let’s Jump Back In!</h2>
            <span>Your slang adventure is waiting.</span>
          </div>

          <label htmlFor="signin-email">Email Address</label>
          <input
            id="signin-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="signin-password">Password</label>
          <div className="signin-password">
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="signin-options">
            <label className="signin-remember">
              <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
              <span>Remember Me</span>
            </label>
            <button type="button" className="signin-forgot">Forgot Password?</button>
          </div>

          <button type="submit" className="signin-submit">LET’S PLAY! 🎮</button>

          <div className="signin-register">
            <div className="signin-divider" />
            <span>New to the adventure?</span>
            <button type="button" onClick={() => setActiveScreen('create-account')}>Create an Account</button>
          </div>
          </form>
          </div>
        </div>
      </section>
    </main>
  )
}
