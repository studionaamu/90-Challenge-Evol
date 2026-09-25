import {
  Gauge,
  Check,
  Users,
  Briefcase,
  HeartPulse,
  Heart,
  Home,
  Zap,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { DOMAINS } from '../data/domains'
import type { PhotoScores, Priorities } from '../data/domains'

const ICONS: Record<string, LucideIcon> = {
  Users,
  Briefcase,
  HeartPulse,
  Heart,
  Home,
  Zap,
  Sparkles,
}

interface PhotoScreenProps {
  scores: PhotoScores
  priorities: Priorities
  onScoresChange: (s: PhotoScores) => void
  onPrioritiesChange: (p: Priorities) => void
  onNext: () => void
}

export function PhotoScreen({ scores, priorities, onScoresChange, onPrioritiesChange, onNext }: PhotoScreenProps) {
  const maxReached = priorities.length >= 3
  const allSelected = priorities.length === 3

  const togglePriority = (id: string) => {
    if (priorities.includes(id)) {
      onPrioritiesChange(priorities.filter((p) => p !== id))
    } else if (priorities.length < 3) {
      onPrioritiesChange([...priorities, id])
    }
  }

  const setScore = (id: string, value: number) => {
    onScoresChange({ ...scores, [id]: value })
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-sapphire-amethyst mb-4">
          <Gauge className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">Ta photo du moment</h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Découvre les 7 domaines de ta vie.{' '}
          <span className="text-sapphire-light font-medium">Sélectionne et note les 3 domaines</span> sur lesquels tu
          veux te concentrer pendant les 90 prochains jours.
        </p>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <span className="text-white/40">
            <span className="text-sky font-bold">0</span> — insatisfaisant
          </span>
          <span className="text-white/40">
            <span className="text-sapphire-light font-bold">10</span> — pleinement aligné·e
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i < priorities.length ? 'w-10 bg-sapphire' : 'w-2.5 bg-white/20'
            }`}
          />
        ))}
        <span className="text-sm text-white/40 ml-2">{priorities.length}/3 sélectionnées</span>
      </div>

      <div className="space-y-4">
        {DOMAINS.map((domain) => {
          const Icon = ICONS[domain.icon]
          const score = scores[domain.id] ?? 5
          const isSelected = priorities.includes(domain.id)
          const dimmed = maxReached && !isSelected

          return (
            <div
              key={domain.id}
              onClick={() => togglePriority(domain.id)}
              className={`bg-white/[0.03] border rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-sapphire/40 glow-sapphire'
                  : dimmed
                    ? 'border-white/5 opacity-40 cursor-not-allowed'
                    : 'border-white/10 hover:border-white/25'
              }`}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  togglePriority(domain.id)
                }
              }}
            >
              <div className="flex items-start gap-4 mb-3">
                <div
                  className={`pointer-events-none flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 transition-all duration-300 ${
                    isSelected ? 'gradient-sapphire-amethyst' : 'bg-white/5'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  ) : (
                    <Icon className="w-5 h-5 text-white/80" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-base mb-1">{domain.label}</h3>
                  <p className="text-sm text-white/50 leading-snug">{domain.description}</p>
                </div>
                {isSelected && (
                  <span
                    className={`font-display text-3xl font-bold flex-shrink-0 transition-colors ${
                      score < 5 ? 'text-garnet' : 'text-sapphire-light'
                    }`
                    }
                  >
                    {score}
                  </span>
                )}
              </div>
              {isSelected && (
                <div className="animate-slide-up pl-15" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={score}
                    onChange={(e) => setScore(domain.id, Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-end mt-8">
        <button
          onClick={onNext}
          disabled={!allSelected}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            allSelected
              ? 'bg-sapphire hover:bg-sapphire-light glow-sapphire text-white'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          Suivant
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
