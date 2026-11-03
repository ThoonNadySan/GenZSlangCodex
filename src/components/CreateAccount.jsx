import { ArrowLeft, Eye, EyeOff, Gamepad2, Star } from 'lucide-react'
import { useState } from 'react'
import { useGame } from '../context/GameContext'

export default function CreateAccount() {
  const { player, setPlayer, setActiveScreen } = useGame()
  const [form, setForm] = useState({ name: player.name === 'New Explorer' ? '' : player.name, email: player.email, password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirm) {
      setError('Please complete every field to continue.')
      return
    }
    if (form.password.length < 8) {
      setError('Your password needs at least 8 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Your passwords do not match.')
      return
    }
    setPlayer({ ...player, name: form.name.trim(), email: form.email.trim() })
    setActiveScreen('map')
  }

  return (
    <main className="account-page">
      <section className="account-shell" aria-label="Create your GenZ Slang Codex account">
        <div className="account-intro">
          <button type="button" className="account-back" onClick={() => setActiveScreen('welcome')}>
            <ArrowLeft size={17} /> Back
          </button>
          <div className="account-brand" aria-label="GenZ Slang Codex">
            <span className="account-brand-top">GenZ</span>
            <span className="account-brand-bottom"><span>Slang</span> <strong>Codex</strong></span>
          </div>
          <div className="account-copy">
            <p className="account-kicker">A new world awaits</p>
            <h1>Your adventure starts here!</h1>
            <div className="account-speech">Hey, bestie! Ready to become a Slang Master? <span aria-hidden="true">😎</span></div>
            <img className="account-monkey" src="/monkey-another-pose-sticker.png" alt="Slang Buddy holding a map" />
            <div className="account-features"><span>✦ Quiz it</span><span>✦ Explore it</span><span>✦ Collect it</span></div>
          </div>
        </div>

        <div className="account-card">
          <div className="account-card-heading">
            <p>JOIN THE ADVENTURE! <Star size={12} fill="currentColor" /></p>
            <h2>Create Your Account</h2>
            <span>Your journey to Slang Master begins now!</span>
          </div>
          <form onSubmit={submit} noValidate>
            <label htmlFor="account-name">Username</label>
            <input id="account-name" value={form.name} onChange={update('name')} placeholder="Choose your player name" autoComplete="username" />
            <label htmlFor="account-email">Email Address</label>
            <input id="account-email" value={form.email} onChange={update('email')} type="email" placeholder="Enter your email address" autoComplete="email" />
            <label htmlFor="account-password">Password</label>
            <div className="account-password">
              <input id="account-password" value={form.password} onChange={update('password')} type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" autoComplete="new-password" />
              <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
            <small className="account-hint">Password strength appears as you type.</small>
            <label htmlFor="account-confirm">Confirm Password</label>
            <div className="account-password">
              <input id="account-confirm" value={form.confirm} onChange={update('confirm')} type={showConfirm ? 'text' : 'password'} placeholder="Enter your password again" autoComplete="new-password" />
              <button type="button" aria-label={showConfirm ? 'Hide password confirmation' : 'Show password confirmation'} onClick={() => setShowConfirm((value) => !value)}>{showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
            <label className="account-terms"><input type="checkbox" required /> <span>I agree to the <b>Terms of Service</b> and <b>Privacy Policy</b>.</span></label>
            {error && <p className="account-error" role="alert">{error}</p>}
            <button className="account-submit" type="submit">CREATE MY PLAYER ACCOUNT <Gamepad2 size={16} fill="currentColor" /></button>
          </form>
          <div className="account-signin">Already have an account? <button type="button" onClick={() => setActiveScreen('welcome')}>Sign In</button></div>
        </div>
      </section>
    </main>
  )
}
