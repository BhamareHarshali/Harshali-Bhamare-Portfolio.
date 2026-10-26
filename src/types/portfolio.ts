export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  technologies: string[];
  description: string;
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  category: 'Full-Stack' | 'Computer Vision & AI' | 'Python Desktop';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    description: string;
    iconName?: string;
    featured?: boolean;
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  scoreLabel: string;
  score: string;
  details: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  tools: string[];
  points: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  organization: string;
  details: string;
  verified: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}
