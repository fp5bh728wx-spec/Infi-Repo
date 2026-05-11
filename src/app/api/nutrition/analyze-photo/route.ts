import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai/client'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('photo') as File | null
    const mealType = formData.get('meal_type') as string || 'meal'

    if (!file) return NextResponse.json({ error: 'No photo provided' }, { status: 400 })
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
      await new Promise(r => setTimeout(r, 1500))
      return NextResponse.json({
        detected_items: [
          { food_name: 'White Rice', estimated_grams: 200, calories: 260, protein_g: 5.4, carbs_g: 57, fat_g: 0.4, confidence: 'high' },
          { food_name: 'Dal Tadka',  estimated_grams: 150, calories: 215, protein_g: 11, carbs_g: 28, fat_g: 6.8, confidence: 'high' },
          { food_name: 'Mixed Sabzi', estimated_grams: 100, calories: 95, protein_g: 3, carbs_g: 12, fat_g: 4.5, confidence: 'medium' },
        ],
        meal_totals: { calories: 570, protein_g: 19.4, carbs_g: 97, fat_g: 11.7 },
        ai_feedback: 'This looks like a wholesome home-cooked meal! 🌿 Great choice of dal for protein. Consider adding a small salad for extra fiber.',
        confidence: 'medium',
      })
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', max_tokens: 800,
      messages: [{ role: 'user', content: [
        { type: 'image_url', image_url: { url: `data:${file.type};base64,${base64}`, detail: 'high' } },
        { type: 'text', text: `Analyze this ${mealType} image. Return JSON only with detected_items (food_name, estimated_grams, calories, protein_g, carbs_g, fat_g, confidence), meal_totals, ai_feedback, and confidence.` },
      ]}],
    })
    const content = response.choices[0]?.message?.content || '{}'
    const match = content.match(/\{[\s\S]*\}/)
    return NextResponse.json(match ? JSON.parse(match[0]) : { error: 'Parse failed' })
  } catch (e: any) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
