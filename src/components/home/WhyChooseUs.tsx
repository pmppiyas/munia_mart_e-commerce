'use client';

import * as React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones, Award, LucideIcon } from 'lucide-react';
import { TrustFeature } from '@/types/product';

const iconMap: Record<string, LucideIcon> = {
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Award,
};

interface WhyChooseUsProps {
  features?: TrustFeature[];
}

export function WhyChooseUs({ features = [] }: WhyChooseUsProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-muted/20 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Our Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
            Why Shop with MUNIAMART?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            We provide a frictionless, customer-first shopping experience backed by security, speed, and real human support.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = (feature.icon && iconMap[feature.icon]) || ShieldCheck;

            return (
              <div
                key={feature.id}
                className="group relative flex flex-col items-center text-center rounded-3xl border border-border bg-card p-6 shadow-2xs transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground shadow-xs">
                  <IconComponent className="h-7 w-7 transition-transform group-hover:scale-110" />
                </div>

                <h3 className="text-base font-bold text-foreground mb-1.5">
                  {feature.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
