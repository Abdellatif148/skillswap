import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  display_name: string;
  bio: string;
  avatar_url?: string;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

interface Skill {
  id: string;
  skill_name: string;
  skill_type: string;
  skill_level: string;
  user_id: string;
  created_at: string;
}

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
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // Profile doesn't exist, create one
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              display_name: user.email?.split('@')[0] || 'User',
              profile_completed: false,
            })
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile);
        } else {
          throw profileError;
        }
      } else {
        setProfile(profileData);
      }

      // Load skills
      const { data: skillsData, error: skillsError } = await supabase
        .from("skills")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (skillsError) throw skillsError;
      setSkills(skillsData || []);

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
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;

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
      const { data, error } = await supabase
        .from("skills")
        .insert({
          ...skillData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setSkills(prev => [data, ...prev]);
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
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", skillId);

      if (error) throw error;

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