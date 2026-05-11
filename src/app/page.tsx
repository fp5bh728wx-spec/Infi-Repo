import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        {/* Final CTA */}
        <section className="py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-10" />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Your Healthiest Self Starts Now
            </h2>
            <p className="text-mist/80 text-lg mb-8">
              Join thousands who are already transforming their health — completely free.
            </p>
            <Link href="/signup"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-moss font-bold text-lg shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-200">
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-mist/40 text-sm mt-4">No credit card • No commitment • Cancel anytime</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
