import { useState, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import { Check, Download, RotateCcw, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react'
import { DOMAINS } from '../data/domains'
import type { PhotoScores, StartingPoint, AnchorHabit, Pacte } from '../data/domains'
import { EvolutionCard } from './EvolutionCard'

interface SummaryScreenProps {
  photoScores: PhotoScores
  priorities: string[]
  startingPoints: Record<string, StartingPoint>
  anchorHabits: Record<string, AnchorHabit>
  pacte: Pacte
  onRestart: () => void
}

type SaveState = 'idle' | 'loading' | 'done' | 'error'

export function SummaryScreen({
  photoScores,
  priorities,
  startingPoints,
  anchorHabits,
  pacte,
  onRestart,
}: SummaryScreenProps) {
  const [imageState, setImageState] = useState<SaveState>('idle')
  const [imageData, setImageData] = useState<string | null>(null)
  const [error, setError] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)

  const generateImage = useCallback(async () => {
    if (!cardRef.current) return
    setImageState('loading')
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#000000',
        cacheBust: true,
      })
      setImageData(dataUrl)
      setImageState('done')
    } catch {
      setError("Impossible de générer l'image. Réessaie s'il te plaît.")
      setImageState('error')
    }
  }, [])

  const handleGenerate = useCallback(async () => {
    setError('')
    await generateImage()
  }, [generateImage])

  const downloadImage = useCallback(() => {
    if (!imageData) return
    const link = document.createElement('a')
    link.download = 'grande-carte-evolution-evol.png'
    link.href = imageData
    link.click()
  }, [imageData])

  const allDone = imageState === 'done'
  const isLoading = imageState === 'loading'
  const isError = imageState === 'error'

  const hiddenCard = (
    <div className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none">
      <EvolutionCard
        ref={cardRef}
        photoScores={photoScores}
        priorities={priorities}
        startingPoints={startingPoints}
        anchorHabits={anchorHabits}
        pacte={pacte}
      />
    </div>
  )

  if (imageState === 'idle') {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto px-4 py-8 text-center">
        {hiddenCard}
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ta Grande Carte d'Évolution est prête</h1>
        <p className="text-white/60 text-lg mb-8">
          Nous allons sauvegarder tes réponses et générer ta carte visuelle — une représentation de ton point de départ,
          de tes trois directions prioritaires et des petits engagements qui rendront ton évolution visible.
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
            <span className="text-xs font-bold tracking-widest text-amethyst-light">MES HABITUDES D'ANCRAGE</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {priorities.map((id) => {
                const habit = anchorHabits[id]
                return habit?.habitude ? (
                  <span
                    key={id}
                    className="px-3 py-1 rounded-full bg-amethyst/15 border border-amethyst/30 text-sm"
                  >
                    {habit.habitude}
                  </span>
                ) : null
              })}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest text-garnet-light">MON PACTE</span>
            <p className="text-sm text-white/70 mt-2 italic">
              « Je m'engage à devenir une personne qui {pacte.engagement} »
            </p>
          </div>
        </div>

        {isError && (
          <div className="flex items-center gap-2 text-garnet-light bg-garnet/10 border border-garnet/30 rounded-xl p-3 mb-6">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="flex items-center gap-2 mx-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 glow-emerald text-white font-semibold text-lg transition-all duration-300 disabled:opacity-50"
        >
          Générer ma Grande Carte d'Évolution
        </button>

        <div className="mt-8 flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-left">
          <ShieldCheck className="w-5 h-5 text-sapphire-light flex-shrink-0 mt-0.5" />
          <p className="text-white/60 text-sm leading-relaxed">
            <span className="text-sapphire-light font-medium">Tes réponses restent confidentielles :</span> elles ne
            quittent pas ton appareil, ne sont jamais partagées ni revendues, et restent sous ton entière contrôle.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 py-8 text-center">
      {hiddenCard}

      {allDone && (
        <>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sapphire/20 border border-sapphire/40 mb-4 animate-scale-in">
            <Check className="w-8 h-8 text-sapphire-light" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Grande Carte générée !</h1>
          <p className="text-white/60 mb-6">
            Ton image est prête. Télécharge-la et garde-la près de toi tout au long du challenge.
          </p>
          {imageData && (
            <div className="inline-block rounded-2xl overflow-hidden border border-white/10 mb-6 animate-scale-in">
              <img src={imageData} alt="Grande Carte d'Évolution EVOL" className="w-[260px] h-auto" />
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={downloadImage}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 glow-emerald text-white font-semibold transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Télécharger ma Grande Carte
            </button>
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
              Carte générée
            </span>
          </div>
        </>
      )}

      {isLoading && !allDone && (
        <div className="flex flex-col items-center gap-4 py-12">
          <Loader2 className="w-10 h-10 animate-spin text-sapphire-light" />
          <p className="text-white/60">Génération de l'image...</p>
        </div>
      )}

      {isError && !allDone && !isLoading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-garnet-light bg-garnet/10 border border-garnet/30 rounded-xl p-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
          <button
            onClick={handleGenerate}
            className="px-6 py-3 rounded-xl bg-garnet hover:bg-garnet-light text-white font-semibold transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  )
}
