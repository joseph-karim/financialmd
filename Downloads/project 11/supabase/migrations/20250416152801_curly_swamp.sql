/*
  # Fix for duplicate migration version
  
  1. Tables
    - Check and create modules and progress tables if they don't exist
  2. Security
    - Enable RLS policies for data protection
    - Set up appropriate access policies for different user types
*/

-- Safely create modules table and policies if they don't exist
DO $$ 
BEGIN
  -- Check if modules table exists
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

  -- Check if progress table exists
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'progress') THEN
    CREATE TABLE progress (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL REFERENCES users(id),
      module_id uuid NOT NULL REFERENCES modules(id),
      completed boolean NOT NULL DEFAULT false,
      updated_at timestamptz DEFAULT now(),
      created_at timestamptz DEFAULT now(),
      UNIQUE(user_id, module_id)
    );

    ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can read own progress"
      ON progress
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can insert own progress"
      ON progress
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can update own progress records"
      ON progress
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;