-- Complete Database Migration Script
-- Run this in Supabase SQL Editor

-- 1. Add study_time column to user_progress table
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS study_time INTEGER DEFAULT 0;

-- 2. Update existing records to have study_time = 0 if NULL
UPDATE user_progress 
SET study_time = 0 
WHERE study_time IS NULL;

-- 3. Ensure all required columns exist with proper defaults
ALTER TABLE user_progress 
ALTER COLUMN quiz_score SET DEFAULT 0,
ALTER COLUMN flashcards_completed SET DEFAULT 0,
ALTER COLUMN study_time SET DEFAULT 0;

-- 4. Update any NULL values to 0
UPDATE user_progress 
SET 
  quiz_score = COALESCE(quiz_score, 0),
  flashcards_completed = COALESCE(flashcards_completed, 0),
  study_time = COALESCE(study_time, 0)
WHERE 
  quiz_score IS NULL 
  OR flashcards_completed IS NULL 
  OR study_time IS NULL;

-- 5. Verify the table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'user_progress'
ORDER BY ordinal_position; 