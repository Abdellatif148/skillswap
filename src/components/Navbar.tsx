import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav-modern">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-card hover-scale">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">SkillSwap</span>
          </div>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
              How It Works
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
              Browse Skills
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
              About
            </button>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/auth")}
              className="text-foreground hover:text-primary font-medium"
            >
              Log In
            </Button>
            <Button 
              onClick={() => navigate("/auth")}
              className="btn-gradient-hover font-semibold rounded-xl px-6"
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