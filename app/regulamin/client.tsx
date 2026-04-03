'use client'

import { useTranslation } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function TermsPageClient() {
  const { t } = useTranslation()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <section className="border-b border-border/20 bg-foreground/[0.02] py-24 pt-40">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-5xl font-light tracking-tight text-balance mb-4">{t.legal.terms.title}</h1>
            <p className="text-sm font-light text-muted-foreground">
              {t.legal.terms.lastUpdated} March 2026
            </p>
          </div>
        </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          {/* Intro */}
          <div>
            <p className="text-base font-light leading-relaxed text-foreground/90 mb-6">
              {t.legal.terms.intro}
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.terms.section1Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.terms.section1Content}
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.terms.section2Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.terms.section2Content}
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.terms.section3Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.terms.section3Content}
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.terms.section4Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.terms.section4Content}
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.terms.section5Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.terms.section5Content}
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.terms.section6Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.terms.section6Content}
            </p>
          </div>

          {/* Contact */}
          <div className="border-t border-border/20 pt-12">
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.terms.contactUs}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.terms.contactText}
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}
