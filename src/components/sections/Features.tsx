import { Brain, Camera, Dumbbell, LineChart, Heart, Bell } from 'lucide-react'

const FEATURES = [
  {
    icon: Camera,
    title: 'AI Food Scanner',
    description: 'Snap a photo of any meal. Our AI instantly identifies food items, estimates calories and macros, and gives gentle coaching feedback.',
    badge: 'Most Popular',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: Dumbbell,
    title: 'Smart Workout Generator',
    description: 'Personalized plans based on your goals, fitness level, equipment, and injuries. With progressive overload built in.',
    badge: null,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Brain,
    title: '24/7 AI Coach',
    description: 'Ask anything — nutrition, workouts, motivation, injury advice. Your coach adapts to your preferred tone and remembers your goals.',
    badge: 'AI Powered',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    icon: LineChart,
    title: 'Progress Dashboard',
    description: 'Beautiful charts for weight, strength, calories, and sleep. Weekly reports that celebrate every win.',
    badge: null,
    color: 'text-leaf',
    bg: 'bg-sage-50',
    border: 'border-sage-100',
  },
  {
    icon: Heart,
    title: 'Mental Wellness',
    description: 'Mood tracking, guided breathing, meditation library, journaling, and gratitude — mental health deeply integrated.',
    badge: null,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
  {
    icon: Bell,
    title: 'Smart Habit Reminders',
    description: 'Water, sleep, workout, and stretch reminders that learn from your schedule. Gamified streaks keep you motivated.',
    badge: null,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-wellness">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-leaf uppercase tracking-widest mb-3">Everything You Need</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-moss mb-4">
            Your Complete Wellness Suite
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Six powerful tools working together to transform your health journey — all free, all personalized.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={f.title}
                className={`relative card p-6 border ${f.border} group cursor-default`}
                style={{ animationDelay: `${i * 100}ms` }}>
                {f.badge && (
                  <span className="absolute top-4 right-4 text-xs font-semibold text-moss bg-mist px-2.5 py-1 rounded-full">
                    {f.badge}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-stone-800 text-lg mb-2">{f.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
