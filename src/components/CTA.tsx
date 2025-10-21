import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Ready to Start Your
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Learning Journey?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of learners exchanging skills worldwide. Your next skill is just a swap away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-soft group"
            >
              Create Free Account
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted"
            >
              Learn More
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground pt-4">
            No credit card required • Free forever • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;