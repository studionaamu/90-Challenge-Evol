import { useState } from 'react'
import { ProgressHeader } from './components/ProgressHeader'
import { IdentityScreen } from './components/IdentityScreen'
import { WelcomeScreen } from './components/WelcomeScreen'
import { PhotoScreen } from './components/PhotoScreen'
import { DepartScreen } from './components/DepartScreen'
import { HabitsScreen } from './components/HabitsScreen'
import { PacteScreen } from './components/PacteScreen'
import { SummaryScreen } from './components/SummaryScreen'
import {
  defaultPhotoScores,
  emptyStartingPoint,
  emptyAnchorHabit,
} from './data/domains'
import type {
  Stage,
  PhotoScores,
  Priorities,
  StartingPoint,
  AnchorHabit,
  Pacte,
} from './data/domains'

export default function App() {
  const [stage, setStage] = useState<Stage>('identity')
  const [prenom, setPrenom] = useState('')
  const [photoScores, setPhotoScores] = useState<PhotoScores>(defaultPhotoScores)
  const [priorities, setPriorities] = useState<Priorities>([])
  const [startingPoints, setStartingPoints] = useState<Record<string, StartingPoint>>({})
  const [anchorHabits, setAnchorHabits] = useState<Record<string, AnchorHabit>>({})
  const [pacte, setPacte] = useState<Pacte>({ engagement: '', fierDeMoi: '' })

  const handlePrioritiesChange = (p: Priorities) => {
    setPriorities(p)
    if (p.length === 3) {
      setStartingPoints(Object.fromEntries(p.map((id) => [id, emptyStartingPoint(id)])))
      setAnchorHabits(Object.fromEntries(p.map((id) => [id, emptyAnchorHabit(id)])))
    }
  }

  const handleRestart = () => {
    setStage('identity')
    setPrenom('')
    setPhotoScores(defaultPhotoScores())
    setPriorities([])
    setStartingPoints({})
    setAnchorHabits({})
    setPacte({ engagement: '', fierDeMoi: '' })
  }

  return (
    <div className="min-h-screen gradient-onyx-sapphire">
      {stage !== 'welcome' && <ProgressHeader currentStage={stage} />}
      {stage === 'identity' && (
        <IdentityScreen
          onDone={({ prenom: p }) => {
            setPrenom(p)
            setStage('welcome')
          }}
        />
      )}
      {stage === 'welcome' && <WelcomeScreen prenom={prenom} onStart={() => setStage('photo')} />}
      {stage === 'photo' && (
        <PhotoScreen
          scores={photoScores}
          priorities={priorities}
          onScoresChange={setPhotoScores}
          onPrioritiesChange={handlePrioritiesChange}
          onNext={() => setStage('depart')}
        />
      )}
      {stage === 'depart' && (
        <DepartScreen
          priorities={priorities}
          photoScores={photoScores}
          startingPoints={startingPoints}
          onScoresChange={setPhotoScores}
          onChange={setStartingPoints}
          onNext={() => setStage('habits')}
          onBack={() => setStage('photo')}
        />
      )}
      {stage === 'habits' && (
        <HabitsScreen
          priorities={priorities}
          anchorHabits={anchorHabits}
          onChange={setAnchorHabits}
          onNext={() => setStage('pacte')}
          onBack={() => setStage('depart')}
        />
      )}
      {stage === 'pacte' && (
        <PacteScreen
          pacte={pacte}
          onChange={setPacte}
          onNext={() => setStage('summary')}
          onBack={() => setStage('habits')}
        />
      )}
      {stage === 'summary' && (
        <SummaryScreen
          photoScores={photoScores}
          priorities={priorities}
          startingPoints={startingPoints}
          anchorHabits={anchorHabits}
          pacte={pacte}
          prenom={prenom}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
