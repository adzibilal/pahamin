'use client';

import { useState, useEffect } from 'react';
import { updateStudyProgress } from '@/lib/database';

interface ProgressTrackerProps {
  userId: string;
  topic: string;
  sessionType: 'explain' | 'quiz' | 'flashcard';
  sessionData: any;
  onProgressUpdate?: () => void;
}

export default function ProgressTracker({ 
  userId, 
  topic, 
  sessionType, 
  sessionData, 
  onProgressUpdate 
}: ProgressTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (sessionData && !isTracking) {
      setStartTime(new Date());
      setIsTracking(true);
    }
  }, [sessionData, isTracking]);

  const saveProgress = async () => {
    if (!startTime) return;

    const endTime = new Date();
    const studyTime = Math.round((endTime.getTime() - startTime.getTime()) / 60000); // minutes

    try {
      await updateStudyProgress(userId, topic, sessionType, {
        ...sessionData,
        studyTime: Math.max(studyTime, 1) // minimum 1 minute
      });
      
      if (onProgressUpdate) {
        onProgressUpdate();
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (isTracking) {
        saveProgress();
      }
    };
  }, [isTracking]);

  return null; // This component doesn't render anything visible
} 