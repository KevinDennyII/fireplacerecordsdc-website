import { usePageViews } from "@/hooks/usePageViews";
import { AboutSection } from "@/components/home/AboutSection";
import { EventsSection } from "@/components/home/EventsSection";
import { FooterSection } from "@/components/home/FooterSection";
import { HeaderSection } from "@/components/home/HeaderSection";
import { HeroSection } from "@/components/home/HeroSection";
import { UpdatesSection } from "@/components/home/UpdatesSection";
import { VisitSection } from "@/components/home/VisitSection";

export default function Home() {
  const visitorCount = usePageViews();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderSection />
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <VisitSection />
      <UpdatesSection />
      <FooterSection visitorCount={visitorCount} />
    </div>
  );
}
