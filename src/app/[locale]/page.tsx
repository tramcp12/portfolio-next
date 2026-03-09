import { getLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import VideoSection from "@/components/sections/VideoSection";
import RoomsSection from "@/components/sections/RoomsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ExploreSection from "@/components/sections/ExploreSection";
import AboutSection from "@/components/sections/AboutSection";
import LocationSection from "@/components/sections/LocationSection";
import JournalSection from "@/components/sections/JournalSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <main id="main-content">
      <HeroSection />
      <VideoSection />
      <RoomsSection locale={locale} />
      <TestimonialsSection />
      <ExploreSection />
      <AboutSection />
      <LocationSection />
      <JournalSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
