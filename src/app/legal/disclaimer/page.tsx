import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AlertTriangle, Heart, Phone } from 'lucide-react'

export const metadata = { title: 'Medical Disclaimer' }

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold text-leaf uppercase tracking-widest mb-2">Legal</p>
            <h1 className="font-display text-4xl font-bold text-moss mb-2">Medical Disclaimer</h1>
            <p className="text-stone-400 text-sm">Last updated: March 1, 2025</p>
          </div>

          {/* Emergency box */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Phone className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-700 mb-1">Medical Emergency?</p>
              <p className="text-red-600 text-sm">If you are experiencing chest pain, difficulty breathing, severe dizziness, or any other medical emergency — stop using this app and call emergency services immediately.</p>
              <p className="text-red-700 font-semibold text-sm mt-2">India: 102 or 112 · USA: 911 · UK: 999</p>
            </div>
          </div>

          {/* Mental health box */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Heart className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-purple-700 mb-1">Mental Health Crisis Support</p>
              <p className="text-purple-600 text-sm mb-2">If you are experiencing thoughts of self-harm or suicide, please reach out immediately:</p>
              <ul className="text-purple-700 text-sm space-y-1 font-medium">
                <li>🇮🇳 iCall (India): <strong>9152987821</strong></li>
                <li>🇮🇳 Vandrevala Foundation: <strong>1860-2662-345</strong> (24/7)</li>
                <li>🇺🇸 988 Suicide & Crisis Lifeline: <strong>Call or text 988</strong></li>
                <li>🇬🇧 Samaritans: <strong>116 123</strong></li>
                <li>🌍 findahelpline.com (international)</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8 text-stone-600 text-sm leading-relaxed">
            {[
              {
                title: 'Not Medical Advice',
                content: `Infinite Wellness is a general wellness and fitness platform. The information, tools, meal plans, workout plans, calorie calculations, AI coaching, and all other content provided by Infinite Wellness are for informational and educational purposes only.

Nothing on this platform constitutes medical advice, diagnosis, or treatment. The AI coach is not a doctor, dietitian, physiotherapist, or mental health professional. Its responses should not be treated as professional medical guidance.`,
              },
              {
                title: 'Consult Your Doctor',
                content: `Before starting any new diet, exercise program, or wellness routine, particularly if you:
• Have any pre-existing medical condition (diabetes, heart disease, thyroid disorders, PCOS, etc.)
• Are pregnant or postpartum
• Have a history of eating disorders
• Are taking prescription medications
• Have had recent surgery or injury
• Are under 18 years old
• Are experiencing unexplained symptoms

Always seek the advice of your physician or other qualified health professional.`,
              },
              {
                title: 'Calorie and Nutrition Information',
                content: `The calorie counts, macro calculations, and nutritional information provided on this platform are estimates only. Actual nutritional content varies based on specific ingredients, preparation methods, portion sizes, and regional variations.

The AI photo food scanner provides estimates that may vary significantly from actual nutritional content. These estimates should not be used for medical dietary management (e.g., carbohydrate counting for insulin dosing in diabetes).`,
              },
              {
                title: 'Exercise and Fitness',
                content: `Exercise carries inherent risks, including but not limited to muscle strain, joint injury, cardiovascular events, and falls. By using the workout planning features, you acknowledge these risks and assume full responsibility for your physical wellbeing during exercise.

Stop exercising immediately if you experience: chest pain or pressure, severe shortness of breath, dizziness or fainting, heart palpitations, severe joint pain, or any other concerning symptoms. Seek immediate medical attention.

The exercise recommendations are general guidelines. They may not be appropriate for your specific fitness level, medical history, or physical limitations.`,
              },
              {
                title: 'Mental Wellness Features',
                content: `The mood tracking, meditation, breathing exercises, and journaling features are general wellness tools. They are not a substitute for professional mental health treatment, therapy, or counseling.

If you are experiencing significant mental health symptoms — including persistent depression, anxiety, panic attacks, disordered eating patterns, or suicidal thoughts — please seek help from a qualified mental health professional.

The AI coach's responses to mental health topics are not clinical assessments. In crisis situations, always contact emergency services or a crisis helpline.`,
              },
              {
                title: 'Individual Variation',
                content: `Health and fitness outcomes vary significantly between individuals based on genetics, metabolism, medical history, lifestyle, and adherence. Results shown in testimonials or marketing materials represent individual experiences and are not guaranteed.

Weight loss or gain targets provided by the platform are estimates based on general scientific principles. Actual results may differ substantially.`,
              },
              {
                title: 'Limitation of Liability',
                content: `Infinite Wellness, its founders, employees, AI systems, and affiliates are not liable for any injury, illness, adverse health outcome, or other harm that results from use of this platform or reliance on information provided by it.

By using Infinite Wellness, you acknowledge that you have read and understood this disclaimer and accept full responsibility for your health decisions.`,
              },
            ].map(s => (
              <section key={s.title}>
                <h2 className="font-display text-xl font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> {s.title}
                </h2>
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
