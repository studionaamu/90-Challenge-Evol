import { useRef, useState } from 'react'
import { ArrowRight, ShieldCheck, User, Mail, Phone } from 'lucide-react'

const SUBMISSION_URL =
  'https://script.google.com/macros/s/AKfycbxMz70Fg31OQRdwIAPFl_W2PC4qXHsBCBFRwerAY63_cDpSDrwFG_tB--xaHQYphdsRPg/exec'

interface IdentityScreenProps {
  onDone: (identity: { prenom: string; email: string; telephone: string }) => void
}

export function IdentityScreen({ onDone }: IdentityScreenProps) {
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const submitAttemptedRef = useRef(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const phoneValid = telephone.trim().length >= 8
  const valid = prenom.trim() !== '' && emailValid && phoneValid

  const handleSubmit = () => {
    if (!valid || submitAttemptedRef.current) return
    submitAttemptedRef.current = true
    setSubmitting(true)
    onDone({ prenom: prenom.trim(), email: email.trim(), telephone: telephone.trim() })

    // Envoi des coordonnées vers Google Apps Script (feuille de suivi de la team EVOL).
    // Fire-and-forget : le parcours continue même si l'envoi échoue (réseau, CORS, etc.).
    const body = new URLSearchParams({
      prenom: prenom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
    })
    void fetch(SUBMISSION_URL, { method: 'POST', mode: 'no-cors', body }).catch(() => {})
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-sapphire-amethyst mb-6 glow-sapphire">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-balance">Bienvenue dans EVOL</h1>
        <p className="text-white/70 text-lg leading-relaxed text-balance">
          Avant de commencer, laisse-nous quelques coordonnées pour ouvrir ton espace. Cela ne prend qu'une minute, puis
          tu enchaînes sur ton parcours tranquillement.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="flex items-center gap-2 text-white/80 font-medium mb-2 text-sm">
            <User className="w-4 h-4 text-sapphire-light" />
            Ton prénom
          </label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Ex : Camille"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-sapphire focus:outline-none focus:ring-1 focus:ring-sapphire transition-colors"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-white/80 font-medium mb-2 text-sm">
            <Mail className="w-4 h-4 text-sapphire-light" />
            Ton adresse e-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex : camille@exemple.fr"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-sapphire focus:outline-none focus:ring-1 focus:ring-sapphire transition-colors"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-white/80 font-medium mb-2 text-sm">
            <Phone className="w-4 h-4 text-sapphire-light" />
            Ton numéro de téléphone
          </label>
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="Ex : 06 12 34 56 78"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-sapphire focus:outline-none focus:ring-1 focus:ring-sapphire transition-colors"
          />
        </div>
      </div>

      <div className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6">
        <ShieldCheck className="w-5 h-5 text-sapphire-light flex-shrink-0 mt-0.5" />
        <p className="text-white/60 text-sm leading-relaxed">
          <span className="text-sapphire-light font-medium">Tes données sont protégées :</span> elles restent chez toi,
          ne sont jamais partagées ni revendues, et seul·e·s les membres habilités de la team support EVOL peuvent y
          accéder si tu leur en fais la demande, uniquement dans le cadre de ton accompagnement.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!valid || submitting}
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
            valid ? 'bg-sapphire hover:bg-sapphire-light glow-sapphire' : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          Commencer mon parcours
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
