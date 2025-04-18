-- Create smart_phrases table for storing reusable documentation snippets
CREATE TABLE IF NOT EXISTS smart_phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase_name TEXT NOT NULL,
  content TEXT NOT NULL,
  scenario TEXT NOT NULL, -- e.g., "AWV", "Modifier 25", "Diabetes Follow-up"
  related_codes TEXT[], -- e.g., ["G0438", "G0439"] for AWV phrases
  source_recommendation TEXT, -- e.g., "AAFP FPM", "CMS"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by scenario
CREATE INDEX IF NOT EXISTS idx_smart_phrases_scenario ON smart_phrases(scenario);

-- Enable RLS
ALTER TABLE smart_phrases ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read smart phrases
CREATE POLICY "Anyone can read smart phrases"
  ON smart_phrases
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert initial smart phrases based on research
INSERT INTO smart_phrases (phrase_name, content, scenario, related_codes, source_recommendation)
VALUES 
  ('mod25justification', 
   'A significant, separately identifiable E/M service was provided in addition to the procedure performed today. The E/M service required separate history, examination, and medical decision making beyond what would be typically required for the procedure alone.', 
   'Modifier 25', 
   ARRAY['99212', '99213', '99214', '99215'], 
   'AAFP'),
  
  ('timestatement', 
   'Total time spent on date of service: ___ minutes. This included reviewing records, direct patient care, and documentation/coordination of care.', 
   'Time-Based Coding', 
   ARRAY['99202', '99203', '99204', '99205', '99212', '99213', '99214', '99215'], 
   'AAFP'),
  
  ('awvcomponents', 
   'Annual Wellness Visit completed today. Components included:\n- Health Risk Assessment reviewed and updated\n- Medical/family/social history updated\n- Medication reconciliation performed\n- List of current providers and suppliers updated\n- Vitals: Height, weight, BMI, BP\n- Cognitive assessment performed using [tool name]\n- Depression screening performed using PHQ-9, score: ___\n- Functional ability and safety assessment completed\n- Personalized prevention plan created and reviewed with patient\n- Preventive service recommendations provided', 
   'AWV', 
   ARRAY['G0438', 'G0439'], 
   'CMS/CGS Medicare'),
  
  ('acpdocumentation', 
   'Advance Care Planning discussion held with patient [and family member/representative if applicable]. Explained advance directive options including healthcare proxy and living will. Discussed patient''s values and preferences regarding future medical care. Patient''s questions addressed. Total ACP discussion time: ___ minutes.', 
   'Advance Care Planning', 
   ARRAY['99497', '99498'], 
   'AAFP'),
  
  ('hccrecap', 
   'Chronic Conditions Addressed Today:\n1. [Condition 1] - [Status/findings]. [Plan].\n2. [Condition 2] - [Status/findings]. [Plan].\n3. [Condition 3] - [Status/findings]. [Plan].', 
   'HCC Documentation', 
   ARRAY[], 
   'AAFP'),
  
  ('moderatemdm', 
   'Assessment demonstrates moderate complexity medical decision making based on:\n- [Multiple established conditions/Chronic condition with exacerbation]\n- [Data reviewed: labs, imaging, records, etc.]\n- [Moderate risk management: prescription management, etc.]', 
   'E/M Documentation', 
   ARRAY['99204', '99214'], 
   'AAFP/IDSA'),
  
  ('highmdm', 
   'Assessment demonstrates high complexity medical decision making based on:\n- [Severe illness/Threat to bodily function/Multiple severe conditions]\n- [Extensive data reviewed/discussed with other providers]\n- [High risk management: hospitalization decision, severe illness, etc.]', 
   'E/M Documentation', 
   ARRAY['99205', '99215'], 
   'AAFP/IDSA'),
  
  ('diabetesfollow', 
   'Diabetes Type 2:\n- Current A1c: ___% (prior: ___%, [date])\n- Home glucose readings: ___\n- Medication compliance: ___\n- Hypoglycemic episodes: ___\n- Diet/exercise: ___\n- Exam: Foot exam performed, [findings]. Eye exam last done [date].\n- Assessment: [controlled/uncontrolled/improving/worsening]\n- Plan: [Continue/adjust medications]. Referrals: ___. Labs: ___. Follow-up: ___.', 
   'Chronic Disease Management', 
   ARRAY['E11.9', 'E11.40', 'E11.42', 'E11.65'], 
   'AAFP'),
  
  ('tcmdocumentation', 
   'Transitional Care Management service provided following discharge on [date]. Initial contact made on [date] (within 2 business days of discharge). Medication reconciliation performed. Discharge summary reviewed. Post-discharge status and needs assessed. [Moderate/High] complexity medical decision making required due to [reason]. Follow-up care arranged.', 
   'TCM', 
   ARRAY['99495', '99496'], 
   'AAFP'),
  
  ('alcoholcounseling', 
   '15-minute brief alcohol misuse counseling provided. Used 5A approach:\n- Assessed current drinking patterns and AUDIT-C score: ___\n- Advised about safe drinking limits and health risks\n- Agreed on drinking reduction goal: ___\n- Assisted with identifying triggers and strategies\n- Arranged follow-up in ___ weeks', 
   'Alcohol Screening/Counseling', 
   ARRAY['G0442', 'G0443'], 
   'CMS/Noridian Medicare');
