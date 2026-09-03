'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { MobileNavItem } from './MobileNavItem';
import { MobileSearch } from './MobileSearch';

interface MobileNavProps {
  cartCount?: number;
  wishlistCount?: number;
  user?: object | null;
}

export function MobileNav({ cartCount = 0, wishlistCount = 0, user = null }: MobileNavProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <>
      {/* Search Overlay */}
      <MobileSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Sticky Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 block md:hidden border-t border-border bg-card/95 backdrop-blur-md shadow-lg safe-area-bottom">
        <div className="flex h-16 items-center justify-around px-2">
          <MobileNavItem
            label="Home"
            href="/"
            icon={Home}
            isActive={pathname === '/'}
          />

          <MobileNavItem
            label="Shop"
            href="/products"
            icon={LayoutGrid}
            isActive={pathname.startsWith('/products') || pathname.startsWith('/categories')}
          />

          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-1 flex-col items-center justify-center py-2 text-muted-foreground hover:text-foreground transition-colors select-none cursor-pointer"
          >
            <Search className="h-5 w-5" />
            <span className="mt-1 text-[10px] font-medium text-muted-foreground">Search</span>
          </button>

          <MobileNavItem
            label="Wishlist"
            href="/wishlist"
            icon={Heart}
            isActive={pathname === '/wishlist'}
            badge={wishlistCount}
          />

          <MobileNavItem
            label="Cart"
            href="/cart"
            icon={ShoppingBag}
            isActive={pathname === '/cart'}
            badge={cartCount}
          />

          <MobileNavItem
            label={user ? 'Account' : 'Profile'}
            href={user ? '/profile' : '/auth/login'}
            icon={User}
            isActive={
              pathname.startsWith('/profile') ||
              pathname.startsWith('/orders') ||
              pathname.startsWith('/auth')
            }
          />
        </div>
      </nav>
    </>
  );
}
