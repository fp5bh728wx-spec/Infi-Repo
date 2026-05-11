import { NextRequest, NextResponse } from 'next/server'
import { openai, WELLNESS_SYSTEM_PROMPT, buildUserContext } from '@/lib/openai/client'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, tone, history = [] } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Safety check — crisis keywords
    const CRISIS_WORDS = [
      'want to die', "don't want to live", 'end my life',
      'kill myself', 'suicide', 'self harm', 'hurt myself',
    ]
    const lower = message.toLowerCase()
    if (CRISIS_WORDS.some(w => lower.includes(w))) {
      return NextResponse.json({
        reply: `What you've shared matters deeply. You're not alone. 💙\n\nPlease reach out to someone who can truly help right now:\n\n🇮🇳 iCall (India): 9152987821\n🇮🇳 Vandrevala Foundation: 1860-2662-345 (24/7)\n🇺🇸 988 Lifeline: Call or text 988\n🇬🇧 Samaritans: 116 123\n🌍 findahelpline.com\n\nI'm here to talk, but please also reach out to a real person. 💙`,
      })
    }

    // Get user context (optional)
    let userContext = ''
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('first_name, primary_goal, calorie_target, diet_type')
          .eq('user_id', user.id)
          .single()
        if (profile) {
          userContext = buildUserContext({
            name: profile.first_name ?? undefined,
            goal: profile.primary_goal ?? undefined,
            calorieTarget: profile.calorie_target ?? undefined,
            dietType: profile.diet_type ?? undefined,
          })
        }
      }
    } catch { /* continue without context */ }

    const TONE_ADDITIONS: Record<string, string> = {
      friendly:   'Respond warmly and encouragingly. Use occasional emojis. Celebrate every win.',
      strict:     'Respond as a strict performance coach. Direct and no-nonsense — but never cruel.',
      scientific: 'Respond with precise, evidence-based language. Cite mechanisms where relevant.',
      balanced:   'Respond with a balanced mix of support and challenge.',
    }

    const systemPrompt = [
      WELLNESS_SYSTEM_PROMPT,
      TONE_ADDITIONS[tone] ?? TONE_ADDITIONS.balanced,
      userContext,
    ].filter(Boolean).join('\n\n')

    const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-10).map((m: { role: 'user' | 'assistant'; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
      { role: 'user', content: message },
    ]

    // Mock response if no real API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
      const mocks: Record<string, string> = {
        calorie:  "Your calorie target is based on your TDEE. I'd recommend a 400 kcal deficit for sustainable fat loss of ~0.35kg/week. Want me to calculate your exact numbers?",
        workout:  "Here's a 30-min home circuit:\n\n💪 3 rounds, 40s on / 20s rest:\n1. Push-ups\n2. Bodyweight squats\n3. Mountain climbers\n4. Glute bridges\n5. Plank\n\nRest 90s between rounds. You've got this! 🔥",
        protein:  "Post-workout: aim for 25-30g protein + 30-40g carbs within 60 minutes. Great Indian options: curd + banana, paneer bhurji + roti, or dal + rice.",
        default:  "Great question! Building sustainable habits is the foundation of lasting change. What specific aspect would you like to explore — nutrition, workouts, or mindset?",
      }
      const key = lower.includes('calorie') ? 'calorie'
        : lower.includes('workout') || lower.includes('exercise') ? 'workout'
        : lower.includes('protein') || lower.includes('eat') ? 'protein'
        : 'default'
      return NextResponse.json({ reply: mocks[key] })
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages,
      max_tokens: 600,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content ?? "I'm having a moment — please try again!"
    return NextResponse.json({ reply })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ reply: "I'm having trouble connecting right now. Please try again! 🙏" }, { status: 500 })
  }
}
