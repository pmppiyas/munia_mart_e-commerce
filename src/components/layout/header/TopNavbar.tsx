'use client';

import * as React from 'react';
import Link from 'next/link';
import { Phone, Truck, Globe, ChevronDown, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function TopNavbar() {
  const [currency, setCurrency] = React.useState('USD');
  const [isCurrencyOpen, setIsCurrencyOpen] = React.useState(false);
  const currencyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="border-b border-border/60 bg-zinc-900 text-zinc-100 dark:bg-black dark:border-zinc-800 text-[11px]">
      <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Promo */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-medium text-zinc-300">
            <Truck className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden sm:inline">Free Express Delivery on orders over $50</span>
            <span className="sm:hidden">Free Delivery &gt; $50</span>
          </span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <Link
            href="/products?sale=true"
            className="hidden md:inline font-bold text-amber-400 hover:text-amber-300 hover:underline transition-colors"
          >
            Flash Sale Now Live
          </Link>
        </div>

        {/* Right: Support, Track Order, Currency */}
        <div className="flex items-center gap-4 text-zinc-300">
          <Link
            href="/orders"
            className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Track Order</span>
          </Link>

          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone className="h-3 w-3 text-blue-400" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          {/* Currency Dropdown */}
          <div className="relative" ref={currencyRef}>
            <button
              type="button"
              onClick={() => setIsCurrencyOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Globe className="h-3 w-3 text-zinc-400" />
              <span className="font-semibold">{currency}</span>
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </button>

            {isCurrencyOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-24 rounded-lg border border-border bg-popover py-1 text-xs text-popover-foreground shadow-lg">
                {['USD', 'BDT', 'EUR'].map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className="flex w-full px-3 py-1.5 text-left hover:bg-accent hover:text-accent-foreground transition-colors font-medium cursor-pointer"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
