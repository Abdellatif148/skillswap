import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileService, skillsService } from "@/lib/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader as Loader2, Plus, X } from "lucide-react";
import { profileSetupSchema } from "@/lib/validations";
import { SkillForm, SkillFormData } from "@/components/forms/SkillForm";
import { Badge } from "@/components/ui/badge";

const ProfileSetup = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<SkillFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check for pre-selected skill
  useEffect(() => {
    const selectedSkill = localStorage.getItem('selectedSkill');
    if (selectedSkill) {
      try {
        const skill = JSON.parse(selectedSkill);
        // Auto-add the selected skill
        setSkills([{
          name: skill.name,
          type: 'learn',
          level: skill.difficulty_level || 'beginner'
        }]);
        
        toast({
          title: "Skill Added!",
          description: `${skill.name} has been added to your learning goals.`,
        });
      } catch (error) {
        console.error('Error parsing selected skill:', error);
      }
    }
  }, [toast]);

  const handleAddSkill = (skill: SkillFormData) => {
    setSkills([...skills, skill]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast({
        title: "Validation Error",
        description: "Display name is required",
        variant: "destructive",
      });
      return;
    }

    // Validate profile data
    try {
      profileSetupSchema.parse({ display_name: displayName, bio });
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Please check your profile information",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Update profile
      const success = await profileService.updateProfile(user?.id!, {
        display_name: displayName,
        bio: bio || null,
        profile_completed: true,
      });
      
      if (!success) throw new Error("Failed to update profile");

      // Insert skills if any were added
      if (skills.length > 0) {
        for (const skill of skills) {
          await skillsService.addSkill({
            user_id: user?.id!,
            skill_name: skill.name,
            skill_type: skill.type,
            skill_level: skill.level,
          });
        }
      }

      toast({
        title: "Profile completed!",
        description: "Welcome to SkillSwap community",
      });

      // Clear any stored selections
      localStorage.removeItem('selectedSkill');
      localStorage.removeItem('searchQuery');

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

            <SkillForm
              onAddSkill={handleAddSkill}
              skills={skills}
              onRemoveSkill={removeSkill}
              disabled={loading}
            />

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