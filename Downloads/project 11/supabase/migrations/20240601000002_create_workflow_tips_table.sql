-- Create workflow_tips table for storing workflow efficiency tips
CREATE TABLE IF NOT EXISTS workflow_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_slug TEXT NOT NULL,
  step_name TEXT NOT NULL,
  description TEXT NOT NULL,
  role TEXT NOT NULL, -- 'PCP', 'MA', 'Staff', etc.
  source TEXT, -- e.g., 'aafp.org', 'cms.gov'
  implementation_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by module
CREATE INDEX IF NOT EXISTS idx_workflow_tips_module ON workflow_tips(module_slug);

-- Enable RLS
ALTER TABLE workflow_tips ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read workflow tips
CREATE POLICY "Anyone can read workflow tips"
  ON workflow_tips
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert initial workflow tips based on research
INSERT INTO workflow_tips (module_slug, step_name, description, role, source, implementation_notes)
VALUES 
  ('practice-efficiency', 'Pre-Visit Planning', 'Review charts 1 day prior for care gaps (due preventive services, chronic needs).', 'Staff', 'aafp.org', 'Implement as part of daily workflow, assign specific staff member for this task.'),
  
  ('practice-efficiency', 'Pre-Visit Planning', 'Prepare necessary forms (HRA, PHQ-9) for patient check-in.', 'Staff', 'aafp.org', 'Create checklist of required forms by visit type.'),
  
  ('practice-efficiency', 'Pre-Visit Planning', 'Pre-order routine labs (with patient agreement) for chronic follow-ups.', 'PCP', 'aafp.org', 'Requires standing orders protocol and patient notification system.'),
  
  ('practice-efficiency', 'Team Huddle', 'Conduct daily morning team "huddles" to flag opportunities (AWV, screenings).', 'Team', 'aafp.org', '5-10 minute standing meeting to review day''s schedule and identify billing opportunities.'),
  
  ('practice-efficiency', 'Team Documentation', 'Train MAs for structured rooming: reconcile meds, update history, perform screenings (fall risk, depression).', 'MA', 'aafp.org', 'Create standardized rooming protocol with checklist.'),
  
  ('practice-efficiency', 'Team Documentation', 'Implement "Team Documentation": MA begins history, Physician listens/documents in EHR simultaneously.', 'Team', 'aafp.org', 'Requires training and coordination between provider and MA.'),
  
  ('practice-efficiency', 'Team Documentation', 'Use rooming checklists for preventive care (e.g., verify Medicare screenings like G0444/G0442).', 'MA', 'aafp.org', 'Create age/insurance-specific checklists.'),
  
  ('practice-efficiency', 'Documentation', 'Document MDM at point-of-care or immediately after; avoid batching at end of day.', 'PCP', 'aafp.org', 'Schedule buffer time between patients for documentation completion.'),
  
  ('awv-optimization', 'Required Components', 'Health Risk Assessment (HRA) must include demographic data, self-assessed health, psychosocial risks, behavioral risks, and functional status.', 'MA', 'cgsmedicare.com', 'Use standardized HRA form that covers all required elements.'),
  
  ('awv-optimization', 'Required Components', 'Cognitive assessment must be performed and documented using a standardized tool or direct observation.', 'PCP', 'cgsmedicare.com', 'Mini-Cog or similar brief cognitive screening tool.'),
  
  ('awv-optimization', 'Required Components', 'Personalized Prevention Plan must be documented and provided to patient.', 'PCP', 'cgsmedicare.com', 'Create template with 5-10 year screening schedule.'),
  
  ('awv-optimization', 'Billing', 'When combining AWV with problem-focused E/M, append Modifier 25 to the E/M code, not to the AWV code.', 'Billing', 'aapc.com', 'Document problem-focused portion separately from preventive components.'),
  
  ('awv-optimization', 'Delegation', 'AWVs can be furnished by clinical staff under direct supervision of physician.', 'Team', 'cgsmedicare.com', 'Create workflow where MA/nurse performs most components, physician reviews and completes.'),
  
  ('modifier-usage', 'Modifier 25', 'Document the medical necessity of the E/M service in addition to the procedure.', 'PCP', 'aafp.org', 'Physically separate the note sections for the procedure vs. E/M to clearly show additional work.'),
  
  ('modifier-usage', 'Modifier 25', 'A different diagnosis is not required - it''s about the extra work, not just a different diagnosis.', 'PCP', 'aafp.org', 'Focus documentation on showing the separate E/M work performed.'),
  
  ('modifier-usage', 'Modifier 25', 'Do not bill a separate E/M if the visit was mainly for a procedure (e.g., a scheduled lesion removal with no other issues addressed).', 'PCP', 'aafp.org', 'Only use when significant separate service was truly provided.'),
  
  ('em-coding', 'MDM Documentation', 'For moderate MDM (99214), document multiple stable chronic illnesses or one chronic illness with exacerbation.', 'PCP', 'idsociety.org', 'Use phrases like "uncontrolled," "worsening," "exacerbation" when appropriate.'),
  
  ('em-coding', 'MDM Documentation', 'For high MDM (99215), document conditions posing threat to life or bodily function or severe exacerbation of chronic illness.', 'PCP', 'idsociety.org', 'Use phrases like "life-threatening if untreated," "severe exacerbation," "acute organ dysfunction."'),
  
  ('em-coding', 'Time-Based Coding', 'Document total time spent on date of encounter, including non-face-to-face time.', 'PCP', 'aafp.org', 'Use statement like "Total time spent on date of service: X minutes (included reviewing records, seeing patient, and documentation)."'),
  
  ('hcc-coding', 'Annual Documentation', 'Document and code ALL chronic active conditions at least once per year - risk scores reset annually.', 'PCP', 'aafp.org', 'Use AWV as opportunity to review and document all chronic conditions.'),
  
  ('hcc-coding', 'Specificity', 'Use highest specificity ICD-10 codes and avoid "unspecified" codes when possible.', 'PCP', 'aafp.org', 'For example, code E11.4x (diabetes with complications) instead of E11.9 (diabetes without complication).'),
  
  ('hcc-coding', 'MEAT Documentation', 'Use M.E.A.T. criteria (Monitor, Evaluate, Assess, Treat) for each chronic condition to ensure valid coding.', 'PCP', 'aapc.com', 'Document status updates even for stable conditions (e.g., "HTN - well controlled on current regimen").');
