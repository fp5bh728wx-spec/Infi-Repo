'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Dumbbell, UtensilsCrossed, MessageCircle,
  LineChart, Leaf, LogOut, Settings, Menu, X, Bell
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'

const NAV = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/workout',   icon: Dumbbell,        label: 'Workout' },
  { href: '/nutrition', icon: UtensilsCrossed,  label: 'Nutrition' },
  { href: '/coach',     icon: MessageCircle,    label: 'AI Coach' },
  { href: '/progress',  icon: LineChart,        label: 'Progress' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const supabase = createClient()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
    })
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-6 border-b border-sage-100">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-moss to-leaf flex items-center justify-center shadow-sm">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        <div className="leading-none">
          <p className="font-display font-bold text-moss text-base">Infinite</p>
          <p className="text-xs font-semibold text-sage-500 tracking-widest uppercase">Wellness</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-gradient-to-r from-moss to-leaf text-white shadow-md'
                  : 'text-stone-600 hover:bg-sage-50 hover:text-moss'
              )}>
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-white' : '')} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User + actions */}
      <div className="px-3 pb-4 space-y-1 border-t border-sage-100 pt-4">
        <Link href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-500 hover:bg-sage-50 hover:text-moss transition-colors">
          <Settings className="w-4 h-4" /> Settings
        </Link>
        <button onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
        {user && (
          <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-xl bg-sage-50">
            <div className="w-8 h-8 rounded-full bg-gradient-cta flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-stone-700 truncate">
                {user.user_metadata?.full_name || 'Wellness User'}
              </p>
              <p className="text-xs text-stone-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-sage-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-56 flex-col bg-white border-r border-sage-100 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-sage-100">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-sage-50">
            <Menu className="w-5 h-5 text-stone-600" />
          </button>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-moss" />
            <span className="font-display font-bold text-moss">Infinite Wellness</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-sage-50 relative">
            <Bell className="w-5 h-5 text-stone-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
