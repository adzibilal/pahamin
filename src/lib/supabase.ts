import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface StudySession {
  id: string;
  user_id: string;
  topic: string;
  type: 'explain' | 'quiz' | 'flashcard';
  content: any;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  topic: string;
  quiz_score?: number;
  flashcards_completed?: number;
  study_time?: number;
  last_studied: string;
  created_at: string;
  updated_at: string;
} 