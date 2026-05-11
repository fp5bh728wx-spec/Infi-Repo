'use client'
import { useState } from 'react'
import { Dumbbell, Play, CheckCircle2, Clock, Flame, ChevronDown, ChevronUp, Loader2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import toast from 'react-hot-toast'

interface Exercise { name: string; sets: number; reps: string; rest: number; notes: string; muscles: string[] }
interface WorkoutDay { name: string; duration: number; exercises: Exercise[] }

const SAMPLE_PLAN: WorkoutDay[] = [
  {
    name: 'Upper Body — Push', duration: 45,
    exercises: [
      { name: 'Push-ups',            sets: 3, reps: '12-15', rest: 60,  notes: 'Keep core tight', muscles: ['Chest','Triceps','Shoulders'] },
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: 75, notes: 'Control descent', muscles: ['Shoulders','Triceps'] },
      { name: 'Incline DB Press',    sets: 3, reps: '10-12', rest: 90,  notes: '45° incline',     muscles: ['Upper Chest'] },
      { name: 'Lateral Raises',      sets: 3, reps: '12-15', rest: 60,  notes: 'Slight bend in elbows', muscles: ['Side Delts'] },
      { name: 'Tricep Dips',         sets: 3, reps: '10-12', rest: 60,  notes: 'Use chair/bench', muscles: ['Triceps'] },
      { name: 'Plank',               sets: 3, reps: '30 sec', rest: 45, notes: 'Breathe steadily', muscles: ['Core'] },
    ],
  },
  {
    name: 'Lower Body — Squat', duration: 50,
    exercises: [
      { name: 'Bodyweight Squats',   sets: 3, reps: '15-20', rest: 60,  notes: 'Knees over toes',  muscles: ['Quads','Glutes'] },
      { name: 'Romanian Deadlift',   sets: 3, reps: '12',    rest: 90,  notes: 'Hinge at hips',    muscles: ['Hamstrings','Glutes'] },
      { name: 'Walking Lunges',      sets: 3, reps: '10 each', rest: 75, notes: 'Big step forward', muscles: ['Quads','Glutes'] },
      { name: 'Glute Bridges',       sets: 3, reps: '15',    rest: 45,  notes: 'Squeeze at top',   muscles: ['Glutes'] },
      { name: 'Calf Raises',         sets: 4, reps: '20',    rest: 30,  notes: 'Full range',       muscles: ['Calves'] },
    ],
  },
  {
    name: 'Full Body HIIT', duration: 30,
    exercises: [
      { name: 'Jumping Jacks',       sets: 3, reps: '40 sec', rest: 20, notes: 'Stay light on feet', muscles: ['Full Body'] },
      { name: 'Burpees',             sets: 3, reps: '30 sec', rest: 30, notes: 'Modified okay',   muscles: ['Full Body'] },
      { name: 'Mountain Climbers',   sets: 3, reps: '40 sec', rest: 20, notes: 'Keep hips down',  muscles: ['Core','Cardio'] },
      { name: 'High Knees',          sets: 3, reps: '40 sec', rest: 20, notes: 'Pump your arms',  muscles: ['Legs','Cardio'] },
    ],
  },
]

const GOALS = ['Fat Loss','Muscle Gain','Stamina','General Fitness']
const LEVELS = ['Beginner','Intermediate','Advanced']
const LOCATIONS = ['Home (no equipment)','Home (dumbbells)','Gym','Outdoors']

function ExerciseCard({ ex, idx, done, onToggle }: {
  ex: Exercise; idx: number; done: boolean; onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={cn('rounded-xl border transition-all duration-200',
      done ? 'bg-sage-50 border-sage-200 opacity-70' : 'bg-white border-stone-100 shadow-sm')}>
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <button onClick={e => { e.stopPropagation(); onToggle() }}
          className={cn('w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
            done ? 'border-leaf bg-leaf text-white' : 'border-stone-300 hover:border-leaf')}>
          {done && <CheckCircle2 className="w-4 h-4" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-medium', done ? 'line-through text-stone-400' : 'text-stone-700')}>{ex.name}</p>
          <p className="text-xs text-stone-400">{ex.sets} sets × {ex.reps} · {ex.rest}s rest</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-1 justify-end">
            {ex.muscles.slice(0,2).map(m => (
              <span key={m} className="text-xs bg-sage-50 text-leaf px-2 py-0.5 rounded-full font-medium">{m}</span>
            ))}
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-stone-50">
          <p className="text-xs text-stone-500 italic">💡 {ex.notes}</p>
          <div className="flex gap-4 mt-3">
            {[...Array(ex.sets)].map((_, s) => (
              <div key={s} className="text-center">
                <div className="w-10 h-10 rounded-lg border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 bg-stone-50">
                  Set {s+1}
                </div>
                <p className="text-xs text-stone-400 mt-1">{ex.reps}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function WorkoutPage() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [doneExercises, setDoneExercises] = useState<Set<string>>(new Set())
  const [sessionActive, setSessionActive] = useState(false)
  const [showGenerator, setShowGenerator] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [genForm, setGenForm] = useState({ goal: 'Fat Loss', level: 'Beginner', location: 'Home (no equipment)', days: 3 })

  const workout = SAMPLE_PLAN[selectedDay]
  const toggleExercise = (key: string) => setDoneExercises(prev => {
    const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next
  })
  const completedCount = workout.exercises.filter((_, i) => doneExercises.has(`${selectedDay}-${i}`)).length
  const allDone = completedCount === workout.exercises.length

  const handleGenerate = async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(false)
    setShowGenerator(false)
    toast.success('New workout plan generated! 💪')
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-800">Workout Planner</h1>
          <p className="text-stone-400 text-sm mt-0.5">Your personalized training plan</p>
        </div>
        <button onClick={() => setShowGenerator(!showGenerator)}
          className="btn-primary py-2 px-4 text-sm">
          <Zap className="w-4 h-4" /> Generate Plan
        </button>
      </div>

      {/* AI Generator */}
      {showGenerator && (
        <div className="bg-gradient-hero rounded-2xl p-6 space-y-4">
          <h3 className="font-display text-xl font-bold text-white">AI Workout Generator</h3>
          <p className="text-mist/70 text-sm">Answer 4 questions and get a science-backed plan instantly.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Goal', key: 'goal', options: GOALS },
              { label: 'Experience', key: 'level', options: LEVELS },
              { label: 'Location', key: 'location', options: LOCATIONS },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-mist/60 mb-1.5 uppercase tracking-wide">{f.label}</label>
                <select value={(genForm as any)[f.key]}
                  onChange={e => setGenForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30">
                  {f.options.map(o => <option key={o} value={o} className="text-stone-800">{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-mist/60 mb-1.5 uppercase tracking-wide">Days / Week</label>
              <div className="flex gap-2">
                {[2,3,4,5].map(d => (
                  <button key={d} onClick={() => setGenForm(p => ({ ...p, days: d }))}
                    className={cn('flex-1 py-2.5 rounded-xl text-sm font-bold transition-all',
                      genForm.days === d ? 'bg-white text-moss' : 'bg-white/10 text-white border border-white/20 hover:bg-white/15')}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={handleGenerate} disabled={generating}
            className="w-full py-3 rounded-xl bg-white text-moss font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-70">
            {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating your plan…</> : <><Zap className="w-4 h-4" /> Generate My Plan</>}
          </button>
        </div>
      )}

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SAMPLE_PLAN.map((day, i) => (
          <button key={i} onClick={() => { setSelectedDay(i); setDoneExercises(new Set()) }}
            className={cn('flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
              selectedDay === i ? 'bg-moss text-white shadow-md' : 'bg-white text-stone-600 border border-stone-100 hover:bg-sage-50')}>
            Day {i+1}
          </button>
        ))}
      </div>

      {/* Workout header card */}
      <div className="bg-gradient-to-br from-moss to-leaf rounded-2xl p-5 text-white">
        <h2 className="font-display text-xl font-bold mb-2">{workout.name}</h2>
        <div className="flex items-center gap-4 text-mist/80 text-sm">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {workout.duration} min</span>
          <span className="flex items-center gap-1.5"><Dumbbell className="w-4 h-4" /> {workout.exercises.length} exercises</span>
          <span className="flex items-center gap-1.5"><Flame className="w-4 h-4" /> ~{Math.round(workout.duration * 5)} kcal</span>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(completedCount/workout.exercises.length)*100}%` }} />
          </div>
          <span className="text-sm font-bold">{completedCount}/{workout.exercises.length}</span>
        </div>
        {!sessionActive ? (
          <button onClick={() => setSessionActive(true)}
            className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-white text-moss rounded-xl font-bold text-sm hover:shadow-lg transition-all">
            <Play className="w-4 h-4" /> Start Workout
          </button>
        ) : (
          <button onClick={() => { toast.success('Great workout! 🎉'); setSessionActive(false); setDoneExercises(new Set()) }}
            disabled={!allDone}
            className={cn('mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all',
              allDone ? 'bg-white text-moss hover:shadow-lg' : 'bg-white/20 text-white/60 cursor-not-allowed')}>
            <CheckCircle2 className="w-4 h-4" /> {allDone ? 'Complete Workout' : `${workout.exercises.length - completedCount} exercises left`}
          </button>
        )}
      </div>

      {/* Exercise list */}
      <div className="space-y-2">
        {workout.exercises.map((ex, i) => (
          <ExerciseCard key={i} ex={ex} idx={i}
            done={doneExercises.has(`${selectedDay}-${i}`)}
            onToggle={() => sessionActive && toggleExercise(`${selectedDay}-${i}`)} />
        ))}
      </div>
    </div>
  )
}
