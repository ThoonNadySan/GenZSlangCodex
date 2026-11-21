import { useGame } from './context/GameContext'
import WelcomeScreen from './components/WelcomeScreen'
import WorldMap from './components/WorldMap'
import AssemblyChallenge from './components/AssemblyChallenge'
import Destination5Bagan from './components/Destination5Bagan'
import BaganIntroduction from './components/BaganIntroduction'
import CastleChat from './components/CastleChat'
import CollectionBook from './components/CollectionBook'
import SettingsScreen from './components/SettingsScreen'
import Leaderboard from './components/Leaderboard'
import CertificateView from './components/CertificateView'
import UserProfile from './components/UserProfile'
import SignInScreen from './components/SignInScreen'
import CreateAccount from './components/CreateAccount'
import AvatarSelection from './components/AvatarSelection'
import AccountCreated from './components/AccountCreated'
import NaypyitawIntro from './components/NaypyitawIntro'
import NaypyitawClear from './components/NaypyitawClear'

export default function App() {
  const { activeScreen, modal } = useGame()
  const screens = { welcome: <WelcomeScreen />, signin: <SignInScreen />, 'create-account': <CreateAccount />, 'account-created': <AccountCreated />, avatar: <AvatarSelection />, map: <WorldMap />, settings: <SettingsScreen />, assembly: <AssemblyChallenge />, 'bagan-intro': <BaganIntroduction />, bagan: <Destination5Bagan />, 'naypyitaw-intro': <NaypyitawIntro />, 'naypyitaw-clear': <NaypyitawClear />, castle: <CastleChat />, collection: <CollectionBook /> }
  const modals = { leaderboard: <Leaderboard />, certificate: <CertificateView />, profile: <UserProfile /> }
  return <div className="min-h-screen">{screens[activeScreen] || screens.welcome}{modal && modals[modal]}</div>
}
