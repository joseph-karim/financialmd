/*
  # Create quiz tables

  1. New Tables
    - `quiz_questions`: Stores questions for module quizzes
    - `quiz_results`: Tracks user quiz scores

  2. Security
    - Enable RLS on both tables
    - Create appropriate access policies
*/

-- Check if tables and policies already exist
DO $$ 
BEGIN
  -- Create quiz_questions table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quiz_questions') THEN
    CREATE TABLE quiz_questions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      module_id uuid NOT NULL REFERENCES modules(id),
      question text NOT NULL,
      options text[] NOT NULL,
      correct_answer text NOT NULL,
      created_at timestamptz DEFAULT now()
    );

    ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
  END IF;

  -- Create quiz_results table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quiz_results') THEN
    CREATE TABLE quiz_results (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL REFERENCES users(id),
      module_id uuid NOT NULL REFERENCES modules(id),
      score numeric NOT NULL,
      created_at timestamptz DEFAULT now()
    );

    ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
  END IF;

  -- Create policies only if they don't already exist
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'quiz_questions' 
    AND policyname = 'Preview quiz questions are readable by anyone'
  ) THEN
    CREATE POLICY "Preview quiz questions are readable by anyone"
      ON quiz_questions
      FOR SELECT
      TO anon, authenticated
      USING (
        (SELECT is_preview FROM modules WHERE id = module_id) = true
      );
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'quiz_questions' 
    AND policyname = 'Paid users can read all quiz questions'
  ) THEN
    CREATE POLICY "Paid users can read all quiz questions"
      ON quiz_questions
      FOR SELECT
      TO authenticated
      USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'paid'
      );
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'quiz_results' 
    AND policyname = 'Users can read own quiz results'
  ) THEN
    CREATE POLICY "Users can read own quiz results"
      ON quiz_results
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'quiz_results' 
    AND policyname = 'Users can insert own quiz results'
  ) THEN
    CREATE POLICY "Users can insert own quiz results"
      ON quiz_results
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;