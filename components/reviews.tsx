"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/lib/language-context"

export function Reviews() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  const reviews = [
    {
      name: t.reviews.reviewer1Name,
      role: t.reviews.reviewer1Role,
      image: "/images/review-oleksandr.jpg",
      text: t.reviews.review1,
      rating: 5,
      route: t.reviews.reviewer1Route,
    },
    {
      name: t.reviews.reviewer2Name,
      role: t.reviews.reviewer2Role,
      image: "/images/review-iryna.jpg",
      text: t.reviews.review2,
      rating: 5,
      route: t.reviews.reviewer2Route,
    },
    {
      name: t.reviews.reviewer3Name,
      role: t.reviews.reviewer3Role,
      image: "/images/review-dmytro.jpg",
      text: t.reviews.review3,
      rating: 5,
      route: t.reviews.reviewer3Route,
    },
    {
      name: t.reviews.reviewer4Name,
      role: t.reviews.reviewer4Role,
      image: "/images/review-natalia.jpg",
      text: t.reviews.review4,
      rating: 5,
      route: t.reviews.reviewer4Route,
    },
    {
      name: t.reviews.reviewer5Name,
      role: t.reviews.reviewer5Role,
      image: "/images/review-andriy.jpg",
      text: t.reviews.review5,
      rating: 5,
      route: t.reviews.reviewer5Route,
    },
  ]

  return (
    <section id="reviews" ref={ref} className="relative py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-12 flex flex-col items-center text-center transition-all duration-1000 lg:mb-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-silver/40" />
            <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">
              {t.reviews.label}
            </span>
            <span className="h-px w-12 bg-silver/40" />
          </div>
          <h2 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            {t.reviews.title1}
            <br />
            <span className="text-silver">{t.reviews.title2}</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* Bottom Row */}
        <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2 lg:max-w-[calc(66.666%+0.75rem)] lg:mx-auto">
          {reviews.slice(3).map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i + 3} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCard({
  review,
  index,
  isVisible,
}: {
  review: { name: string; role: string; image: string; text: string; rating: number; route: string }
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className={`group relative flex flex-col border border-border/30 bg-card/20 p-6 sm:p-8 backdrop-blur-sm transition-all duration-700 hover:border-silver/20 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${400 + index * 120}ms` }}
    >
      <Quote className="mb-6 h-5 w-5 text-ghost" />
      <div className="mb-5 flex gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-subtle text-subtle" />
        ))}
      </div>
      <p className="mb-8 flex-1 text-sm font-light leading-relaxed text-muted-foreground">
        {`"${review.text}"`}
      </p>
      <div className="mb-6">
        <span className="inline-block border border-border/40 px-3 py-1 text-[10px] font-light tracking-[0.2em] text-subtle uppercase">
          {review.route}
        </span>
      </div>
      <div className="flex items-center gap-4 border-t border-border/20 pt-6">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/40">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <p className="text-sm font-light text-foreground">{review.name}</p>
          <p className="mt-0.5 text-[11px] font-light text-muted-foreground">
            {review.role}
          </p>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-8 w-px bg-silver/0 transition-all duration-500 group-hover:bg-silver/20" />
      <div className="absolute right-0 top-0 h-px w-8 bg-silver/0 transition-all duration-500 group-hover:bg-silver/20" />
    </div>
  )
}
