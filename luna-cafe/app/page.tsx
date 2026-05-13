import { HeroGallery } from "@/components/home/hero-gallery";
import { FeaturedMenu } from "@/components/home/featured-menu";
import { AboutSection } from "@/components/home/about-section";
import { LoyaltyTeaser } from "@/components/home/loyalty-teaser";
import { VisitSection } from "@/components/home/visit-section";

export default function HomePage() {
  return (
    <>
      <HeroGallery />
      <FeaturedMenu />
      <AboutSection />
      <LoyaltyTeaser />
      <VisitSection />
    </>
  );
}
