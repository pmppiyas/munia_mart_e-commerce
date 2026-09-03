import { Category } from '@/types/category';
import mockData from '@/data/mockData.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

/**
 * Fetch all categories and subcategories from backend database API.
 * Gracefully falls back to mock data if the API server is unavailable.
 */
export async function getCategoriesFromDb(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/category`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }

    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      // Merge with mock icons/images if not in DB schema
      const mockCategoryMap = new Map(mockData.categories.map((c) => [c.id, c]));

      return json.data.map((dbCat: Category) => {
        const mockMatch = mockCategoryMap.get(dbCat.id) || mockData.categories.find(c => c.slug === dbCat.slug);
        return {
          ...dbCat,
          imageUrl: dbCat.imageUrl || mockMatch?.imageUrl,
          icon: dbCat.icon || mockMatch?.icon,
          description: dbCat.description || mockMatch?.description,
          itemCount: dbCat.itemCount || mockMatch?.itemCount || 100,
          children: (dbCat.children || []).map((child) => {
            const mockChild = mockMatch?.children?.find((c) => c.slug === child.slug);
            return {
              ...child,
              imageUrl: child.imageUrl || mockChild?.imageUrl,
              icon: child.icon || mockChild?.icon,
              itemCount: child.itemCount || mockChild?.itemCount || 50,
            };
          }),
        };
      });
    }
  } catch (error) {
    console.warn('Backend category API unavailable, falling back to catalog cache:', error);
  }

  return mockData.categories as Category[];
}

/**
 * Fetch a single category by slug or id from database API.
 */
export async function getCategoryBySlugFromDb(slugOrId: string): Promise<Category | undefined> {
  const allCategories = await getCategoriesFromDb();
  const normalized = decodeURIComponent(slugOrId).toLowerCase();

  return allCategories.find(
    (c) =>
      c.slug.toLowerCase() === normalized ||
      c.id.toLowerCase() === normalized
  );
}
