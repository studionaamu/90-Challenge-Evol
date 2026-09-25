import { useState } from 'react'
import { ArrowRight, ShieldCheck, Loader2, AlertTriangle, User, Mail, Phone } from 'lucide-react'
import { saveEvolUser } from '../lib/supabase'

interface IdentityScreenProps {
  onDone: (identity: { prenom: string; email: string; telephone: string }) => void
}

export function IdentityScreen({ onDone }: IdentityScreenProps) {
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const phoneValid = telephone.trim().length >= 8
  const valid = prenom.trim() !== '' && emailValid && phoneValid

  const handleSubmit = async () => {
    if (!valid || state === 'loading') return
    setState('loading')
    setError('')
    try {
      await saveEvolUser({ prenom: prenom.trim(), email: email.trim(), telephone: telephone.trim() })
      setState('idle')
      onDone({ prenom: prenom.trim(), email: email.trim(), telephone: telephone.trim() })
    } catch {
      setError("L'envoi a échoué. Vérifie ta connexion puis réessaie.")
      setState('error')
    }
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
          <span className="text-sapphire-light font-medium">Tes données sont protégées :</span> elles sont chiffrées,
          jamais partagées ni revendues, et seul·e·s les membres habilités de la team support EVOL peuvent y accéder,
          uniquement dans le cadre de ton accompagnement. Tu peux demander leur suppression à tout moment.
        </p>
      </div>

      {state === 'error' && (
        <div className="flex items-center gap-2 text-garnet-light bg-garnet/10 border border-garnet/30 rounded-xl p-3 mb-6">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!valid || state === 'loading'}
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
            valid && state !== 'loading'
              ? 'bg-sapphire hover:bg-sapphire-light glow-sapphire'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          {state === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
          Commencer mon parcours
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
