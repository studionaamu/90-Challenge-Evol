import { TrendingUp, Clock, Heart, ShieldCheck } from 'lucide-react'

interface WelcomeScreenProps {
  prenom: string
  onStart: () => void
}

export function WelcomeScreen({ prenom, onStart }: WelcomeScreenProps) {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-sapphire-amethyst mb-6 glow-sapphire">
          <TrendingUp className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-balance">Bienvenue, {prenom} !</h1>
        <p className="text-white/70 text-lg leading-relaxed text-balance">
          Ce questionnaire est un temps pour ralentir et regarder ta vie avec honnêteté, sans te juger. Il ne sert pas
          à établir tout ce qui ne va pas : il sert à voir ton point de départ, à choisir ce qui compte vraiment
          maintenant, puis à créer un chemin réaliste pour les 90 prochains jours.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4">
          <Clock className="w-5 h-5 text-sapphire-light flex-shrink-0 mt-0.5" />
          <p className="text-white/70 text-sm leading-relaxed">
            Prévois environ <span className="text-white font-medium">20 minutes</span>. Réponds spontanément et avec
            précision : il n'y a aucune « bonne » réponse.
          </p>
        </div>
        <div className="flex items-start gap-3 bg-garnet/5 border border-garnet/20 rounded-2xl p-4">
          <Heart className="w-5 h-5 text-garnet flex-shrink-0 mt-0.5" />
          <p className="text-white/60 text-sm leading-relaxed">
            <span className="text-garnet-light font-medium">Important :</span> EVOL est un espace d'évolution
            personnelle et collective. Il ne remplace pas un accompagnement médical, psychologique ou thérapeutique. Si
            ta santé physique ou mentale est préoccupante, fais-toi accompagner par un professionnel compétent.
          </p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-sapphire hover:bg-sapphire-light glow-sapphire text-white font-semibold text-lg transition-all duration-300"
        >
          Commencer mon parcours
          <ArrowRight />
        </button>
      </div>

      <div className="mt-8 flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4">
        <ShieldCheck className="w-5 h-5 text-sapphire-light flex-shrink-0 mt-0.5" />
        <p className="text-white/60 text-sm leading-relaxed">
          <span className="text-sapphire-light font-medium">Tes réponses restent confidentielles :</span> elles
          sont chiffrées, jamais partagées ni revendues, et seul·e·s les membres habilités de la team support EVOL
          peuvent y accéder, uniquement dans le cadre de ton accompagnement. Tu peux demander leur suppression à tout
          moment.
        </p>
      </div>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
