import { createContext, useContext, useMemo, useState } from 'react'

const defaultSettings = {
  music: true,
  musicVolume: 70,
  sound: false,
  soundVolume: 50,
  hints: true,
  answerFeedback: true,
  confirmLeave: false,
  language: 'English',
  gameReminders: false
}

function readSettings() {
  try {
    const saved = window.localStorage.getItem('genz-slang-codex-settings')
    if (!saved) return defaultSettings
    const parsed = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Saved settings are not a valid object.')
    }
    const volume = (value, fallback) => Number.isInteger(value) && value >= 0 && value <= 100 ? value : fallback
    return {
      ...defaultSettings,
      music: typeof parsed.music === 'boolean' ? parsed.music : defaultSettings.music,
      musicVolume: volume(parsed.musicVolume, defaultSettings.musicVolume),
      sound: typeof parsed.sound === 'boolean' ? parsed.sound : defaultSettings.sound,
      soundVolume: volume(parsed.soundVolume, defaultSettings.soundVolume),
      hints: typeof parsed.hints === 'boolean' ? parsed.hints : defaultSettings.hints,
      answerFeedback: typeof parsed.answerFeedback === 'boolean' ? parsed.answerFeedback : defaultSettings.answerFeedback,
      confirmLeave: typeof parsed.confirmLeave === 'boolean' ? parsed.confirmLeave : defaultSettings.confirmLeave,
      language: parsed.language === 'မြန်မာ' ? 'မြန်မာ' : 'English',
      gameReminders: typeof parsed.gameReminders === 'boolean' ? parsed.gameReminders : defaultSettings.gameReminders
    }
  } catch (error) {
    console.error('Unable to load saved game settings; using defaults.', error)
    return defaultSettings
  }
}

const initialDestinations = [
  { id: 'yangon', name: 'Yangon', region: 'Lower Myanmar', icon: '🛕', color: '#ffbd69', unlocked: true, slang: 'ချောတယ်' },
  { id: 'mawlamyine', name: 'Mawlamyine', region: 'Mon State', icon: '🌴', color: '#86f0ce', unlocked: true, slang: 'မိုက်တယ်', meaning: 'Cool' },
  { id: 'naypyitaw', name: 'Naypyitaw', region: 'Central Myanmar', icon: '🏛️', color: '#b7a5ff', unlocked: true, slang: 'အာလူးဖုတ်', meaning: 'To talk nonsense or exaggerate' },
  { id: 'bagan', name: 'Bagan', region: 'Archaeological Zone', icon: '🌅', color: '#ff8b89', unlocked: false, slang: 'လန်းတယ်' },
  { id: 'inle', name: 'Inle Lake', region: 'Shan State', icon: '🛶', color: '#8bd5ff', unlocked: false, slang: 'ဟုတ်တယ်' },
  { id: 'mandalay', name: 'Mandalay', region: 'Mandalay Region', icon: '🏯', color: '#ffd36e', unlocked: false, slang: 'ရပြီ' }
]
const progressionOrder = ['naypyitaw', 'mawlamyine', 'yangon', 'inle', 'bagan', 'mandalay']

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [activeScreen, setActiveScreen] = useState('welcome')
  const [player, setPlayer] = useState({ name: 'Thiri', avatar: '/girl.png', email: '' })
  const [score, setScore] = useState(0)
  const [xp, setXp] = useState(350)
  const [lives, setLives] = useState(3)
  const [coins, setCoins] = useState(240)
  const [destinations, setDestinations] = useState(initialDestinations)
  const [collectedCards, setCollectedCards] = useState(['naypyitaw', 'mawlamyine'])
  const [selectedDestination, setSelectedDestination] = useState(initialDestinations[0])
  const [modal, setModal] = useState(null)
  const [avatarReturnScreen, setAvatarReturnScreen] = useState(null)
  const [profileNeedsSave, setProfileNeedsSave] = useState(false)
  const [settings, setSettings] = useState(readSettings)

  const openDestination = (destination) => {
    if (!destination.unlocked) return
    setSelectedDestination(destination)
    setActiveScreen('assembly')
  }
  const unlockNext = () => {
    setDestinations((items) => {
      const nextId = progressionOrder.find((id) => !items.find((item) => item.id === id)?.unlocked)
      return nextId ? items.map((item) => item.id === nextId ? { ...item, unlocked: true } : item) : items
    })
  }
  const reward = (points = 80) => {
    setScore((value) => value + points)
    setXp((value) => value + points)
    setCoins((value) => value + 25)
    if (!collectedCards.includes(selectedDestination.id)) {
      setCollectedCards((cards) => [...cards, selectedDestination.id])
      unlockNext()
    }
  }
  const value = useMemo(() => ({
    activeScreen, setActiveScreen, player, setPlayer, score, setScore, xp, lives, setLives,
    coins, destinations, selectedDestination, setSelectedDestination, collectedCards, modal, setModal,
    avatarReturnScreen, setAvatarReturnScreen,
    profileNeedsSave, setProfileNeedsSave,
    settings, setSettings, openDestination, reward
  }), [activeScreen, player, score, xp, lives, coins, destinations, selectedDestination, collectedCards, modal, avatarReturnScreen, profileNeedsSave, settings])
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) throw new Error('useGame must be used inside GameProvider')
  return context
}
