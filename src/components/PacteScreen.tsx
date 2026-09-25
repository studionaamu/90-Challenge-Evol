import { Signature, ChevronLeft, ChevronRight, Info } from 'lucide-react'

interface Pacte {
  engagement: string
  fierDeMoi: string
}

interface PacteScreenProps {
  pacte: Pacte
  onChange: (p: Pacte) => void
  onNext: () => void
  onBack: () => void
}

export function PacteScreen({ pacte, onChange, onNext, onBack }: PacteScreenProps) {
  const valid = pacte.engagement.trim() !== '' && pacte.fierDeMoi.trim() !== ''

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-sky mb-4">
          <Signature className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">Ton pacte EVOL</h1>
        <p className="text-white/60 text-lg">Un engagement envers toi-même, pas une promesse de perfection.</p>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-2 mb-4">
          <Info className="w-5 h-5 text-sky flex-shrink-0 mt-0.5" />
          <p className="text-white/70 leading-relaxed">
            Pendant ces 90 jours, je ne cherche pas à devenir parfait·e.
            <br />
            Je m'engage à devenir une personne qui...
          </p>
        </div>
        <input
          type="text"
          value={pacte.engagement}
          onChange={(e) => onChange({ ...pacte, engagement: e.target.value })}
          placeholder="...qui prend soin de son énergie, qui ose dire non, qui bouge chaque jour..."
          className="w-full bg-onyx/50 border border-sapphire/30 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-sapphire focus:outline-none focus:ring-1 focus:ring-sapphire transition-colors"
        />
      </div>

      <div className="bg-sapphire/5 border border-sapphire/20 rounded-2xl p-5 mb-6">
        <p className="text-sm text-white/60 leading-relaxed">
          <span className="text-sapphire-light font-medium">Si je rate un jour,</span> je m'engage à :
        </p>
        <p className="text-white/80 mt-2 font-medium">
          Reprendre dès que possible, sans me juger et sans abandonner mon cap.
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
        <label className="text-white/80 font-medium mb-2 block">À la fin des 90 jours, j'aurai évolué vers mon idéal si :</label>
        <textarea
          value={pacte.fierDeMoi}
          onChange={(e) => onChange({ ...pacte, fierDeMoi: e.target.value })}
          placeholder="Décris ton évolution idéale..."
          rows={3}
          className="w-full bg-onyx/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-sky focus:outline-none focus:ring-1 focus:ring-sky transition-colors resize-none"
        />
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
          disabled={!valid}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            valid ? 'bg-sapphire hover:bg-sapphire-light glow-sapphire text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          Valider mon Checkpoint
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
