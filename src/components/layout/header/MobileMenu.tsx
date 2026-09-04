'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, ChevronRight, LogIn } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useGetAllCategoriesQuery } from '@/services/api/categoryApi';
import { Logo } from './Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
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

  // Fetch live categories from database
  const { data: categoriesRes } = useGetAllCategoriesQuery();
  const dbCategories = categoriesRes?.data;

  const categoriesList = React.useMemo(() => {
    if (Array.isArray(dbCategories) && dbCategories.length > 0) {
      return dbCategories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        icon: c.icon || 'LayoutGrid',
        subcategories: (c.children || []).map((ch) => ch.name),
      }));
    }
    return siteConfig.categories;
  }, [dbCategories]);

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
      {/* Menu Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-xs hover:border-primary hover:text-primary active:scale-95 transition-all cursor-pointer"
        aria-label="Open navigation menu"
      >
        <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer (From Right) */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-background text-foreground shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer Header: Logo + ThemeToggle */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <Logo showTagline />
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher: Categories vs Navigation */}
        <div className="grid grid-cols-2 border border-border bg-muted p-1 mx-4 my-2.5 rounded-xl text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={cn(
              'rounded-lg py-2 transition-all cursor-pointer',
              activeTab === 'categories'
                ? 'bg-card text-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground/80'
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
                : 'text-muted-foreground hover:text-foreground/80'
            )}
          >
            Main Menu
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {activeTab === 'categories' ? (
            <div className="space-y-2">
              {categoriesList.map((cat) => {
                const isExpanded = expandedCategory === cat.slug;
                return (
                  <div
                    key={cat.id}
                    className="rounded-xl border border-border/80 bg-card overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.slug)}
                      className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-medium text-foreground/85 hover:text-primary transition-colors cursor-pointer"
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
                      <div className="border-t border-border/80 bg-muted/40 p-2 space-y-1">
                        <Link
                          href={`/categories/${cat.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-accent"
                        >
                          View All in {cat.name}
                        </Link>
                        {cat.subcategories?.map((sub) => (
                          <Link
                            key={sub}
                            href={`/categories/${cat.slug}?sub=${encodeURIComponent(sub)}`}
                            onClick={() => setIsOpen(false)}
                            className="block rounded-lg px-3 py-2 text-[13px] text-foreground/75 hover:bg-card hover:text-foreground transition-colors"
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
            <div className="space-y-1.5">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-muted hover:text-primary transition-colors"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-colors"
          >
            <LogIn className="h-4 w-4" />
            Sign In / Register
          </Link>

          <div className="space-y-1.5 text-xs text-muted-foreground">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-2.5 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2.5 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
