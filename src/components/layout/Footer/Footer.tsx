'use client';

import * as React from 'react';
import { Truck, Headphones, ShieldCheck, RefreshCw, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from '../header/Logo';
import { Newsletter } from './Newsletter';
import { FooterColumn } from './FooterColumn';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  const features = [
    {
      icon: Truck,
      title: 'Free Express Shipping',
      description: 'On all orders above $50 with live tracking',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description: 'Instant assistance via live chat & phone',
    },
    {
      icon: ShieldCheck,
      title: '100% Secure Checkout',
      description: 'SSL encrypted payments via Stripe & bKash',
    },
    {
      icon: RefreshCw,
      title: '30-Day Easy Returns',
      description: 'Hassle-free replacement or refund guarantee',
    },
  ];

  const categoryLinks = siteConfig.categories.map((c) => ({
    label: c.name,
    href: `/categories/${c.slug}`,
  }));

  return (
    <footer className="border-t border-border bg-background text-muted-foreground">
      {/* 1. Value Proposition / Features Banner */}
      <div className="border-b border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-2xs transition-shadow hover:shadow-xs"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{feature.title}</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Newsletter Section */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Newsletter />
      </div>

      {/* 3. Main Footer Links Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Logo showTagline />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-center gap-2.5 text-foreground/80">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2.5 text-foreground/80 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="font-semibold">{siteConfig.contact.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-foreground/80 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>

            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Follow Us
              </span>
              <SocialLinks />
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="lg:col-span-2">
            <FooterColumn title="Shop" links={siteConfig.footerLinks.shop} />
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <FooterColumn title="Categories" links={categoryLinks.slice(0, 6)} />
          </div>

          {/* Customer Service & Company */}
          <div className="lg:col-span-3 space-y-6">
            <FooterColumn
              title="Customer Care"
              links={siteConfig.footerLinks.customerService}
            />

            {/* Payment security assurance */}
            <div className="rounded-xl border border-border bg-card p-3">
              <span className="block text-[11px] font-bold text-foreground">
                Guaranteed Safe Checkout
              </span>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                We accept major international and local mobile payment options with end-to-end encryption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Copyright & Payment Partners Bar */}
      <div className="border-t border-border bg-muted/40 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} <span className="font-bold text-foreground">MUNIAMART</span>. All rights reserved. Built for modern high-performance shopping.
          </p>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-black text-blue-600 shadow-2xs">
              VISA
            </span>
            <span className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-black text-destructive shadow-2xs">
              MASTERCARD
            </span>
            <span className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-black text-purple-600 shadow-2xs">
              STRIPE
            </span>
            <span className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-black text-pink-600 shadow-2xs">
              bKash
            </span>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shadow-2xs">
              SSL SECURE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
