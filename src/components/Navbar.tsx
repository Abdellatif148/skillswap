import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center shadow-soft">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SkillSwap</span>
          </div>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Browse Skills
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </button>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/auth")}
              className="text-foreground hover:text-primary"
            >
              Log In
            </Button>
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-soft"
            >
              Sign Up Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;