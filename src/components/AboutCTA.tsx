import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
          Join the SkillSwap Community Today
        </h2>
        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-soft group"
        >
          Sign Up / Start Swapping
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default AboutCTA;
