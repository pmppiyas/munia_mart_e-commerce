'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Headphones } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { CategoryDropdown } from './CategoryDropdown';
import { cn } from '@/lib/utils';

export function CategoryNavbar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block border-b border-border bg-background shadow-2xs">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: All Categories Dropdown */}
        <div className="flex items-center gap-6">
          <CategoryDropdown />

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 lg:gap-2">
            {siteConfig.navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors select-none',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-primary hover:bg-muted'
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        'rounded-full px-1.5 py-0.2 text-[9px] font-extrabold uppercase',
                        item.badge === 'Hot'
                          ? 'bg-destructive text-destructive-foreground shadow-xs'
                          : 'bg-success text-success-foreground shadow-xs'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Quick Support */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Headphones className="h-4 w-4 text-primary" />
          <span>Support 24/7:</span>
          <span className="font-bold text-foreground">{siteConfig.contact.phone}</span>
        </div>
      </div>
    </div>
  );
}
