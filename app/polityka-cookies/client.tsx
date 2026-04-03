'use client'

import { useTranslation } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function CookiesPageClient() {
  const { t } = useTranslation()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <section className="border-b border-border/20 bg-foreground/[0.02] py-24 pt-40">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-5xl font-light tracking-tight text-balance mb-4">{t.legal.cookies.title}</h1>
            <p className="text-sm font-light text-muted-foreground">
              {t.legal.cookies.lastUpdated} March 2026
            </p>
          </div>
        </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          {/* Intro */}
          <div>
            <p className="text-base font-light leading-relaxed text-foreground/90 mb-6">
              {t.legal.cookies.intro}
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.cookies.section1Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.cookies.section1Content}
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.cookies.section2Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.cookies.section2Content}
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.cookies.section3Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.cookies.section3Content}
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.cookies.section4Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.cookies.section4Content}
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.cookies.section5Title}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.cookies.section5Content}
            </p>
          </div>

          {/* Contact */}
          <div className="border-t border-border/20 pt-12">
            <h2 className="text-2xl font-light tracking-tight mb-4">{t.legal.cookies.contactUs}</h2>
            <p className="text-base font-light leading-relaxed text-foreground/80">
              {t.legal.cookies.contactText}
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}
