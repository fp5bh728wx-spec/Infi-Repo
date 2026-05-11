export function formatCalories(cal: number): string {
  return Math.round(cal).toLocaleString()
}

export function formatWeight(kg: number, unit: 'kg' | 'lbs' = 'kg'): string {
  if (unit === 'lbs') return `${Math.round(kg * 2.205)} lbs`
  return `${kg.toFixed(1)} kg`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return formatDate(dateString)
}

export function getMealEmoji(meal: string): string {
  const map: Record<string, string> = {
    breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍎',
  }
  return map[meal] ?? '🍽️'
}

export function getGoalLabel(goal: string): string {
  const map: Record<string, string> = {
    fat_loss: 'Fat Loss', muscle_gain: 'Muscle Gain', maintenance: 'Maintenance',
    stamina: 'Stamina', mental_health: 'Mental Health', general_wellness: 'General Wellness',
  }
  return map[goal] ?? goal
}
