/*
  # Create payments table

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `stripe_payment_id` (text) - Stripe payment reference
      - `amount` (numeric) - payment amount
      - `payment_date` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on payments table
    - Add policy for users to read their own payment records
    - Add policy for service role to create payment records
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  stripe_payment_id text NOT NULL,
  amount numeric NOT NULL,
  payment_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own payment records"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- This function will be used by the edge function to update user role after payment
CREATE OR REPLACE FUNCTION update_user_to_paid(user_id_param UUID) 
RETURNS void AS $$
BEGIN
  UPDATE users
  SET role = 'paid', updated_at = now()
  WHERE id = user_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;