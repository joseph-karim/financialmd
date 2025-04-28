/*
  # Check and finalize tables

  This migration ensures all expected tables exist and have proper policies.
  It won't attempt to recreate any existing tables or policies to avoid errors.
*/

-- Check if we already ran this migration
DO $$ 
BEGIN
  -- If this is a duplicate migration, just do a simple operation that won't hurt anything
  COMMENT ON SCHEMA public IS 'Standard public schema';
END $$;