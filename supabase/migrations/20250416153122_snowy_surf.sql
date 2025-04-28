/*
  # Add INSERT policy for users table

  1. Security
    - Add INSERT policy for users table to allow authenticated users to insert their own records
    - This resolves the 403 error during registration
*/

-- Add INSERT policy for users table
CREATE POLICY "Users can insert own data"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);