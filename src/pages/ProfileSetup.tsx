import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { profileSetupSchema, skillSchema } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Skill {
  name: string;
  level: string;
  type: "teach" | "learn";
}

const ProfileSetup = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentLevel, setCurrentLevel] = useState("beginner");
  const [currentType, setCurrentType] = useState<"teach" | "learn">("teach");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const addSkill = () => {
    if (!currentSkill.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a skill name",
        variant: "destructive",
      });
      return;
    }

    setSkills([
      ...skills,
      { name: currentSkill, level: currentLevel, type: currentType },
    ]);
    setCurrentSkill("");
    setCurrentLevel("beginner");
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate profile data
    try {
      profileSetupSchema.parse({ display_name: displayName, bio });
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Please check your input",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          bio: bio,
          profile_completed: true,
        })
        .eq("id", user?.id);

      if (profileError) throw profileError;

      // Insert skills if any were added
      if (skills.length > 0) {
        // Delete any existing skills first
        await supabase.from("skills").delete().eq("user_id", user?.id);

        const skillsData = skills.map((skill) => ({
          user_id: user?.id,
          skill_name: skill.name,
          skill_type: skill.type,
          skill_level: skill.level,
        }));

        const { error: skillsError } = await supabase
          .from("skills")
          .insert(skillsData);

        if (skillsError) throw skillsError;
      }

      toast({
        title: "Profile completed!",
        description: "Welcome to SkillSwap community",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error setting up profile:", error);
      toast({
        title: "Error",
        description: "Failed to set up profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 py-12">
      <Card className="max-w-2xl mx-auto p-8 shadow-soft">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Complete Your Profile
            </h1>
            <p className="text-muted-foreground">
              Tell us about yourself and your skills
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name *</Label>
              <Input
                id="displayName"
                placeholder="How should we call you?"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a bit about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={loading}
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label>Your Skills (Optional)</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Add skills you can teach or want to learn. You can add more later!
                </p>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border border-border rounded-lg bg-muted/30">
                {skills.length === 0 ? (
                  <span className="text-sm text-muted-foreground">
                    No skills added yet
                  </span>
                ) : (
                  skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant={skill.type === "teach" ? "default" : "secondary"}
                      className="gap-1"
                    >
                      {skill.name} ({skill.level}) - {skill.type}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="ml-1 hover:bg-background/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Skill name (e.g., Web Design)"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Select
                  value={currentLevel}
                  onValueChange={setCurrentLevel}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={currentType}
                  onValueChange={(value: "teach" | "learn") =>
                    setCurrentType(value)
                  }
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teach">Can Teach</SelectItem>
                    <SelectItem value="learn">Want to Learn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                onClick={addSkill}
                variant="outline"
                className="w-full"
                disabled={loading}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSetup;