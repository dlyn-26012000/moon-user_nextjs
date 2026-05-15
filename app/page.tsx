import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import CategorySection from "@/components/home/CategorySection";
import FlashSaleSection from "@/components/home/FlashSaleSection";
import WeeklySpecialsBanner from "@/components/home/WeeklySpecialsBanner";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import MembershipBanner from "@/components/home/MembershipBanner";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 space-y-16 py-8">
        <HeroSection />
        <FeatureSection />
        <CategorySection />
        <FlashSaleSection />
        <WeeklySpecialsBanner />
        <FeaturedProductsSection />
        <MembershipBanner />
      </div>
      <Footer />
    </main>
  );
}
