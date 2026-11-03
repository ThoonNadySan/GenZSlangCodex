import { useGame } from './context/GameContext'
import WelcomeScreen from './components/WelcomeScreen'
import WorldMap from './components/WorldMap'
import AssemblyChallenge from './components/AssemblyChallenge'
import CastleChat from './components/CastleChat'
import CollectionBook from './components/CollectionBook'
import SettingsModal from './components/SettingsModal'
import Leaderboard from './components/Leaderboard'
import CertificateView from './components/CertificateView'
import UserProfile from './components/UserProfile'
import CreateAccount from './components/CreateAccount'

export default function App() {
  const { activeScreen, modal } = useGame()
  const screens = { welcome: <WelcomeScreen />, 'create-account': <CreateAccount />, map: <WorldMap />, assembly: <AssemblyChallenge />, castle: <CastleChat />, collection: <CollectionBook /> }
  const modals = { settings: <SettingsModal />, leaderboard: <Leaderboard />, certificate: <CertificateView />, profile: <UserProfile /> }
  return <div className="min-h-screen">{screens[activeScreen] || screens.welcome}{modal && modals[modal]}</div>
}
