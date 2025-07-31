'use client';

import { useState, useEffect, useCallback } from 'react';
import { updateStudyProgress } from '@/lib/database';

interface ExplainProgressProps {
  userId: string;
  topic: string;
  explanation: string;
}

export default function ExplainProgress({ userId, topic, explanation }: ExplainProgressProps) {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (explanation && !isTracking) {
      setStartTime(new Date());
      setIsTracking(true);
    }
  }, [explanation, isTracking]);

  const saveProgress = useCallback(async () => {
    if (!startTime) return;

    const endTime = new Date();
    const studyTime = Math.round((endTime.getTime() - startTime.getTime()) / 60000); // minutes

    try {
      await updateStudyProgress(userId, topic, 'explain', {
        explanation,
        studyTime: Math.max(studyTime, 1) // minimum 1 minute
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [startTime, userId, topic, explanation]);

  useEffect(() => {
    return () => {
      if (isTracking) {
        saveProgress();
      }
    };
  }, [isTracking, saveProgress]);

  return null; // This component doesn't render anything visible
} 