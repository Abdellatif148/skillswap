import { useState, useEffect } from "react";
import { profileService, skillsService, Profile, Skill } from "@/lib/database";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Load profile
      let profileData = await profileService.getProfile(user.id);
      
      if (!profileData) {
        // Profile doesn't exist, create one
        profileData = await profileService.createProfile({
          id: user.id,
          display_name: user.email?.split('@')[0] || 'User',
          profile_completed: false,
        });
        
        if (!profileData) {
          throw new Error('Failed to create profile');
        }
      } else {
        setProfile(profileData);
      }

      // Load skills
      const skillsData = await skillsService.getUserSkills(user.id);
      setSkills(skillsData);

    } catch (err) {
      console.error("Error loading profile:", err);
      setError(err instanceof Error ? err.message : "Failed to load profile");
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return false;

    try {
      const success = await profileService.updateProfile(user.id, updates);
      if (!success) return false;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (err) {
      console.error("Error updating profile:", err);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return false;
    }
  };

  const addSkill = async (skillData: Omit<Skill, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return false;

    try {
      const newSkill = await skillsService.addSkill({
        ...skillData,
        user_id: user.id,
      });
      
      if (!newSkill) return false;

      setSkills(prev => [newSkill, ...prev]);
      return true;
    } catch (err) {
      console.error("Error adding skill:", err);
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeSkill = async (skillId: string) => {
    try {
      const success = await skillsService.removeSkill(skillId);
      if (!success) return false;

      setSkills(prev => prev.filter(skill => skill.id !== skillId));
      return true;
    } catch (err) {
      console.error("Error removing skill:", err);
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user]);

  return {
    profile,
    skills,
    loading,
    error,
    refetch: loadProfile,
    updateProfile,
    addSkill,
    removeSkill,
    teachSkills: skills.filter(s => s.skill_type === "teach"),
    learnSkills: skills.filter(s => s.skill_type === "learn"),
  };
};