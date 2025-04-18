-- Create modifiers table for storing billing modifiers
CREATE TABLE IF NOT EXISTS modifiers (
  modifier TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  usage_guidelines TEXT,
  examples TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add common modifiers
INSERT INTO modifiers (modifier, description, usage_guidelines, examples)
VALUES 
  ('25', 'Significant, separately identifiable E/M service by the same physician on the same day of the procedure or other service', 
   'Use when a physician provides a significant, separately identifiable E/M service on the same day as another procedure or service. The E/M service must be above and beyond the usual pre- and post-operative care associated with the procedure.', 
   ARRAY['Patient comes in for scheduled immunization but also has acute URI symptoms requiring evaluation', 'Patient presents for AWV but also has new onset knee pain requiring separate evaluation']),
  
  ('59', 'Distinct procedural service', 
   'Use to identify procedures/services that are not normally reported together, but are appropriate under the circumstances. Indicates that a procedure or service was distinct or independent from other non-E/M services performed on the same day.', 
   ARRAY['Removal of lesions from different anatomic sites', 'Multiple procedures performed that are not typically billed together']),
  
  ('XU', 'Unusual non-overlapping service', 
   'Use to identify services that are distinct because they do not overlap usual components of the main service. Medicare-specific modifier that may be used instead of modifier 59.', 
   ARRAY['Diagnostic colonoscopy performed on the same day as a screening colonoscopy due to a finding during the screening']),
  
  ('XS', 'Separate structure', 
   'Use to identify services that are distinct because they are performed on a separate organ/structure. Medicare-specific modifier that may be used instead of modifier 59.', 
   ARRAY['Excision of lesions from different anatomic sites']),
  
  ('24', 'Unrelated E/M service by the same physician during a postoperative period', 
   'Use when the same physician provides an E/M service during a postoperative period for a reason unrelated to the original procedure.', 
   ARRAY['Patient seen for flu symptoms during global period after minor surgery']),
  
  ('57', 'Decision for surgery', 
   'Use when an E/M service resulted in the initial decision to perform surgery, either the day before or the day of a major surgery (90-day global period).', 
   ARRAY['Office visit where decision for major surgery is made']),
  
  ('GC', 'Service performed in part by a resident under the direction of a teaching physician', 
   'Use when a resident participates in the service in the presence of a teaching physician. The teaching physician must be present during the key portion of the service.', 
   ARRAY['Resident performs history and physical, teaching physician joins for key portions and decision making']),
  
  ('GE', 'Service performed by a resident without the presence of a teaching physician under the primary care exception', 
   'Use for certain primary care services provided by a resident without the physical presence of a teaching physician. Only applicable in primary care centers that meet specific requirements.', 
   ARRAY['Resident sees patient independently for straightforward visit in qualified primary care center']),
  
  ('GT', 'Via interactive audio and video telecommunications systems', 
   'Use to indicate a telehealth service was provided via synchronous telecommunications system.', 
   ARRAY['Video visit for established patient follow-up']),
  
  ('95', 'Synchronous telemedicine service rendered via real-time interactive audio and video telecommunications system', 
   'Use to indicate a telehealth service was provided via synchronous telecommunications system. Similar to GT but used by commercial payers.', 
   ARRAY['Video visit for established patient follow-up with commercial insurance']);
