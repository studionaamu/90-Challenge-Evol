import { useState } from 'react'
import { Check, Download, RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react'
import { DOMAINS } from '../data/domains'
import type { PhotoScores, StartingPoint, AnchorHabit, Pacte } from '../data/domains'
import { WHATSAPP_URL, LaunchBanner } from './LaunchBanner'
import { generateResponsesPdf } from '../lib/exportPdf'

interface SummaryScreenProps {
  photoScores: PhotoScores
  priorities: string[]
  startingPoints: Record<string, StartingPoint>
  anchorHabits: Record<string, AnchorHabit>
  pacte: Pacte
  prenom: string
  onRestart: () => void
}

export function SummaryScreen({
  photoScores,
  priorities,
  startingPoints,
  anchorHabits,
  pacte,
  prenom,
  onRestart,
}: SummaryScreenProps) {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    generateResponsesPdf({ photoScores, priorities, startingPoints, anchorHabits, pacte, prenom })
    setDownloaded(true)
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 py-8 text-center">
      {!downloaded ? (
        <>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ton parcours est complet</h1>
          <p className="text-white/60 text-lg mb-8">
            Télécharge ton document PDF — ton point de départ, tes trois priorités, tes habitudes d'ancrage et ton
            pacte — pour le garder sous les yeux pendant les 90 jours.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-left mb-8 space-y-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-sapphire-light">MES 3 PRIORITÉS</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {priorities.map((id) => {
                  const domain = DOMAINS.find((d) => d.id === id)
                  return (
                    <span
                      key={id}
                      className="px-3 py-1 rounded-lg bg-sapphire/15 border border-sapphire/30 text-sm"
                    >
                      {domain?.label} — {photoScores[id]}/10
                    </span>
                  )
                })}
              </div>
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-sky">MES HABITUDES D'ANCRAGE</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {priorities.map((id) => {
                  const habit = anchorHabits[id]
                  return habit?.habitude ? (
                    <span key={id} className="px-3 py-1 rounded-full bg-sky/15 border border-sky/30 text-sm">
                      {habit.habitude}
                    </span>
                  ) : null
                })}
              </div>
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-sky">MON PACTE</span>
              <p className="text-sm text-white/70 mt-2 italic">
                « Je m'engage à devenir une personne qui {pacte.engagement} »
              </p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 mx-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 glow-emerald text-white font-semibold text-lg transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Télécharger mes questions et réponses (PDF)
          </button>

          <div className="mt-8 flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-left">
            <ShieldCheck className="w-5 h-5 text-sapphire-light flex-shrink-0 mt-0.5" />
            <p className="text-white/60 text-sm leading-relaxed">
              <span className="text-sapphire-light font-medium">Tes réponses restent confidentielles :</span> elles ne
              quittent pas ton appareil, ne sont jamais partagées ni revendues, et restent sous ton entière contrôle.
            </p>
          </div>

          <LaunchBanner />
        </>
      ) : (
        <>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sapphire/20 border border-sapphire/40 mb-4 animate-scale-in">
            <Check className="w-8 h-8 text-sapphire-light" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Réponses téléchargées !</h1>
          <p className="text-white/60 mb-8">
            Ton PDF est dans tes téléchargements. Garde-le près de toi et relis tes engagements tout au long du
            challenge.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 glow-emerald text-white font-semibold transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Télécharger à nouveau
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#128C7E] hover:bg-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.3)] text-white font-semibold transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Rejoindre la communauté WhatsApp
            </a>
            <button
              onClick={onRestart}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-medium transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Recommencer
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-sm">
            <span className="flex items-center gap-1.5 text-sapphire-light">
              <Check className="w-4 h-4" />
              Réponses exportées
            </span>
          </div>

          <LaunchBanner />
        </>
      )}
    </div>
  )
}
