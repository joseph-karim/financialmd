/*
  # Update user role to paid

  1. Changes
    - Updates the user with email 'joekarim87@gmail.com' to have the 'paid' role
    - This gives them full access to all content in the masterclass
*/

-- Update the specific user to have a paid role
UPDATE users 
SET role = 'paid', updated_at = now() 
WHERE email = 'joekarim87@gmail.com';