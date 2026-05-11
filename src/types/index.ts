// ============================================================
// GLOBAL TYPE DEFINITIONS — Infinite Wellness
// ============================================================

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  first_name: string | null
  last_name: string | null
  date_of_birth: string | null
  gender: 'male' | 'female' | 'non_binary' | 'prefer_not_to_say' | null
  height_cm: number | null
  current_weight_kg: number | null
  target_weight_kg: number | null
  activity_level: ActivityLevel | null
  primary_goal: PrimaryGoal | null
  diet_type: DietType | null
  coach_tone: CoachTone
  calorie_target: number | null
  protein_target_g: number | null
  carbs_target_g: number | null
  fat_target_g: number | null
  water_target_ml: number
  steps_target: number
  onboarding_completed: boolean
  is_pro: boolean
  created_at: string
  updated_at: string
}

export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'extremely_active'

export type PrimaryGoal =
  | 'fat_loss'
  | 'muscle_gain'
  | 'maintenance'
  | 'stamina'
  | 'mental_health'
  | 'general_wellness'

export type DietType =
  | 'vegetarian'
  | 'vegan'
  | 'non_vegetarian'
  | 'eggetarian'
  | 'jain'
  | 'keto'
  | 'paleo'
  | 'other'

export type CoachTone = 'friendly' | 'strict' | 'scientific' | 'balanced'

// ── Nutrition ────────────────────────────────────────────────

export interface FoodLog {
  id: string
  user_id: string
  food_name: string
  meal_type: MealType
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
  quantity_g: number | null
  logged_at: string
  source: 'search' | 'photo_ai' | 'manual' | 'barcode'
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface DailyNutrition {
  date: string
  total_calories: number
  total_protein_g: number
  total_carbs_g: number
  total_fat_g: number
  calorie_target: number
  logs: FoodLog[]
}

export interface MacroTargets {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
}

// ── Fitness ──────────────────────────────────────────────────

export interface WorkoutPlan {
  id: string
  user_id: string
  name: string
  goal: PrimaryGoal
  days_per_week: number
  experience_level: ExperienceLevel
  weeks: WorkoutWeek[]
  created_at: string
  is_active: boolean
}

export type ExperienceLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'

export interface WorkoutWeek {
  week: number
  days: WorkoutDay[]
}

export interface WorkoutDay {
  day_label: string
  workout_name: string
  estimated_duration_min: number
  exercises: Exercise[]
}

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  rest_seconds: number
  notes: string | null
  muscle_groups: string[]
}

export interface WorkoutSession {
  id: string
  user_id: string
  plan_id: string | null
  workout_name: string
  duration_min: number
  calories_burned: number | null
  mood_after: number | null
  completed_at: string
}

// ── Progress ─────────────────────────────────────────────────

export interface WeightLog {
  id: string
  user_id: string
  weight_kg: number
  logged_at: string
  notes: string | null
}

export interface ProgressStats {
  current_weight: number | null
  start_weight: number | null
  target_weight: number | null
  total_change: number | null
  current_streak: number
  workouts_this_week: number
  avg_calories_this_week: number
}

// ── AI Chat ──────────────────────────────────────────────────

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface ChatConversation {
  id: string
  user_id: string
  title: string
  messages: ChatMessage[]
  created_at: string
}

// ── UI / Components ──────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  icon?: string
}

export interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
}

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  read_time: number
  published_at: string
  author: string
  cover_image: string
}

// ── API Responses ────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface CalorieCalculation {
  bmr: number
  tdee: number
  calorie_target: number
  protein_g: number
  carbs_g: number
  fat_g: number
  goal_timeline_weeks: number | null
}
