import HeroSection from '@/components/HeroSection';
import FeaturesTrustSection from '@/components/FeaturesTrustSection';
import PopularCategoriesSection from '@/components/PopularCategoriesSection';
import FlashSaleSection from '@/components/FlashSaleSection';
import WeeklySpecialsBanner from '@/components/WeeklySpecialsBanner';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import PremiumMembershipBanner from '@/components/PremiumMembershipBanner';

export default function HomePage() {
  return (
    <main className="flex-grow">
      <HeroSection />
      <FeaturesTrustSection />
      <PopularCategoriesSection />
      <FlashSaleSection />
      <WeeklySpecialsBanner />
      <FeaturedProductsSection />
      <PremiumMembershipBanner />
    </main>
  );
}