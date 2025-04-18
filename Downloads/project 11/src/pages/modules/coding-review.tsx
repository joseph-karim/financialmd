import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# Review of Coding

## Billing Based on Time

**Table 1: CPT Codes and Time Requirements**

| New Patient CPT Codes | Time Must be Met or Exceeded | Establish Patient CPT Codes | Time Must be Met or Exceeded |
|---|---|---|---|
| 99202 | 15-29 Minutes | 99212 | 10-19 Minutes |
| 99203 | 30-44 Minutes | 99213 | 20-29 Minutes |
| 99204 | 45-59 Minutes | 99214 | 30-39 Minutes |
| 99205 | 60-74 Minutes | 99215 | 40-59 Minutes |

**Table 2: CPT Codes and Work RVU Values**

| New Patient CPT Codes | Work RVU | Establish Patient CPT Codes | Work RVU |
|---|---|---|---|
| 99202 | 0.93 | 99212 | 0.7 |
| 99203 | 1.6 | 99213 | 1.3 |
| 99204 | 2.6 | 99214 | 1.92 |
| 99205 | 3.5 | 99215 | 2.8 |

**Table 3: Comparison of Work RVUs (2020 vs 2021 Updates)**

| New Patient CPT Codes | Work RVU 2020 | Updated Work RVU 2021 | Establish Patient CPT Codes | Work RVU 2020 | Updated Work RVU 2021 |
|---|---|---|---|---|---|
| 99202 | 0.93 | 0.93 | 99212 | 0.48 | 0.7 |
| 99203 | 1.42 | 1.6 | 99213 | 0.97 | 1.3 |
| 99204 | 2.43 | 2.6 | 99214 | 1.5 | 1.92 |
| 99205 | 3.17 | 3.5 | 99215 | 2.11 | 2.8 |

### 2021 E/M Code Changes

* All work RVUs for annual exams have remained the same.
* Medicare wellness exams along with TCM visits also received work RVU increases.
* Some organizations may have adjusted conversion factor rate paid per RVU if they have adopted this new scale in order to maintain budget neutrality.
* Some codes did not receive any wRVU increases such as 99202. New patient visits 99203-99205 received slight increase in wRVU.
* The largest increases were for established patients 99212-99215 which received upwards of 28-45% increase in wRVU.

## Limitations of Time-Based Billing

* Billing strictly based on time limits RVUs per hour earning potential and ultimately fails to reach threshold of 5.4 RVUs per hour.

### Example RVU Calculations for Different Time Scenarios:

* 15 min × 4 = 99212 (0.70 RVU) × 4 = **2.80 RVUs total**
* 20 min × 3 = 99213 (1.3 RVU) × 3 = **3.90 RVUs total**
* 30 min × 2 = 99214 (1.92 RVU) × 2 = **3.84 RVUs total**
* 30 min + 15 min + 15 min = 99214 (1.92 RVU) + 99212 (0.70 RVU) × 2 = **3.32 RVUs total**
* 40 min + 20 min = 99215 (2.8 RVU) + 99213 (1.3 RVU) = **4.10 RVUs total**
* 40 min (New) + 20 min (Established) = 99203 (1.6 RVU) + 99213 (1.3 RVU) = **2.90 RVUs total**
* 45 min (New) + 15 min (Established) = 99204 (2.6 RVU) + 99212 (0.7 RVU) = **3.3 RVUs total**
* 30 min (New) + 30 min (New) = 99203 (1.6 RVU) + 99203 (1.6 RVU) = **3.2 RVUs total**
* 60 min (New) = 99205 (3.5 RVU) = **3.50 RVUs total**

### When to Use Time-Based Billing

* Can be helpful to bill based on time if doing pre-chart review along with completing charts after visit if leads to higher level billing (total time spent on patient care including pre-charting, patient encounter and post visit wrap-up required all on same day).
* If a scheduled visit ran over the allotted time, despite being low complexity may yield higher level codes if billing based on time.
* In most cases, it is preferable to bill based on complexity and visit type to achieve the target hourly productivity.
`

export default function CodingReview() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'coding-review'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Review of Coding"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}