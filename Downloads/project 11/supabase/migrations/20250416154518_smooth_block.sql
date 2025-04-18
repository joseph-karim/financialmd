/*
  # Update test user to paid role

  1. Changes
    - Updates the role of user with email 'joekarim87@gmail.com' to 'paid'
  2. Security
    - No additional security changes
*/

-- Update the specific user to have a paid role
UPDATE users 
SET role = 'paid', updated_at = now() 
WHERE email = 'joekarim87@gmail.com';