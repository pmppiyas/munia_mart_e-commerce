'use client';

import * as React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
  badge?: number | string;
  onClick?: () => void;
}

export function MobileNavItem({
  label,
  href,
  icon: Icon,
  isActive = false,
  badge,
  onClick,
}: MobileNavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative flex flex-1 flex-col items-center justify-center py-2 transition-colors select-none',
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <div className="relative">
        <Icon className={cn('h-5 w-5 transition-transform active:scale-90', {
          'stroke-[2.5px]': isActive,
        })} />
        {badge !== undefined && Number(badge) > 0 && (
          <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground shadow-xs">
            {Number(badge) > 99 ? '99+' : badge}
          </span>
        )}
      </div>
      <span
        className={cn('mt-1 text-[10px] transition-colors', {
          'font-bold text-primary': isActive,
          'font-medium text-muted-foreground': !isActive,
        })}
      >
        {label}
      </span>
      {isActive && (
        <span className="absolute top-0 h-0.5 w-6 rounded-full bg-primary" />
      )}
    </Link>
  );
}
