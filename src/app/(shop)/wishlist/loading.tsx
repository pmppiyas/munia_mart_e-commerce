import { WishlistSkeleton } from '@/components/wishlist/WishlistSkeleton';

export default function WishlistLoading() {
  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Placeholder */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-12 rounded-md bg-muted animate-pulse" />
          <div className="h-3 w-3 rounded-full bg-muted animate-pulse" />
          <div className="h-3 w-16 rounded-md bg-muted animate-pulse" />
          <div className="h-3 w-3 rounded-full bg-muted animate-pulse" />
          <div className="h-3 w-20 rounded-md bg-muted animate-pulse" />
        </div>

        {/* Header Placeholder */}
        <div className="space-y-2 border-b border-border pb-5">
          <div className="h-8 w-44 rounded-xl bg-muted animate-pulse" />
          <div className="h-4 w-72 rounded-md bg-muted animate-pulse" />
        </div>

        {/* Wishlist Skeleton Grid */}
        <WishlistSkeleton count={8} />
      </div>
    </div>
  );
}
