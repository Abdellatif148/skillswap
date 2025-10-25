export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      matches: {
        Row: {
          id: string
          teacher_id: string
          learner_id: string
          teacher_skill_id: string
          learner_skill_id: string
          status: "pending" | "accepted" | "rejected" | "completed"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          learner_id: string
          teacher_skill_id: string
          learner_skill_id: string
          status?: "pending" | "accepted" | "rejected" | "completed"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          learner_id?: string
          teacher_skill_id?: string
          learner_skill_id?: string
          status?: "pending" | "accepted" | "rejected" | "completed"
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_learner_id_fkey"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_teacher_skill_id_fkey"
            columns: ["teacher_skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_learner_skill_id_fkey"
            columns: ["learner_skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          match_id: string
          sender_id: string
          content: string
          message_type: "text" | "image" | "file"
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          match_id: string
          sender_id: string
          content: string
          message_type?: "text" | "image" | "file"
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          sender_id?: string
          content?: string
          message_type?: "text" | "image" | "file"
          read_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: "info" | "success" | "warning" | "error"
          read_at: string | null
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: "info" | "success" | "warning" | "error"
          read_at?: string | null
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: "info" | "success" | "warning" | "error"
          read_at?: string | null
          action_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          languages: string[] | null
          credits: number | null
          profile_completed: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          languages?: string[] | null
          credits?: number | null
          profile_completed?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          languages?: string[] | null
          credits?: number | null
          profile_completed?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          session_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          id: string
          match_id: string
          teacher_id: string
          learner_id: string
          title: string
          description: string | null
          scheduled_at: string
          duration_minutes: number | null
          status: "scheduled" | "in_progress" | "completed" | "cancelled"
          meeting_link: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          match_id: string
          teacher_id: string
          learner_id: string
          title: string
          description?: string | null
          scheduled_at: string
          duration_minutes?: number | null
          status?: "scheduled" | "in_progress" | "completed" | "cancelled"
          meeting_link?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          teacher_id?: string
          learner_id?: string
          title?: string
          description?: string | null
          scheduled_at?: string
          duration_minutes?: number | null
          status?: "scheduled" | "in_progress" | "completed" | "cancelled"
          meeting_link?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_learner_id_fkey"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      skill_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Relationships: []
      }
      skill_library: {
        Row: {
          id: string
          name: string
          category_id: string | null
          description: string | null
          difficulty_level: "beginner" | "intermediate" | "advanced" | "expert" | null
          popularity_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category_id?: string | null
          description?: string | null
          difficulty_level?: "beginner" | "intermediate" | "advanced" | "expert" | null
          popularity_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category_id?: string | null
          description?: string | null
          difficulty_level?: "beginner" | "intermediate" | "advanced" | "expert" | null
          popularity_score?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_library_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      skills: {
        Row: {
          id: string
          user_id: string
          skill_name: string
          skill_type: "teach" | "learn"
          skill_level: "beginner" | "intermediate" | "advanced" | "expert"
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_name: string
          skill_type: "teach" | "learn"
          skill_level: "beginner" | "intermediate" | "advanced" | "expert"
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_name?: string
          skill_type?: "teach" | "learn"
          skill_level?: "beginner" | "intermediate" | "advanced" | "expert"
          description?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}