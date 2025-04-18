-- Add new fields to codes table for NCCI pairs and guideline sources
ALTER TABLE codes 
ADD COLUMN IF NOT EXISTS ncci_pairs TEXT[],
ADD COLUMN IF NOT EXISTS guideline_source TEXT;

-- Update existing codes with NCCI pairs and guideline sources
UPDATE codes
SET 
  ncci_pairs = ARRAY['11200', '11201'],
  guideline_source = 'CMS NCCI'
WHERE code = '17110';

UPDATE codes
SET 
  ncci_pairs = ARRAY['17110', '17111'],
  guideline_source = 'CMS NCCI'
WHERE code = '11200';

UPDATE codes
SET 
  ncci_pairs = NULL,
  guideline_source = 'CMS'
WHERE code = 'G0438';

UPDATE codes
SET 
  ncci_pairs = NULL,
  guideline_source = 'CMS'
WHERE code = 'G0439';

UPDATE codes
SET 
  ncci_pairs = NULL,
  guideline_source = 'CMS'
WHERE code = 'G0444';

UPDATE codes
SET 
  ncci_pairs = NULL,
  guideline_source = 'CMS'
WHERE code = 'G2211';

-- Add additional preventive service codes
INSERT INTO codes (code, description_short, description_long, type, national_wrvu, requires_modifier, guideline_source)
VALUES 
  ('G0296', 'Counseling visit for lung cancer screening', 'Counseling visit to discuss need for lung cancer screening using low dose CT scan', 'G-code', 0.52, FALSE, 'CMS NCD 210.14'),
  
  ('G0402', 'Welcome to Medicare visit', 'Initial preventive physical examination; face-to-face visit, services limited to new beneficiary during the first 12 months of Medicare enrollment', 'G-code', 2.43, FALSE, 'CMS'),
  
  ('G0473', 'Group behavioral counseling for obesity', 'Face-to-face behavioral counseling for obesity, group (2-10), 30 minutes', 'G-code', 0.25, FALSE, 'CMS NCD 210.12'),
  
  ('99484', 'General behavioral health integration', 'Care management services for behavioral health conditions, at least 20 minutes of clinical staff time, directed by a physician or other qualified health care professional', 'CPT', 0.61, FALSE, 'CMS'),
  
  ('99487', 'Complex chronic care management, 60 min', 'Complex chronic care management services, with the following required elements: multiple (two or more) chronic conditions expected to last at least 12 months, or until the death of the patient, chronic conditions place the patient at significant risk of death, acute exacerbation/decompensation, or functional decline, comprehensive care plan established, implemented, revised, or monitored, moderate or high complexity medical decision making; first 60 minutes of clinical staff time directed by a physician or other qualified health care professional, per calendar month', 'CPT', 1.81, FALSE, 'CMS'),
  
  ('99489', 'Complex chronic care management, addl 30 min', 'Complex chronic care management services, with the following required elements: multiple (two or more) chronic conditions expected to last at least 12 months, or until the death of the patient, chronic conditions place the patient at significant risk of death, acute exacerbation/decompensation, or functional decline, comprehensive care plan established, implemented, revised, or monitored, moderate or high complexity medical decision making; each additional 30 minutes of clinical staff time directed by a physician or other qualified health care professional, per calendar month', 'CPT', 0.88, FALSE, 'CMS');
