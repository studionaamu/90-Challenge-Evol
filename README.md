# EVOL — Challenge 90 Jours

Reproduction fidèle du questionnaire EVOL : un parcours guidé en 5 étapes pour établir
un point de départ de vie, choisir 3 dimensions prioritaires et générer une
« Grande Carte d'Évolution » exportable en PNG.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS (thème custom : onyx, sapphire `#1525FF`, amethyst `#6D3EAD`, garnet `#E92B1F`)
- Supabase (sauvegarde dans la table `evol_checkpoints`)
- html-to-image (export PNG de la carte)
- lucide-react (icônes)

## Le parcours

0. **Identité** — prénom, e-mail, téléphone (enregistrés dans `evol_users`, avec mention de protection des données)
1. **Bienvenue** — cadre, durée (~20 min), avertissement santé
2. **Photo du moment** — 7 dimensions de vie, sélection + notation (0–10) des 3 priorités
3. **Point de départ** — 4 questions rédigées par dimension (photographie, importance, projection 90 j, première preuve)
4. **Habitudes d'ancrage** — habitude + rythme + version minimale par dimension, avec suggestions
5. **Pacte EVOL** — engagement personnel et fierté visée
6. **Grande Carte** — radar SVG des 7 scores, récapitulatif, sauvegarde Supabase et téléchargement PNG

## Commandes

```bash
npm install
npm run dev            # serveur de dev
npm run build          # build de production (dist/)
node scripts/build-single.mjs   # build mono-fichier autonome (dist-single/index.html)
```

## Supabase

Le client est configuré dans `src/lib/supabase.ts` avec les clés publiques du projet
(`evol_users` pour les coordonnées, `evol_checkpoints` pour les checkpoints).

**Le projet étant neuf, exécutez d'abord le schéma complet :** copiez le contenu de
[`supabase/schema.sql`](supabase/schema.sql) dans le SQL Editor du dashboard Supabase.
Il crée les deux tables, active Row Level Security et n'autorise que l'insertion anonyme
(lecture impossible depuis le web — les données restent accessibles uniquement au
dashboard/service role).


