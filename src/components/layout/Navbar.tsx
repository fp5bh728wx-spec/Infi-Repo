'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Leaf, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
  { label: 'Features',  href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Pricing',   href: '/#pricing' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser]         = useState<any>(null)
  const pathname = usePathname()
  const router   = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const isLanding = pathname === '/'

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled || !isLanding
        ? 'glass border-b border-white/50 shadow-sm'
        : 'bg-transparent',
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-moss to-leaf flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-moss text-lg leading-none">
            Infinite<br/>
            <span className="text-xs font-sans font-semibold text-sage-600 tracking-widest uppercase">Wellness</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-moss hover:bg-sage-50 transition-all duration-200">
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="btn-ghost text-sm">Dashboard</Link>
              <button onClick={handleSignOut} className="btn-secondary text-sm py-2 px-4">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login"  className="btn-ghost text-sm">Log In</Link>
              <Link href="/signup" className="btn-primary text-sm py-2.5">
                Start Free <ChevronRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-sage-50 transition-colors"
          aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/50 px-4 pb-6 pt-4 space-y-1 animate-fade-in">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-stone-700 hover:bg-sage-50 hover:text-moss transition-colors">
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-primary w-full">Dashboard</Link>
                <button onClick={handleSignOut} className="btn-secondary w-full">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/signup" onClick={() => setOpen(false)} className="btn-primary w-full">Start Free Today</Link>
                <Link href="/login"  onClick={() => setOpen(false)} className="btn-secondary w-full">Log In</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
