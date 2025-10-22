import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Session {
  id: string;
  match_id: string;
  teacher_id: string;
  learner_id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  meeting_link?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useSessions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .or(`teacher_id.eq.${user.id},learner_id.eq.${user.id}`)
        .order('scheduled_at', { ascending: true });

      if (error) throw error;

      setSessions(data || []);
    } catch (err) {
      console.error("Error loading sessions:", err);
      setError(err instanceof Error ? err.message : "Failed to load sessions");
      toast({
        title: "Error",
        description: "Failed to load sessions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createSession = async (sessionData: Omit<Session, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert(sessionData)
        .select()
        .single();

      if (error) throw error;

      setSessions(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Session scheduled successfully",
      });

      return data;
    } catch (err) {
      console.error("Error creating session:", err);
      toast({
        title: "Error",
        description: "Failed to schedule session",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateSession = async (sessionId: string, updates: Partial<Session>) => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;

      setSessions(prev =>
        prev.map(session =>
          session.id === sessionId ? data : session
        )
      );

      toast({
        title: "Success",
        description: "Session updated successfully",
      });

      return true;
    } catch (err) {
      console.error("Error updating session:", err);
      toast({
        title: "Error",
        description: "Failed to update session",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    loadSessions();
  }, [user]);

  return {
    sessions,
    loading,
    error,
    refetch: loadSessions,
    createSession,
    updateSession,
    upcomingSessions: sessions.filter(s => 
      s.status === 'scheduled' && new Date(s.scheduled_at) > new Date()
    ),
    completedSessions: sessions.filter(s => s.status === 'completed'),
  };
};