/*
  # Check and create quiz-related tables and policies
  
  1. Tables
    - Verify quiz_questions and quiz_results policies
    - Only create policies if they don't already exist
  2. Security
    - Use conditional checks to avoid policy conflicts
*/

-- Check if quiz tables and policies already exist and create them only if needed
DO $$ 
BEGIN
  -- Check if quiz_questions table exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quiz_questions') THEN
    -- Check if the policies already exist before creating them
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
  END IF;
  
  -- Check if quiz_results table exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quiz_results') THEN
    -- Check if the policies already exist before creating them
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
  END IF;
END $$;