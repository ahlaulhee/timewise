import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FunctionalitySection from "@/components/FunctionalitySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto space-y-10">
      <HeroSection />
      <FeaturesSection />
      <FunctionalitySection />
      <Footer />
    </main>
  );
}
