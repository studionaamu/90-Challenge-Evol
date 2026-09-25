import { forwardRef } from 'react'
import { TrendingUp, Repeat, PenLine } from 'lucide-react'
import { DOMAINS } from '../data/domains'
import type { PhotoScores, StartingPoint, AnchorHabit, Pacte } from '../data/domains'

const CENTER_X = 195
const CENTER_Y = 220
const RADIUS = 150
const RINGS = [2, 4, 6, 8, 10]

function polar(angleDeg: number, r: number) {
  const a = (angleDeg - 90) * (Math.PI / 180)
  return { x: CENTER_X + r * Math.cos(a), y: CENTER_Y + r * Math.sin(a) }
}

function scoreColor(score: number) {
  return score <= 3 ? '#E92B1F' : score <= 7 ? '#6D3EAD' : '#1525FF'
}

function polygonPoints(values: number[]) {
  return values
    .map((v, i) => {
      const angle = (360 / values.length) * i
      const r = (v / 10) * RADIUS
      const p = polar(angle, r)
      return `${p.x},${p.y}`
    })
    .join(' ')
}

interface EvolutionCardProps {
  photoScores: PhotoScores
  priorities: string[]
  startingPoints: Record<string, StartingPoint>
  anchorHabits: Record<string, AnchorHabit>
  pacte: Pacte
}

export const EvolutionCard = forwardRef<HTMLDivElement, EvolutionCardProps>(
  ({ photoScores, priorities, startingPoints, anchorHabits, pacte }, ref) => {
    const values = DOMAINS.map((d) => photoScores[d.id] ?? 5)
    const prioritySet = new Set(priorities)

    return (
      <div
        ref={ref}
        className="relative w-[390px] h-[910px] rounded-3xl overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a2e 100%)', fontFamily: 'Poppins, sans-serif' }}
      >
        <div
          className="absolute top-0 left-0 w-full h-40"
          style={{ background: 'linear-gradient(135deg, #1525FF 0%, #6D3EAD 100%)', opacity: 0.12 }}
        />
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full"
          style={{ background: '#6D3EAD', opacity: 0.12, filter: 'blur(60px)' }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full"
          style={{ background: '#1525FF', opacity: 0.12, filter: 'blur(60px)' }}
        />

        <div className="relative h-full flex flex-col p-5 z-10">
          <div className="text-center mb-2">
            <div
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-2"
              style={{ background: 'linear-gradient(135deg, #1525FF 0%, #6D3EAD 100%)' }}
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1
              className="text-lg font-bold tracking-tight text-white"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              GRANDE CARTE D'ÉVOLUTION
            </h1>
            <p className="text-white/40 text-[10px] tracking-widest">CHALLENGE 90 JOURS — EVOL</p>
          </div>

          <div className="flex justify-center mb-3">
            <svg width="390" height="300" viewBox="0 0 390 300">
              {RINGS.map((ring) => {
                const r = (ring / 10) * RADIUS
                const points = DOMAINS.map((_, i) => {
                  const angle = (360 / DOMAINS.length) * i
                  const p = polar(angle, r)
                  return `${p.x},${p.y}`
                }).join(' ')
                return <polygon key={ring} points={points} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              })}

              {DOMAINS.map((_, i) => {
                const angle = (360 / DOMAINS.length) * i
                const p = polar(angle, RADIUS)
                return (
                  <line
                    key={i}
                    x1={CENTER_X}
                    y1={CENTER_Y}
                    x2={p.x}
                    y2={p.y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                )
              })}

              <polygon points={polygonPoints(values)} fill="rgba(21,37,255,0.15)" stroke="#1525FF" strokeWidth="2" />

              {values.map((v, i) => {
                const angle = (360 / values.length) * i
                const r = (v / 10) * RADIUS
                const p = polar(angle, r)
                const isPriority = prioritySet.has(DOMAINS[i].id)
                return (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={isPriority ? 6 : 3}
                    fill={isPriority ? '#E92B1F' : scoreColor(v)}
                    stroke="#fff"
                    strokeWidth={isPriority ? 2 : 1}
                  />
                )
              })}

              {DOMAINS.map((d, i) => {
                const angle = (360 / DOMAINS.length) * i
                const p = polar(angle, RADIUS + 28)
                const isPriority = prioritySet.has(d.id)
                return (
                  <text
                    key={d.id}
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isPriority ? '11' : '9'}
                    fontWeight={isPriority ? '700' : '400'}
                    fill={isPriority ? '#fff' : 'rgba(255,255,255,0.45)'}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {d.shortLabel}
                  </text>
                )
              })}

              <text
                x={CENTER_X}
                y={CENTER_Y - 5}
                textAnchor="middle"
                fontSize="22"
                fontWeight="700"
                fill="#fff"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {Math.round(values.reduce((a, b) => a + b, 0) / values.length)}
              </text>
              <text x={CENTER_X} y={CENTER_Y + 12} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)">
                / 10
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-sapphire" />
              <span className="text-[9px] text-white/50">Score actuel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-garnet" />
              <span className="text-[9px] text-white/50">Mes 3 priorités</span>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-[9px] font-bold tracking-widest text-sapphire-light mb-1.5">MES 3 PRIORITÉS — 90 JOURS</p>
            <div className="space-y-2">
              {priorities.map((id, i) => {
                const domain = DOMAINS.find((d) => d.id === id)
                const sp = startingPoints[id]
                const score = photoScores[id] ?? 5
                return (
                  <div key={id} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #1525FF 0%, #6D3EAD 100%)' }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="font-display font-semibold text-[11px] text-white"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {domain?.shortLabel}
                      </span>
                      <span className="text-[9px] font-bold ml-auto" style={{ color: scoreColor(score) }}>
                        {score}/10
                      </span>
                    </div>
                    {sp && sp.projection90j && (
                      <p className="text-[9px] text-white/50 leading-snug pl-5">
                        « {sp.projection90j.length > 90 ? sp.projection90j.slice(0, 90) + '…' : sp.projection90j} »
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-1 mb-1.5">
              <Repeat className="w-3 h-3 text-amethyst-light" />
              <p className="text-[9px] font-bold tracking-widest text-amethyst-light">MES HABITUDES D'ANCRAGE</p>
            </div>
            <div className="space-y-1.5">
              {priorities.map((id) => {
                const domain = DOMAINS.find((d) => d.id === id)
                const habit = anchorHabits[id]
                if (!habit || !habit.habitude) return null
                return (
                  <div key={id} className="flex items-start gap-1.5">
                    <span className="text-[8px] text-amethyst-light font-bold w-16 truncate flex-shrink-0">
                      {domain?.shortLabel}
                    </span>
                    <span className="text-[9px] text-white/70 leading-snug">
                      {habit.habitude}
                      {habit.rythme && <span className="text-white/40"> · {habit.rythme}</span>}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-auto pt-2.5 border-t border-white/10">
            <div className="flex items-center gap-1 mb-1.5">
              <PenLine className="w-3 h-3 text-garnet" />
              <p className="text-[9px] font-bold tracking-widest text-garnet-light">MON PACTE EVOL</p>
            </div>
            <p className="text-[9px] text-white/60 leading-snug italic">
              Je m'engage à devenir une personne qui{' '}
              {pacte.engagement.length > 80 ? pacte.engagement.slice(0, 80) + '…' : pacte.engagement}
            </p>
            <p className="text-[9px] text-white/40 leading-snug mt-1">
              <span className="text-sapphire-light">J'aurai évolué vers mon idéal si :</span>{' '}
              {pacte.fierDeMoi.length > 70 ? pacte.fierDeMoi.slice(0, 70) + '…' : pacte.fierDeMoi}
            </p>
          </div>

          <div className="text-center mt-2.5 pt-2 border-t border-white/10">
            <p
              className="font-display text-[11px] font-bold"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                background: 'linear-gradient(135deg, #1525FF 0%, #6D3EAD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              EVOL — TON ÉVOLUTION, TON SUCCÈS
            </p>
          </div>
        </div>
      </div>
    )
  },
)

EvolutionCard.displayName = 'EvolutionCard'
