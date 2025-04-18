-- Create documentation_examples table for storing clinical documentation examples
CREATE TABLE IF NOT EXISTS documentation_examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario TEXT NOT NULL, -- e.g., "Moderate MDM", "Mod 25 Justification"
  example_text TEXT NOT NULL,
  explanation TEXT NOT NULL,
  source TEXT, -- e.g., "aafp.org", "idsociety.org"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by scenario
CREATE INDEX IF NOT EXISTS idx_documentation_examples_scenario ON documentation_examples(scenario);

-- Enable RLS
ALTER TABLE documentation_examples ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read documentation examples
CREATE POLICY "Anyone can read documentation examples"
  ON documentation_examples
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert initial documentation examples based on research
INSERT INTO documentation_examples (scenario, example_text, explanation, source)
VALUES 
  ('Moderate MDM (99214)', 
   'Type 2 diabetes with worsening neuropathy – uncontrolled despite medication, plan to add gabapentin and follow-up in 1 month.', 
   'This example demonstrates moderate complexity by showing: 1) A chronic illness with exacerbation (worsening neuropathy), and 2) Prescription drug management (adding gabapentin). These elements support moderate risk and moderate problem complexity for 99214 billing.', 
   'idsociety.org'),
  
  ('Moderate MDM (99214)', 
   'Reviewed cardiology consult note from 3/2025 and recent labs; uncontrolled hypertension with CKD stage 3 – discussed risks of stroke, will increase lisinopril dose.', 
   'This example shows moderate complexity through: 1) Multiple chronic conditions (HTN, CKD3), 2) Review of external data (cardiology note, labs), and 3) Prescription management (increasing medication). The documentation clearly shows data review and moderate risk management.', 
   'idsociety.org'),
  
  ('Moderate MDM (99214)', 
   'Patient''s asthma is poorly controlled (using rescue inhaler 3x/week); I reviewed her peak flow diary and will add inhaled corticosteroid. Discussed adherence and side effects.', 
   'This single statement hits multiple moderate criteria: 1) Unstable chronic illness (poorly controlled asthma), 2) Data review (peak flow diary), and 3) Prescription management (adding controller medication). The documentation clearly justifies moderate complexity.', 
   'idsociety.org'),
  
  ('High MDM (99215)', 
   'Patient appears acutely ill with hypotension (88/50) and tachycardia (HR 112). Suspect severe cellulitis vs necrotizing infection. Contacted ER and arranged direct admission for IV antibiotics and surgical evaluation. Started IV fluids in office.', 
   'This scenario justifies high complexity through: 1) A high-risk condition (potential necrotizing infection with hemodynamic compromise), 2) Extensive data/coordination (contacting ER), and 3) Decision for hospitalization. The documentation clearly shows the severity and high-stakes decision-making required for 99215.', 
   'idsociety.org'),
  
  ('High MDM (99215)', 
   '45-year-old with chest pain: EKG shows ST depression in V3-V5. Gave aspirin 325mg, called 911 for possible acute coronary syndrome. Discussed risk of MI and need for immediate cardiac evaluation.', 
   'This example demonstrates high complexity through: 1) Potential life-threatening condition (possible ACS), 2) Diagnostic testing (EKG with concerning findings), and 3) Emergency intervention. The documentation clearly shows the high risk and urgent nature of the situation.', 
   'idsociety.org'),
  
  ('Modifier 25 Justification', 
   'CC: Hypertension follow-up and wart on right hand\n\nSubjective: Patient presents for scheduled HTN follow-up. BP has been running 150-160/90s at home. Current medications include lisinopril 10mg daily. Also notes a wart on right hand that has been present for 3 months and is bothersome.\n\nObjective: BP 158/92, HR 76. Cardiovascular exam: Regular rate and rhythm, no murmurs. Skin: 0.5cm verrucous papule on right palm consistent with wart.\n\nAssessment/Plan:\n1. Hypertension, uncontrolled - Increase lisinopril to 20mg daily. Review home BP log at follow-up in 4 weeks.\n2. Wart, right hand - Performed cryotherapy with liquid nitrogen today. Discussed possible need for repeat treatment.', 
   'This documentation clearly separates the E/M service (hypertension management) from the procedure (wart removal). It shows a significant, separately identifiable evaluation was performed beyond what would be needed for the procedure alone. The hypertension required its own history, exam, and medical decision making with medication adjustment, justifying the use of Modifier 25 on the E/M code.', 
   'aafp.org'),
  
  ('Modifier 25 Justification', 
   'CC: Annual Wellness Visit and knee pain\n\nAWV Components: Completed Health Risk Assessment. Updated medical, family, social history. Reviewed medications and specialists. Performed depression screening (PHQ-9 score 2), cognitive assessment (normal), and fall risk assessment (low risk). Created personalized prevention plan including colonoscopy due in 2026, pneumococcal vaccine today, and annual influenza vaccine.\n\nAdditional Complaint: Patient reports right knee pain x 2 weeks, no injury.\n\nSubjective: Gradual onset right knee pain, worse with stairs and walking. No swelling or locking. Pain rated 6/10.\n\nObjective: Right knee with no effusion, full ROM with pain at extreme flexion. Mild medial joint line tenderness. No instability. McMurray test negative.\n\nAssessment/Plan:\n1. Annual Wellness Visit - Completed all components as documented above.\n2. Right knee pain - Likely osteoarthritis. Recommend OTC NSAIDs, knee sleeve, and home exercises (handout provided). If not improved in 3 weeks, will order x-ray and consider referral to PT.', 
   'This documentation clearly separates the preventive service (AWV) from the problem-oriented service (knee pain evaluation). The knee pain required its own history, exam, and medical decision making beyond the routine AWV components. This justifies billing both G0439 (AWV) and 99213-25 (E/M with Modifier 25).', 
   'aafp.org'),
  
  ('Time-Based Coding', 
   'Total time spent on date of service: 45 minutes. This included 10 minutes reviewing prior records and recent labs, 25 minutes face-to-face with patient discussing multiple chronic conditions and medication adjustments, and 10 minutes for documentation and coordination of care.', 
   'This time statement clearly documents the total physician time spent on the encounter date, including both face-to-face and non-face-to-face activities. The 45 minutes supports a 99215 based on time (40-54 minutes). The statement breaks down the activities to show medical necessity for the time spent.', 
   'aafp.org'),
  
  ('HCC Documentation', 
   'Chronic Conditions Addressed Today:\n1. Type 2 Diabetes - A1c 7.8% (improved from 8.3%). Continued metformin 1000mg BID, discussed diet and exercise. Will recheck A1c in 3 months.\n2. CKD Stage 3 - Creatinine stable at 1.5 mg/dL. Continuing ACE inhibitor, avoiding NSAIDs. Will monitor BMP at next visit.\n3. COPD - No exacerbations since last visit. Using maintenance inhaler regularly. Lung exam with minimal wheezes. Continuing current regimen.', 
   'This documentation follows the M.E.A.T. criteria (Monitor, Evaluate, Assess, Treat) for each chronic condition. It clearly shows that each condition was actively addressed, supporting the coding of all three HCC diagnoses. The specificity (CKD Stage 3 rather than unspecified CKD) ensures proper risk adjustment.', 
   'aafp.org'),
  
  ('Advance Care Planning (99497)', 
   'Advance Care Planning Discussion: Spent 25 minutes discussing advance directives with patient and daughter. Explained healthcare proxy designation and living will options. Patient expressed desire to avoid prolonged life support if prognosis poor. Completed healthcare proxy form designating daughter as agent. Provided POLST form to review before next visit. Total ACP discussion time: 25 minutes.', 
   'This documentation supports billing 99497 (ACP, first 30 min) by clearly stating: 1) The voluntary nature of the discussion, 2) Who was present, 3) What was discussed, 4) Outcomes/decisions, and 5) The total time spent (which meets the minimum 16-minute threshold). The specificity helps justify the medical necessity of the service.', 
   'aafp.org');
