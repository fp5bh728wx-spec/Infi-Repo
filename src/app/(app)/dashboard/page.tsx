'use client'
import { useEffect, useState } from 'react'
import { Droplets, Footprints, Moon, Flame, Target, TrendingUp, Plus, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'

interface DailySummary {
  calories: number; calorieTarget: number
  protein: number;  proteinTarget: number
  carbs: number;    carbsTarget: number
  fat: number;      fatTarget: number
  water: number;    waterTarget: number
  steps: number;    stepsTarget: number
  streak: number
}

const QUICK_ACTIONS = [
  { label: 'Log Meal',     href: '/nutrition', icon: '🍽️', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { label: 'Log Workout',  href: '/workout',   icon: '💪', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { label: 'Ask Coach',    href: '/coach',     icon: '🤖', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { label: 'Log Weight',   href: '/progress',  icon: '⚖️', color: 'bg-sage-50 text-leaf border-sage-100' },
]

function CalorieRing({ consumed, target }: { consumed: number; target: number }) {
  const pct = Math.min(consumed / Math.max(target, 1), 1)
  const r = 54; const circ = 2 * Math.PI * r
  const color = pct > 1 ? '#ef4444' : pct > 0.85 ? '#f59e0b' : '#558c55'
  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e6f0e6" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${circ * pct} ${circ}`}
          style={{ transition: 'stroke-dasharray 1s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-stone-800">{Math.round(consumed)}</span>
        <span className="text-xs text-stone-400">/ {target} kcal</span>
        <span className="text-xs font-semibold mt-0.5" style={{ color }}>{Math.round(pct*100)}%</span>
      </div>
    </div>
  )
}

function HabitPill({ icon, label, current, target, unit, done }:
  { icon: React.ReactNode; label: string; current: number; target: number; unit: string; done: boolean }) {
  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-xl border transition-colors',
      done ? 'bg-sage-50 border-sage-200' : 'bg-white border-stone-100')}>
      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
        done ? 'bg-leaf text-white' : 'bg-stone-100 text-stone-500')}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-stone-600">{label}</p>
        <p className="text-sm font-bold text-stone-800">{current} <span className="text-xs font-normal text-stone-400">/ {target} {unit}</span></p>
      </div>
      {done && <span className="text-leaf text-lg">✓</span>}
    </div>
  )
}

export default function DashboardPage() {
  const supabase = createClient()
  const [userName, setUserName] = useState('there')
  const [summary, setSummary] = useState<DailySummary>({
    calories: 847, calorieTarget: 1645,
    protein: 62,   proteinTarget: 130,
    carbs: 95,     carbsTarget: 180,
    fat: 28,       fatTarget: 45,
    water: 1200,   waterTarget: 2500,
    steps: 5420,   stepsTarget: 8000,
    streak: 9,
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        const name = data.user.user_metadata?.full_name?.split(' ')[0] || 'there'
        setUserName(name)
      }
    })
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const macros = [
    { label: 'Protein', g: summary.protein, target: summary.proteinTarget, color: '#3b82f6' },
    { label: 'Carbs',   g: summary.carbs,   target: summary.carbsTarget,   color: '#f59e0b' },
    { label: 'Fat',     g: summary.fat,     target: summary.fatTarget,     color: '#558c55' },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-stone-400 text-sm">{greeting},</p>
          <h1 className="font-display text-2xl font-bold text-stone-800 capitalize">{userName} 👋</h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-sage-100 shadow-sm">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-bold text-stone-700">{summary.streak} day streak</span>
        </div>
      </div>

      {/* Calorie card */}
      <div className="bg-white rounded-2xl shadow-card border border-sage-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-stone-700 text-sm">Today's Calories</h2>
          <Link href="/nutrition" className="text-xs text-leaf font-semibold flex items-center gap-1 hover:underline">
            Log food <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <CalorieRing consumed={summary.calories} target={summary.calorieTarget} />
          <div className="space-y-3">
            {macros.map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-500 font-medium">{m.label}</span>
                  <span className="text-stone-600 font-semibold">{m.g}g / {m.target}g</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(m.g/m.target*100,100)}%`, backgroundColor: m.color }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-stone-400 pt-1">
              {Math.max(0, summary.calorieTarget - summary.calories)} kcal remaining today
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold text-stone-700 text-sm mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(a => (
            <Link key={a.label} href={a.href}
              className={cn('flex flex-col items-center gap-2 p-4 rounded-xl border font-medium text-sm hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md', a.color)}>
              <span className="text-2xl">{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Habits */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-stone-700 text-sm">Today's Habits</h2>
          <span className="text-xs text-stone-400">3/4 done</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <HabitPill icon={<Droplets className="w-4 h-4" />} label="Water" current={summary.water} target={summary.waterTarget} unit="ml" done={summary.water >= summary.waterTarget} />
          <HabitPill icon={<Footprints className="w-4 h-4" />} label="Steps" current={summary.steps} target={summary.stepsTarget} unit="steps" done={summary.steps >= summary.stepsTarget} />
          <HabitPill icon={<Moon className="w-4 h-4" />} label="Sleep" current={7} target={8} unit="hrs" done={false} />
          <HabitPill icon={<Target className="w-4 h-4" />} label="Workout" current={0} target={1} unit="session" done={false} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'This Week', value: '3', sub: 'workouts', icon: '💪' },
          { label: 'Avg Calories', value: '1,520', sub: 'kcal/day', icon: '🔥' },
          { label: 'Weight Change', value: '-0.8', sub: 'kg this week', icon: '📉' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-sage-50 shadow-card p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-lg font-bold text-stone-800">{s.value}</p>
            <p className="text-xs text-stone-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* CTA to complete profile */}
      <div className="bg-gradient-hero rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">Complete your profile</p>
          <p className="text-mist/70 text-xs mt-0.5">Get a fully personalized plan in 3 minutes</p>
        </div>
        <Link href="/settings" className="flex items-center gap-1.5 px-4 py-2 bg-white text-moss rounded-xl text-sm font-semibold hover:shadow-md transition-shadow">
          Set Up <TrendingUp className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
