import { Eye, EyeOff } from 'lucide-react'
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
    <main className="account-page signin-screen">
      <section className="account-shell signin-shell" aria-label="GenZ Slang Codex sign in">
        <div className="account-intro signin-intro">
          <div className="account-brand signin-logo" aria-label="GenZ Slang Codex">
            <span className="account-brand-top">GenZ</span>
            <span className="account-brand-bottom"><span>Slang</span> <strong>Codex</strong></span>
          </div>
          <div className="account-copy">
            <p className="account-kicker">A new world awaits</p>
            <h1>Ready for Another<br />Adventure?</h1>
            <div className="account-speech">Hey, bestie! Ready to level up? <span aria-hidden="true">😎</span></div>
            <img className="account-monkey" src="/monkey-another-pose-sticker.png" alt="Slang Buddy holding a map" />
            <div className="account-features"><span>✦ Quiz it</span><span>✦ Explore it</span><span>✦ Collect it</span></div>
          </div>
        </div>

        <form className="account-card signin-card" onSubmit={signIn}>
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
      </section>
    </main>
  )
}
