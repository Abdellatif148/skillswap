import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, GraduationCap, Wallet, Calendar, MessageCircle, Star, Search, Video, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SkillCard } from "@/components/skills/SkillCard";
import { useProfile } from "@/hooks/useProfile";
import { useMatches } from "@/hooks/useMatches";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PLATFORM_STATS } from "@/lib/constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, skills, loading, teachSkills, learnSkills } = useProfile();
  const { matches, loading: matchesLoading } = useMatches();
  const [activeTab, setActiveTab] = useState("teach");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  if (!profile?.profile_completed) {
    navigate("/profile-setup");
    return null;
  }

  const displayMatches = matches.slice(0, 3); // Show only first 3 matches

  return (
    <AppLayout currentPage="dashboard">
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
                  <p className="text-2xl font-bold text-foreground">{profile?.credits || 10}</p>
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
                  <p className="text-2xl font-bold text-foreground">0</p>
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
                  <p className="text-2xl font-bold text-foreground">{matches.length}</p>
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
                  teachSkills.map((skill, index) => (
                    <SkillCard 
                      key={skill.id} 
                      skill={skill} 
                      progress={75 - index * 10}
                      rating={4.8 + index * 0.1}
                      sessionsCount={12 + index * 3}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="learn" className="space-y-4">
                {learnSkills.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No learning skills added yet</p>
                ) : (
                  learnSkills.map((skill, index) => (
                    <SkillCard 
                      key={skill.id} 
                      skill={skill} 
                      progress={40 + index * 15}
                      sessionsCount={5 + index * 2}
                    />
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
              {matchesLoading ? (
                <div className="col-span-full">
                  <LoadingSpinner size="md" text="Loading matches..." />
                </div>
              ) : displayMatches.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No matches yet. Add more skills to find partners!</p>
                </div>
              ) : (
                displayMatches.map((match) => {
                  const otherUser = match.teacher_id === profile?.id 
                    ? match.learner_profile 
                    : match.teacher_profile;
                  const teacherSkill = match.teacher_skill?.skill_name;
                  const learnerSkill = match.learner_skill?.skill_name;
                  
                  return (
                    <Card key={match.id} className="p-4 bg-gradient-card hover:shadow-soft transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {otherUser?.display_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{otherUser?.display_name || 'Unknown User'}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">4.8</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {teacherSkill} ↔ {learnerSkill}
                  </p>
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
                  );
                })
              )}
            </div>
          </Card>

          {/* Skill Credits Wallet */}
          <Card className="p-6 shadow-card bg-gradient-hero">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-white/80 text-sm mb-1">Your Balance</p>
                <h3 className="text-3xl font-bold">{profile?.credits || 10} Credits</h3>
                <p className="text-white/90 text-sm mt-2">Start teaching to earn more!</p>
              </div>
              <Wallet className="w-16 h-16 text-white/30" />
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="secondary" className="flex-1" onClick={() => navigate("/profile")}>
                Add Skills
              </Button>
              <Button variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Find Match
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;