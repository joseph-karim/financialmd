import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# Annual Exams

## CPT Codes and RVU Values for Annual Exams

**Table 7: Annual Exam CPT Codes and wRVUs**

| Ages | New Patient CPT Code | wRVU | Established Patient CPT Code | wRVU |
|---|---|---|---|---|
| Infant (<1 yr) | 99381 | 1.5 | 99391 | 1.37 |
| Early Childhood (1-4 yrs) | 99382 | 1.6 | 99392 | 1.5 |
| Late Childhood (5-11 yrs) | 99383 | 1.7 | 99393 | 1.5 |
| Adolescent (12-17 yrs) | 99384 | 2.00 | 99394 | 1.7 |
| Young Adult (18-39 yrs) | 99385 | 1.92 | 99395 | 1.75 |
| Adult (40-64 yrs) | 99386 | 2.33 | 99396 | 1.9 |
| Elderly (65+) | 99387* | 2.5 | 99397* | 2.0 |

**Important Notes:**
* wRVU for physical exams has remained the same despite 2021 increases for other E&M codes.
* Elderly codes (65+) are rarely used; Medicare Wellness Exams (which use different codes/wRVU) are typically used instead.

## Annual Exam Billing Strategy

**Table 8: Annual Exam Billing Strategy**

| Total Time Spent on Visit | Billing Code Strategy |
|---|---|
| 15 to 20 mins | 9939* (Annual exam only) |
| 30 to 40 mins | 9939* + 99213/99214/99215 (with 25 modifier) |

## Key Strategies

* **Split Billing:** Addressing chronic problems during an annual visit is a separate charge (split-bill). Annual exams cover screenings, immunizations, and counseling. Use split-billing if addressing conditions like HTN, DM, Anxiety, etc.

* **Documentation:** Use EMR templates for efficiency. Documentation should include comprehensive physical examination, review of screenings/immunizations, and pertinent counseling.

* **Important Reminders:** 
  * Most insurances cover annual exams yearly
  * Split-bill results in a regular office visit charge for the patient
  * You need a billing code for every 15-20 mins to meet the 5.4 RVU/hour target

## Annual Exam Examples

**Example 1: Simple Annual**

35-year-old male with no past medical history, up to date on immunizations, requests routine labs.
* **Diagnosis:** Annual Physical Exam, Multiphasic Screening
* **Orders:** CBC, CMP, A1C, Lipid Panel
* **Billing:** 99395 (1.75 RVU)

**Example 2: Annual + Chronic Conditions**

62-year-old female for annual and 6-month follow-up of DM2, HTN, HLD. Due for flu shot, labs, mammogram. Up to date on colon/cervical cancer screening.
* **Diagnosis:** Annual Exam, Essential HTN, DM2 w/o Insulin, HLD, Breast Cancer Screen, Need Flu Vaccine
* **Orders:** CBC, CMP, A1C, Lipid, Microalbumin, Flu shot, Mammogram
* **Billing:** 99396 + 25 modifier + 99214 (1.9 RVU + 1.92 RVU = 3.82 RVUs)

## Key Takeaway

Annual exams provide an excellent opportunity to also address chronic conditions using the 25 modifier, which can significantly boost RVUs per visit. When patients come in for their annual exam, make sure to address and document any chronic condition management to maximize reimbursement appropriately.
`

export default function AnnualExams() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'annual-exams'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Annual Exams"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}