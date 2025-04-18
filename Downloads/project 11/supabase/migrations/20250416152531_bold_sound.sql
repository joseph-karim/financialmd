/*
  # Create test user with full access

  1. Creates
    - Add a test user with 'paid' role 
    - Add a dummy payment record for the test user
*/

-- Create a test user with 'paid' role for full access
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
    INSERT INTO users (id, email, role, created_at, updated_at)
    VALUES 
      ('00000000-0000-0000-0000-000000000000', 'test@example.com', 'paid', now(), now())
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;

-- Insert a dummy payment record for the test user
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'payments') THEN
    INSERT INTO payments (user_id, stripe_payment_id, amount, payment_date, created_at)
    VALUES 
      ('00000000-0000-0000-0000-000000000000', 'test_payment_123', 199.00, now(), now())
    ON CONFLICT DO NOTHING;
  END IF;
END $$;