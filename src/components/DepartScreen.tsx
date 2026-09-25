import { useState } from 'react'
import { Camera, Flame, Target, Check, ChevronLeft, ChevronRight, Gauge } from 'lucide-react'
import { DOMAINS, emptyStartingPoint } from '../data/domains'
import type { StartingPoint, PhotoScores } from '../data/domains'

interface DepartScreenProps {
  priorities: string[]
  photoScores: PhotoScores
  startingPoints: Record<string, StartingPoint>
  onScoresChange: (s: PhotoScores) => void
  onChange: (sp: Record<string, StartingPoint>) => void
  onNext: () => void
  onBack: () => void
}

export function DepartScreen({
  priorities,
  photoScores,
  startingPoints,
  onScoresChange,
  onChange,
  onNext,
  onBack,
}: DepartScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const domainId = priorities[currentIndex]
  const domain = DOMAINS.find((d) => d.id === domainId)
  const point = startingPoints[domainId] ?? emptyStartingPoint(domainId)
  const score = photoScores[domainId] ?? 5

  const onScoreChange = (id: string, value: number) => {
    onScoresChange({ ...photoScores, [id]: value })
  }

  const isComplete = (id: string) => {
    const sp = startingPoints[id]
    return sp && sp.photographie.trim() !== '' && sp.importance.trim() !== '' && sp.projection90j.trim() !== '' && sp.premierePreuve.trim() !== ''
  }
  const currentComplete =
    point.photographie.trim() !== '' &&
    point.importance.trim() !== '' &&
    point.projection90j.trim() !== '' &&
    point.premierePreuve.trim() !== ''
  const allComplete = priorities.every((id) => isComplete(id))

  const update = (field: keyof StartingPoint, value: string) => {
    onChange({ ...startingPoints, [domainId]: { ...point, [field]: value } })
  }

  const nextDomain = () => {
    if (currentIndex < priorities.length - 1) setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">Ton point de départ</h1>
        <p className="text-white/60 text-lg">Pour chacun de tes trois domaines, réponds aux questions suivantes.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {priorities.map((id, i) => {
          const d = DOMAINS.find((x) => x.id === id)
          const active = i === currentIndex
          const done = isComplete(id)
          return (
            <button
              key={id}
              onClick={() => setCurrentIndex(i)}
              className={`flex items-center gap-2 flex-shrink-0 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                active ? 'gradient-sapphire-amethyst text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              {d?.shortLabel}
              {done && <Check className="w-4 h-4 text-sapphire-light" />}
            </button>
          )
        })}
      </div>

      <div className="animate-slide-up space-y-6">
        <div className="bg-sapphire/5 border border-sapphire/20 rounded-2xl p-4">
          <p className="text-sm text-white/60">
            <span className="font-display font-semibold text-white">
              Domaine n°{currentIndex + 1} : {domain?.label}
            </span>
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-white/80 font-medium text-sm">
              <Gauge className="w-4 h-4 text-sapphire-light" />
              Ma note actuelle pour ce domaine
            </label>
            <span
              className={`font-display text-2xl font-bold ${
                score <= 3 ? 'text-garnet' : score <= 7 ? 'text-amethyst-light' : 'text-sapphire-light'
              }`}
            >
              {score}/10
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={score}
            onChange={(e) => onScoreChange(domainId, Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-white/40 mt-2">
            Tu peux ajuster cette note à tout moment pendant cette étape.
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-white/80 font-medium mb-2">
            <Camera className="w-4 h-4 text-sapphire-light" />
            Ma photographie actuelle
          </label>
          <p className="text-xs text-white/40 mb-2">
            Décris simplement ce que tu vis aujourd'hui. Qu'est-ce qui fonctionne ? Qu'est-ce qui te frustre, te fatigue
            ou ne te convient plus ? Donne des exemples concrets de ton quotidien.
          </p>
          <textarea
            value={point.photographie}
            onChange={(e) => update('photographie', e.target.value)}
            placeholder="Ce que je vis aujourd'hui..."
            rows={4}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:border-sapphire focus:outline-none focus:ring-1 focus:ring-sapphire transition-colors resize-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-white/80 font-medium mb-2">
            <Flame className="w-4 h-4 text-garnet" />
            Pourquoi est-ce important pour moi de faire évoluer ce domaine maintenant ?
          </label>
          <textarea
            value={point.importance}
            onChange={(e) => update('importance', e.target.value)}
            placeholder="Pourquoi maintenant..."
            rows={3}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:border-garnet focus:outline-none focus:ring-1 focus:ring-garnet transition-colors resize-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-white/80 font-medium mb-2">
            <Target className="w-4 h-4 text-amethyst-light" />
            Dans 90 jours, qu'aimerais-tu pouvoir dire, au présent ?
          </label>
          <p className="text-xs text-white/40 mb-2">
            Décris une évolution réaliste et observable, comme si elle était déjà en cours.
          </p>
          <textarea
            value={point.projection90j}
            onChange={(e) => update('projection90j', e.target.value)}
            placeholder="Dans 90 jours, je..."
            rows={3}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:border-amethyst focus:outline-none focus:ring-1 focus:ring-amethyst transition-colors resize-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-white/80 font-medium mb-2">
            <Check className="w-4 h-4 text-sapphire-light" />
            La première preuve concrète que j'aurai avancé sera :
          </label>
          <textarea
            value={point.premierePreuve}
            onChange={(e) => update('premierePreuve', e.target.value)}
            placeholder="Ma première preuve d'évolution..."
            rows={2}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:border-sapphire focus:outline-none focus:ring-1 focus:ring-sapphire transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Retour
        </button>
        <div className="flex items-center gap-4">
          {currentIndex < 2 && (
            <button
              onClick={nextDomain}
              disabled={!currentComplete}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentComplete ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              Domaine suivant
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onNext}
            disabled={!allComplete}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              allComplete
                ? 'bg-sapphire hover:bg-sapphire-light glow-sapphire text-white'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            Suivant
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
