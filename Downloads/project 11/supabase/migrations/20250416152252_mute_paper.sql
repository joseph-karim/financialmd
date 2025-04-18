/*
  # Create modules and progress tables

  1. New Tables
    - `modules`
      - `id` (uuid, primary key)
      - `title` (text) - module title
      - `content` (text) - module content in markdown
      - `order_index` (integer) - for ordering modules
      - `is_preview` (boolean) - whether module is available in preview
      - `created_at` (timestamp)

    - `progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `module_id` (uuid, foreign key to modules)
      - `completed` (boolean)
      - `updated_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add appropriate policies for access control
*/

CREATE TABLE IF NOT EXISTS modules (
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

CREATE TABLE IF NOT EXISTS progress (
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