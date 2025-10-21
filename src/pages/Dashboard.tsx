import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, BookOpen, GraduationCap, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  display_name: string;
  bio: string;
  profile_completed: boolean;
}

interface Skill {
  id: string;
  skill_name: string;
  skill_type: string;
  skill_level: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    loadProfile();
  }, [user, navigate]);

  const loadProfile = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (profileError) throw profileError;

      setProfile(profileData);

      if (!profileData.profile_completed) {
        navigate("/profile-setup");
        return;
      }

      const { data: skillsData, error: skillsError } = await supabase
        .from("skills")
        .select("*")
        .eq("user_id", user?.id);

      if (skillsError) throw skillsError;

      setSkills(skillsData || []);
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const teachSkills = skills.filter((s) => s.skill_type === "teach");
  const learnSkills = skills.filter((s) => s.skill_type === "learn");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center shadow-soft">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">SkillSwap</span>
            </div>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <Card className="p-8 bg-gradient-card shadow-soft">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {profile?.display_name}!
            </h1>
            {profile?.bio && (
              <p className="text-muted-foreground">{profile.bio}</p>
            )}
          </Card>

          {/* Skills I Can Teach */}
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">
                Skills I Can Teach
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {teachSkills.length === 0 ? (
                <p className="text-muted-foreground">No teaching skills added yet</p>
              ) : (
                teachSkills.map((skill) => (
                  <Badge key={skill.id} variant="default" className="text-sm py-1.5 px-3">
                    {skill.skill_name} • {skill.skill_level}
                  </Badge>
                ))
              )}
            </div>
          </Card>

          {/* Skills I Want to Learn */}
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">
                Skills I Want to Learn
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {learnSkills.length === 0 ? (
                <p className="text-muted-foreground">No learning skills added yet</p>
              ) : (
                learnSkills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-sm py-1.5 px-3">
                    {skill.skill_name} • {skill.skill_level}
                  </Badge>
                ))
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 shadow-soft bg-gradient-hero/5">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Ready to start matching?
            </h3>
            <p className="text-muted-foreground mb-4">
              We're preparing to find perfect skill partners for you. Stay tuned!
            </p>
            <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
              Find Matches (Coming Soon)
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;