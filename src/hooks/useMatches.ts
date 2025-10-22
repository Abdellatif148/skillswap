import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Match {
  id: string;
  teacher_id: string;
  learner_id: string;
  teacher_skill_id: string;
  learner_skill_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
  teacher_profile?: {
    display_name: string;
    avatar_url?: string;
  };
  learner_profile?: {
    display_name: string;
    avatar_url?: string;
  };
  teacher_skill?: {
    skill_name: string;
    skill_level: string;
  };
  learner_skill?: {
    skill_name: string;
    skill_level: string;
  };
}

export const useMatches = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          teacher_profile:profiles!teacher_id(display_name, avatar_url),
          learner_profile:profiles!learner_id(display_name, avatar_url),
          teacher_skill:skills!teacher_skill_id(skill_name, skill_level),
          learner_skill:skills!learner_skill_id(skill_name, skill_level)
        `)
        .or(`teacher_id.eq.${user.id},learner_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMatches(data || []);
    } catch (err) {
      console.error("Error loading matches:", err);
      setError(err instanceof Error ? err.message : "Failed to load matches");
      toast({
        title: "Error",
        description: "Failed to load matches",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMatchStatus = async (matchId: string, status: Match['status']) => {
    try {
      const { error } = await supabase
        .from('matches')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', matchId);

      if (error) throw error;

      setMatches(prev => 
        prev.map(match => 
          match.id === matchId 
            ? { ...match, status, updated_at: new Date().toISOString() }
            : match
        )
      );

      toast({
        title: "Success",
        description: `Match ${status}`,
      });

      return true;
    } catch (err) {
      console.error("Error updating match:", err);
      toast({
        title: "Error",
        description: "Failed to update match",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    loadMatches();
  }, [user]);

  return {
    matches,
    loading,
    error,
    refetch: loadMatches,
    updateMatchStatus,
    pendingMatches: matches.filter(m => m.status === 'pending'),
    acceptedMatches: matches.filter(m => m.status === 'accepted'),
  };
};