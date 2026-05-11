'use client'
import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react'

const TRUST_BADGES = [
  { icon: Shield, label: 'Privacy First' },
  { icon: Sparkles, label: 'AI Powered' },
  { icon: Zap, label: 'Free Forever' },
]

const STATS = [
  { value: '50K+',  label: 'Active Users' },
  { value: '2M+',   label: 'Meals Tracked' },
  { value: '4.9★',  label: 'User Rating' },
  { value: '100%',  label: 'Free Tier' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      {/* Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-leaf/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-clay/15 rounded-full blur-2xl animate-float animation-delay-300" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-mist text-sm font-medium mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-clay" />
              AI-Powered Wellness Coach
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up animation-delay-100">
              Your Wellness,
              <span className="block italic text-clay">Infinitely</span>
              Personalized
            </h1>

            <p className="text-lg text-mist/80 leading-relaxed mb-8 max-w-lg animate-fade-up animation-delay-200">
              Free AI coaching that adapts to you. Track nutrition with photo scanning, 
              generate personalized workouts, and chat with your AI health coach — 24/7.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-10 animate-fade-up animation-delay-300">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-mist/70 text-sm">
                  <Icon className="w-4 h-4 text-clay" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-400">
              <Link href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-moss font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Start Free Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-base hover:bg-white/15 transition-all duration-200">
                See How It Works
              </Link>
            </div>

            <p className="text-xs text-mist/50 mt-4 animate-fade-up animation-delay-500">
              No credit card required. Free forever — seriously.
            </p>
          </div>

          {/* Right — Stats + UI Preview */}
          <div className="relative animate-fade-up animation-delay-200">
            {/* Floating stats card */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {STATS.map(stat => (
                <div key={stat.label} className="glass-dark rounded-2xl p-5 text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-mist/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* UI Preview Card */}
            <div className="glass rounded-2xl p-6 shadow-2xl border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-stone-500 font-medium">Today's Progress</p>
                  <p className="text-2xl font-bold text-moss">1,245 <span className="text-sm font-normal text-stone-400">/ 1,645 kcal</span></p>
                </div>
                <div className="w-14 h-14 relative">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#e6f0e6" strokeWidth="6" />
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#558c55" strokeWidth="6"
                      strokeDasharray={`${2*Math.PI*22*0.757} ${2*Math.PI*22}`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-moss">76%</span>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Protein', pct: 65, color: 'bg-blue-400' },
                  { label: 'Carbs',   pct: 82, color: 'bg-amber-400' },
                  { label: 'Fat',     pct: 55, color: 'bg-sage-500' },
                ].map(m => (
                  <div key={m.label} className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 w-12">{m.label}</span>
                    <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.pct}%` }} />
                    </div>
                    <span className="text-xs text-stone-400">{m.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
