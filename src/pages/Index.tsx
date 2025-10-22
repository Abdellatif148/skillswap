import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import TrendingSkills from "@/components/TrendingSkills";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/common/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Home"
        description="Trade skills, not money. Join a global community where knowledge is currency and connect with passionate learners worldwide."
        keywords="skill exchange, learning platform, teach skills, learn skills, skill swap, education community"
      />
      <Navbar />
      <Hero />
      <SearchBar />
      <TrendingSkills />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;