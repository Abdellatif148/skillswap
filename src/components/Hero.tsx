import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PLATFORM_STATS } from "@/lib/constants";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Text Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-soft">
              <Sparkles className="w-5 h-5 text-primary animate-pulse-glow" />
              <span className="text-sm font-medium text-primary">Join 10,000+ skill swappers</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              Find a Skill Partner Today.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Teach what you know. Learn what you love. Connect with passionate learners worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="btn-gradient-hover px-8 py-4 text-lg font-semibold rounded-2xl group shadow-hover"
              >
                Start Swapping Skills
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-4 text-lg font-medium rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                How It Works
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{PLATFORM_STATS.activeUsers}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">{PLATFORM_STATS.skillsAvailable}</div>
                <div className="text-sm text-muted-foreground">Skills Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{PLATFORM_STATS.sessionsCompleted}</div>
                <div className="text-sm text-muted-foreground">Learning Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;