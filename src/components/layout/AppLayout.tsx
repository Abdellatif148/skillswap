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
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
                <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center shadow-soft">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">SkillSwap</span>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/dashboard")}
                  className={currentPage === "dashboard" ? "text-primary" : ""}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/messages")}
                  className={currentPage === "messages" ? "text-primary" : ""}
                >
                  Messages
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/profile")}
                  className={currentPage === "profile" ? "text-primary" : ""}
                >
                  Profile
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              <Avatar className="h-9 w-9 cursor-pointer" onClick={() => navigate("/profile")}>
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {profile?.display_name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-40">
        <div className="flex items-center justify-around py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className={currentPage === "dashboard" ? "text-primary" : ""}
          >
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/messages")}
            className={currentPage === "messages" ? "text-primary" : ""}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {profile?.display_name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
        {/* Safe area for iOS */}
        <div className="h-safe-area-inset-bottom"></div>
      </div>
    </div>
  );
};