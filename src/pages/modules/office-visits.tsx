import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# Office Visits

## 2021 E/M Guideline Changes

The guidelines for office visits in 2021 underwent a significant revision. The history and physical exam components no longer factor into code selection. Instead, code selection is based on either:

1. Total time spent on the date of the encounter (includes pre and post time)
2. Medical Decision Making (MDM)

## Time-Based Billing Thresholds

| New Patient | Time | Established Patient | Time |
|-------------|------|---------------------|------|
| 99202 | 15-29 min | 99212 | 10-19 min |
| 99203 | 30-44 min | 99213 | 20-29 min |
| 99204 | 45-59 min | 99214 | 30-39 min |
| 99205 | 60-74 min | 99215 | 40-59 min |

## MDM-Based Billing Criteria

* **Straightforward MDM (99212/99202)**: 
  * Minimal problems
  * Minimal risk
  * Minimal or no data review

* **Low MDM (99213/99203)**: 
  * Minor problems or stable chronic condition
  * Low risk interventions
  * Limited data review

* **Moderate MDM (99214/99204)**: 
  * Multiple chronic conditions or acute illness with systemic symptoms
  * Prescription medication management
  * Moderate complexity data review

* **High MDM (99215/99205)**: 
  * Severe illness or exacerbation
  * Life-threatening conditions
  * Extensive data review
  * High-risk decisions

Remember, billing by complexity (MDM) typically yields higher RVUs per hour than billing strictly by time, which is why it's important to understand MDM criteria thoroughly.

## Tips to Optimize Office Visits

1. **Document purposefully** - Focus on MDM elements rather than extensive histories and physical exams

2. **Capture prescription management** - When managing multiple medications or initiating new ones, this often qualifies for moderate MDM (99214)

3. **Document complexity factors** - Include social determinants, comorbidities, and risk factors that increase complexity

4. **Strategic time documentation** - Only use time-based coding when it yields a higher level than MDM

5. **Optimize scheduling** - Consider 30-minute slots for complex patients and 15-minute slots for straightforward issues

## Benefits of Proper Office Visit Coding

* Increased revenue without increasing patient volume
* Better reflection of actual work performed
* Improved documentation quality
* More sustainable practice model
* Ability to reach the 5.4 RVU/hour target

By mastering these concepts and applying them appropriately, you can increase your RVUs per hour without increasing your patient volume or work hours.
`

export default function OfficeVisits() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'office-visits'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Office Visits"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}