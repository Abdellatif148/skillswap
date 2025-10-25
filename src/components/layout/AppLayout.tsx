import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Bell, MessageCircle, Search } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

interface AppLayoutProps {
  children: ReactNode;
  currentPage?: "dashboard" | "messages" | "profile";
}

export const AppLayout = ({ children, currentPage }: AppLayoutProps) => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border" role="banner">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <button 
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity touch-target" 
                onClick={() => navigate("/dashboard")}
                aria-label="Go to dashboard"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center shadow-soft">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">SkillSwap</span>
              </button>
              <div className="hidden md:flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/dashboard")}
                  className={currentPage === "dashboard" ? "text-primary" : ""}
                  aria-label="Go to dashboard"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/messages")}
                  className={currentPage === "messages" ? "text-primary" : ""}
                  aria-label="Go to messages"
                >
                  Messages
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/profile")}
                  className={currentPage === "profile" ? "text-primary" : ""}
                  aria-label="Go to profile"
                >
                  Profile
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative" aria-label="View notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              <button 
                className="h-9 w-9 cursor-pointer touch-target" 
                onClick={() => navigate("/profile")}
                aria-label="Go to profile"
              >
                <Avatar className="h-9 w-9">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {profile?.display_name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
                </Avatar>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main role="main">{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-40" role="navigation" aria-label="Mobile navigation">
        <div className="flex items-center justify-around py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className={currentPage === "dashboard" ? "text-primary" : ""}
            aria-label="Go to dashboard"
          >
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/messages")}
            className={currentPage === "messages" ? "text-primary" : ""}
            aria-label="Go to messages"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/profile")} aria-label="Go to profile">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {profile?.display_name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
        {/* Safe area for iOS */}
        <div className="h-safe-area-inset-bottom"></div>
      </nav>
    </div>
  );
};