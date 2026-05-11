'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Mic, RefreshCw, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface Message { id: string; role: 'user' | 'assistant'; content: string; ts: Date }

const SUGGESTIONS = [
  'How many calories should I eat to lose weight?',
  'Create a 30-minute home workout for me',
  'What should I eat after a workout?',
  'Why am I not losing weight despite dieting?',
  'Best Indian high-protein breakfast ideas?',
  "I'm feeling low on motivation today",
]

const TONES = [
  { key: 'friendly',   label: '🤝 Friendly',   desc: 'Warm & motivating' },
  { key: 'strict',     label: '💪 Strict',     desc: 'No excuses coach' },
  { key: 'scientific', label: '🔬 Scientific', desc: 'Evidence-based' },
  { key: 'balanced',   label: '⚖️ Balanced',   desc: 'Mix of both' },
]

const INITIAL: Message = {
  id: '0', role: 'assistant', ts: new Date(),
  content: "Hey! I'm your Infinite Wellness AI Coach 🌿\n\nI'm here 24/7 to help with nutrition, workouts, motivation, sleep, and anything health-related. Ask me anything — no question is too simple.\n\nWhat's on your mind today?",
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div className={cn('flex gap-3 group', isUser ? 'flex-row-reverse' : '')}>
      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
        isUser ? 'bg-gradient-cta' : 'bg-gradient-to-br from-purple-500 to-purple-700')}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      <div className={cn('max-w-[75%] space-y-1', isUser ? 'items-end' : '')}>
        <div className={cn('px-4 py-3 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-gradient-cta text-white rounded-tr-sm'
            : 'bg-white text-stone-700 border border-stone-100 shadow-sm rounded-tl-sm')}>
          {msg.content.split('\n').map((line, i) => (
            <span key={i}>{line}{i < msg.content.split('\n').length - 1 && <br />}</span>
          ))}
        </div>
        <p className={cn('text-xs text-stone-400 px-1', isUser ? 'text-right' : '')}>
          {msg.ts.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white border border-stone-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center h-5">
          {[0,1,2].map(i => (
            <div key={i} className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [tone, setTone]         = useState('balanced')
  const [showTones, setShowTones] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: content.trim(), ts: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, tone, history: messages.slice(-10) }),
      })
      const data = await res.json()
      const assistantMsg: Message = {
        id: crypto.randomUUID(), role: 'assistant',
        content: data.reply || "I'm having trouble connecting right now. Please try again in a moment.",
        ts: new Date(),
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(), role: 'assistant',
        content: "Sorry, I'm having a moment. Please try again! 🙏",
        ts: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-56px)] lg:max-h-screen">
      {/* Header */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 bg-white border-b border-sage-100">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-stone-800 text-sm">Infinite Wellness Coach</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-stone-400">Always available</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button onClick={() => setShowTones(!showTones)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage-50 text-xs font-medium text-stone-600 hover:bg-sage-100 transition-colors border border-sage-100">
              <Sparkles className="w-3 h-3 text-leaf" />
              {TONES.find(t => t.key === tone)?.label ?? 'Tone'}
            </button>
            {showTones && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-stone-100 shadow-card overflow-hidden z-10">
                {TONES.map(t => (
                  <button key={t.key} onClick={() => { setTone(t.key); setShowTones(false) }}
                    className={cn('w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-sage-50 transition-colors',
                      tone === t.key ? 'bg-sage-50' : '')}>
                    <div>
                      <p className="text-sm font-medium text-stone-700">{t.label}</p>
                      <p className="text-xs text-stone-400">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions (shown when only initial message) */}
      {messages.length === 1 && (
        <div className="flex-shrink-0 px-4 sm:px-6 pb-2">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-stone-400 mb-2 font-medium">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white border border-sage-100 text-stone-600 hover:bg-sage-50 hover:border-sage-300 hover:text-moss transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 bg-white border-t border-sage-100">
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea ref={inputRef} rows={1} value={input}
              onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px' }}
              onKeyDown={handleKeyDown}
              placeholder="Ask your coach anything…"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-stone-200 text-sm text-stone-700 placeholder-stone-400 resize-none focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              style={{ minHeight: '48px', maxHeight: '120px' }} />
          </div>
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
            className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all',
              input.trim() && !loading
                ? 'bg-gradient-cta text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed')}>
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-xs text-stone-300 mt-2 max-w-3xl mx-auto">
          Not medical advice. Consult a doctor for health concerns.
        </p>
      </div>
    </div>
  )
}
