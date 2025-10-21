import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-slide-up">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Find a Skill Partner Today.
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Teach what you know. Learn what you love.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-soft group"
              >
                Start Swapping Skills
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-success opacity-20 rounded-3xl blur-3xl" />
            <img 
              src={heroImage}
              alt="People learning and teaching together"
              className="relative rounded-3xl shadow-soft w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;