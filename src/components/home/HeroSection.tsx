'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Flame, ShieldCheck } from 'lucide-react';
import { HeroSlide } from '@/types/product';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  slides?: HeroSlide[];
}

export function HeroSection({ slides = [] }: HeroSectionProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentSlideIndex];

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
          {/* Main Hero Slider (8 cols on desktop) */}
          <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] rounded-3xl border border-border overflow-hidden bg-card flex flex-col justify-between p-6 sm:p-10 lg:p-12 shadow-sm">
            {/* Background Image with Overlay Gradient */}
            <div className="absolute inset-0 z-0">
              <Image
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center opacity-25 dark:opacity-20 transition-all duration-700 scale-105"
              />
              <div className={cn('absolute inset-0 bg-gradient-to-r', currentSlide.bgGradient)} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-black tracking-wider text-primary uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  {currentSlide.badge}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {currentSlide.discountText}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
                {currentSlide.title}
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                {currentSlide.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={currentSlide.buttonLink}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/30 hover:bg-primary-hover active:scale-95 transition-all"
                >
                  <span>{currentSlide.buttonText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/products"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card/80 backdrop-blur-xs px-5 text-sm font-bold text-foreground hover:bg-muted transition-all"
                >
                  Explore All
                </Link>
              </div>
            </div>

            {/* Slider Controls / Dots */}
            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-border/40 mt-4">
              <div className="flex items-center gap-2">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={cn(
                      'h-2.5 rounded-full transition-all cursor-pointer',
                      currentSlideIndex === idx
                        ? 'w-8 bg-primary'
                        : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)
                  }
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/80 text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
                  }
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/80 text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Promo Cards (4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            {/* Promo Card 1 */}
            <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-card p-6 flex flex-col justify-between shadow-2xs group">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop"
                  alt="Smart Gadgets"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center opacity-20 dark:opacity-15 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
              </div>

              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Flame className="h-3 w-3 fill-current" />
                  Weekend Deal
                </span>
                <h3 className="text-lg font-black text-foreground">
                  Smart Audio Devices
                </h3>
                <p className="text-xs text-muted-foreground">
                  Save up to 45% on true wireless earsets and speakers.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <Link
                  href="/categories/electronics"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>Shop Electronics</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Promo Card 2 */}
            <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-card p-6 flex flex-col justify-between shadow-2xs group">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop"
                  alt="Fashion Drops"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center opacity-20 dark:opacity-15 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
              </div>

              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-3 w-3" />
                  Trending Drops
                </span>
                <h3 className="text-lg font-black text-foreground">
                  Luxury Fashion &amp; Leather
                </h3>
                <p className="text-xs text-muted-foreground">
                  Handcrafted bags, sneakers, and minimalist modern apparel.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <Link
                  href="/categories/fashion"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>Discover Fashion</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
