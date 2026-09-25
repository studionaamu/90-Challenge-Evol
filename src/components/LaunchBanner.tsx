import { MessageCircle } from 'lucide-react'

/** Groupe communautaire WhatsApp EVOL (encart Live + bouton de fin de parcours). */
export const WHATSAPP_URL = 'https://chat.whatsapp.com/L6eIbCLm20pBHvEOkdSBPy?mode=gi_t'

/**
 * Encart « Live de lancement », cliquable vers le groupe WhatsApp.
 * Affiché uniquement à la fin du parcours, une fois les questions répondues.
 */
export function LaunchBanner() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-sapphire/30 bg-gradient-to-r from-sapphire/15 via-amethyst/15 to-sapphire/15 animate-shimmer mt-12 mb-6 animate-slide-up transition-colors hover:border-sky/60"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/[0.07] to-transparent animate-shimmer pointer-events-none" />
      <div className="relative flex items-center gap-4 px-5 py-4">
        <span className="relative flex h-3 w-3 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sapphire-light opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sapphire-light" />
        </span>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          <span className="font-semibold text-white">Live de lancement</span> le{' '}
          <span className="font-semibold text-sapphire-light">28 septembre 2026 à 20h</span> afin de découvrir en
          détails le programme EVOL.
        </p>
        <MessageCircle className="w-5 h-5 text-sky flex-shrink-0 ml-auto opacity-70 transition-opacity group-hover:opacity-100" />
      </div>
    </a>
  )
}
