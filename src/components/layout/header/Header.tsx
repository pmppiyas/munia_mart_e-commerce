'use client';

import * as React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { TopNavbar } from './TopNavbar';
import { CategoryNavbar } from './CategoryNavbar';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { OfferButton } from './OfferButton';
import { CartButton } from './CartButton';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from '@/components/common/ThemeToggle';

interface HeaderProps {
  cartCount?: number;
  cartTotal?: number;
  wishlistCount?: number;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  } | null;
  onLogout?: () => void;
}

export function Header({
  cartCount = 0,
  cartTotal = 0,
  wishlistCount = 0,
  user = null,
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-background shadow-xs">
      {/* Top utility announcement bar */}
      <TopNavbar />

      {/* Main Header bar */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            <MobileMenu className="md:hidden" />
            <Logo showTagline />
          </div>

          {/* Search Bar (Center) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
            <SearchBar />
          </div>

          {/* Right: Actions (Offer, Theme, Wishlist, Cart, User) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <OfferButton />

            {/* Light / Black Mode Switcher */}
            <ThemeToggle />

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-xs transition-all hover:border-primary hover:text-primary active:scale-95 cursor-pointer"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="h-4 w-4 transition-transform group-hover:scale-110" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <CartButton count={cartCount} total={cartTotal} />

            {/* User Profile / Auth Menu */}
            <UserMenu user={user} onLogout={onLogout} />
          </div>
        </div>

        {/* Mobile Search Bar (visible on screens < md) */}
        <div className="px-4 pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Categories & Secondary Nav bar */}
      <CategoryNavbar />
    </header>
  );
}
