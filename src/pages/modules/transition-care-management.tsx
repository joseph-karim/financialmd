import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# TRANSITION CARE MANAGEMENT

Hospital discharge follow up visits conducted within 7 or 14 days for Medicare patients (the day of discharge counts as the first day). These visits have high RVU yield and should be prioritized as much as possible even if this requires potentially double-booking patient slots to meet the specified time frame.

During these visits, only need to discuss the care from hospitalization and any subsequent evaluations and treatments. Per AAFP, if any non-hospital related conditions are also addressed at the visit, can split bill the visit with an E&M code with 25 modifier.

To qualify for the billing of a TCM code, there needs to be interactive encounter (phone call) documented between nurse and the patient prior to face-to-face visit, initiated within two days after leaving hospital.

Per Medicare, TCM billing requires that once a patient is discharged from the hospital, that they will not be re-admitted to the hospital for a minimum of 30 days. Most institutions will hold submitting charges for TCM visits for 30 days to satisfy the Medicare requirement.

In the event the patient is re-admitted to the hospital within 30 days, the billing department may switch the TCM code to an office E&M visit without notifying the provider, thus decreasing the wRVU (can request this information regarding billing changes from your coding department).

## Documentation and Strategy

**Documentation:** In the plan section of note, can document "I have reviewed the hospital course, discharge summary along with all the labs and imaging from hospital stay"

**Strategy:** 
1. If addressing any additional non-hospital related condition during the follow up encounter, can split bill with E&M code as outlined by AAFP (ie. 99495 + 25 modifier + 99213)
2. Can add counseling codes such as obesity counseling and smoking cessation on top of the TCM code to help increase productivity.

## TCM Codes and Requirements

| Code | Requirements | RVU |
|---|---|---|
| **99495** | - Phone call with patient within two days after discharge<br>- Follow up face to face visit within 14 days<br>- Medical decision making with moderate complexity | 2.78 RVU |
| **99496** | - Phone call with patient within two days after discharge<br>- Follow up face to face visit within 7 days<br>- Medical decision making with high complexity | 3.79 RVU |

## Example Patient Scenarios

**Example 1:** Patient is 72yo M presenting today for hospital discharge follow up. He was admitted for cellulitis of his R leg and released 8 days before. While in the hospital he was treated with IV antibiotics and given fluids. He had some swelling of his R leg although lower extremity US was negative for DVT. He was discharged home with 5 days of oral antibiotics which he completed. He notes the redness and swelling has gone away fully. He has history of diabetes and would like his A1C checked today in office.
* **Diagnosis:** 1) Hospital Discharge Follow Up 2) Cellulitis Lower Extremity 3) R Leg Swelling 4) Type 2 Diabetes
* **Billing Code:** 99495 + 25 modifier + 99213 = (2.78 RVU + 1.3 RVU) = 4.08 RVUs

**Example 2:** Patient is 67yo F presenting today for hospital discharge follow up. She was admitted for NSTEMI for which she underwent PCI and required 2 stent placement. She was discharged 3 days prior and will be starting cardiac rehab next week. She was started on Aspirin, Plavix, Metoprolol, Atorvastatin and Lisinopril and has been taking her medications as directed. She still notes continuing to smoke 1 pack per day. Furthermore, she has gained 15 pounds over the last 3 months and her BMI has increased from 33 to 37. You counsel her on quitting smoking (3 min) along with her increased weight and obesity (8 min).
* **Diagnosis:** 1) Hospital Discharge Follow Up 2) NSTEMI 3) CAD of Native Artery 4) CAD s/p Stent Placement 5) Nicotine Dependance, current use 6) Severe Obesity 7) BMI 37-37.9
* **Billing Code:** 99496 + 25 modifier + 99406 + G0447 = (3.79 RVU + 0.24 RVU + 0.45 RVU) = 4.48 RVUs

## Best Practices for TCM Visits

### Preparation
* Establish a system to identify patients being discharged from hospitals
* Create protocols for nursing staff to make the required 2-day follow-up calls
* Document these calls thoroughly in the EMR
* Reserve appointment slots specifically for TCM visits to ensure compliance with 7/14 day requirements

### During the Visit
* Clearly document that this is a post-hospitalization follow-up
* Review and document all hospital records including:
  - Discharge summaries
  - Medication changes
  - Lab and imaging results
  - Consultant recommendations
* Address any immediate post-discharge concerns
* Reconcile pre-hospital and post-hospital medications
* Ensure the patient understands their post-discharge plan
* Document medical decision making appropriate for the claimed complexity level

### Maximizing RVUs
* Always consider whether a TCM visit qualifies for the higher complexity code (99496)
* Be prepared to justify high-complexity decision making with proper documentation
* Remember to document the interactive contact within 2 business days of discharge
* Consider addressing non-hospital issues with a separate E&M code (with modifier 25)
* Don't forget additional appropriate add-on codes (smoking cessation, obesity counseling, etc.)
* For Medicare patients, consider adding G2211 when appropriate

By prioritizing TCM visits and properly documenting all elements, you can significantly boost your RVU generation while providing essential care coordination during a critical transition period.
`

export default function TransitionCareManagement() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'transition-care-management'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Transition Care Management"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}