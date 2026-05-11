import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold text-leaf uppercase tracking-widest mb-2">Legal</p>
            <h1 className="font-display text-4xl font-bold text-moss mb-2">Terms of Service</h1>
            <p className="text-stone-400 text-sm">Last updated: March 1, 2025</p>
          </div>
          <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 mb-8">
            <p className="text-moss text-sm font-medium">
              📋 <strong>Short version:</strong> Use the app responsibly, don't misuse it, and remember it's a wellness tool — not a medical service.
            </p>
          </div>
          <div className="space-y-8 text-stone-600 text-sm leading-relaxed">
            {[
              { title: '1. Acceptance of Terms', content: 'By accessing or using Infinite Wellness, you agree to be bound by these Terms. If you disagree with any part, you may not access the service. These Terms apply to all users, including visitors, registered users, and Pro subscribers.' },
              { title: '2. Description of Service', content: 'Infinite Wellness is a wellness and fitness platform providing AI-powered coaching, nutrition tracking, workout planning, and mental wellness tools. The service is provided free of charge with optional paid upgrades. We reserve the right to modify, suspend, or discontinue any part of the service at any time with reasonable notice.' },
              { title: '3. User Accounts', content: 'You must be at least 13 years old to use this service (with parental consent under 15 in certain regions). You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information and keep it updated. You may not create accounts for others without their consent. You may not have more than one active account.' },
              { title: '4. Acceptable Use', content: `You agree NOT to:
• Use the service for any unlawful purpose
• Attempt to gain unauthorized access to any part of the service
• Transmit harmful, offensive, or misleading content
• Use automated systems to access the service without permission
• Reverse-engineer, decompile, or attempt to extract source code
• Share your account with others
• Impersonate any person or entity` },
              { title: '5. Health Disclaimer', content: 'Infinite Wellness provides general wellness information only. It is NOT a medical service and does NOT provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before starting any diet or exercise program, especially if you have a medical condition. The AI coach\'s suggestions are for informational purposes only and should not replace professional medical judgment.' },
              { title: '6. Intellectual Property', content: 'The service and its original content, features, and functionality are owned by Infinite Wellness and protected by copyright, trademark, and other intellectual property laws. You retain ownership of content you create (food logs, journal entries, etc.). You grant us a limited license to use this content solely to provide the service to you.' },
              { title: '7. Third-Party Services', content: 'The service integrates with third-party services including Supabase, OpenAI, and Stripe. Your use of these services is subject to their respective terms of service. We are not responsible for the practices or content of these third parties.' },
              { title: '8. Free and Pro Tiers', content: 'The Free tier is provided at no cost and may include advertisements. The Pro tier is a paid subscription with additional features. Pricing is displayed in the app. Subscriptions are billed monthly or annually. Cancellations take effect at the end of the current billing period. Refunds are provided at our discretion.' },
              { title: '9. Limitation of Liability', content: 'To the maximum extent permitted by law, Infinite Wellness shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of health outcomes, lost profits, or data loss. Our total liability for any claim shall not exceed the amount you paid us in the 12 months preceding the claim.' },
              { title: '10. Termination', content: 'We may terminate or suspend your account immediately, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties. You may terminate your account at any time from Settings. Upon termination, your right to use the service immediately ceases.' },
              { title: '11. Governing Law', content: 'These Terms shall be governed by the laws of India. Any disputes shall be resolved through binding arbitration in Mumbai, India, except that you may assert claims in small claims court.' },
              { title: '12. Contact', content: 'For legal inquiries: legal@infinitewellness.app' },
            ].map(s => (
              <section key={s.title}>
                <h2 className="font-display text-xl font-bold text-stone-800 mb-3">{s.title}</h2>
                <div className="space-y-2">
                  {s.content.split('\n').map((line, i) => (
                    line.startsWith('•')
                      ? <p key={i} className="flex items-start gap-2 ml-2"><span className="text-leaf mt-1 flex-shrink-0">→</span><span>{line.slice(2)}</span></p>
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
