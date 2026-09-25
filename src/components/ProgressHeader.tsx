import { STAGES } from '../data/domains'
import type { Stage } from '../data/domains'

interface ProgressHeaderProps {
  currentStage: Stage
}

export function ProgressHeader({ currentStage }: ProgressHeaderProps) {
  const stepIndex = STAGES.findIndex((s) => s.stage === currentStage)
  const progress = stepIndex >= 0 ? ((stepIndex + 1) / STAGES.length) * 100 : 0

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
        {/* Barre unique : le gradient bleu se propage du début à la fin de la progression */}
        <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #1525FF 0%, #38BDF8 100%)' }}
          />
        </div>
      </div>
    </div>
  )
}
