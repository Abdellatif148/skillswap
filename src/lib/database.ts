import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// Type definitions
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type Skill = Database['public']['Tables']['skills']['Row'];
export type SkillInsert = Database['public']['Tables']['skills']['Insert'];
export type SkillUpdate = Database['public']['Tables']['skills']['Update'];

// Database service with error handling and caching
class DatabaseService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  private getCacheKey(table: string, id?: string, query?: string): string {
    return `${table}:${id || 'all'}:${query || ''}`;
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private clearCacheByPattern(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  async executeQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: any }>,
    cacheKey?: string
  ): Promise<T | null> {
    // Check cache first
    if (cacheKey) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached) return cached;
    }

    try {
      const { data, error } = await queryFn();
      
      if (error) {
        console.error('Database query error:', error);
        throw new Error(error.message || 'Database operation failed');
      }

      // Cache the result
      if (cacheKey && data) {
        this.setCache(cacheKey, data);
      }

      return data;
    } catch (err) {
      console.error('Database service error:', err);
      throw err;
    }
  }
}

const dbService = new DatabaseService();

// Profile operations
export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    return dbService.executeQuery(
      () => supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single(),
      `profile:${userId}`
    );
  },

  async createProfile(profile: ProfileInsert): Promise<Profile | null> {
    const result = await dbService.executeQuery(
      () => supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single()
    );
    
    // Clear cache for this user
    if (result && profile.id) {
      dbService.clearCacheByPattern(`profile:${profile.id}`);
    }
    
    return result;
  },

  async updateProfile(userId: string, updates: ProfileUpdate): Promise<boolean> {
    try {
      const result = await dbService.executeQuery(
        () => supabase
          .from('profiles')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', userId)
          .select()
          .single()
      );
      
      // Clear cache for this user
      dbService.clearCacheByPattern(`profile:${userId}`);
      
      return !!result;
    } catch (err) {
      return false;
    }
  }
};

// Skills operations
export const skillsService = {
  async getUserSkills(userId: string): Promise<Skill[]> {
    const result = await dbService.executeQuery(
      () => supabase
        .from('skills')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }),
      `skills:${userId}`
    );
    
    return result || [];
  },

  async addSkill(skill: SkillInsert): Promise<Skill | null> {
    const result = await dbService.executeQuery(
      () => supabase
        .from('skills')
        .insert(skill)
        .select()
        .single()
    );
    
    // Clear skills cache for this user
    if (result && skill.user_id) {
      dbService.clearCacheByPattern(`skills:${skill.user_id}`);
    }
    
    return result;
  },

  async removeSkill(skillId: string): Promise<boolean> {
    try {
      // Get skill first to clear cache
      const skill = await dbService.executeQuery(
        () => supabase
          .from('skills')
          .select('user_id')
          .eq('id', skillId)
          .single()
      );
      
      const result = await dbService.executeQuery(
        () => supabase
          .from('skills')
          .delete()
          .eq('id', skillId)
          .select()
          .single()
      );
      
      // Clear skills cache
      if (skill?.user_id) {
        dbService.clearCacheByPattern(`skills:${skill.user_id}`);
      }
      
      return !!result;
    } catch (err) {
      return false;
    }
  },

  async updateSkill(skillId: string, updates: SkillUpdate): Promise<boolean> {
    try {
      // Get skill first to clear cache
      const skill = await dbService.executeQuery(
        () => supabase
          .from('skills')
          .select('user_id')
          .eq('id', skillId)
          .single()
      );
      
      const result = await dbService.executeQuery(
        () => supabase
          .from('skills')
          .update(updates)
          .eq('id', skillId)
          .select()
          .single()
      );
      
      // Clear skills cache
      if (skill?.user_id) {
        dbService.clearCacheByPattern(`skills:${skill.user_id}`);
      }
      
      return !!result;
    } catch (err) {
      return false;
    }
  },

  async searchSkills(query: string, type?: 'teach' | 'learn'): Promise<Skill[]> {
    let queryBuilder = supabase
      .from('skills')
      .select(`
        *,
        profiles!inner(display_name, avatar_url)
      `)
      .ilike('skill_name', `%${query}%`);

    if (type) {
      queryBuilder = queryBuilder.eq('skill_type', type);
    }

    const result = await dbService.executeQuery(
      () => queryBuilder.limit(20),
      `search:${query}:${type || 'all'}`
    );

    return result || [];
  }
};

// Auth helpers
export const authService = {
  async signUp(email: string, password: string) {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/profile-setup`,
      },
    });
    
    return result;
  },

  async signIn(email: string, password: string) {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return result;
  },

  async signOut() {
    // Clear all cache on sign out
    dbService.clearCacheByPattern('');
    return await supabase.auth.signOut();
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async resetPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?mode=reset`,
    });
  },

  async updatePassword(password: string) {
    return await supabase.auth.updateUser({ password });
  }
};

// Export database service for advanced usage
export { dbService };