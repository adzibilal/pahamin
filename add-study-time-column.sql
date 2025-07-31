-- Add study_time column to existing user_progress table
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS study_time INTEGER DEFAULT 0;

-- Update existing records to have study_time = 0 if NULL
UPDATE user_progress 
SET study_time = 0 
WHERE study_time IS NULL; 