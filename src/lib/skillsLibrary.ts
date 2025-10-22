import { supabase } from "@/integrations/supabase/client";

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
}

export interface SkillLibraryItem {
  id: string;
  name: string;
  category_id: string;
  description: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  popularity_score: number;
  created_at: string;
  category?: SkillCategory;
}

class SkillsLibraryService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes

  private getCacheKey(query: string): string {
    return `skills_search:${query.toLowerCase()}`;
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

  async getCategories(): Promise<SkillCategory[]> {
    const cacheKey = 'skill_categories';
    const cached = this.getFromCache<SkillCategory[]>(cacheKey);
    if (cached) return cached;

    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .select('*')
        .order('name');

      if (error) throw error;

      this.setCache(cacheKey, data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching skill categories:', error);
      return [];
    }
  }

  async searchSkills(query: string, categoryId?: string, limit: number = 20): Promise<SkillLibraryItem[]> {
    const cacheKey = this.getCacheKey(`${query}_${categoryId || 'all'}_${limit}`);
    const cached = this.getFromCache<SkillLibraryItem[]>(cacheKey);
    if (cached) return cached;

    try {
      let queryBuilder = supabase
        .from('skill_library')
        .select(`
          *,
          category:skill_categories(*)
        `)
        .order('popularity_score', { ascending: false })
        .limit(limit);

      if (query.trim()) {
        queryBuilder = queryBuilder.ilike('name', `%${query.trim()}%`);
      }

      if (categoryId) {
        queryBuilder = queryBuilder.eq('category_id', categoryId);
      }

      const { data, error } = await queryBuilder;

      if (error) throw error;

      this.setCache(cacheKey, data || []);
      return data || [];
    } catch (error) {
      console.error('Error searching skills:', error);
      return [];
    }
  }

  async getPopularSkills(limit: number = 12): Promise<SkillLibraryItem[]> {
    const cacheKey = `popular_skills_${limit}`;
    const cached = this.getFromCache<SkillLibraryItem[]>(cacheKey);
    if (cached) return cached;

    try {
      const { data, error } = await supabase
        .from('skill_library')
        .select(`
          *,
          category:skill_categories(*)
        `)
        .order('popularity_score', { ascending: false })
        .limit(limit);

      if (error) throw error;

      this.setCache(cacheKey, data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching popular skills:', error);
      return [];
    }
  }

  async getSkillsByCategory(categoryId: string, limit: number = 10): Promise<SkillLibraryItem[]> {
    const cacheKey = `category_skills_${categoryId}_${limit}`;
    const cached = this.getFromCache<SkillLibraryItem[]>(cacheKey);
    if (cached) return cached;

    try {
      const { data, error } = await supabase
        .from('skill_library')
        .select(`
          *,
          category:skill_categories(*)
        `)
        .eq('category_id', categoryId)
        .order('popularity_score', { ascending: false })
        .limit(limit);

      if (error) throw error;

      this.setCache(cacheKey, data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching skills by category:', error);
      return [];
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const skillsLibraryService = new SkillsLibraryService();