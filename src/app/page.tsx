import mockData from '@/data/mockData.json';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromoBanner } from '@/components/home/PromoBanner';
import { NewArrivals } from '@/components/home/NewArrivals';
import { BestSelling } from '@/components/home/BestSelling';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { HomeNewsletter } from '@/components/home/HomeNewsletter';
import { getCategoriesFromDb } from '@/services/categoryService';
import { Product, HeroSlide, PromoBanner as PromoBannerType, TrustFeature } from '@/types/product';

export default async function HomePage() {
  const categories = await getCategoriesFromDb();
  const heroSlides = mockData.heroSlides as HeroSlide[];
  const products = mockData.products as unknown as Product[];
  const promoBanner = mockData.promoBanner as PromoBannerType;
  const whyChooseUs = mockData.whyChooseUs as TrustFeature[];

  return (
    <div className="flex flex-col flex-1 bg-background">
      {/* 1. Hero Section */}
      <HeroSection slides={heroSlides} />

      {/* 2. Category Section */}
      <CategorySection categories={categories} />

      {/* 3. Featured Products */}
      <FeaturedProducts products={products} />

      {/* 4. Promotional Banner */}
      <PromoBanner banner={promoBanner} />

      {/* 5. New Arrivals */}
      <NewArrivals products={products} />

      {/* 6. Best Selling Products */}
      <BestSelling products={products} />

      {/* 7. Why Choose Us */}
      <WhyChooseUs features={whyChooseUs} />

      {/* 8. Newsletter */}
      <HomeNewsletter />
    </div>
  );
}
