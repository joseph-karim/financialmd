-- Create codes table for storing medical billing codes
CREATE TABLE IF NOT EXISTS codes (
  code TEXT PRIMARY KEY,
  description_short TEXT NOT NULL,
  description_long TEXT,
  type TEXT NOT NULL, -- CPT, G-code, ICD-10, HCPCS
  national_wrvu NUMERIC,
  national_pe_rvu NUMERIC,
  national_mp_rvu NUMERIC,
  global_period INT,
  requires_modifier BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster searches
CREATE INDEX IF NOT EXISTS idx_codes_type ON codes(type);
CREATE INDEX IF NOT EXISTS idx_codes_description ON codes USING GIN (to_tsvector('english', description_short));

-- Add some initial E/M codes
INSERT INTO codes (code, description_short, description_long, type, national_wrvu, requires_modifier)
VALUES 
  ('99202', 'Office visit, new patient, straightforward MDM', 'Office or other outpatient visit for the evaluation and management of a new patient, which requires a medically appropriate history and/or examination and straightforward medical decision making.', 'CPT', 0.93, FALSE),
  ('99203', 'Office visit, new patient, low MDM', 'Office or other outpatient visit for the evaluation and management of a new patient, which requires a medically appropriate history and/or examination and low level of medical decision making.', 'CPT', 1.60, FALSE),
  ('99204', 'Office visit, new patient, moderate MDM', 'Office or other outpatient visit for the evaluation and management of a new patient, which requires a medically appropriate history and/or examination and moderate level of medical decision making.', 'CPT', 2.60, FALSE),
  ('99205', 'Office visit, new patient, high MDM', 'Office or other outpatient visit for the evaluation and management of a new patient, which requires a medically appropriate history and/or examination and high level of medical decision making.', 'CPT', 3.50, FALSE),
  ('99211', 'Office visit, established pt, minimal', 'Office or other outpatient visit for the evaluation and management of an established patient, that may not require the presence of a physician or other qualified health care professional.', 'CPT', 0.18, FALSE),
  ('99212', 'Office visit, established pt, straightforward MDM', 'Office or other outpatient visit for the evaluation and management of an established patient, which requires a medically appropriate history and/or examination and straightforward medical decision making.', 'CPT', 0.70, FALSE),
  ('99213', 'Office visit, established pt, low MDM', 'Office or other outpatient visit for the evaluation and management of an established patient, which requires a medically appropriate history and/or examination and low level of medical decision making.', 'CPT', 1.30, FALSE),
  ('99214', 'Office visit, established pt, moderate MDM', 'Office or other outpatient visit for the evaluation and management of an established patient, which requires a medically appropriate history and/or examination and moderate level of medical decision making.', 'CPT', 1.92, FALSE),
  ('99215', 'Office visit, established pt, high MDM', 'Office or other outpatient visit for the evaluation and management of an established patient, which requires a medically appropriate history and/or examination and high level of medical decision making.', 'CPT', 2.80, FALSE);

-- Add Medicare G-codes
INSERT INTO codes (code, description_short, description_long, type, national_wrvu, requires_modifier)
VALUES 
  ('G0438', 'Annual wellness visit, initial', 'Annual wellness visit; includes a personalized prevention plan of service (PPS), initial visit', 'G-code', 2.43, FALSE),
  ('G0439', 'Annual wellness visit, subsequent', 'Annual wellness visit; includes a personalized prevention plan of service (PPS), subsequent visit', 'G-code', 1.50, FALSE),
  ('G0444', 'Depression screening', 'Annual depression screening, 15 minutes', 'G-code', 0.18, FALSE),
  ('G2211', 'Complex E/M visit add-on', 'Visit complexity inherent to evaluation and management associated with medical care services that serve as the continuing focal point for all needed health care services', 'G-code', 0.33, FALSE);

-- Add common add-on codes
INSERT INTO codes (code, description_short, description_long, type, national_wrvu, requires_modifier)
VALUES 
  ('99497', 'Advance care planning, first 30 min', 'Advance care planning including the explanation and discussion of advance directives such as standard forms (with completion of such forms, when performed), by the physician or other qualified health care professional; first 30 minutes, face-to-face with the patient, family member(s), and/or surrogate', 'CPT', 1.50, FALSE),
  ('99498', 'Advance care planning, addl 30 min', 'Advance care planning including the explanation and discussion of advance directives such as standard forms (with completion of such forms, when performed), by the physician or other qualified health care professional; each additional 30 minutes', 'CPT', 1.40, FALSE),
  ('99484', 'Care mgmt. services, 20 min', 'Care management services for behavioral health conditions, at least 20 minutes of clinical staff time, directed by a physician or other qualified health care professional', 'CPT', 0.61, FALSE),
  ('99490', 'Chronic care mgmt, 20 min', 'Chronic care management services, at least 20 minutes of clinical staff time directed by a physician or other qualified health care professional, per calendar month', 'CPT', 0.61, FALSE),
  ('99439', 'Chronic care mgmt, addl 20 min', 'Chronic care management services, each additional 20 minutes of clinical staff time directed by a physician or other qualified health care professional, per calendar month', 'CPT', 0.54, FALSE);

-- Add common preventative service codes
INSERT INTO codes (code, description_short, description_long, type, national_wrvu, requires_modifier)
VALUES 
  ('99406', 'Tobacco use counseling, 3-10 min', 'Smoking and tobacco use cessation counseling visit; intermediate, greater than 3 minutes up to 10 minutes', 'CPT', 0.24, FALSE),
  ('99407', 'Tobacco use counseling, >10 min', 'Smoking and tobacco use cessation counseling visit; intensive, greater than 10 minutes', 'CPT', 0.50, FALSE),
  ('G0442', 'Annual alcohol screening', 'Annual alcohol misuse screening, 15 minutes', 'G-code', 0.18, FALSE),
  ('G0443', 'Brief alcohol misuse counseling', 'Brief face-to-face behavioral counseling for alcohol misuse, 15 minutes', 'G-code', 0.45, FALSE),
  ('G0446', 'Annual CV disease behavioral counseling', 'Annual, face-to-face intensive behavioral therapy for cardiovascular disease, individual, 15 minutes', 'G-code', 0.45, FALSE),
  ('G0447', 'Face-to-face behavioral counseling for obesity, 15 minutes', 'Face-to-face behavioral counseling for obesity, 15 minutes', 'G-code', 0.45, FALSE);

-- Add TCM codes
INSERT INTO codes (code, description_short, description_long, type, national_wrvu, requires_modifier)
VALUES 
  ('99495', 'TCM, moderate complexity, 14 day F/U', 'Transitional Care Management Services with moderate medical decision complexity, face-to-face visit within 14 calendar days of discharge', 'CPT', 2.78, FALSE),
  ('99496', 'TCM, high complexity, 7 day F/U', 'Transitional Care Management Services with high medical decision complexity, face-to-face visit within 7 calendar days of discharge', 'CPT', 3.79, FALSE);

-- Add common office procedures
INSERT INTO codes (code, description_short, description_long, type, national_wrvu, requires_modifier)
VALUES 
  ('69210', 'Removal impacted cerumen', 'Removal impacted cerumen requiring instrumentation, unilateral', 'CPT', 0.61, FALSE),
  ('17110', 'Destruction benign lesions, up to 14', 'Destruction (eg, laser surgery, electrosurgery, cryosurgery, chemosurgery, surgical curettement), of benign lesions other than skin tags or cutaneous vascular proliferative lesions; up to 14 lesions', 'CPT', 0.70, FALSE),
  ('11200', 'Removal of skin tags, up to 15', 'Removal of skin tags, multiple fibrocutaneous tags, any area; up to and including 15 lesions', 'CPT', 0.80, FALSE),
  ('20610', 'Arthrocentesis, major joint', 'Arthrocentesis, aspiration and/or injection; major joint or bursa (eg, shoulder, hip, knee, subacromial bursa)', 'CPT', 0.94, TRUE);
