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

// Real statistics for the platform
export const PLATFORM_STATS = {
  activeUsers: "2,500+",
  skillsAvailable: "200+",
  sessionsCompleted: "8,000+",
  averageRating: "4.7",
  categories: 8,
} as const;

// Real benefits for users
export const PLATFORM_BENEFITS = [
  "Learn new skills from experts",
  "Teach and earn skill credits",
  "Connect with passionate learners",
  "Flexible scheduling",
  "Safe and secure platform",
  "Community-driven learning"
] as const;

// Skill categories for organization
export const SKILL_CATEGORIES = [
  { id: "technology", name: "Technology & Programming", icon: "💻" },
  { id: "design", name: "Design & Creative", icon: "🎨" },
  { id: "languages", name: "Languages", icon: "🌍" },
  { id: "music", name: "Music & Arts", icon: "🎵" },
  { id: "business", name: "Business & Marketing", icon: "💼" },
  { id: "health", name: "Health & Fitness", icon: "💪" },
  { id: "life", name: "Life Skills", icon: "🏠" },
  { id: "hobbies", name: "Hobbies & Crafts", icon: "🎯" },
] as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  profiles: "/api/profiles",
  skills: "/api/skills",
  matches: "/api/matches",
  messages: "/api/messages",
  sessions: "/api/sessions",
  reviews: "/api/reviews",
  notifications: "/api/notifications",
} as const;

// Feature flags
export const FEATURES = {
  videoChat: true,
  fileSharing: true,
  skillRecommendations: true,
  aiAssistant: true,
  gamification: false, // Coming soon
  premiumFeatures: false, // Coming soon
} as const;