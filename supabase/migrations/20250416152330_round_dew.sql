/*
  # Create quiz questions and results tables

  1. New Tables
    - `quiz_questions`
      - `id` (uuid, primary key)
      - `module_id` (uuid, foreign key to modules)
      - `question` (text)
      - `options` (text array)
      - `correct_answer` (text)
      - `created_at` (timestamp)

    - `quiz_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `module_id` (uuid, foreign key to modules)
      - `score` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add appropriate policies for access control
*/

-- First create the modules table if it doesn't exist yet
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'modules') THEN
    CREATE TABLE modules (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      content text NOT NULL,
      order_index integer NOT NULL,
      is_preview boolean NOT NULL DEFAULT false,
      created_at timestamptz DEFAULT now()
    );

    ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Anyone can read preview modules"
      ON modules
      FOR SELECT
      TO anon, authenticated
      USING (is_preview = true);

    CREATE POLICY "Paid users can read all modules"
      ON modules
      FOR SELECT
      TO authenticated
      USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'paid'
      );
  END IF;
END
$$;

-- Now create the quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES modules(id),
  question text NOT NULL,
  options text[] NOT NULL,
  correct_answer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Preview quiz questions are readable by anyone"
  ON quiz_questions
  FOR SELECT
  TO anon, authenticated
  USING (
    (SELECT is_preview FROM modules WHERE id = module_id) = true
  );

CREATE POLICY "Paid users can read all quiz questions"
  ON quiz_questions
  FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'paid'
  );

-- Create the quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  module_id uuid NOT NULL REFERENCES modules(id),
  score numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own quiz results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);