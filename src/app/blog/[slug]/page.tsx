import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  return [
    { slug: 'tdee-explained' }, { slug: 'progressive-overload' },
    { slug: 'indian-high-protein-diet' }, { slug: 'sleep-fat-loss' },
    { slug: 'intermittent-fasting-india' }, { slug: 'mental-health-exercise' },
  ]
}

const CONTENT: Record<string, { title: string; category: string; date: string; readTime: number; emoji: string; body: string }> = {
  'tdee-explained': {
    title: 'TDEE Explained: The Only Calorie Number That Actually Matters',
    category: 'Nutrition', date: 'Mar 15, 2025', readTime: 5, emoji: '🔥',
    body: `## What Is TDEE?

TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day. It accounts for everything: your resting metabolism, physical activity, digestion, and even thinking.

This is the most important number in weight management. Eat less than your TDEE, you lose weight. Eat more, you gain weight. It's that simple — and that powerful.

## BMR vs TDEE: The Difference That Matters

**BMR (Basal Metabolic Rate)** is what you burn lying completely still. Think of it as your body's "idle" fuel consumption.

**TDEE** is your BMR multiplied by your activity level. It's your real daily calorie burn.

Here's the key insight most people miss: **your BMR is only 60-75% of your TDEE**. Exercise adds relatively little — it's your overall daily movement (steps, fidgeting, standing) that makes the biggest difference.

## How to Calculate Your TDEE

The Mifflin-St Jeor equation is the gold standard:

**Males:** BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5

**Females:** BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161

Then multiply by your activity factor:
- Sedentary (desk job, minimal exercise): × 1.2
- Lightly active (light exercise 1-3 days/week): × 1.375  
- Moderately active (moderate exercise 3-5 days): × 1.55
- Very active (hard exercise 6-7 days): × 1.725

## Setting Your Calorie Target

Once you have your TDEE:
- **To lose fat:** Eat 300-500 calories below TDEE (lose ~0.3-0.5kg/week — sustainable)
- **To maintain:** Eat at TDEE
- **To gain muscle:** Eat 200-300 calories above TDEE

**Important:** Never eat below 1,200 kcal (women) or 1,500 kcal (men) without medical supervision.

## Why Your TDEE Changes Over Time

As you lose weight, your TDEE decreases — your lighter body burns fewer calories. This is why weight loss plateaus happen and why you need to recalculate your TDEE every 4-6 weeks.

Use our [free TDEE calculator](/dashboard) to get your personalized numbers and have them automatically updated as you progress.`,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = CONTENT[params.slug] || CONTENT['tdee-explained']

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-moss mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="mb-8">
            <span className="text-xs font-semibold bg-sage-50 text-leaf px-3 py-1 rounded-full">{post.category}</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-800 mt-4 mb-3 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-stone-400">
              <span>{post.date}</span><span>·</span><span>{post.readTime} min read</span>
            </div>
          </div>
          <div className="bg-gradient-wellness rounded-2xl h-48 flex items-center justify-center text-7xl mb-10">{post.emoji}</div>
          <article className="prose prose-stone max-w-none">
            <div className="space-y-6 text-stone-600 leading-relaxed">
              {post.body.split('\n\n').map((block, i) => {
                if (block.startsWith('## ')) return <h2 key={i} className="font-display text-2xl font-bold text-stone-800 mt-8 mb-3">{block.slice(3)}</h2>
                if (block.startsWith('**') && block.endsWith('**')) return <p key={i} className="font-semibold text-stone-700">{block.slice(2,-2)}</p>
                if (block.startsWith('- ')) return (
                  <ul key={i} className="list-none space-y-2">
                    {block.split('\n').map((line, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="text-leaf mt-1">→</span>
                        <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                )
                return <p key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              })}
            </div>
          </article>
          <div className="mt-12 p-6 bg-gradient-wellness rounded-2xl border border-sage-200 text-center">
            <p className="font-semibold text-moss mb-2">Ready to calculate your personal TDEE?</p>
            <p className="text-stone-500 text-sm mb-4">Get your exact calorie targets and a personalized meal plan — free.</p>
            <Link href="/signup" className="btn-primary inline-flex">Start Free Today</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
