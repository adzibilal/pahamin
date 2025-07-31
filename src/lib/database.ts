import { supabase, StudySession, UserProgress } from './supabase';

// Study Sessions
export async function saveStudySession(
  userId: string,
  topic: string,
  type: 'explain' | 'quiz' | 'flashcard',
  content: any
) {
  const { data, error } = await supabase
    .from('study_sessions')
    .insert({
      user_id: userId,
      topic,
      type,
      content,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving study session:', error);
    throw error;
  }

  return data;
}

export async function getStudySessions(userId: string, type?: string) {
  let query = supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching study sessions:', error);
    throw error;
  }

  return data as StudySession[];
}

export async function getStudySessionById(id: string, userId: string) {
  const { data, error } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching study session:', error);
    return null;
  }

  return data as StudySession;
}

// User Progress
export async function saveUserProgress(
  userId: string,
  topic: string,
  quizScore?: number,
  flashcardsCompleted?: number,
  studyTime?: number
) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      topic,
      quiz_score: quizScore,
      flashcards_completed: flashcardsCompleted,
      study_time: studyTime,
      last_studied: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving user progress:', error);
    throw error;
  }

  return data;
}

export async function getUserProgress(userId: string, topic?: string) {
  let query = supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_studied', { ascending: false });

  if (topic) {
    query = query.eq('topic', topic);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }

  return data as UserProgress[];
}

export async function getTopicsByUser(userId: string) {
  const { data, error } = await supabase
    .from('study_sessions')
    .select('topic')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }

  // Remove duplicates
  const uniqueTopics = [...new Set(data.map(item => item.topic))];
  return uniqueTopics;
}

// Progress tracking functions
export async function updateStudyProgress(
  userId: string,
  topic: string,
  sessionType: 'explain' | 'quiz' | 'flashcard',
  sessionData: any
) {
  try {
    // Get current progress
    const currentProgress = await getUserProgress(userId, topic);
    const existingProgress = currentProgress.find(p => p.topic === topic);
    
    let quizScore = existingProgress?.quiz_score || 0;
    let flashcardsCompleted = existingProgress?.flashcards_completed || 0;
    let studyTime = existingProgress?.study_time || 0;
    
    // Update based on session type
    switch (sessionType) {
      case 'quiz':
        if (sessionData.questions) {
          const totalQuestions = sessionData.questions.length;
          const correctAnswers = sessionData.questions.filter((q: any) => 
            q.userAnswer === q.correct_answer
          ).length;
          quizScore = Math.max(quizScore, Math.round((correctAnswers / totalQuestions) * 100));
        }
        break;
      case 'flashcard':
        if (sessionData.flashcards) {
          flashcardsCompleted += sessionData.flashcards.length;
        }
        break;
      case 'explain':
        // Add study time for explanation sessions
        studyTime += sessionData.studyTime || 5; // Default 5 minutes
        break;
    }
    
    // Save updated progress
    return await saveUserProgress(userId, topic, quizScore, flashcardsCompleted, studyTime);
  } catch (error) {
    console.error('Error updating study progress:', error);
    throw error;
  }
}

export async function getProgressStats(userId: string) {
  try {
    const progress = await getUserProgress(userId);
    const sessions = await getStudySessions(userId);
    
    const totalTopics = progress.length;
    const totalStudyTime = progress.reduce((sum, p) => sum + (p.study_time || 0), 0);
    const totalFlashcards = progress.reduce((sum, p) => sum + (p.flashcards_completed || 0), 0);
    const averageQuizScore = progress.length > 0 
      ? progress.reduce((sum, p) => sum + (p.quiz_score || 0), 0) / progress.length 
      : 0;
    
    const weeklySessions = sessions.filter(s => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(s.created_at) > weekAgo;
    }).length;
    
    return {
      totalTopics,
      totalStudyTime,
      totalFlashcards,
      averageQuizScore: Math.round(averageQuizScore),
      weeklySessions,
      totalSessions: sessions.length
    };
  } catch (error) {
    console.error('Error getting progress stats:', error);
    throw error;
  }
}

export async function getTopicProgress(userId: string, topic: string) {
  try {
    const progress = await getUserProgress(userId, topic);
    const sessions = await getStudySessions(userId);
    const topicSessions = sessions.filter(s => s.topic === topic);
    
    const topicProgress = progress.find(p => p.topic === topic);
    const lastSession = topicSessions[0]; // Most recent session
    
    return {
      topic,
      quizScore: topicProgress?.quiz_score || 0,
      flashcardsCompleted: topicProgress?.flashcards_completed || 0,
      studyTime: topicProgress?.study_time || 0,
      lastStudied: topicProgress?.last_studied,
      sessionCount: topicSessions.length,
      lastSession
    };
  } catch (error) {
    console.error('Error getting topic progress:', error);
    throw error;
  }
} 