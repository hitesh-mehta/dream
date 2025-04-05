
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CtaSection } from "@/components/CtaSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
