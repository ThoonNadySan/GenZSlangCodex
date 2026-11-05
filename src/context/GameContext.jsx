import { createContext, useContext, useMemo, useState } from 'react'

const initialDestinations = [
  { id: 'yangon', name: 'Yangon', region: 'Lower Myanmar', icon: '🛕', color: '#ffbd69', unlocked: true, slang: 'ချောတယ်' },
  { id: 'mawlamyine', name: 'Mawlamyine', region: 'Mon State', icon: '🌴', color: '#86f0ce', unlocked: true, slang: 'မိုက်တယ်', meaning: 'Cool' },
  { id: 'naypyitaw', name: 'Naypyitaw', region: 'Central Myanmar', icon: '🏛️', color: '#b7a5ff', unlocked: true, slang: 'အေးဆေး', meaning: 'Relaxed' },
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
  const [settings, setSettings] = useState({ sound: true, language: 'English' })

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
