import Link from 'next/link'
import { Leaf, Instagram, Twitter, Youtube, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  Product:  [
    { label: 'Dashboard',        href: '/dashboard' },
    { label: 'Workout Planner',  href: '/workout' },
    { label: 'Nutrition Tracker',href: '/nutrition' },
    { label: 'AI Coach',         href: '/coach' },
    { label: 'Progress',         href: '/progress' },
  ],
  Resources: [
    { label: 'Blog',             href: '/blog' },
    { label: 'Calorie Calculator',href: '/#calculator' },
    { label: 'BMI Calculator',   href: '/#bmi' },
  ],
  Company: [
    { label: 'About',            href: '/#about' },
    { label: 'Pricing',          href: '/#pricing' },
    { label: 'Contact',          href: 'mailto:hello@infinitewellness.app' },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Medical Disclaimer',href: '/legal/disclaimer' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-moss to-leaf flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">Infinite Wellness</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed mb-6 max-w-xs">
              Your AI-powered health companion. Free, personalized, and always in your corner.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter,   href: '#', label: 'Twitter' },
                { icon: Youtube,   href: '#', label: 'YouTube' },
                { icon: Mail,      href: 'mailto:hello@infinitewellness.app', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-moss hover:text-white transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Infinite Wellness. All rights reserved.
          </p>
          <p className="text-xs text-stone-600 max-w-md text-center sm:text-right">
            Not medical advice. Always consult a healthcare professional before starting any fitness program.
          </p>
        </div>
      </div>
    </footer>
  )
}
