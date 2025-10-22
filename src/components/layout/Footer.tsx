import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center shadow-soft">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">SkillSwap</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Trade skills, not money. Join a global community where knowledge is currency.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                How it Works
              </Link>
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Browse Skills
              </Link>
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <div className="space-y-2 text-sm">
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2 text-sm">
              <a href="mailto:followuplysc@gmail.com" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="mailto:followuplysc@gmail.com" className="block text-muted-foreground hover:text-primary transition-colors">
                Community
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 SkillSwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};