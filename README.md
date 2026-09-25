# EVOL — Challenge 90 Jours

Reproduction fidèle du questionnaire EVOL : un parcours guidé en 5 étapes pour établir
un point de départ de vie, choisir 3 dimensions prioritaires et générer une
« Grande Carte d'Évolution » exportable en PNG.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS (thème custom : onyx, sapphire `#1525FF`, amethyst `#6D3EAD`, garnet `#E92B1F`)
- html-to-image (export PNG de la carte)
- lucide-react (icônes)
- Aucune base de données : les réponses du questionnaire restent sur l'appareil

## Le parcours

0. **Identité** — prénom, e-mail, téléphone (validation locale ; les coordonnées sont
   envoyées en POST vers Google Apps Script pour la team support, voir ci-dessous)
1. **Bienvenue** — cadre, durée (~20 min), avertissement santé
2. **Photo du moment** — 7 dimensions de vie, sélection + notation (0–10) des 3 priorités
3. **Point de départ** — 4 questions rédigées par dimension (photographie, importance, projection 90 j, première preuve)
4. **Habitudes d'ancrage** — habitude + rythme + version minimale par dimension, avec idées par domaine
5. **Pacte EVOL** — engagement personnel et évolution idéale visée
6. **Grande Carte** — radar SVG des 7 scores, récapitulatif, génération et téléchargement PNG

La validation du formulaire d'identité ouvre directement l'étape suivante du parcours.

## Commandes

```bash
npm install
npm run dev            # serveur de dev
npm run build          # build de production (dist/)
node scripts/build-single.mjs   # build mono-fichier autonome (dist-single/index.html)
```

## Soumission du formulaire d'identité

À la validation, les coordonnées (`prenom`, `email`, `telephone`) sont envoyées en POST
vers un Google Apps Script (`src/components/IdentityScreen.tsx`, constante
`SUBMISSION_URL`), qui les enregistre côté team support EVOL.

L'envoi est **fire-and-forget** : il ne bloque jamais le parcours, et un échec réseau
est ignoré silencieusement. La validation du formulaire ouvre directement l'étape
suivante, quel que soit le résultat de l'envoi. Les réponses du questionnaire, elles,
ne quittent jamais l'appareil.

## Réception côté Google Apps Script

Le code complet du script est dans [`apps-script/Code.gs`](apps-script/Code.gs) : il
écrit chaque soumission (Horodatage, Prénom, Email, Téléphone) dans l'onglet
« Soumissions » de ta feuille Google, en créant l'onglet au besoin.

**Si les soumissions n'apparaissent pas alors que le POST renvoie 200**, la cause la
plus fréquente est le déploiement : après chaque modification du code, il faut
Déployer → Gérer les déploiements → crayon → **Nouvelle version** → Déployer.
Consulte l'en-tête de `apps-script/Code.gs` pour la procédure d'installation et le
ping de test `doGet`.
