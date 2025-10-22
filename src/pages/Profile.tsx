import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MapPin, Globe, Star, GraduationCap, BookOpen, Award, Calendar, Clock, MessageCircle, Video, Edit } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, skills, loading, teachSkills, learnSkills } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Profile not found</h2>
          <p className="text-muted-foreground mb-4">Unable to load your profile.</p>
          <Button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const milestones = [
    { id: 1, title: "Completed 5 sessions in Design", date: "2 weeks ago", icon: GraduationCap },
    { id: 2, title: "Reached Intermediate in Guitar", date: "1 month ago", icon: Award },
    { id: 3, title: "Joined SkillSwap Community", date: "3 months ago", icon: Star },
  ];

  return (
    <AppLayout currentPage="profile">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="p-8 shadow-card">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-gradient-hero text-white text-4xl">
                  {profile?.display_name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">
                      {profile?.display_name}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profile.location || "Location not set"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {profile.languages?.join(", ") || "Languages not set"}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </div>

                <div className="flex items-center gap-6 my-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-foreground font-semibold">4.9</span>
                  </div>
                  <Badge variant="default" className="gap-1">
                    <GraduationCap className="w-3 h-3" />
                    Teaching {teachSkills.length} skills
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <BookOpen className="w-3 h-3" />
                    Learning {learnSkills.length} skills
                  </Badge>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary-dark gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Video className="w-4 h-4" />
                    Video Call
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 shadow-card text-center">
              <div className="text-3xl font-bold text-primary mb-1">48</div>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </Card>
            <Card className="p-5 shadow-card text-center">
              <div className="text-3xl font-bold text-secondary mb-1">24h</div>
              <p className="text-sm text-muted-foreground">Hours Taught</p>
            </Card>
            <Card className="p-5 shadow-card text-center">
              <div className="text-3xl font-bold text-foreground mb-1">18h</div>
              <p className="text-sm text-muted-foreground">Hours Learned</p>
            </Card>
          </div>

          {/* About Section */}
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {profile.bio || "This user hasn't added a bio yet."}
            </p>
          </Card>

          {/* Skills Overview */}
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-6">Skills Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills I Teach */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Skills I Teach</h3>
                </div>
                <div className="space-y-3">
                  {teachSkills.map((skill) => (
                    <div key={skill.id} className="p-3 rounded-lg bg-gradient-card border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{skill.skill_name}</span>
                        <Badge variant="default" className="text-xs">{skill.skill_level}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Ready to teach</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          4.9
                        </span>
                      </div>
                      <Progress value={100} className="h-1.5" />
                    </div>
                  ))}
                  {teachSkills.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No teaching skills added yet
                    </p>
                  )}
                </div>
              </div>

              {/* Skills I Learn */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-semibold text-foreground">Skills I Learn</h3>
                </div>
                <div className="space-y-3">
                  {learnSkills.map((skill) => (
                    <div key={skill.id} className="p-3 rounded-lg bg-gradient-card border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{skill.skill_name}</span>
                        <Badge variant="secondary" className="text-xs">{skill.skill_level}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Ready to learn</span>
                        <span>Starting level</span>
                      </div>
                      <Progress value={20} className="h-1.5" />
                    </div>
                  ))}
                  {learnSkills.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No learning skills added yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Progress Timeline */}
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-6">Progress Timeline</h2>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                      <milestone.icon className="w-6 h-6 text-white" />
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-12 bg-border my-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-semibold text-foreground mb-1">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {milestone.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Portfolio/Certificates Section */}
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">Certificates & Portfolio</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((cert) => (
                <div key={cert} className="aspect-square rounded-lg bg-gradient-card border border-border flex items-center justify-center cursor-pointer hover:shadow-soft transition-shadow">
                  <Award className="w-12 h-12 text-muted-foreground" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;