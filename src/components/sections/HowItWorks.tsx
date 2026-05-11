const STEPS = [
  {
    number: '01',
    title: 'Tell Us About Yourself',
    description: 'Complete a 5-minute onboarding — your age, goals, diet, fitness level, and health conditions. No guesswork.',
    emoji: '👤',
  },
  {
    number: '02',
    title: 'Get Your Personalized Plan',
    description: 'Our AI instantly generates your calorie targets, macro split, 4-week workout plan, and 7-day meal plan.',
    emoji: '✨',
  },
  {
    number: '03',
    title: 'Track Daily — Effortlessly',
    description: 'Log meals with a photo snap, log workouts with one tap, and chat with your coach whenever you need support.',
    emoji: '📱',
  },
  {
    number: '04',
    title: 'Watch Yourself Transform',
    description: 'See your progress in beautiful charts. Weekly reports celebrate every win and adjust your plan as you improve.',
    emoji: '📈',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-leaf uppercase tracking-widest mb-3">Simple Process</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-moss mb-4">
            From Zero to Thriving in 4 Steps
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            We did the science so you don't have to. Just show up — we handle the rest.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-sage-200 to-transparent" />

          {STEPS.map((step, i) => (
            <div key={step.number} className="relative text-center group">
              {/* Emoji circle */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-wellness border border-sage-100 flex flex-col items-center justify-center shadow-card group-hover:shadow-card-hover transition-shadow duration-300 relative z-10">
                <span className="text-3xl">{step.emoji}</span>
                <span className="text-xs font-bold text-sage-400 mt-1">{step.number}</span>
              </div>
              <h3 className="font-semibold text-stone-800 text-lg mb-2">{step.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
