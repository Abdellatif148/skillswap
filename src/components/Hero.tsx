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
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-card border border-border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Trade skills, not money</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Learn Anything,
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Teach Something
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Join a global community where knowledge is currency. Exchange skills directly with others and grow together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-soft group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted"
              >
                How It Works
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Skills Shared</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Match Success</div>
              </div>
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