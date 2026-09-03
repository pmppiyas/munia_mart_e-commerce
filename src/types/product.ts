import { Category } from './category';

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string | null;
  photoUrl?: string | null;
  price: number;
  stock: number;
  status: ProductStatus | 'ACTIVE' | 'INACTIVE';
  categoryId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;

  // UI presentation & marketing fields
  brand?: string;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  discountPercent?: number;
}

export type ProductSortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc';

export interface ProductFilterState {
  search?: string;
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  sortBy: ProductSortOption;
}

export type ViewMode = 'grid' | 'list';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  discountText: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  bgGradient: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discountText: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
}

export interface TrustFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}
