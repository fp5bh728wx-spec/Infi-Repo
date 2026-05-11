'use client'
import { useState, useRef } from 'react'
import { Camera, Search, Plus, Trash2, ChevronDown, Loader2, Upload } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { getMealEmoji } from '@/lib/utils/format'
import toast from 'react-hot-toast'

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'
interface FoodEntry { id: string; name: string; calories: number; protein: number; carbs: number; fat: number; meal: MealType }

const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']

const SAMPLE_FOODS = [
  { name: 'Dal Makhani (1 katori)', calories: 234, protein: 13, carbs: 23, fat: 11 },
  { name: 'Chapati (1 piece)',      calories: 80,  protein: 3,  carbs: 15, fat: 2  },
  { name: 'Brown Rice (1 cup)',     calories: 216, protein: 5,  carbs: 45, fat: 2  },
  { name: 'Paneer (100g)',          calories: 265, protein: 19, carbs: 4,  fat: 20 },
  { name: 'Oats Upma (1 bowl)',     calories: 220, protein: 7,  carbs: 38, fat: 5  },
  { name: 'Banana (1 medium)',      calories: 89,  protein: 1,  carbs: 23, fat: 0  },
]

export default function NutritionPage() {
  const [entries, setEntries] = useState<FoodEntry[]>([])
  const [activeMeal, setActiveMeal] = useState<MealType>('breakfast')
  const [searchQ, setSearchQ]     = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showPhotoUI, setShowPhotoUI] = useState(false)
  const [photoUploading, setPhotoUploading] = useState(false)
  const [photoResult, setPhotoResult]       = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const dailyTotals = entries.reduce(
    (acc, e) => ({ cal: acc.cal+e.calories, pro: acc.pro+e.protein, carb: acc.carb+e.carbs, fat: acc.fat+e.fat }),
    { cal: 0, pro: 0, carb: 0, fat: 0 }
  )
  const targets = { cal: 1645, pro: 130, carb: 180, fat: 45 }

  const addFood = (food: typeof SAMPLE_FOODS[0]) => {
    setEntries(prev => [...prev, { id: crypto.randomUUID(), ...food, meal: activeMeal }])
    setSearchQ(''); setShowSearch(false)
    toast.success(`${food.name} logged! 🌿`)
  }

  const removeEntry = (id: string) => setEntries(prev => prev.filter(e => e.id !== id))

  const handlePhotoUpload = async (file: File) => {
    setPhotoUploading(true)
    setPhotoResult(null)
    // Placeholder — would call /api/nutrition/analyze-photo
    await new Promise(r => setTimeout(r, 2500))
    setPhotoResult('🍚 White Rice (1.5 cups) — ~310 kcal\n🫘 Dal Tadka (1 bowl) — ~215 kcal\n🥗 Mixed Sabzi (1 serving) — ~95 kcal\n\nTotal estimated: ~620 kcal\n\n✨ Great home-cooked meal! Rich in fiber and plant protein. Consider adding a small salad for extra micronutrients.')
    setPhotoUploading(false)
  }

  const filtered = SAMPLE_FOODS.filter(f => f.name.toLowerCase().includes(searchQ.toLowerCase()))

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-800">Nutrition Tracker</h1>
        <p className="text-stone-400 text-sm mt-0.5">Log your meals and track your macros</p>
      </div>

      {/* Daily summary ring */}
      <div className="bg-white rounded-2xl shadow-card border border-sage-50 p-5">
        <h2 className="font-semibold text-stone-700 text-sm mb-4">Today's Summary</h2>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Calories', val: dailyTotals.cal, target: targets.cal, unit: 'kcal', color: '#558c55' },
            { label: 'Protein',  val: dailyTotals.pro,  target: targets.pro,  unit: 'g', color: '#3b82f6' },
            { label: 'Carbs',    val: dailyTotals.carb, target: targets.carb, unit: 'g', color: '#f59e0b' },
            { label: 'Fat',      val: dailyTotals.fat,  target: targets.fat,  unit: 'g', color: '#8b5cf6' },
          ].map(m => (
            <div key={m.label} className="text-center">
              <div className="relative w-14 h-14 mx-auto mb-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#f1f5f1" strokeWidth="5" />
                  <circle cx="28" cy="28" r="22" fill="none" stroke={m.color} strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${2*Math.PI*22*Math.min(m.val/m.target,1)} ${2*Math.PI*22}`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-stone-700">
                  {Math.round(m.val/m.target*100)}%
                </span>
              </div>
              <p className="text-xs font-bold text-stone-700">{Math.round(m.val)}<span className="font-normal text-stone-400">{m.unit}</span></p>
              <p className="text-xs text-stone-400">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Log actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => { setShowSearch(true); setShowPhotoUI(false) }}
          className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl border border-sage-100 shadow-card text-sm font-semibold text-stone-700 hover:bg-sage-50 hover:border-sage-300 transition-all">
          <Search className="w-4 h-4 text-leaf" /> Search Food
        </button>
        <button onClick={() => { setShowPhotoUI(true); setShowSearch(false) }}
          className="flex items-center justify-center gap-2 p-4 bg-gradient-cta rounded-xl shadow-md text-sm font-semibold text-white hover:shadow-lg hover:-translate-y-0.5 transition-all">
          <Camera className="w-4 h-4" /> Photo Scan AI
        </button>
      </div>

      {/* Meal type tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {MEAL_TYPES.map(m => (
          <button key={m} onClick={() => setActiveMeal(m)}
            className={cn('flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
              activeMeal === m ? 'bg-moss text-white shadow-md' : 'bg-white text-stone-600 border border-stone-100 hover:bg-sage-50')}>
            {getMealEmoji(m)} {m.charAt(0).toUpperCase()+m.slice(1)}
          </button>
        ))}
      </div>

      {/* Search panel */}
      {showSearch && (
        <div className="bg-white rounded-2xl border border-sage-100 shadow-card overflow-hidden">
          <div className="p-4 border-b border-stone-50">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-stone-400 flex-shrink-0" />
              <input autoFocus type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Search food (e.g. dal, roti, chicken...)"
                className="flex-1 text-sm text-stone-700 placeholder-stone-400 outline-none" />
              <button onClick={() => setShowSearch(false)} className="text-stone-400 hover:text-stone-600 text-lg leading-none">×</button>
            </div>
          </div>
          <div className="divide-y divide-stone-50 max-h-64 overflow-y-auto">
            {(searchQ ? filtered : SAMPLE_FOODS).map(food => (
              <button key={food.name} onClick={() => addFood(food)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-sage-50 transition-colors text-left">
                <div>
                  <p className="text-sm font-medium text-stone-700">{food.name}</p>
                  <p className="text-xs text-stone-400">P:{food.protein}g · C:{food.carbs}g · F:{food.fat}g</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-stone-700">{food.calories} kcal</span>
                  <Plus className="w-4 h-4 text-leaf" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Photo AI panel */}
      {showPhotoUI && (
        <div className="bg-white rounded-2xl border border-sage-100 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-stone-800">AI Food Scanner</h3>
            <button onClick={() => { setShowPhotoUI(false); setPhotoResult(null) }} className="text-stone-400 hover:text-stone-600 text-lg">×</button>
          </div>

          {!photoUploading && !photoResult && (
            <div onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-sage-200 rounded-xl p-10 text-center cursor-pointer hover:border-leaf hover:bg-sage-50 transition-all">
              <Upload className="w-10 h-10 text-sage-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-stone-600">Tap to upload your meal photo</p>
              <p className="text-xs text-stone-400 mt-1">JPG, PNG · Max 10MB · AI identifies food & estimates calories</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => { if (e.target.files?.[0]) handlePhotoUpload(e.target.files[0]) }} />
            </div>
          )}

          {photoUploading && (
            <div className="flex flex-col items-center gap-4 py-10">
              <Loader2 className="w-10 h-10 text-leaf animate-spin" />
              <p className="text-sm font-medium text-stone-600">Analyzing your meal with AI…</p>
              <p className="text-xs text-stone-400">Identifying foods and estimating calories</p>
            </div>
          )}

          {photoResult && (
            <div className="space-y-4">
              <div className="bg-sage-50 rounded-xl p-4">
                <p className="text-sm text-stone-700 whitespace-pre-line">{photoResult}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { addFood({ name: 'Photo AI Meal', calories: 620, protein: 24, carbs: 88, fat: 14 }); setShowPhotoUI(false); setPhotoResult(null) }}
                  className="btn-primary flex-1 py-2.5 text-sm">Log This Meal</button>
                <button onClick={() => setPhotoResult(null)} className="btn-secondary flex-1 py-2.5 text-sm">Retake Photo</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Logged entries */}
      <div>
        <h2 className="font-semibold text-stone-700 text-sm mb-3">
          {getMealEmoji(activeMeal)} {activeMeal.charAt(0).toUpperCase()+activeMeal.slice(1)} Entries
        </h2>
        {entries.filter(e => e.meal === activeMeal).length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-stone-200">
            <p className="text-2xl mb-2">{getMealEmoji(activeMeal)}</p>
            <p className="text-sm text-stone-400">No {activeMeal} logged yet</p>
            <button onClick={() => setShowSearch(true)} className="mt-3 text-xs text-leaf font-semibold hover:underline">Add food →</button>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.filter(e => e.meal === activeMeal).map(e => (
              <div key={e.id} className="bg-white rounded-xl border border-stone-100 shadow-sm px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-700">{e.name}</p>
                  <p className="text-xs text-stone-400">P:{e.protein}g · C:{e.carbs}g · F:{e.fat}g</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-stone-700">{e.calories} kcal</span>
                  <button onClick={() => removeEntry(e.id)} className="text-stone-300 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
