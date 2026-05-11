import type { ActivityLevel, PrimaryGoal, CalorieCalculation, MacroTargets } from '@/types'

// ── TDEE Calculator (Mifflin-St Jeor) ───────────────────────

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary:         1.2,
  lightly_active:    1.375,
  moderately_active: 1.55,
  very_active:       1.725,
  extremely_active:  1.9,
}

export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female' | string,
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return gender === 'male' ? base + 5 : base - 161
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel])
}

export function calculateCalorieTarget(
  tdee: number,
  goal: PrimaryGoal,
): number {
  const adjustments: Partial<Record<PrimaryGoal, number>> = {
    fat_loss:       -400,
    muscle_gain:    +250,
    maintenance:    0,
    stamina:        -100,
    mental_health:  0,
    general_wellness: -200,
  }
  return Math.max(1200, tdee + (adjustments[goal] ?? 0))
}

export function calculateMacros(
  calorieTarget: number,
  goal: PrimaryGoal,
  weightKg: number,
): MacroTargets {
  // Protein: 1.8–2.2g/kg for fat loss/muscle, 1.4g/kg for general
  const proteinMultiplier =
    goal === 'fat_loss' || goal === 'muscle_gain' ? 2.0
    : goal === 'stamina' ? 1.6
    : 1.4
  const protein_g = Math.round(weightKg * proteinMultiplier)
  const protein_calories = protein_g * 4

  // Fat: 25–30% of calories
  const fat_pct = goal === 'fat_loss' ? 0.25 : 0.28
  const fat_g = Math.round((calorieTarget * fat_pct) / 9)
  const fat_calories = fat_g * 9

  // Carbs: remaining
  const carbs_calories = calorieTarget - protein_calories - fat_calories
  const carbs_g = Math.round(Math.max(0, carbs_calories / 4))

  return { calories: calorieTarget, protein_g, carbs_g, fat_g }
}

export function calculateFullPlan(params: {
  weightKg: number
  heightCm: number
  age: number
  gender: string
  activityLevel: ActivityLevel
  goal: PrimaryGoal
  targetWeightKg?: number
}): CalorieCalculation {
  const { weightKg, heightCm, age, gender, activityLevel, goal, targetWeightKg } = params
  const bmr = calculateBMR(weightKg, heightCm, age, gender)
  const tdee = calculateTDEE(bmr, activityLevel)
  const calorie_target = calculateCalorieTarget(tdee, goal)
  const macros = calculateMacros(calorie_target, goal, weightKg)

  // Weeks to goal estimate
  let goal_timeline_weeks: number | null = null
  if (targetWeightKg && goal === 'fat_loss') {
    const diff = weightKg - targetWeightKg
    const weeklyLossKg = (tdee - calorie_target) / 7700
    goal_timeline_weeks = weeklyLossKg > 0 ? Math.ceil(diff / weeklyLossKg) : null
  }

  return {
    bmr: Math.round(bmr),
    tdee,
    calorie_target,
    ...macros,
    goal_timeline_weeks,
  }
}

// ── BMI ─────────────────────────────────────────────────────

export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10
}

export function getBMICategory(bmi: number): {
  label: string
  color: string
  description: string
} {
  if (bmi < 18.5) return { label: 'Underweight', color: '#3B82F6', description: 'Below healthy range' }
  if (bmi < 25)   return { label: 'Normal weight', color: '#22C55E', description: 'Healthy range' }
  if (bmi < 30)   return { label: 'Overweight', color: '#F59E0B', description: 'Above healthy range' }
  return             { label: 'Obese', color: '#EF4444', description: 'Well above healthy range' }
}

// ── Age from DOB ─────────────────────────────────────────────

export function getAge(dateOfBirth: string): number {
  const today = new Date()
  const birth = new Date(dateOfBirth)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}
