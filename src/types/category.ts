export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
  createdAt: string;
  updatedAt: string;

  // UI presentation fields
  icon?: string;
  itemCount?: number;
  imageUrl?: string;
}
