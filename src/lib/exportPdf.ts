import { jsPDF } from 'jspdf'
import { DOMAINS, getPersonalizedQuote } from '../data/domains'
import type { PhotoScores, StartingPoint, AnchorHabit, Pacte } from '../data/domains'

/* Palette EVOL — thème sombre & bleu, identique à l'application */
const NAVY: [number, number, number] = [3, 6, 18]
const CARD: [number, number, number] = [10, 14, 34]
const SAPPHIRE: [number, number, number] = [21, 37, 255]
const SKY: [number, number, number] = [56, 189, 248]
const WHITE: [number, number, number] = [255, 255, 255]
const MUTED: [number, number, number] = [150, 160, 185]

const PAGE_W = 210
const MARGIN = 16
const CONTENT_W = PAGE_W - MARGIN * 2

export interface PdfData {
  photoScores: PhotoScores
  priorities: string[]
  startingPoints: Record<string, StartingPoint>
  anchorHabits: Record<string, AnchorHabit>
  pacte: Pacte
  prenom: string
}

function clean(text: string): string {
  return text.replace(/\u2019/g, "'").replace(/«/g, '"').replace(/»/g, '"')
}

export function generateResponsesPdf(data: PdfData): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageH = doc.internal.pageSize.getHeight()
  let y = 0

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - 14) {
      doc.addPage()
      paintBackground()
      y = 18
    }
  }

  const paintBackground = () => {
    doc.setFillColor(...NAVY)
    doc.rect(0, 0, PAGE_W, pageH, 'F')
  }

  const sectionTitle = (label: string) => {
    ensureSpace(16)
    doc.setFillColor(...CARD)
    doc.roundedRect(MARGIN, y, CONTENT_W, 9, 2, 2, 'F')
    doc.setFillColor(...SKY)
    doc.rect(MARGIN, y, 1.2, 9, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...SKY)
    doc.text(label, MARGIN + 4, y + 6)
    y += 14
  }

  const qa = (question: string, answer: string) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...MUTED)
    const qLines = doc.splitTextToSize(clean(question), CONTENT_W - 6)
    ensureSpace(qLines.length * 4 + 4)
    doc.text(qLines, MARGIN + 4, y)
    y += qLines.length * 4 + 1

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...WHITE)
    const aLines = doc.splitTextToSize(clean(answer), CONTENT_W - 6)
    const boxH = aLines.length * 4.8 + 5
    ensureSpace(boxH + 4)
    doc.setFillColor(...CARD)
    doc.roundedRect(MARGIN + 2, y - 3.5, CONTENT_W - 2, boxH, 2, 2, 'F')
    doc.setDrawColor(...SAPPHIRE)
    doc.setLineWidth(0.3)
    doc.roundedRect(MARGIN + 2, y - 3.5, CONTENT_W - 2, boxH, 2, 2, 'S')
    doc.text(aLines, MARGIN + 5, y + 0.5)
    y += boxH + 3
  }

  const line = (label: string, value: string) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...MUTED)
    doc.text(clean(label), MARGIN + 4, y)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...WHITE)
    doc.text(clean(value), MARGIN + 70, y)
    y += 6.5
  }

  /* ---------- Page 1 : couverture ---------- */
  paintBackground()
  y = 0
  doc.setFillColor(...SAPPHIRE)
  doc.rect(0, 0, PAGE_W, 2.5, 'F')
  doc.setFillColor(...SKY)
  doc.rect(0, 2.5, PAGE_W, 1, 'F')

  y = 40
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(30)
  doc.setTextColor(...WHITE)
  doc.text('EVOL', PAGE_W / 2, y, { align: 'center' })

  y += 10
  doc.setFontSize(11)
  doc.setTextColor(...SKY)
  doc.text('CHALLENGE 90 JOURS', PAGE_W / 2, y, { align: 'center' })

  y += 18
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(16)
  doc.setTextColor(...WHITE)
  const prenomClean = data.prenom.trim()
    ? data.prenom.trim().charAt(0).toUpperCase() + data.prenom.trim().slice(1)
    : ''
  doc.text(prenomClean ? `Mes questions et mes réponses` : 'Mes questions et mes réponses', PAGE_W / 2, y, {
    align: 'center',
  })
  if (prenomClean) {
    y += 9
    doc.setFontSize(11)
    doc.setTextColor(...SKY)
    doc.text(`Parcours de ${prenomClean}`, PAGE_W / 2, y, { align: 'center' })
  }

  y += 12
  const now = new Date()
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text(
    `Généré le ${now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
    PAGE_W / 2,
    y,
    { align: 'center' },
  )

  // Radar simplifié : barres de score des 7 dimensions
  y += 22
  const barW = CONTENT_W - 40
  for (const d of DOMAINS) {
    const score = data.photoScores[d.id] ?? 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...MUTED)
    doc.text(clean(d.shortLabel), MARGIN + 10, y)
    doc.setFillColor(...CARD)
    doc.roundedRect(MARGIN + 55, y - 3, barW - 55, 3.4, 1.6, 1.6, 'F')
    doc.setFillColor(...SAPPHIRE)
    doc.roundedRect(MARGIN + 55, y - 3, ((barW - 55) * score) / 10, 3.4, 1.6, 1.6, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...WHITE)
    doc.text(`${score}/10`, MARGIN + CONTENT_W - 18, y)
    y += 8.5
  }

  y += 6
  doc.setDrawColor(...SKY)
  doc.setLineWidth(0.4)
  doc.line(MARGIN + 30, y, PAGE_W - MARGIN - 30, y)

  /* ---------- Photo du moment ---------- */
  doc.addPage()
  paintBackground()
  y = 18
  sectionTitle('PHOTO DU MOMENT — MES 7 DIMENSIONS')
  for (const d of DOMAINS) {
    line(`${d.label}`, `${data.photoScores[d.id] ?? 5}/10`)
  }

  /* ---------- Priorités ---------- */
  doc.addPage()
  paintBackground()
  y = 18
  sectionTitle('MES 3 PRIORITÉS — POINT DE DÉPART ET HABITUDES')

  data.priorities.forEach((id, i) => {
    const domain = DOMAINS.find((d) => d.id === id)
    const sp = data.startingPoints[id]
    const habit = data.anchorHabits[id]

    ensureSpace(20)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...SKY)
    doc.text(`PRIORITÉ ${i + 1} — ${clean(domain?.label ?? id)}`, MARGIN, y)
    doc.setFontSize(9)
    doc.setTextColor(...MUTED)
    doc.text(`${data.photoScores[id] ?? 5}/10`, PAGE_W - MARGIN, y, { align: 'right' })
    y += 9

    if (sp?.photographie?.trim()) {
      qa('Ma photographie actuelle — ce que je vis aujourd\u2019hui', sp.photographie.trim())
    }
    if (sp?.importance?.trim()) {
      qa('Pourquoi est-ce important pour moi de faire évoluer ce domaine maintenant ?', sp.importance.trim())
    }
    if (sp?.projection90j?.trim()) {
      qa('Dans 90 jours, j\u2019aimerais pouvoir dire, au présent', sp.projection90j.trim())
    }
    if (sp?.premierePreuve?.trim()) {
      qa('La première preuve concrète que j\u2019aurai avancé sera', sp.premierePreuve.trim())
    }
    if (habit?.habitude?.trim()) {
      qa('Mon habitude d\u2019ancrage', habit.habitude.trim())
      if (habit.rythme?.trim()) qa('Quand / à quel rythme', habit.rythme.trim())
      if (habit.versionMinimale?.trim()) qa('Version minimale les jours difficiles', habit.versionMinimale.trim())
    }
    y += 4
  })

  /* ---------- Pacte ---------- */
  ensureSpace(30)
  sectionTitle('MON PACTE EVOL')
  if (data.pacte.engagement.trim()) {
    qa('Je m\u2019engage à devenir une personne qui…', data.pacte.engagement.trim())
  }
  if (data.pacte.fierDeMoi.trim()) {
    qa('À la fin des 90 jours, j\u2019aurai évolué vers mon idéal si', data.pacte.fierDeMoi.trim())
  }

  /* ---------- Citation + signature ---------- */
  const quote = getPersonalizedQuote(data.prenom, data.pacte.engagement, data.priorities[0])
  ensureSpace(24)
  y += 4
  doc.setFillColor(...CARD)
  const quoteLines = doc.splitTextToSize(clean(`« ${quote.text} »`), CONTENT_W - 12)
  const qh = quoteLines.length * 5 + 8
  doc.roundedRect(MARGIN, y, CONTENT_W, qh, 2.5, 2.5, 'F')
  doc.setFillColor(...SKY)
  doc.rect(MARGIN, y, 1.2, qh, 'F')
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  doc.setTextColor(...WHITE)
  doc.text(quoteLines, MARGIN + 5, y + 6)
  if (quote.author) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...MUTED)
    doc.text(`— ${clean(quote.author)}`, MARGIN + 5, y + qh - 3)
  }
  y += qh + 10

  /* ---------- Pieds de page ---------- */
  const pages = doc.getNumberOfPages()
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...MUTED)
    doc.text(`${p} / ${pages}`, PAGE_W / 2, pageH - 8, { align: 'center' })
  }

  const slug = data.prenom.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  doc.save(slug ? `evol-reponses-${slug}.pdf` : 'evol-reponses.pdf')
}
