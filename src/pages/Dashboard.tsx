import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, BookOpen, GraduationCap, LogOut, Wallet, Calendar, Bell, MessageCircle, Star, Edit2, Trash2, Search, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Profile {
  display_name: string;
  bio: string;
  profile_completed: boolean;
  avatar_url?: string;
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
  const [activeTab, setActiveTab] = useState("teach");

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

  // Mock data for matches
  const mockMatches = [
    { id: 1, name: "Sarah Chen", skill: "Design ↔ Guitar", rating: 4.8, avatar: "" },
    { id: 2, name: "Alex Kumar", skill: "Python ↔ Marketing", rating: 4.9, avatar: "" },
    { id: 3, name: "Maria Lopez", skill: "Spanish ↔ Photography", rating: 5.0, avatar: "" },
  ];

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
                <Button variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>
                <Button variant="ghost" onClick={() => navigate("/messages")}>Messages</Button>
                <Button variant="ghost" onClick={() => navigate("/profile")}>Profile</Button>
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
                  {profile?.display_name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Summary Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 shadow-card hover:shadow-soft transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-success flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Skill Credits</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
              </div>
            </Card>

            <Card className="p-5 shadow-card hover:shadow-soft transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
              </div>
            </Card>

            <Card className="p-5 shadow-card hover:shadow-soft transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center relative">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                    5
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New Matches</p>
                  <p className="text-2xl font-bold text-foreground">5</p>
                </div>
              </div>
            </Card>
          </div>

          {/* My Skills Panel */}
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">My Skills</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                <TabsTrigger value="teach" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Teach
                </TabsTrigger>
                <TabsTrigger value="learn" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Learn
                </TabsTrigger>
              </TabsList>

              <TabsContent value="teach" className="space-y-4">
                {teachSkills.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No teaching skills added yet</p>
                ) : (
                  teachSkills.map((skill) => (
                    <Card key={skill.id} className="p-4 bg-gradient-card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground">{skill.skill_name}</h3>
                          <Badge variant="default" className="mt-1">{skill.skill_level}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground font-medium">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <Button className="w-full mt-4 bg-primary hover:bg-primary-dark">
                        Find Match
                      </Button>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="learn" className="space-y-4">
                {learnSkills.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No learning skills added yet</p>
                ) : (
                  learnSkills.map((skill) => (
                    <Card key={skill.id} className="p-4 bg-gradient-card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground">{skill.skill_name}</h3>
                          <Badge variant="secondary" className="mt-1">{skill.skill_level}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90">
                        Find Match
                      </Button>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </Card>

          {/* My Matches */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">My Matches</h2>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Find More
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockMatches.map((match) => (
                <Card key={match.id} className="p-4 bg-gradient-card hover:shadow-soft transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {match.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{match.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">{match.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{match.skill}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => navigate("/messages")}>
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Skill Credits Wallet */}
          <Card className="p-6 shadow-card bg-gradient-hero">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-white/80 text-sm mb-1">Your Balance</p>
                <h3 className="text-3xl font-bold">24 Credits</h3>
                <p className="text-white/90 text-sm mt-2">Earned: 30 • Spent: 6</p>
              </div>
              <Wallet className="w-16 h-16 text-white/30" />
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="secondary" className="flex-1">Buy More</Button>
              <Button variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Redeem
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <Sparkles className="h-5 w-5 text-primary" />
          </Button>
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/messages")}>
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {profile?.display_name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;