'use client'
import { useState } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingDown, TrendingUp, Dumbbell, Flame, Star, Plus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import toast from 'react-hot-toast'

const weightData = [
  { date: 'Jan 1',  weight: 78.5 }, { date: 'Jan 8',  weight: 77.9 },
  { date: 'Jan 15', weight: 77.3 }, { date: 'Jan 22', weight: 76.8 },
  { date: 'Jan 29', weight: 76.2 }, { date: 'Feb 5',  weight: 75.7 },
  { date: 'Feb 12', weight: 75.1 }, { date: 'Feb 19', weight: 74.6 },
  { date: 'Feb 26', weight: 74.1 }, { date: 'Mar 5',  weight: 73.8 },
  { date: 'Mar 12', weight: 73.2 }, { date: 'Mar 19', weight: 72.6 },
]

const calorieData = [
  { day: 'Mon', calories: 1580, target: 1645 }, { day: 'Tue', calories: 1720, target: 1645 },
  { day: 'Wed', calories: 1490, target: 1645 }, { day: 'Thu', calories: 1610, target: 1645 },
  { day: 'Fri', calories: 1850, target: 1645 }, { day: 'Sat', calories: 1380, target: 1645 },
  { day: 'Sun', calories: 1640, target: 1645 },
]

const workoutData = [
  { week: 'W1', sessions: 3 }, { week: 'W2', sessions: 4 }, { week: 'W3', sessions: 2 },
  { week: 'W4', sessions: 5 }, { week: 'W5', sessions: 4 }, { week: 'W6', sessions: 4 },
  { week: 'W7', sessions: 5 }, { week: 'W8', sessions: 3 },
]

const PERIODS = ['7d', '30d', '90d', 'All']

const STATS = [
  { label: 'Total Lost',   value: '-5.9 kg', icon: TrendingDown, color: 'text-green-600', bg: 'bg-green-50',  trend: '↓ Good' },
  { label: 'Workouts',     value: '30',       icon: Dumbbell,     color: 'text-blue-600',  bg: 'bg-blue-50',   trend: 'This month' },
  { label: 'Avg Calories', value: '1,610',    icon: Flame,        color: 'text-amber-600', bg: 'bg-amber-50',  trend: '98% of target' },
  { label: 'Streak',       value: '9 days',   icon: Star,         color: 'text-purple-600',bg: 'bg-purple-50', trend: 'Personal best!' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-stone-100 shadow-card rounded-xl px-3 py-2">
      <p className="text-xs font-semibold text-stone-500 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-sm font-bold" style={{ color: p.color }}>
          {p.value}{p.name === 'weight' ? ' kg' : p.name === 'calories' ? ' kcal' : ' sessions'}
        </p>
      ))}
    </div>
  )
}

export default function ProgressPage() {
  const [period, setPeriod]         = useState('30d')
  const [newWeight, setNewWeight]   = useState('')
  const [showWeightLog, setShowWeightLog] = useState(false)

  const logWeight = () => {
    if (!newWeight || isNaN(Number(newWeight))) { toast.error('Enter a valid weight'); return }
    toast.success(`Weight ${newWeight}kg logged! 💪`)
    setNewWeight('')
    setShowWeightLog(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-800">Progress</h1>
          <p className="text-stone-400 text-sm mt-0.5">Your transformation journey</p>
        </div>
        <button onClick={() => setShowWeightLog(!showWeightLog)}
          className="btn-primary py-2 px-4 text-sm">
          <Plus className="w-4 h-4" /> Log Weight
        </button>
      </div>

      {/* Quick log weight */}
      {showWeightLog && (
        <div className="bg-white rounded-2xl border border-sage-100 shadow-card p-5 flex items-center gap-4">
          <input type="number" value={newWeight} onChange={e => setNewWeight(e.target.value)}
            placeholder="Today's weight (kg)" step="0.1"
            className="input-base flex-1" onKeyDown={e => e.key === 'Enter' && logWeight()} />
          <button onClick={logWeight} className="btn-primary py-3 px-5 text-sm flex-shrink-0">Log</button>
          <button onClick={() => setShowWeightLog(false)} className="text-stone-400 hover:text-stone-600">✕</button>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-sage-50 shadow-card p-4">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', s.bg)}>
                <Icon className={cn('w-5 h-5', s.color)} />
              </div>
              <p className="text-xl font-bold text-stone-800">{s.value}</p>
              <p className="text-xs text-stone-400 mt-0.5">{s.label}</p>
              <p className={cn('text-xs font-semibold mt-1', s.color)}>{s.trend}</p>
            </div>
          )
        })}
      </div>

      {/* Period selector */}
      <div className="flex gap-2">
        {PERIODS.map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={cn('px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              period === p ? 'bg-moss text-white shadow-sm' : 'bg-white text-stone-500 border border-stone-100 hover:bg-sage-50')}>
            {p}
          </button>
        ))}
      </div>

      {/* Weight chart */}
      <div className="bg-white rounded-2xl border border-sage-50 shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-stone-800">Weight Progress</h2>
            <p className="text-xs text-stone-400 mt-0.5">Starting: 78.5kg · Current: 72.6kg · Target: 70kg</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600">-5.9 kg</p>
            <p className="text-xs text-stone-400">total loss</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weightData}>
            <defs>
              <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#558c55" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#558c55" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f1" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={70} stroke="#C4A882" strokeDasharray="4 4" label={{ value: 'Goal', position: 'right', fontSize: 10, fill: '#C4A882' }} />
            <Area type="monotone" dataKey="weight" stroke="#558c55" strokeWidth={2.5} fill="url(#wGrad)" dot={{ fill: '#558c55', r: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Calorie chart */}
      <div className="bg-white rounded-2xl border border-sage-50 shadow-card p-5">
        <h2 className="font-semibold text-stone-800 mb-1">This Week's Calories</h2>
        <p className="text-xs text-stone-400 mb-4">Daily intake vs target (1,645 kcal)</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={calorieData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f1" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={1645} stroke="#C4A882" strokeDasharray="4 4" />
            <Bar dataKey="calories" radius={[6,6,0,0]}
              fill="url(#calGrad)"
              label={false}
              // Color bars over target red, under target green
              />
            <defs>
              <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#558c55" />
                <stop offset="95%" stopColor="#7aab7a" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Workout frequency */}
      <div className="bg-white rounded-2xl border border-sage-50 shadow-card p-5">
        <h2 className="font-semibold text-stone-800 mb-1">Workout Frequency</h2>
        <p className="text-xs text-stone-400 mb-4">Sessions per week — last 8 weeks</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={workoutData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f1" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} ticks={[0,1,2,3,4,5]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sessions" radius={[6,6,0,0]} fill="#3D5A3E" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl border border-sage-50 shadow-card p-5">
        <h2 className="font-semibold text-stone-800 mb-4">Achievements 🏅</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { emoji: '🔥', title: '9-Day Streak', sub: 'Consistency champion', earned: true },
            { emoji: '⚖️', title: 'First 5kg', sub: 'Weight loss milestone', earned: true },
            { emoji: '💪', title: '30 Workouts', sub: 'This month', earned: true },
            { emoji: '🥗', title: 'Clean Week', sub: '7 days on target', earned: false },
          ].map(a => (
            <div key={a.title} className={cn('text-center p-4 rounded-xl border transition-all',
              a.earned ? 'bg-gradient-wellness border-sage-200' : 'bg-stone-50 border-stone-100 opacity-50')}>
              <div className="text-3xl mb-2">{a.emoji}</div>
              <p className="text-xs font-bold text-stone-700">{a.title}</p>
              <p className="text-xs text-stone-400 mt-0.5">{a.sub}</p>
              {!a.earned && <p className="text-xs text-stone-300 mt-1">Locked</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
