import { Award, Download, Lock } from 'lucide-react'
import { useState } from 'react'
import { useGame } from '../context/GameContext'
import { Button, Modal } from './ui'
export default function CertificateView() {
  const { setModal, player, collectedCards } = useGame()
  const [downloading, setDownloading] = useState(false)
  const earned = collectedCards.length === 6
  const download = () => { setDownloading(true); window.setTimeout(() => setDownloading(false), 900) }
  return <Modal title="CodeX certificate" onClose={() => setModal(null)}><div className={`relative rounded-3xl border p-8 text-center ${earned ? 'border-gold/50 bg-gradient-to-br from-gold/20 to-plum' : 'border-white/10 bg-white/5'}`}>{earned ? <Award className="mx-auto text-gold" size={55} /> : <Lock className="mx-auto text-white/40" size={45} />}<p className="mt-4 text-xs font-black uppercase tracking-[.2em] text-mint">{earned ? 'Achievement unlocked' : 'Keep exploring'}</p><h3 className="mt-2 text-2xl font-black">{earned ? 'Myanmar Slang Explorer' : 'Certificate locked'}</h3><p className="mt-3 text-sm leading-6 text-white/60">{earned ? `Awarded to ${player.name} for mastering all six destinations.` : `Collect all six slang stamps to earn your certificate. ${collectedCards.length}/6 complete.`}</p></div>{earned && <Button className="mt-5 flex w-full items-center justify-center gap-2" onClick={download} disabled={downloading}><Download size={17} /> {downloading ? 'Preparing certificate...' : 'Download certificate'}</Button>}</Modal>
}
