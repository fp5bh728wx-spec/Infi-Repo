import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const POSTS = [
  { slug: 'tdee-explained', title: 'TDEE Explained: The Only Calorie Number That Actually Matters', excerpt: 'BMR, TDEE, calorie deficit — it\'s a lot of jargon. Here\'s the simple truth about how many calories you actually need.', category: 'Nutrition', readTime: 5, date: 'Mar 15, 2025', emoji: '🔥' },
  { slug: 'progressive-overload', title: 'Progressive Overload: The Muscle-Building Secret 90% of Gym-Goers Miss', excerpt: 'Why you stopped seeing results after 3 months — and the simple fix that will restart your gains permanently.', category: 'Fitness', readTime: 6, date: 'Mar 10, 2025', emoji: '💪' },
  { slug: 'indian-high-protein-diet', title: '25 High-Protein Indian Foods for Vegetarians', excerpt: 'Building muscle on a vegetarian Indian diet is absolutely possible. Here are the 25 protein powerhouses you should be eating.', category: 'Nutrition', readTime: 7, date: 'Mar 5, 2025', emoji: '🫘' },
  { slug: 'sleep-fat-loss', title: 'Why Poor Sleep is Sabotaging Your Fat Loss (And What to Do)', excerpt: 'The shocking science linking sleep deprivation to weight gain — and 7 evidence-based strategies to fix your sleep tonight.', category: 'Wellness', readTime: 5, date: 'Feb 28, 2025', emoji: '😴' },
  { slug: 'intermittent-fasting-india', title: 'Intermittent Fasting for Indians: A Complete Practical Guide', excerpt: 'IF is powerful — but the standard advice doesn\'t account for Indian meal culture. Here\'s how to make it work with chai, family dinners, and festivals.', category: 'Nutrition', readTime: 8, date: 'Feb 20, 2025', emoji: '⏰' },
  { slug: 'mental-health-exercise', title: 'Exercise Is Mental Health Medicine — Here\'s the Science', excerpt: 'How even 20 minutes of movement changes your brain chemistry, reduces anxiety by 48%, and why it works faster than you think.', category: 'Mental Health', readTime: 6, date: 'Feb 15, 2025', emoji: '🧠' },
]

const CATEGORIES = ['All', 'Nutrition', 'Fitness', 'Wellness', 'Mental Health']
const CATEGORY_COLORS: Record<string, string> = {
  Nutrition: 'bg-amber-50 text-amber-700', Fitness: 'bg-blue-50 text-blue-700',
  Wellness: 'bg-sage-50 text-leaf', 'Mental Health': 'bg-purple-50 text-purple-700',
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-leaf uppercase tracking-widest mb-3">Knowledge Hub</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-moss mb-4">Wellness Insights</h1>
            <p className="text-stone-500 text-lg max-w-xl mx-auto">
              Evidence-based guides on nutrition, fitness, and mental wellness — no fluff, just what works.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map(c => (
              <button key={c}
                className={c === 'All'
                  ? 'px-5 py-2 rounded-full bg-moss text-white text-sm font-semibold shadow-sm'
                  : 'px-5 py-2 rounded-full bg-white border border-stone-200 text-stone-600 text-sm font-medium hover:bg-sage-50 hover:border-sage-200 transition-colors'}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <Link href={`/blog/${POSTS[0].slug}`}
            className="block mb-8 card p-6 sm:p-8 border border-sage-50 hover:border-sage-200 transition-all">
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div className="bg-gradient-wellness rounded-xl h-48 flex items-center justify-center text-7xl">
                {POSTS[0].emoji}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[POSTS[0].category]}`}>{POSTS[0].category}</span>
                  <span className="text-xs text-stone-400">Featured</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-stone-800 mb-3 leading-snug">{POSTS[0].title}</h2>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{POSTS[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-stone-400">
                  <span>{POSTS[0].date}</span>
                  <span>{POSTS[0].readTime} min read</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.slice(1).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="card p-5 flex flex-col gap-4 border border-sage-50 hover:border-sage-200">
                <div className="bg-gradient-wellness rounded-xl h-36 flex items-center justify-center text-5xl">{post.emoji}</div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}>{post.category}</span>
                </div>
                <h3 className="font-semibold text-stone-800 leading-snug">{post.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-stone-400 border-t border-stone-50 pt-3">
                  <span>{post.date}</span><span>·</span><span>{post.readTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
