import type { Metadata } from 'next';
import { WishlistPage } from '@/components/wishlist/WishlistPage';

export const metadata: Metadata = {
  title: 'My Wishlist | MUNIAMART',
  description: 'View and manage items saved to your personal wishlist at MUNIAMART.',
};

export default function WishlistPageRoute() {
  return <WishlistPage />;
}
