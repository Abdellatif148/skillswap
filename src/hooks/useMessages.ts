import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  read_at?: string;
  created_at: string;
}

export interface Conversation {
  match_id: string;
  other_user: {
    id: string;
    display_name: string;
    avatar_url?: string;
  };
  last_message?: Message;
  unread_count: number;
}

export const useMessages = (matchId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = async (targetMatchId: string) => {
    if (!user || !targetMatchId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('match_id', targetMatchId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);
    } catch (err) {
      console.error("Error loading messages:", err);
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const loadConversations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Get all matches for the user
      const { data: matches, error: matchesError } = await supabase
        .from('matches')
        .select(`
          id,
          teacher_id,
          learner_id,
          teacher_profile:profiles!teacher_id(id, display_name, avatar_url),
          learner_profile:profiles!learner_id(id, display_name, avatar_url)
        `)
        .or(`teacher_id.eq.${user.id},learner_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (matchesError) throw matchesError;

      // Get last message for each match
      const conversationsData: Conversation[] = [];
      
      for (const match of matches || []) {
        const otherUser = match.teacher_id === user.id 
          ? match.learner_profile 
          : match.teacher_profile;

        const { data: lastMessage } = await supabase
          .from('messages')
          .select('*')
          .eq('match_id', match.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        const { count: unreadCount } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('match_id', match.id)
          .neq('sender_id', user.id)
          .is('read_at', null);

        conversationsData.push({
          match_id: match.id,
          other_user: otherUser,
          last_message: lastMessage || undefined,
          unread_count: unreadCount || 0,
        });
      }

      setConversations(conversationsData);
    } catch (err) {
      console.error("Error loading conversations:", err);
      setError(err instanceof Error ? err.message : "Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (matchId: string, content: string, messageType: Message['message_type'] = 'text') => {
    if (!user || !content.trim()) return false;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          match_id: matchId,
          sender_id: user.id,
          content: content.trim(),
          message_type: messageType,
        })
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [...prev, data]);
      return true;
    } catch (err) {
      console.error("Error sending message:", err);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return false;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId)
        .neq('sender_id', user?.id);

      if (error) throw error;

      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, read_at: new Date().toISOString() }
            : msg
        )
      );
    } catch (err) {
      console.error("Error marking message as read:", err);
    }
  };

  useEffect(() => {
    if (matchId) {
      loadMessages(matchId);
    } else {
      loadConversations();
    }
  }, [user, matchId]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: matchId ? `match_id=eq.${matchId}` : undefined,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, matchId]);

  return {
    messages,
    conversations,
    loading,
    error,
    sendMessage,
    markAsRead,
    refetch: matchId ? () => loadMessages(matchId) : loadConversations,
  };
};