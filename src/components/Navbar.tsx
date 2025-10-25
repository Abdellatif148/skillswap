import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { skillsLibraryService } from "@/lib/skillsLibrary";

const Navbar = () => {
  const navigate = useNavigate();

  const handleBrowseSkills = async () => {
    // Pre-load popular skills for better UX
    try {
      await skillsLibraryService.getPopularSkills();
    } catch (error) {
      console.error('Error pre-loading skills:', error);
    }
    navigate("/auth");
  };

  return (
    <nav className="nav-modern" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity touch-target" 
            onClick={() => navigate("/")}
            aria-label="Go to homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-card hover-scale">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">SkillSwap</span>
          </button>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 touch-target"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Learn how SkillSwap works"
            >
              How It Works
            </button>
            <button 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 touch-target"
              onClick={handleBrowseSkills}
              aria-label="Browse available skills"
            >
              Browse Skills
            </button>
            <button 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 touch-target"
              onClick={() => navigate("/contact")}
              aria-label="Contact us"
            >
              Contact
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