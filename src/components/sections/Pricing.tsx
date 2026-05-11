import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'

const FREE_FEATURES = [
  'AI calorie & macro tracking',
  'Photo food scanner (10/day)',
  'Personalized workout plans',
  'AI coach chat (20 msgs/day)',
  'Progress charts & reports',
  'Mood & sleep tracking',
  'Community challenges',
  'Indian + global food database',
]

const PRO_FEATURES = [
  'Everything in Free',
  'Unlimited photo scanning',
  'Unlimited AI coach chat',
  'Advanced analytics & insights',
  'Custom meal plan generation',
  'Priority support',
  'Export data as PDF',
  'Early access to new features',
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-leaf uppercase tracking-widest mb-3">Simple Pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-moss mb-4">
            Free First. Always.
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            We believe everyone deserves world-class health coaching. Start free — upgrade only if you want more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free */}
          <div className="card p-8 border border-sage-100">
            <div className="mb-6">
              <h3 className="font-bold text-2xl text-stone-800 mb-1">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-moss">₹0</span>
                <span className="text-stone-400">/month</span>
              </div>
              <p className="text-sm text-stone-500 mt-2">Forever free. No credit card needed.</p>
            </div>
            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-stone-600">
                  <Check className="w-4 h-4 text-leaf flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="btn-secondary w-full text-center block py-3 font-semibold">
              Get Started Free
            </Link>
          </div>

          {/* Pro */}
          <div className="relative card p-8 bg-gradient-hero border-0 overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-clay/30 text-clay text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" /> Coming Soon
            </div>
            <div className="mb-6">
              <h3 className="font-bold text-2xl text-white mb-1">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">₹299</span>
                <span className="text-mist/60">/month</span>
              </div>
              <p className="text-sm text-mist/70 mt-2">Unlock unlimited everything.</p>
            </div>
            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-mist">
                  <Check className="w-4 h-4 text-clay flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button disabled
              className="w-full py-3 rounded-xl bg-white/20 border border-white/30 text-white font-semibold text-sm cursor-not-allowed opacity-70">
              Notify Me When Available
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
