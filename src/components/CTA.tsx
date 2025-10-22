import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PLATFORM_STATS } from "@/lib/constants";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{PLATFORM_STATS.activeUsers} Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-muted-foreground">{PLATFORM_STATS.averageRating}/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">{PLATFORM_STATS.skillsAvailable} Skills Available</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Ready to unlock your potential?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners and teachers who are already transforming their lives through skill exchange.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="btn-gradient-hover px-10 py-4 text-lg font-semibold rounded-2xl group shadow-hover"
            >
              Start Swapping Skills
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-10 py-4 text-lg font-medium rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="pt-12">
            <p className="text-sm text-muted-foreground mb-6">Join our growing community</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{PLATFORM_STATS.categories}</div>
                <div className="text-xs text-muted-foreground">Skill Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{PLATFORM_STATS.sessionsCompleted}</div>
                <div className="text-xs text-muted-foreground">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{PLATFORM_STATS.averageRating}/5</div>
                <div className="text-xs text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;