import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai/client'

export const runtime = 'nodejs'
export const maxDuration = 45

export async function POST(req: NextRequest) {
  try {
    const { goal='fat_loss', experience='beginner', location='home', days_per_week=3, duration_min=30, injuries=[] } = await req.json()

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
      await new Promise(r => setTimeout(r, 2000))
      return NextResponse.json({
        plan_name: `${experience} ${goal.replace('_',' ')} Plan`,
        description: `${days_per_week}-day program at ${location}.`,
        weeks: [{ week: 1, phase: 'Foundation', days: [{ day_label: 'Day 1', workout_name: 'Full Body A', estimated_duration_min: duration_min, exercises: [
          { name: 'Push-ups', sets: 3, reps: '10-12', rest_seconds: 60, notes: 'Keep core tight' },
          { name: 'Bodyweight Squats', sets: 3, reps: '15', rest_seconds: 60, notes: 'Knees over toes' },
          { name: 'Plank', sets: 3, reps: '30 sec', rest_seconds: 45, notes: 'Breathe steadily' },
        ]}]}],
        ai_notes: `Plan for ${experience} level. Increase difficulty every 2 weeks.`,
      })
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: 'Expert personal trainer. Return only valid JSON.' },
        { role: 'user', content: `Create a ${days_per_week}-day/week, ${duration_min}-min workout plan for ${goal} goal, ${experience} level, ${location}. Injuries: ${injuries.join(', ')||'none'}. Return JSON with plan_name, description, weeks array, ai_notes.` },
      ],
      max_tokens: 2000, temperature: 0.3, response_format: { type: 'json_object' },
    })
    return NextResponse.json(JSON.parse(completion.choices[0]?.message?.content || '{}'))
  } catch (e) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
