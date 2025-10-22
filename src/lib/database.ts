import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type Skill = Database['public']['Tables']['skills']['Row'];
export type SkillInsert = Database['public']['Tables']['skills']['Insert'];
export type SkillUpdate = Database['public']['Tables']['skills']['Update'];

// Enhanced database types
export interface EnhancedProfile extends Profile {
  credits?: number;
  location?: string;
  languages?: string[];
}

export interface SkillWithStats extends Skill {
  sessions_count?: number;
  average_rating?: number;
}

// Profile operations
export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data;
  },

  async createProfile(profile: ProfileInsert): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating profile:', error);
      return null;
    }
    
    return data;
  },

  async updateProfile(userId: string, updates: ProfileUpdate): Promise<boolean> {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating profile:', error);
      return false;
    }
    
    return true;
  }
};

// Skills operations
export const skillsService = {
  async getUserSkills(userId: string): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
    
    return data || [];
  },

  async addSkill(skill: SkillInsert): Promise<Skill | null> {
    const { data, error } = await supabase
      .from('skills')
      .insert(skill)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding skill:', error);
      return null;
    }
    
    return data;
  },

  async removeSkill(skillId: string): Promise<boolean> {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', skillId);
    
    if (error) {
      console.error('Error removing skill:', error);
      return false;
    }
    
    return true;
  },

  async updateSkill(skillId: string, updates: SkillUpdate): Promise<boolean> {
    const { error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', skillId);
    
    if (error) {
      console.error('Error updating skill:', error);
      return false;
    }
    
    return true;
  }
};

// Auth helpers
export const authService = {
  async signUp(email: string, password: string) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/profile-setup`,
      },
    });
  },

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};