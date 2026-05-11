import { NextRequest, NextResponse } from 'next/server'
import { calculateFullPlan } from '@/lib/utils/calculations'
import type { ActivityLevel, PrimaryGoal } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { weight_kg, height_cm, date_of_birth, gender, activity_level, goal, target_weight_kg } = await req.json()
    if (!weight_kg || !height_cm || !date_of_birth || !gender || !activity_level || !goal)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const age = Math.floor((Date.now() - new Date(date_of_birth).getTime()) / (365.25 * 86400000))
    if (age < 13 || age > 120) return NextResponse.json({ error: 'Invalid date of birth' }, { status: 400 })

    const result = calculateFullPlan({ weightKg: +weight_kg, heightCm: +height_cm, age, gender, activityLevel: activity_level as ActivityLevel, goal: goal as PrimaryGoal, targetWeightKg: target_weight_kg ? +target_weight_kg : undefined })
    return NextResponse.json({ success: true, data: result })
  } catch (e) {
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 })
  }
}
