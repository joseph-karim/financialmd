import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# New Patient Visits

## Strategic Approach

For non-Medicare new patients, try completing the annual exam concurrently with the new patient visit. New patient visits are typically longer appointments, which provides adequate time for conducting screenings, immunizations, and comprehensive evaluations.

Most insurance plans cover annual exams yearly, and using a split-bill approach yields a regular office visit charge for addressing any specific health concerns. It's important to remember that only one new patient code can be used per first encounter with a patient.

## Optimizing RVU Generation

### RVU Calculations for Young Adults (18-39 years)

| Billing Strategy | RVU Calculation | Total RVUs |
|---|---|---|
| New Level 3 (99203) + Annual (99395) | 1.6 + 1.75 | 3.35 RVUs |
| New Annual (99385) + Est. Level 3 (99213) | 1.92 + 1.3 | 3.22 RVUs |
| New Level 4 (99204) + Annual (99395) | 2.6 + 1.75 | 4.35 RVUs |
| New Annual (99385) + Est. Level 4 (99214) | 1.92 + 1.92 | 3.84 RVUs |
| New Level 5 (99205) + Annual (99395) | 3.5 + 1.75 | 5.25 RVUs |
| New Annual (99385) + Est. Level 5 (99215) | 1.92 + 2.80 | 4.72 RVUs |

### RVU Calculations for Adults (40-64 years)

| Billing Strategy | RVU Calculation | Total RVUs |
|---|---|---|
| New Level 3 (99203) + Annual (99396) | 1.6 + 1.9 | 3.50 RVUs |
| New Annual (99386) + Est. Level 3 (99213) | 2.33 + 1.3 | 3.63 RVUs |
| New Level 4 (99204) + Annual (99396) | 2.6 + 1.9 | 4.50 RVUs |
| New Annual (99386) + Est. Level 4 (99214) | 2.33 + 1.92 | 4.25 RVUs |
| New Level 5 (99205) + Annual (99396) | 3.5 + 1.9 | 5.40 RVUs |
| New Annual (99386) + Est. Level 5 (99215) | 2.33 + 2.8 | 5.13 RVUs |

## Optimizing Productivity

* In most cases, billing a new patient E&M code as the primary code plus an established yearly physical will yield the highest wRVU.
* Using this split-bill approach can potentially help you achieve the target 5.4 RVU/hour productivity goal.
* For the 40-64 age group, the New Level 5 (99205) + Annual (99396) combination exactly meets the 5.4 RVU/hour target.

## Comprehensive Example - New Patient Visit with Split-Bill

### Patient Information
52-year-old male establishing care with your practice. His past medical history includes hypothyroidism, hypertension, and hyperlipidemia. He recently moved to your area and was previously followed by a primary care physician out of state. 

### Medications
The patient reports taking Lisinopril, Levothyroxine, and Atorvastatin as directed and denies any medication side effects.

### Surgical History
Appendectomy and tonsillectomy as a child.

### Social History
* Does not smoke, drink alcohol, or use illicit drugs
* Family history: Father had diabetes and hypertension; mother had hypothyroidism
* Diet: Mixed diet with daily multivitamin
* Exercise: Rides bicycle three times weekly and does stretching exercises
* Sleep: 7-8 hours nightly
* Dental: Recently established with a new dentist for routine cleaning
* Vision: Annual eye exams, uses reading glasses only
* Occupation: Accountant

### Patient Concerns and Requests
* Would like to get blood work as it has been almost a year since last labs
* Never been screened for colon cancer (was previously advised but hasn't completed)
* Reports being up-to-date with immunizations and gets flu shot yearly

### Assessment/Plan
* **Diagnosis:** 
  1. Establish Care with New Provider
  2. Primary Hypertension
  3. Hypothyroidism
  4. Hyperlipidemia
  5. Annual Physical Exam
  6. Screening for Diabetes
  7. Colon Cancer Screening

* **Orders:** CBC, CMP, A1C, Lipid Panel, TSH, FT4, Cologuard

* **Billing Code:** 99204 + 25 modifier + 99396 (2.6 RVU + 1.9 RVU = 4.5 RVUs)

## Best Practices for New Patient Visits

1. **Thorough Pre-Visit Planning**
   * Review any records from previous providers before the visit
   * Identify which screenings might be appropriate for this patient
   * Determine if they meet criteria for both an annual exam and a problem-focused visit

2. **Efficient Documentation**
   * Use templates that capture both new patient evaluation requirements and annual exam components
   * Clearly distinguish the preventive services from the problem-focused evaluation
   * Document time spent if considering time-based billing

3. **Coding Strategy**
   * Consider which combination of codes will yield the highest appropriate RVU
   * Use the 25 modifier correctly to indicate a significant, separately identifiable service
   * Ensure documentation supports both the new patient and the annual exam components

4. **Patient Education**
   * Explain to patients that they may receive two charges - one for the new patient visit and one for the annual exam
   * Clarify that many insurance plans cover preventive services at 100%
   * Provide cost transparency when possible to avoid patient surprise

By implementing these strategies, you can maximize both the quality of care and the appropriate reimbursement for new patient encounters.
`

export default function NewPatientVisits() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'new-patient-visits'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="New Patient Visits"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}