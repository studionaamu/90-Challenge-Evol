/**
 * EVOL — réception des soumissions du formulaire d'identité.
 *
 * Installation :
 *   1. Ouvre ta feuille Google → Extensions → Apps Script
 *      (ou l'éditeur script.google.com où ton déploiement actuel vit).
 *   2. Remplace TOUT le contenu de Code.gs par ce fichier, enregistre.
 *   3. Déployer → Gérer les déploiements → crayon (modifier) →
 *      Version : « Nouvelle version » → Déployer.
 *      ⚠️ À refaire après CHAQUE modification du code : tant que tu ne crées
 *      pas une nouvelle version, l'ancienne continue de répondre — c'est la
 *      cause n°1 des « rien n'apparaît alors que le POST renvoie 200 ».
 *   4. L'URL /exec du déploiement reste la même ; c'est bien celle déjà
 *      configurée côté front (SUBMISSION_URL dans IdentityScreen.tsx).
 *
 * Le script vise directement ta feuille par son ID : il fonctionne que le
 * script soit lié à la feuille ou autonome.
 */

// >>> Ta feuille Google : https://docs.google.com/spreadsheets/d/<ID>/edit
const SPREADSHEET_ID = '1Eojg1QTOooATEhLumFwimrxSbDgBD-danHQQvFDlPJk';

// Onglet qui reçoit les soumissions (créé automatiquement au 1er POST).
const SHEET_NAME = 'Soumissions';

function getTargetSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    console.log('Soumission reçue :', JSON.stringify(p));

    const ss = getTargetSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // En-têtes au premier passage.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Horodatage', 'Prénom', 'Email', 'Téléphone']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date(),
      String(p.prenom || ''),
      String(p.email || ''),
      String(p.telephone || ''),
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // Visible dans l'éditeur Apps Script → « Exécutions » en cas d'échec.
    console.error('doPost error :', err && (err.stack || String(err)));
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Ping de test : ouvre l'URL /exec dans un navigateur — doit afficher
// {"ok":true,"message":"EVOL webhook actif"}. Toute autre réponse signifie
// que la version déployée ne contient pas ce code.
//
// Purge à distance : /exec?action=purge&key=EVOL-PURGE-2026-x7K9
// supprime toutes les lignes de l'onglet Soumissions (en-têtes conservés).
function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : '';
  const key = e && e.parameter ? e.parameter.key : '';

  if (action === 'purge') {
    if (key !== 'EVOL-PURGE-2026-x7K9') {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'clé invalide' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    const deleted = purgeSubmissions();
    return ContentService.createTextOutput(JSON.stringify({ ok: true, purged: deleted }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true, message: 'EVOL webhook actif' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Nettoyage : supprime toutes les lignes de l'onglet Soumissions
 * (la ligne d'en-têtes est conservée). Appelé par doGet?action=purge
 * ou exécutable une fois depuis l'éditeur (clearTestData → Exécuter).
 */
function purgeSubmissions() {
  const ss = getTargetSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() <= 1) return 0;
  const toDelete = sheet.getLastRow() - 1;
  sheet.deleteRows(2, toDelete);
  return toDelete;
}

function clearTestData() {
  console.log('Lignes supprimées :', purgeSubmissions());
}
