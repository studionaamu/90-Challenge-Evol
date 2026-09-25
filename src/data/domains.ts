export interface Domain {
  id: string
  label: string
  shortLabel: string
  description: string
  icon: string
}

export const DOMAINS: Domain[] = [
  {
    id: 'famille',
    label: 'Famille et foyer',
    shortLabel: 'Famille',
    description:
      "La qualité de tes liens familiaux, ton couple si tu es concerné·e, le temps partagé, l'équilibre du foyer et ta présence auprès de tes proches.",
    icon: 'Users',
  },
  {
    id: 'activite',
    label: 'Activité professionnelle',
    shortLabel: 'Carrière',
    description:
      "Ton travail, tes projets, ton sentiment d'utilité, ton équilibre de charge, ta sécurité financière et ta capacité à construire une trajectoire qui te ressemble.",
    icon: 'Briefcase',
  },
  {
    id: 'sante',
    label: 'Santé et corps',
    shortLabel: 'Santé',
    description:
      'Ton sommeil, ton énergie physique, ton alimentation, ton mouvement, ta récupération et ton rapport à ton corps.',
    icon: 'HeartPulse',
  },
  {
    id: 'relations',
    label: 'Relations et lien social',
    shortLabel: 'Relations',
    description:
      "Tes amitiés, tes relations amoureuses hors foyer, ta capacité à demander du soutien, à poser tes limites et à nourrir des liens qui te font du bien.",
    icon: 'Heart',
  },
  {
    id: 'environnement',
    label: 'Cadre de vie et environnement',
    shortLabel: 'Environnement',
    description:
      "Ton lieu de vie, ton organisation quotidienne, tes objets, ton rapport au numérique et la façon dont ton environnement soutient — ou freine — ta vie.",
    icon: 'Home',
  },
  {
    id: 'energie',
    label: 'Énergie et équilibre intérieur',
    shortLabel: 'Énergie',
    description:
      'Ta charge mentale, ton niveau de stress, ton attention, ta disponibilité émotionnelle, ton rythme et ta capacité à récupérer.',
    icon: 'Zap',
  },
  {
    id: 'spiritualite',
    label: 'Sens et spiritualité',
    shortLabel: 'Spiritualité',
    description:
      'Tes valeurs, ta direction de vie, ce qui te relie à plus grand que toi, tes pratiques de réflexion, de gratitude ou de présence.',
    icon: 'Sparkles',
  },
]

export const DOMAIN_HABIT_IDEAS: Record<string, string[]> = {
  famille: [
    'Un repas tous ensemble sans écran',
    'Un temps de jeu ou de lecture avec mes enfants',
    'Un rituel du soir calme avec mes proches',
    'Appeler ou voir un membre de ma famille chaque semaine',
    'Dire une chose que j’apprécie à mon proche chaque jour',
    'Un moment en couple ou en famille sans téléphone',
    'Prévoir une sortie ou activité partagée dans la semaine',
    'Participer activement à une tâche du foyer chaque jour',
  ],
  activite: [
    'Définir mes 3 priorités pro chaque matin',
    'Bloquer une plage de travail en profondeur sans notifications',
    'Arrêter de travailler à une heure définie',
    'Faire un point d’avancement chaque semaine',
    'Apprendre ou pratiquer une compétence 20 minutes par jour',
    'Prendre une vraie pause déjeuner loin de l’écran',
    'Contacter une personne de mon réseau chaque semaine',
    'Préparer ma journée de travail la veille',
    'Déléguer ou simplifier une tâche récurrente',
    'Relever mes e-mails à heures fixes seulement',
  ],
  sante: [
    'Boire un verre d’eau au réveil',
    'M’étirer cinq minutes chaque matin',
    'Bouger ou marcher 20 minutes par jour',
    'Sport, yoga ou renforcement à mon rythme 2x par semaine',
    'Me coucher avant une heure définie',
    'Manger un repas sans écran',
    'Préparer des repas équilibrés à l’avance',
    'Sortir marcher ou m’exposer à la lumière du jour chaque jour',
  ],
  relations: [
    'Appeler ou écrire à un ami chaque semaine',
    'Proposer un café ou un moment à deux',
    'Poser une limite claire et respectueuse',
    'Répondre aux messages qui comptent le jour même',
    'Rejoindre un groupe, une association ou un club',
    'Écouter une personne sans regarder mon téléphone',
    'Féliciter ou remercier quelqu’un sincèrement chaque semaine',
    'Prévoir un moment partagé dans la semaine',
  ],
  environnement: [
    'Ranger ou trier dix minutes par jour',
    'Aérer mon logement chaque matin',
    'Désencombrer une zone (tiroir, placard, bureau) par semaine',
    'Créer un coin dédié au travail ou au repos',
    'Faire un ménage léger pour un espace apaisant',
    'Réduire le nombre d’objets visibles dans ma pièce principale',
    'Préparer la veille ce qui facilitera mon lendemain',
    'Installer une plante ou un élément qui m’apaise',
  ],
  energie: [
    'Éteindre mon téléphone à une heure définie',
    'Cinq minutes de cohérence cardiaque ou de respiration',
    'Écrire quelques lignes dans un journal',
    'Marcher sans téléphone',
    'Faire une vraie pause de 10 minutes loin des écrans',
    'Limiter le café après une heure définie',
    'Accorder une micro-sieste ou un temps de repos',
    'Commencer la journée sans écran pendant 30 minutes',
  ],
  spiritualite: [
    'Noter trois gratitudes chaque soir',
    'Cinq à dix minutes de méditation ou de silence',
    'Lire un texte inspirant chaque matin',
    'Une marche contemplative sans musique ni téléphone',
    'Un temps de prière, de réflexion ou de visualisation',
    'Faire un bilan de ma journée avant de dormir',
    'Passer du temps dans la nature chaque semaine',
    'Relire ma direction de vie chaque dimanche',
  ],
}

export interface StartingPoint {
  domainId: string
  photographie: string
  importance: string
  projection90j: string
  premierePreuve: string
}

export interface AnchorHabit {
  domainId: string
  habitude: string
  rythme: string
  versionMinimale: string
}

export interface Pacte {
  engagement: string
  fierDeMoi: string
}

export type PhotoScores = Record<string, number>
export type Priorities = string[]

export const STAGES = [
  { stage: 'photo', label: 'Photo du moment' },
  { stage: 'depart', label: 'Point de départ' },
  { stage: 'habits', label: 'Habitudes' },
  { stage: 'pacte', label: 'Pacte' },
  { stage: 'summary', label: 'Réponses' },
] as const

export type Stage = (typeof STAGES)[number]['stage'] | 'welcome' | 'identity'

export function emptyStartingPoint(domainId: string): StartingPoint {
  return {
    domainId,
    photographie: '',
    importance: '',
    projection90j: '',
    premierePreuve: '',
  }
}

export function emptyAnchorHabit(domainId: string): AnchorHabit {
  return { domainId, habitude: '', rythme: '', versionMinimale: '' }
}

export function defaultPhotoScores(): PhotoScores {
  const scores: PhotoScores = {}
  for (const d of DOMAINS) scores[d.id] = 5
  return scores
}

export interface InspirationalQuote {
  text: string
  author?: string
}

/** Citations par défaut : la sélection s'inspire des réponses individuelles (prénom, pacte, priorité). */
const INSPIRATIONAL_QUOTES: InspirationalQuote[] = [
  { text: 'deviens ce que tu es.', author: 'Nietzsche' },
  {
    text: "le meilleur moment pour planter un arbre était il y a vingt ans. Le deuxième meilleur moment, c'est maintenant.",
    author: 'Proverbe chinois',
  },
  {
    text: "ce n'est pas parce que les choses sont difficiles que nous n'osons pas, c'est parce que nous n'osons pas qu'elles sont difficiles.",
    author: 'Sénèque',
  },
  { text: 'le succès, c\'est tomber sept fois et se relever huit.', author: 'Proverbe japonais' },
  { text: 'un pas, une habitude, une décision à la fois — ton évolution commence exactement ici.', author: 'EVOL' },
  { text: "tu ne peux pas empêcher les vagues de venir, mais tu peux apprendre à surfer.", author: 'Jon Kabat-Zinn' },
  { text: 'ce que tu fais chaque jour compte plus que ce que tu fais de temps en temps.', author: 'Gandhi' },
  { text: 'la discipline est le pont entre tes objectifs et tes accomplissements.', author: 'Jim Rohn' },
]

/**
 * Choisit une citation de façon déterministe à partir des réponses de l'utilisateur
 * (prénom, engagement du pacte, première priorité) : chaque profil a « sa » citation.
 */
export function getPersonalizedQuote(
  prenom: string,
  pacteEngagement: string,
  priorityDomain?: string,
): InspirationalQuote {
  const seedSource = `${prenom.trim().toLowerCase()}|${pacteEngagement.trim().toLowerCase()}|${priorityDomain ?? ''}`
  let hash = 0
  for (let i = 0; i < seedSource.length; i++) {
    hash = (hash * 31 + seedSource.charCodeAt(i)) >>> 0
  }
  const picked = INSPIRATIONAL_QUOTES[hash % INSPIRATIONAL_QUOTES.length]
  const prenomClean = prenom.trim() ? prenom.trim().charAt(0).toUpperCase() + prenom.trim().slice(1) : 'Tu'
  return { text: `${prenomClean}, ${picked.text}`, author: picked.author }
}
