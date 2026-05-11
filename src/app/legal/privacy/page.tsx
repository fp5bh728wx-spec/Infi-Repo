import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold text-leaf uppercase tracking-widest mb-2">Legal</p>
            <h1 className="font-display text-4xl font-bold text-moss mb-2">Privacy Policy</h1>
            <p className="text-stone-400 text-sm">Last updated: March 1, 2025</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <p className="text-amber-800 text-sm font-medium">
              🔒 <strong>Short version:</strong> We collect only what's needed to run the app. We never sell your health data. You can delete everything at any time.
            </p>
          </div>
          <div className="prose prose-stone max-w-none space-y-8 text-stone-600 text-sm leading-relaxed">
            {[
              {
                title: '1. Who We Are',
                content: `Infinite Wellness ("we", "our", "us") operates the Infinite Wellness app and website at infinitewellness.app. We are committed to protecting your personal information and your right to privacy. If you have any questions, contact us at privacy@infinitewellness.app.`,
              },
              {
                title: '2. Information We Collect',
                content: `We collect information you provide directly:
• Account data: name, email address, password (hashed)
• Profile data: date of birth, gender, height, weight, health goals, dietary preferences
• Health data: food logs, workout sessions, weight logs, mood entries, sleep data
• Usage data: features used, session duration, crash reports
• Communications: support tickets, feedback

We do not collect payment information (handled by Stripe). We do not collect location data. We do not access your camera roll — only photos you explicitly upload.`,
              },
              {
                title: '3. How We Use Your Information',
                content: `We use your data to:
• Provide personalized health recommendations and AI coaching
• Calculate nutritional targets and workout plans
• Generate progress reports and insights
• Send service notifications (you can opt out)
• Improve our algorithms and features (anonymized, aggregated only)
• Comply with legal obligations

We never use your health data for advertising targeting. Ever.`,
              },
              {
                title: '4. Data Sharing',
                content: `We do not sell, rent, or share your personal health data with third parties for their marketing purposes. Period.

We share data only with:
• Supabase (database hosting) — under strict data processing agreements
• OpenAI (AI responses) — messages are processed but not used to train their models under our enterprise agreement
• Stripe (payment processing) — only for Pro subscriptions, they receive no health data
• Legal authorities — only when required by law, and we will notify you when legally permitted

All third-party processors are contractually bound to handle your data in accordance with this policy and applicable privacy law.`,
              },
              {
                title: '5. Data Security',
                content: `We implement industry-standard security:
• All data encrypted in transit (TLS 1.3)
• Health data encrypted at rest (AES-256)
• Journal entries encrypted with user-controlled keys
• Regular security audits and penetration testing
• SOC 2 Type II compliance (in progress)

No system is 100% secure. In the event of a breach affecting your data, we will notify you within 72 hours.`,
              },
              {
                title: '6. Your Rights',
                content: `You have the right to:
• Access: Download all your data from Settings → Data → Export
• Correction: Edit any data from your profile at any time
• Deletion: Delete your account and all data from Settings → Account → Delete. Data is permanently removed within 30 days.
• Portability: Export data in JSON format
• Opt-out: Unsubscribe from any communications at any time

For EU/UK users (GDPR) and California users (CCPA), these rights are legally enforceable. Contact us at privacy@infinitewellness.app.`,
              },
              {
                title: '7. Children\'s Privacy',
                content: `Users under 13 are not permitted to use Infinite Wellness. Users aged 13-17 require verifiable parental consent. We take special precautions with minor users: no weight-loss focused content, no social comparison features, and stricter data handling.`,
              },
              {
                title: '8. Cookies',
                content: `We use only essential cookies required for authentication and security. We do not use advertising or tracking cookies. You can disable cookies in your browser, but this will prevent you from logging in.`,
              },
              {
                title: '9. Changes to This Policy',
                content: `We may update this policy. We will notify you via email and in-app notification at least 30 days before any material changes take effect. Continued use after that date constitutes acceptance.`,
              },
              {
                title: '10. Contact Us',
                content: `For privacy questions, data requests, or to exercise your rights:
Email: privacy@infinitewellness.app
Response time: Within 48 hours for general queries, within 30 days for formal data requests.`,
              },
            ].map(section => (
              <section key={section.title}>
                <h2 className="font-display text-xl font-bold text-stone-800 mb-3">{section.title}</h2>
                <div className="space-y-2">
                  {section.content.split('\n').map((line, i) => (
                    line.startsWith('•')
                      ? <p key={i} className="flex items-start gap-2"><span className="text-leaf mt-1 flex-shrink-0">→</span><span>{line.slice(2)}</span></p>
                      : <p key={i}>{line}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
