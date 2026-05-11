'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { calculateFullPlan } from '@/lib/utils/calculations'
import { getAge } from '@/lib/utils/calculations'
import toast from 'react-hot-toast'
import { Save, User, Target, Activity, Utensils } from 'lucide-react'

const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Desk job, minimal exercise' },
  { value: 'lightly_active', label: 'Lightly Active', desc: '1-2 days/week exercise' },
  { value: 'moderately_active', label: 'Moderately Active', desc: '3-4 days/week exercise' },
  { value: 'very_active', label: 'Very Active', desc: '5-6 days/week exercise' },
  { value: 'extremely_active', label: 'Extremely Active', desc: 'Daily intense exercise' },
]

const GOALS = [
  { value: 'fat_loss', label: '🔥 Fat Loss' },
  { value: 'muscle_gain', label: '💪 Muscle Gain' },
  { value: 'maintenance', label: '⚖️ Maintenance' },
  { value: 'stamina', label: '🏃 Stamina' },
  { value: 'mental_health', label: '🧠 Mental Health' },
  { value: 'general_wellness', label: '🌿 General Wellness' },
]

const DIET_TYPES = [
  { value: 'vegetarian', label: '🥗 Vegetarian' },
  { value: 'vegan', label: '🌱 Vegan' },
  { value: 'non_vegetarian', label: '🍗 Non-Vegetarian' },
  { value: 'eggetarian', label: '🥚 Eggetarian' },
  { value: 'jain', label: '☮️ Jain' },
  { value: 'keto', label: '🥑 Keto' },
]

const TONES = [
  { value: 'friendly', label: '🤝 Friendly & Motivating' },
  { value: 'strict', label: '💪 Strict Coach' },
  { value: 'scientific', label: '🔬 Scientific' },
  { value: 'balanced', label: '⚖️ Balanced' },
]

export default function SettingsPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    first_name: '', date_of_birth: '', gender: 'female',
    height_cm: '', current_weight_kg: '', target_weight_kg: '',
    activity_level: 'lightly_active', primary_goal: 'fat_loss',
    diet_type: 'vegetarian', coach_tone: 'balanced',
  })

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('user_profiles').select('*').eq('user_id', user.id).single()
      if (data) setForm({
        first_name: data.first_name || '',
        date_of_birth: data.date_of_birth || '',
        gender: data.gender || 'female',
        height_cm: data.height_cm?.toString() || '',
        current_weight_kg: data.current_weight_kg?.toString() || '',
        target_weight_kg: data.target_weight_kg?.toString() || '',
        activity_level: data.activity_level || 'lightly_active',
        primary_goal: data.primary_goal || 'fat_loss',
        diet_type: data.diet_type || 'vegetarian',
        coach_tone: data.coach_tone || 'balanced',
      })
    }
    load()
  }, [])

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const save = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { toast.error('Not logged in'); setLoading(false); return }

    // Calculate targets if we have enough data
    let targets = {}
    if (form.height_cm && form.current_weight_kg && form.date_of_birth) {
      const age = getAge(form.date_of_birth)
      const plan = calculateFullPlan({
        weightKg: +form.current_weight_kg, heightCm: +form.height_cm, age, gender: form.gender,
        activityLevel: form.activity_level as any, goal: form.primary_goal as any,
        targetWeightKg: form.target_weight_kg ? +form.target_weight_kg : undefined,
      })
      targets = { calorie_target: plan.calorie_target, protein_target_g: plan.protein_g, carbs_target_g: plan.carbs_g, fat_target_g: plan.fat_g }
    }

    const { error } = await supabase.from('user_profiles').upsert({
      user_id: user.id,
      first_name: form.first_name,
      date_of_birth: form.date_of_birth || null,
      gender: form.gender,
      height_cm: form.height_cm ? +form.height_cm : null,
      current_weight_kg: form.current_weight_kg ? +form.current_weight_kg : null,
      target_weight_kg: form.target_weight_kg ? +form.target_weight_kg : null,
      activity_level: form.activity_level,
      primary_goal: form.primary_goal,
      diet_type: form.diet_type,
      coach_tone: form.coach_tone,
      onboarding_completed: true,
      ...targets,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

    if (error) { toast.error('Save failed: ' + error.message) }
    else { toast.success('Profile saved! Your plan has been updated 🌿') }
    setLoading(false)
  }

  const sections = [
    { icon: User, title: 'Personal Info', fields: [
      { label: 'First Name', key: 'first_name', type: 'text', placeholder: 'Your first name' },
      { label: 'Date of Birth', key: 'date_of_birth', type: 'date', placeholder: '' },
    ]},
    { icon: Activity, title: 'Physical Stats', fields: [
      { label: 'Height (cm)', key: 'height_cm', type: 'number', placeholder: '165' },
      { label: 'Current Weight (kg)', key: 'current_weight_kg', type: 'number', placeholder: '70' },
      { label: 'Target Weight (kg)', key: 'target_weight_kg', type: 'number', placeholder: '65' },
    ]},
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-800">Profile Settings</h1>
        <p className="text-stone-400 text-sm mt-0.5">Your plan recalculates automatically when you save</p>
      </div>

      {sections.map(section => {
        const Icon = section.icon
        return (
          <div key={section.title} className="bg-white rounded-2xl border border-sage-50 shadow-card p-5 space-y-4">
            <h2 className="font-semibold text-stone-700 text-sm flex items-center gap-2"><Icon className="w-4 h-4 text-leaf" />{section.title}</h2>
            {section.fields.map(f => (
              <div key={f.key}>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">{f.label}</label>
                <input type={f.type} value={(form as any)[f.key]} onChange={update(f.key)} placeholder={f.placeholder} className="input-base" />
              </div>
            ))}
          </div>
        )
      })}

      <div className="bg-white rounded-2xl border border-sage-50 shadow-card p-5 space-y-4">
        <h2 className="font-semibold text-stone-700 text-sm flex items-center gap-2"><Target className="w-4 h-4 text-leaf" />Goals & Preferences</h2>
        {[
          { label: 'Gender', key: 'gender', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'non_binary', label: 'Non-binary' }] },
          { label: 'Activity Level', key: 'activity_level', options: ACTIVITY_LEVELS.map(a => ({ value: a.value, label: a.label })) },
          { label: 'Primary Goal', key: 'primary_goal', options: GOALS },
          { label: 'Diet Type', key: 'diet_type', options: DIET_TYPES },
          { label: 'Coach Tone', key: 'coach_tone', options: TONES },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">{f.label}</label>
            <select value={(form as any)[f.key]} onChange={update(f.key)} className="input-base">
              {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      <button onClick={save} disabled={loading} className="btn-primary w-full py-3.5 text-base">
        <Save className="w-4 h-4" />
        {loading ? 'Saving…' : 'Save Profile & Recalculate Plan'}
      </button>
    </div>
  )
}
