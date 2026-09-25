import { STAGES } from '../data/domains'
import type { Stage } from '../data/domains'

interface ProgressHeaderProps {
  currentStage: Stage
}

export function ProgressHeader({ currentStage }: ProgressHeaderProps) {
  const stepIndex = STAGES.findIndex((s) => s.stage === currentStage)

  return (
    <div className="sticky top-0 z-50 bg-onyx/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-display font-bold text-sm tracking-widest text-white/80">EVOL</span>
          {stepIndex >= 0 && (
            <span className="text-xs text-white/40">
              Étape {stepIndex + 1} / {STAGES.length} — {STAGES[stepIndex].label}
            </span>
          )}
        </div>
        <div className="flex gap-1.5">
          {STAGES.map((s, i) => (
            <div
              key={s.stage}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= stepIndex ? 'gradient-sapphire-amethyst' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
