-- Create checklists table for storing interactive checklists
CREATE TABLE IF NOT EXISTS checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  checklist_type TEXT NOT NULL, -- e.g., "AWV", "MDM", "Pre-visit Planning"
  source TEXT, -- e.g., "aafp.org", "cms.gov"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create checklist_items table for storing individual checklist items
CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id UUID NOT NULL REFERENCES checklists(id) ON DELETE CASCADE,
  item_text TEXT NOT NULL,
  required BOOLEAN DEFAULT FALSE,
  order_index INTEGER NOT NULL,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read checklists and items
CREATE POLICY "Anyone can read checklists"
  ON checklists
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read checklist items"
  ON checklist_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert initial checklists based on research
INSERT INTO checklists (id, title, description, checklist_type, source)
VALUES 
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Medicare Annual Wellness Visit (AWV) Components', 'Required elements for Medicare Annual Wellness Visit (G0438/G0439)', 'AWV', 'cgsmedicare.com'),
  
  ('2e0cfc8f-60c3-4b7c-b1a2-9f63c4c3454a', 'Modifier 25 Decision Support', 'Checklist to determine if Modifier 25 is appropriate', 'Modifier', 'aafp.org'),
  
  ('3a1dfc8f-70c3-4b7c-b1a2-9f63c4c3454b', 'Pre-Visit Planning Checklist', 'Tasks to complete before patient visits to optimize workflow and billing', 'Workflow', 'aafp.org'),
  
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Medical Decision Making (MDM) Level Estimator', 'Checklist to help determine appropriate E/M level based on MDM', 'E/M Coding', 'idsociety.org');

-- Insert AWV checklist items
INSERT INTO checklist_items (checklist_id, item_text, required, order_index, explanation)
VALUES
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Health Risk Assessment (HRA) completed', TRUE, 1, 'Must include demographic data, self-assessed health, psychosocial risks, behavioral risks, and functional status (ADLs/IADLs)'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Medical/family history updated', TRUE, 2, 'Review and update the patient''s medical and family history'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'List of current providers and suppliers updated', TRUE, 3, 'Document all healthcare providers and suppliers involved in patient''s care'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Medications list reviewed', TRUE, 4, 'Review and reconcile all current medications'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Vitals measured (height, weight, BMI, blood pressure)', TRUE, 5, 'Document all measurements'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Cognitive impairment detection performed', TRUE, 6, 'Use direct observation or a standardized tool (e.g., Mini-Cog)'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Depression screening performed', TRUE, 7, 'Use a standardized tool (e.g., PHQ-2/PHQ-9)'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Functional ability and safety assessment', TRUE, 8, 'Assess ADLs, fall risk, home safety, hearing impairment'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Personalized prevention plan created', TRUE, 9, 'Document 5-10 year screening schedule for preventive services'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Risk factors and conditions identified with interventions', TRUE, 10, 'Document any treatment options and referrals needed'),
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Personalized health advice provided', TRUE, 11, 'Document counseling or referrals for health promotion (e.g., weight loss, physical activity)');

-- Insert Modifier 25 checklist items
INSERT INTO checklist_items (checklist_id, item_text, required, order_index, explanation)
VALUES
  ('2e0cfc8f-60c3-4b7c-b1a2-9f63c4c3454a', 'Did I perform and document key components of a problem-focused E/M independent of the procedure?', TRUE, 1, 'The E/M service must be above and beyond the usual pre- and post-operative care associated with the procedure'),
  ('2e0cfc8f-60c3-4b7c-b1a2-9f63c4c3454a', 'Could the documented E/M stand alone as a billable visit if the procedure was not performed?', TRUE, 2, 'The E/M documentation should be substantial enough to support billing even without the procedure'),
  ('2e0cfc8f-60c3-4b7c-b1a2-9f63c4c3454a', 'Is there medical necessity for evaluating a condition separate from the procedure?', TRUE, 3, 'There must be a clinical reason to perform the separate E/M service'),
  ('2e0cfc8f-60c3-4b7c-b1a2-9f63c4c3454a', 'Is the documentation clearly separated between the E/M and the procedure?', FALSE, 4, 'Best practice is to physically separate the documentation for the E/M from the procedure note'),
  ('2e0cfc8f-60c3-4b7c-b1a2-9f63c4c3454a', 'Is this a scheduled procedure visit with no significant separate evaluation?', FALSE, 5, 'If yes, do NOT use Modifier 25 - the E/M is included in the procedure');

-- Insert Pre-Visit Planning checklist items
INSERT INTO checklist_items (checklist_id, item_text, required, order_index, explanation)
VALUES
  ('3a1dfc8f-70c3-4b7c-b1a2-9f63c4c3454b', 'Review chart for care gaps (preventive services due)', FALSE, 1, 'Check for due/overdue screenings, immunizations, and other preventive services'),
  ('3a1dfc8f-70c3-4b7c-b1a2-9f63c4c3454b', 'Check if patient is eligible for AWV (G0438/G0439)', FALSE, 2, 'Medicare patients are eligible for AWV if they haven''t had one in the past 12 months'),
  ('3a1dfc8f-70c3-4b7c-b1a2-9f63c4c3454b', 'Review chronic conditions not coded in current year', FALSE, 3, 'Identify HCC diagnoses that need to be recaptured this year'),
  ('3a1dfc8f-70c3-4b7c-b1a2-9f63c4c3454b', 'Prepare necessary forms (HRA, PHQ-9, etc.)', FALSE, 4, 'Have age/visit-appropriate forms ready for patient completion'),
  ('3a1dfc8f-70c3-4b7c-b1a2-9f63c4c3454b', 'Check if patient was recently discharged (TCM opportunity)', FALSE, 5, 'Patients discharged within past 30 days may be eligible for TCM services'),
  ('3a1dfc8f-70c3-4b7c-b1a2-9f63c4c3454b', 'Pre-order routine labs if appropriate', FALSE, 6, 'With standing orders and patient agreement, labs can be ordered before visit'),
  ('3a1dfc8f-70c3-4b7c-b1a2-9f63c4c3454b', 'Identify opportunities for additional services (depression screening, alcohol screening)', FALSE, 7, 'Check if patient is eligible for additional preventive services');

-- Insert MDM Level Estimator checklist items
INSERT INTO checklist_items (checklist_id, item_text, required, order_index, explanation)
VALUES
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Multiple stable chronic illnesses', FALSE, 1, 'Supports moderate complexity (99204/99214)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Chronic illness with exacerbation', FALSE, 2, 'Supports moderate complexity (99204/99214)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Acute illness with systemic symptoms', FALSE, 3, 'Supports moderate complexity (99204/99214)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'New problem with uncertain prognosis', FALSE, 4, 'Supports moderate complexity (99204/99214)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Prescription drug management', FALSE, 5, 'Supports moderate risk (99204/99214)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Review of external records or test results', FALSE, 6, 'Supports moderate data complexity (99204/99214)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Independent historian needed', FALSE, 7, 'Supports moderate data complexity (99204/99214)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Chronic illness with severe exacerbation', FALSE, 8, 'Supports high complexity (99205/99215)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Acute/chronic illness posing threat to life/function', FALSE, 9, 'Supports high complexity (99205/99215)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Decision regarding hospitalization', FALSE, 10, 'Supports high risk (99205/99215)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Decision regarding elective major surgery', FALSE, 11, 'Supports high risk (99205/99215)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Drug therapy requiring intensive monitoring for toxicity', FALSE, 12, 'Supports high risk (99205/99215)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Discussion of test results with external physician', FALSE, 13, 'Supports high data complexity (99205/99215)'),
  ('4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c', 'Decision to de-escalate care based on new information', FALSE, 14, 'Supports high complexity (99205/99215)');
