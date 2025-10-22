import { z } from "zod";

// Auth validation schemas
export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const profileSetupSchema = z.object({
  display_name: z.string().min(1, "Display name is required").max(50, "Display name too long"),
  bio: z.string().max(500, "Bio too long").optional(),
});

export const skillSchema = z.object({
  skill_name: z.string().min(1, "Skill name is required").max(50, "Skill name too long"),
  skill_type: z.enum(["teach", "learn"]),
  skill_level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
});

// Message validation
export const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(1000, "Message too long"),
});

export type AuthFormData = z.infer<typeof authSchema>;
export type ProfileSetupData = z.infer<typeof profileSetupSchema>;
export type SkillData = z.infer<typeof skillSchema>;
export type MessageData = z.infer<typeof messageSchema>;