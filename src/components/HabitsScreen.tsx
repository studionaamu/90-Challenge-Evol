import { useState } from 'react'
import { Anchor, ChevronLeft, ChevronRight, Lightbulb, Plus } from 'lucide-react'
import { DOMAINS, DOMAIN_HABIT_IDEAS, emptyAnchorHabit } from '../data/domains'
import type { AnchorHabit } from '../data/domains'

interface HabitsScreenProps {
  priorities: string[]
  anchorHabits: Record<string, AnchorHabit>
  onChange: (h: Record<string, AnchorHabit>) => void
  onNext: () => void
  onBack: () => void
}

export function HabitsScreen({ priorities, anchorHabits, onChange, onNext, onBack }: HabitsScreenProps) {
  const [showIdeas, setShowIdeas] = useState(false)
  const [focusedDomain, setFocusedDomain] = useState<string | null>(null)

  const update = (domainId: string, field: keyof AnchorHabit, value: string) => {
    const habit = anchorHabits[domainId] ?? emptyAnchorHabit(domainId)
    onChange({ ...anchorHabits, [domainId]: { ...habit, [field]: value } })
  }

  const applyIdea = (domainId: string, idea: string) => {
    update(domainId, 'habitude', idea)
    setFocusedDomain(null)
  }

  const allComplete = priorities.every((id) => {
    const h = anchorHabits[id]
    return h && h.habitude.trim() !== '' && h.rythme.trim() !== '' && h.versionMinimale.trim() !== ''
  })

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-sky mb-4">
          <Anchor className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">Tes habitudes d'ancrage</h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Le changement ne viendra pas d'une transformation parfaite. Il viendra de gestes simples, répétés
          consciemment, qui deviennent peu à peu une preuve que tu prends soin de ta vie.
        </p>
        <p className="text-white/40 text-sm mt-3">
          Pour chacun de tes trois domaines prioritaires, choisis une habitude d'ancrage principale. Elle doit être
          réaliste, précise et réalisable même lors d'une semaine imparfaite.
        </p>
      </div>

      <div className="space-y-5">
        {priorities.map((domainId, i) => {
          const domain = DOMAINS.find((d) => d.id === domainId)
          const habit = anchorHabits[domainId] ?? emptyAnchorHabit(domainId)
          const isFocused = focusedDomain === domainId

          return (
            <div key={domainId} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-lg gradient-sky flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <h3 className="font-display font-semibold">{domain?.label}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/50 font-medium mb-1.5 block">Mon habitude d'ancrage</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={habit.habitude}
                      onChange={(e) => update(domainId, 'habitude', e.target.value)}
                      onFocus={() => setFocusedDomain(domainId)}
                      placeholder="Décris ton habitude..."
                      className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-sapphire focus:outline-none focus:ring-1 focus:ring-sapphire transition-colors text-sm"
                    />
                    <button
                      onClick={() => setShowIdeas(!showIdeas)}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-sapphire/10 border border-sapphire/30 text-sky text-sm font-medium hover:bg-sapphire/20 transition-colors flex-shrink-0"
                    >
                      <Lightbulb className="w-4 h-4" />
                      Idées
                    </button>
                  </div>
                  {showIdeas && isFocused && (
                    <div className="mt-2 bg-white/[0.03] border border-white/10 rounded-xl p-3 space-y-3 animate-scale-in">
                      <p className="text-xs font-bold tracking-widest text-sky">
                        Idées pour « {domain?.shortLabel} »
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(DOMAIN_HABIT_IDEAS[domainId] ?? []).map((idea) => (
                          <button
                            key={idea}
                            onClick={() => applyIdea(domainId, idea)}
                            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:bg-sapphire/20 hover:border-sapphire/40 hover:text-white/90 transition-all"
                          >
                            {idea}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-white/50 font-medium mb-1.5 block">Quand / à quel rythme ?</label>
                  <input
                    type="text"
                    value={habit.rythme}
                    onChange={(e) => update(domainId, 'rythme', e.target.value)}
                    placeholder="Ex: Chaque matin, 3x par semaine..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-sapphire focus:outline-none focus:ring-1 focus:ring-sapphire transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/50 font-medium mb-1.5 block">
                    Version minimale les jours difficiles
                  </label>
                  <input
                    type="text"
                    value={habit.versionMinimale}
                    onChange={(e) => update(domainId, 'versionMinimale', e.target.value)}
                    placeholder="Ex: 2 minutes au lieu de 20..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-sky focus:outline-none focus:ring-1 focus:ring-sky transition-colors text-sm"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Plus className="w-4 h-4 text-sky" />
          <span className="text-sm text-white/60 font-medium">Autre habitude que tu veux créer</span>
        </div>
        <p className="text-xs text-white/40">
          Tu peux l'ajouter directement dans le champ « Mon habitude d'ancrage » d'un de tes domaines.
        </p>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Retour
        </button>
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
  )
}
