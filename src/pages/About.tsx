import AboutHero from "@/components/AboutHero";
import MissionStatement from "@/components/MissionStatement";
import HowWeWork from "@/components/HowWeWork";
import Team from "@/components/Team";
import AboutCTA from "@/components/AboutCTA";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AboutHero />
      <MissionStatement />
      <HowWeWork />
      <Team />
      <AboutCTA />
    </div>
  );
};

export default About;
