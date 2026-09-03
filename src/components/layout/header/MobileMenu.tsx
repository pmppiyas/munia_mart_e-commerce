'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, ChevronRight, LogIn } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'categories' | 'menu'>(
    'categories'
  );
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleCategory = (slug: string) => {
    setExpandedCategory((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className={className}>
      {/* Hamburger Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-xs hover:border-primary hover:text-primary transition-colors cursor-pointer"
        aria-label="Open mobile navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-full max-w-xs flex-col bg-background text-foreground shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
          <Logo />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b border-border">
          <SearchBar onSearchSubmit={() => setIsOpen(false)} />
        </div>

        {/* Tab Switcher: Categories vs Navigation */}
        <div className="grid grid-cols-2 border border-border bg-muted p-1 mx-4 my-2 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={cn(
              'rounded-lg py-2 transition-all cursor-pointer',
              activeTab === 'categories'
                ? 'bg-card text-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={cn(
              'rounded-lg py-2 transition-all cursor-pointer',
              activeTab === 'menu'
                ? 'bg-card text-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Main Menu
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {activeTab === 'categories' ? (
            <div className="space-y-1.5">
              {siteConfig.categories.map((cat) => {
                const isExpanded = expandedCategory === cat.slug;
                return (
                  <div
                    key={cat.id}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.slug)}
                      className="flex w-full items-center justify-between px-3.5 py-3 text-xs font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform duration-200',
                          {
                            'rotate-90 text-primary': isExpanded,
                          }
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="border-t border-border bg-muted/40 p-2 space-y-1">
                        <Link
                          href={`/categories/${cat.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-semibold text-primary hover:bg-accent"
                        >
                          View All in {cat.name}
                        </Link>
                        {cat.subcategories?.map((sub) => (
                          <Link
                            key={sub}
                            href={`/categories/${cat.slug}?sub=${encodeURIComponent(sub)}`}
                            onClick={() => setIsOpen(false)}
                            className="block rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-card hover:text-foreground"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-extrabold',
                        item.badge === 'Hot'
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-primary/10 text-primary'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer: Auth & Contact */}
        <div className="border-t border-border bg-muted/40 p-4 space-y-3">
          <Link
            href="/auth/login"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary-hover transition-colors"
          >
            <LogIn className="h-4 w-4" />
            Sign In / Register
          </Link>

          <div className="space-y-1 text-[11px] text-muted-foreground">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
