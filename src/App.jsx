import { useGame } from './context/GameContext'
import WelcomeScreen from './components/WelcomeScreen'
import WorldMap from './components/WorldMap'
import AssemblyChallenge from './components/AssemblyChallenge'
import CastleChat from './components/CastleChat'
import CollectionBook from './components/CollectionBook'
import StampCollection from './components/StampCollection'
import SettingsScreen from './components/SettingsScreen'
import Leaderboard from './components/Leaderboard'
import CertificateView from './components/CertificateView'
import UserProfile from './components/UserProfile'
import SignInScreen from './components/SignInScreen'
import CreateAccount from './components/CreateAccount'
import AvatarSelection from './components/AvatarSelection'
import AccountCreated from './components/AccountCreated'
import NaypyitawIntro from './components/NaypyitawIntro'
import YangonIntro from './components/YangonIntro'
import YangonQuiz from './components/YangonQuiz'

export default function App() {
  const { activeScreen, modal } = useGame()
  const screens = { welcome: <WelcomeScreen />, signin: <SignInScreen />, 'create-account': <CreateAccount />, 'account-created': <AccountCreated />, avatar: <AvatarSelection />, map: <WorldMap />, settings: <SettingsScreen />, 'naypyitaw-intro': <NaypyitawIntro />, 'yangon-intro': <YangonIntro />, 'yangon-quiz': <YangonQuiz />, assembly: <AssemblyChallenge />, castle: <CastleChat />, collection: <CollectionBook />, 'stamp-collection': <StampCollection /> }
  const modals = { leaderboard: <Leaderboard />, certificate: <CertificateView />, profile: <UserProfile /> }
  return <div className="min-h-screen">{screens[activeScreen] || screens.welcome}{modal && modals[modal]}</div>
}
