/*
  # Complete SkillSwap Database Schema

  1. New Tables
    - `profiles` - User profiles with enhanced fields
    - `skills` - User skills (teach/learn)
    - `skill_categories` - Predefined skill categories
    - `skill_library` - Comprehensive skill library
    - `matches` - Skill exchange matches
    - `messages` - Chat messages between users
    - `sessions` - Scheduled learning sessions
    - `reviews` - Session reviews and ratings
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for data access
    - Secure user data with proper authentication

  3. Functions
    - Auto-create profile on user signup
    - Handle updated_at timestamps
    - Match-making algorithm helpers
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  languages TEXT[] DEFAULT ARRAY['English'],
  credits INTEGER DEFAULT 10,
  profile_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create skill categories table
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create skill library table
CREATE TABLE IF NOT EXISTS skill_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES skill_categories(id),
  description TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  popularity_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_type TEXT NOT NULL CHECK (skill_type IN ('teach', 'learn')),
  skill_level TEXT NOT NULL CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  teacher_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  learner_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(teacher_id, learner_id, teacher_skill_id, learner_skill_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, reviewer_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read_at TIMESTAMPTZ,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Skill categories policies (public read)
CREATE POLICY "Skill categories are viewable by everyone" ON skill_categories FOR SELECT USING (true);

-- Skill library policies (public read)
CREATE POLICY "Skill library is viewable by everyone" ON skill_library FOR SELECT USING (true);

-- Skills policies
CREATE POLICY "Skills are viewable by everyone" ON skills FOR SELECT USING (true);
CREATE POLICY "Users can insert their own skills" ON skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own skills" ON skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own skills" ON skills FOR DELETE USING (auth.uid() = user_id);

-- Matches policies
CREATE POLICY "Users can view their own matches" ON matches FOR SELECT USING (auth.uid() = teacher_id OR auth.uid() = learner_id);
CREATE POLICY "Users can create matches" ON matches FOR INSERT WITH CHECK (auth.uid() = teacher_id OR auth.uid() = learner_id);
CREATE POLICY "Users can update their own matches" ON matches FOR UPDATE USING (auth.uid() = teacher_id OR auth.uid() = learner_id);

-- Messages policies
CREATE POLICY "Users can view messages in their matches" ON messages 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM matches 
      WHERE matches.id = messages.match_id 
      AND (matches.teacher_id = auth.uid() OR matches.learner_id = auth.uid())
    )
  );
CREATE POLICY "Users can send messages in their matches" ON messages 
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM matches 
      WHERE matches.id = messages.match_id 
      AND (matches.teacher_id = auth.uid() OR matches.learner_id = auth.uid())
    )
  );

-- Sessions policies
CREATE POLICY "Users can view their own sessions" ON sessions FOR SELECT USING (auth.uid() = teacher_id OR auth.uid() = learner_id);
CREATE POLICY "Users can create sessions in their matches" ON sessions FOR INSERT WITH CHECK (auth.uid() = teacher_id OR auth.uid() = learner_id);
CREATE POLICY "Users can update their own sessions" ON sessions FOR UPDATE USING (auth.uid() = teacher_id OR auth.uid() = learner_id);

-- Reviews policies
CREATE POLICY "Users can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews for their sessions" ON reviews 
  FOR INSERT WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM sessions 
      WHERE sessions.id = reviews.session_id 
      AND (sessions.teacher_id = auth.uid() OR sessions.learner_id = auth.uid())
      AND sessions.status = 'completed'
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_type ON skills(skill_type);
CREATE INDEX IF NOT EXISTS idx_matches_teacher_id ON matches(teacher_id);
CREATE INDEX IF NOT EXISTS idx_matches_learner_id ON matches(learner_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_messages_match_id ON messages(match_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_sessions_teacher_id ON sessions(teacher_id);
CREATE INDEX IF NOT EXISTS idx_sessions_learner_id ON sessions(learner_id);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled_at ON sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read_at ON notifications(read_at);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name, profile_completed)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)), false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert skill categories
INSERT INTO skill_categories (name, description, icon) VALUES
  ('Technology', 'Programming, web development, and tech skills', '💻'),
  ('Design', 'UI/UX, graphic design, and creative skills', '🎨'),
  ('Languages', 'Foreign languages and communication', '🌍'),
  ('Music', 'Musical instruments and audio production', '🎵'),
  ('Business', 'Marketing, sales, and entrepreneurship', '💼'),
  ('Health', 'Fitness, wellness, and mental health', '💪'),
  ('Crafts', 'DIY, arts, and hands-on skills', '🎯'),
  ('Academic', 'Math, science, and educational subjects', '📚')
ON CONFLICT (name) DO NOTHING;

-- Insert comprehensive skill library
INSERT INTO skill_library (name, category_id, description, difficulty_level, popularity_score) 
SELECT 
  skill_name,
  cat.id,
  skill_desc,
  skill_diff,
  skill_pop
FROM (
  VALUES
    -- Technology
    ('JavaScript', 'Technology', 'Popular programming language for web development', 'intermediate', 95),
    ('Python', 'Technology', 'Versatile programming language for data science and web development', 'beginner', 90),
    ('React', 'Technology', 'JavaScript library for building user interfaces', 'intermediate', 85),
    ('Node.js', 'Technology', 'JavaScript runtime for server-side development', 'intermediate', 80),
    ('TypeScript', 'Technology', 'Typed superset of JavaScript', 'intermediate', 75),
    ('Vue.js', 'Technology', 'Progressive JavaScript framework', 'intermediate', 70),
    ('Angular', 'Technology', 'Platform for building mobile and desktop web applications', 'advanced', 65),
    ('Data Science', 'Technology', 'Extracting insights from data using statistical methods', 'advanced', 88),
    ('Machine Learning', 'Technology', 'AI algorithms that learn from data', 'expert', 82),
    ('Cybersecurity', 'Technology', 'Protecting systems and networks from digital attacks', 'advanced', 78),
    ('Mobile Development', 'Technology', 'Creating applications for mobile devices', 'intermediate', 85),
    ('Web Development', 'Technology', 'Building websites and web applications', 'beginner', 92),
    ('DevOps', 'Technology', 'Practices combining software development and IT operations', 'advanced', 75),
    ('Cloud Computing', 'Technology', 'Delivering computing services over the internet', 'intermediate', 80),
    
    -- Design
    ('UI/UX Design', 'Design', 'Creating user-friendly interfaces and experiences', 'intermediate', 88),
    ('Graphic Design', 'Design', 'Visual communication through typography, imagery, and layout', 'beginner', 85),
    ('Web Design', 'Design', 'Designing websites for optimal user experience', 'intermediate', 82),
    ('Logo Design', 'Design', 'Creating distinctive brand identities', 'intermediate', 75),
    ('Photography', 'Design', 'Capturing and editing compelling images', 'beginner', 90),
    ('Video Editing', 'Design', 'Post-production editing of video content', 'intermediate', 80),
    ('Animation', 'Design', 'Creating moving images and visual effects', 'advanced', 70),
    ('3D Modeling', 'Design', 'Creating three-dimensional digital objects', 'advanced', 65),
    ('Digital Art', 'Design', 'Creating artwork using digital tools', 'intermediate', 78),
    ('Adobe Creative Suite', 'Design', 'Mastering Adobe design software', 'intermediate', 85),
    
    -- Languages
    ('Spanish', 'Languages', 'Learn to speak and write Spanish fluently', 'beginner', 95),
    ('French', 'Languages', 'Master the French language and culture', 'beginner', 85),
    ('German', 'Languages', 'Learn German for business and travel', 'beginner', 75),
    ('Mandarin Chinese', 'Languages', 'Learn the most spoken language in the world', 'intermediate', 80),
    ('Japanese', 'Languages', 'Master Japanese language and culture', 'intermediate', 70),
    ('Korean', 'Languages', 'Learn Korean language and K-culture', 'intermediate', 65),
    ('Italian', 'Languages', 'Learn the beautiful Italian language', 'beginner', 70),
    ('Portuguese', 'Languages', 'Learn Portuguese for global communication', 'beginner', 60),
    ('Arabic', 'Languages', 'Learn Arabic language and culture', 'advanced', 55),
    ('English (ESL)', 'Languages', 'English as a Second Language', 'beginner', 90),
    
    -- Music
    ('Guitar', 'Music', 'Learn to play acoustic and electric guitar', 'beginner', 92),
    ('Piano', 'Music', 'Master the piano from basics to advanced', 'beginner', 88),
    ('Violin', 'Music', 'Learn classical and modern violin techniques', 'intermediate', 65),
    ('Drums', 'Music', 'Master rhythm and percussion', 'beginner', 75),
    ('Singing', 'Music', 'Develop your vocal skills and technique', 'beginner', 85),
    ('Music Production', 'Music', 'Create and produce music digitally', 'intermediate', 78),
    ('Songwriting', 'Music', 'Write compelling lyrics and melodies', 'intermediate', 70),
    ('Music Theory', 'Music', 'Understand the fundamentals of music', 'intermediate', 60),
    ('DJ Skills', 'Music', 'Learn to mix and perform as a DJ', 'intermediate', 68),
    ('Sound Engineering', 'Music', 'Master audio recording and mixing', 'advanced', 55),
    
    -- Business
    ('Digital Marketing', 'Business', 'Market products and services online', 'intermediate', 90),
    ('Social Media Marketing', 'Business', 'Build brand presence on social platforms', 'beginner', 88),
    ('SEO', 'Business', 'Optimize websites for search engines', 'intermediate', 85),
    ('Content Marketing', 'Business', 'Create valuable content to attract customers', 'intermediate', 80),
    ('Sales', 'Business', 'Master the art of selling and negotiation', 'intermediate', 85),
    ('Entrepreneurship', 'Business', 'Start and grow your own business', 'advanced', 82),
    ('Project Management', 'Business', 'Lead projects to successful completion', 'intermediate', 78),
    ('Leadership', 'Business', 'Develop leadership and management skills', 'advanced', 75),
    ('Public Speaking', 'Business', 'Communicate effectively to audiences', 'intermediate', 80),
    ('Financial Planning', 'Business', 'Manage personal and business finances', 'intermediate', 70),
    
    -- Health
    ('Yoga', 'Health', 'Practice yoga for physical and mental wellness', 'beginner', 88),
    ('Meditation', 'Health', 'Learn mindfulness and meditation techniques', 'beginner', 85),
    ('Personal Training', 'Health', 'Fitness coaching and exercise planning', 'intermediate', 80),
    ('Nutrition', 'Health', 'Learn about healthy eating and meal planning', 'beginner', 82),
    ('Mental Health', 'Health', 'Understanding and managing mental wellness', 'intermediate', 75),
    ('Weight Training', 'Health', 'Build strength through resistance training', 'beginner', 78),
    ('Running', 'Health', 'Improve endurance and running technique', 'beginner', 85),
    ('Pilates', 'Health', 'Core strengthening and flexibility', 'beginner', 70),
    ('Wellness Coaching', 'Health', 'Guide others toward healthier lifestyles', 'advanced', 65),
    ('Martial Arts', 'Health', 'Learn self-defense and discipline', 'intermediate', 72),
    
    -- Crafts
    ('Cooking', 'Crafts', 'Master culinary skills and recipes', 'beginner', 95),
    ('Baking', 'Crafts', 'Learn to bake breads, cakes, and pastries', 'beginner', 85),
    ('Woodworking', 'Crafts', 'Create furniture and wooden crafts', 'intermediate', 70),
    ('Knitting', 'Crafts', 'Create clothing and accessories with yarn', 'beginner', 65),
    ('Sewing', 'Crafts', 'Design and create clothing and textiles', 'intermediate', 68),
    ('Pottery', 'Crafts', 'Shape clay into functional and artistic pieces', 'intermediate', 60),
    ('Jewelry Making', 'Crafts', 'Design and create custom jewelry', 'intermediate', 58),
    ('Gardening', 'Crafts', 'Grow plants, vegetables, and maintain gardens', 'beginner', 80),
    ('Home Improvement', 'Crafts', 'DIY repairs and home renovation', 'intermediate', 75),
    ('Calligraphy', 'Crafts', 'Beautiful handwriting and lettering arts', 'intermediate', 55),
    
    -- Academic
    ('Mathematics', 'Academic', 'From basic math to advanced calculus', 'intermediate', 85),
    ('Physics', 'Academic', 'Understanding the laws of nature', 'advanced', 70),
    ('Chemistry', 'Academic', 'Study of matter and chemical reactions', 'advanced', 68),
    ('Biology', 'Academic', 'Study of living organisms', 'intermediate', 75),
    ('History', 'Academic', 'Learn about past events and civilizations', 'beginner', 70),
    ('Literature', 'Academic', 'Analyze and appreciate literary works', 'intermediate', 65),
    ('Writing', 'Academic', 'Improve writing skills for various purposes', 'beginner', 88),
    ('Research Methods', 'Academic', 'Learn to conduct effective research', 'advanced', 60),
    ('Statistics', 'Academic', 'Analyze data and understand probability', 'intermediate', 78),
    ('Philosophy', 'Academic', 'Explore fundamental questions about existence', 'advanced', 55)
) AS skills_data(skill_name, cat_name, skill_desc, skill_diff, skill_pop)
JOIN skill_categories cat ON cat.name = skills_data.cat_name
ON CONFLICT (name) DO NOTHING;