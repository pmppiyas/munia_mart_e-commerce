export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  slug?: string;
  sku: string;
  price: number;
  originalPrice?: number;
  photoUrl?: string | null;
  category?: string;
  brand?: string;
  stock: number;
  rating?: number;
  reviewsCount?: number;
  addedAt: string;
}

export interface WishlistState {
  items: WishlistItem[];
}
