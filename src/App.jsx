import { useGame } from './context/GameContext'
import WelcomeScreen from './components/WelcomeScreen'
import WorldMap from './components/WorldMap'
import AssemblyChallenge from './components/AssemblyChallenge'
import CastleChat from './components/CastleChat'
import CollectionBook from './components/CollectionBook'
import SettingsScreen from './components/SettingsScreen'
import Leaderboard from './components/Leaderboard'
import CertificateView from './components/CertificateView'
import UserProfile from './components/UserProfile'
import SignInScreen from './components/SignInScreen'
import CreateAccount from './components/CreateAccount'
import AvatarSelection from './components/AvatarSelection'

export default function App() {
  const { activeScreen, modal } = useGame()
  const screens = { welcome: <WelcomeScreen />, signin: <SignInScreen />, 'create-account': <CreateAccount />, avatar: <AvatarSelection />, map: <WorldMap />, settings: <SettingsScreen />, assembly: <AssemblyChallenge />, castle: <CastleChat />, collection: <CollectionBook /> }
  const modals = { leaderboard: <Leaderboard />, certificate: <CertificateView />, profile: <UserProfile /> }
  return <div className="min-h-screen">{screens[activeScreen] || screens.welcome}{modal && modals[modal]}</div>
}
