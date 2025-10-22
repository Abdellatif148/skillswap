// App configuration constants
export const APP_CONFIG = {
  name: "SkillSwap",
  description: "Trade skills, not money. Join a global community where knowledge is currency.",
  version: "1.0.0",
  author: "SkillSwap Team",
  email: "followuplysc@gmail.com",
  url: "https://skillswap.app",
} as const;

// Skill levels
export const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
] as const;

// Skill types
export const SKILL_TYPES = [
  { value: "teach", label: "Can Teach" },
  { value: "learn", label: "Want to Learn" },
] as const;

// Session statuses
export const SESSION_STATUSES = [
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

// Match statuses
export const MATCH_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
] as const;

// Notification types
export const NOTIFICATION_TYPES = [
  { value: "info", label: "Info" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
] as const;

// Default values
export const DEFAULTS = {
  credits: 10,
  sessionDuration: 60, // minutes
  languages: ["English"],
} as const;

// Validation limits
export const LIMITS = {
  displayName: { min: 1, max: 50 },
  bio: { max: 500 },
  skillName: { min: 1, max: 50 },
  messageContent: { min: 1, max: 1000 },
  sessionTitle: { min: 1, max: 100 },
  sessionDescription: { max: 500 },
  reviewComment: { max: 500 },
} as const;

// Popular skills for suggestions
export const POPULAR_SKILLS = [
  "Python", "JavaScript", "React", "Node.js", "UI/UX Design",
  "Guitar", "Piano", "Spanish", "French", "German",
  "Photography", "Video Editing", "Graphic Design", "Marketing",
  "Data Science", "Machine Learning", "Cooking", "Yoga",
  "Public Speaking", "Writing", "Drawing", "Painting"
] as const;