import OpenAI from 'openai'

// Server-side only — never expose API key to client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const WELLNESS_SYSTEM_PROMPT = `You are the Infinite Wellness AI Coach — a world-class health and fitness coach.
You are warm, encouraging, evidence-based, and deeply knowledgeable about nutrition, exercise science, and mental wellness.
You never shame or judge. You respond to missed goals with empathy and encouragement.
Keep responses concise (under 200 words for mobile) but substantive.
Always end with one actionable suggestion.
You cannot diagnose medical conditions or prescribe medications. For medical concerns, always recommend consulting a doctor.`

export function buildUserContext(profile: {
  name?: string
  goal?: string
  calorieTarget?: number
  dietType?: string
}): string {
  return `User context: Name: ${profile.name || 'there'}, Goal: ${profile.goal || 'general wellness'}, Daily calorie target: ${profile.calorieTarget || 'not set'} kcal, Diet: ${profile.dietType || 'no restrictions'}.`
}
