const TESTIMONIALS = [
  {
    name: 'Priya S.',
    role: 'Lost 8kg in 3 months',
    avatar: 'PS',
    content: 'The AI photo scanner changed everything. I used to spend 15 minutes logging meals. Now I snap a photo and it\'s done in 5 seconds. The Indian food database is incredible.',
    rating: 5,
  },
  {
    name: 'Marcus T.',
    role: 'Gained 5kg of muscle',
    avatar: 'MT',
    content: 'The progressive overload logic in the workout plans is genius. I\'ve been training for 2 years and hit more PRs in 3 months with Infinite Wellness than the previous year alone.',
    rating: 5,
  },
  {
    name: 'Ananya R.',
    role: 'Managing PCOS',
    avatar: 'AR',
    content: 'The app understands my medical condition and adjusts everything accordingly. Low-GI food suggestions, workouts safe for hormonal health — it\'s like having a specialist in my pocket.',
    rating: 5,
  },
  {
    name: 'James K.',
    role: 'Marathon runner',
    avatar: 'JK',
    content: 'The stamina-focused workout plans and carb periodization suggestions have shaved 18 minutes off my marathon time. The AI coach actually understands endurance training.',
    rating: 5,
  },
  {
    name: 'Shreya M.',
    role: 'Busy working mom',
    avatar: 'SM',
    content: 'Finally a wellness app that fits my life instead of demanding I fit its life. 20-minute home workouts, quick meal logging, and an AI that doesn\'t shame me for missing a day.',
    rating: 5,
  },
  {
    name: 'David L.',
    role: 'Lost 15kg',
    avatar: 'DL',
    content: 'I\'ve tried every app. This is the first one where I felt like the AI actually knew me. It remembered my knee injury, my food preferences, my schedule. It feels personal.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-wellness overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-leaf uppercase tracking-widest mb-3">Real Stories</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-moss mb-4">
            People Are Transforming
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-amber-400 text-xl">★</span>
            ))}
          </div>
          <p className="text-stone-500">Rated 4.9/5 by our community</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="card p-6 flex flex-col gap-4"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed flex-1">"{t.content}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-50">
                <div className="w-10 h-10 rounded-full bg-gradient-cta flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">{t.name}</p>
                  <p className="text-xs text-leaf font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
