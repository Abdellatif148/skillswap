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
  // Technology
  "Python", "JavaScript", "React", "Node.js", "TypeScript", "Vue.js", "Angular",
  "Data Science", "Machine Learning", "AI/ML", "Blockchain", "Cybersecurity",
  "Mobile Development", "Web Development", "DevOps", "Cloud Computing",
  
  // Design & Creative
  "UI/UX Design", "Graphic Design", "Web Design", "Logo Design", "Branding",
  "Photography", "Video Editing", "Animation", "3D Modeling", "Illustration",
  "Drawing", "Painting", "Digital Art", "Adobe Creative Suite",
  
  // Languages
  "Spanish", "French", "German", "Italian", "Portuguese", "Mandarin",
  "Japanese", "Korean", "Arabic", "Russian", "English (ESL)",
  
  // Music & Arts
  "Guitar", "Piano", "Violin", "Drums", "Singing", "Music Production",
  "Songwriting", "Music Theory", "DJ Skills", "Sound Engineering",
  
  // Business & Marketing
  "Digital Marketing", "Social Media Marketing", "SEO", "Content Marketing",
  "Email Marketing", "Sales", "Business Strategy", "Entrepreneurship",
  "Project Management", "Leadership", "Public Speaking", "Presentation Skills",
  
  // Health & Fitness
  "Yoga", "Meditation", "Personal Training", "Nutrition", "Pilates",
  "Running", "Weight Training", "Mental Health", "Wellness Coaching",
  
  // Life Skills
  "Cooking", "Baking", "Gardening", "Home Improvement", "Financial Planning",
  "Time Management", "Organization", "Study Skills", "Writing", "Reading",
  
  // Hobbies & Crafts
  "Knitting", "Sewing", "Woodworking", "Pottery", "Jewelry Making",
  "Origami", "Calligraphy", "Chess", "Board Games", "Card Games"
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