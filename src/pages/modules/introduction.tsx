import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# Introduction to the Primary Care Financial Masterclass

## Objective

* Teaching primary care physicians how to increase yearly income and unlock full earning potential
* Simplifying billing and coding to ensure maximum productivity and reimbursement
* Learning commonly missed billing codes and avoiding costly mistakes
* Step-by-step guide on how to make $400K+ yearly regardless of practice setting
* Proven strategies that have helped countless doctors increase monthly earnings by $3,000-$15,000

## Disclaimer

* The content provided in this medical financial education course is intended for informational purposes only and should not be construed as medical, financial, or legal advice.
* While every effort has been made to ensure accuracy and reliability of the information presented, we make no representations or warranties of any kind about the completeness, accuracy, or suitability of the information contained herein.
* Medical financial decisions should always be made in consultation with qualified healthcare, financial, and legal professionals who can consider your individual circumstances.
* The information provided in this course is not a substitute for professional advice tailored to your specific situation.

## Topic Areas

This comprehensive masterclass covers the following key areas:

* **Physician Reimbursement** - Understanding RVUs and compensation models
* **Review of Coding** - Essential coding principles and 2021 E/M guideline changes
* **Billing Based on Time vs Complexity** - Strategic approaches to optimize billing
* **Office Visits** - Maximizing reimbursement for standard visits
* **Annual Exams** - Proper coding for preventive services
* **New Patient Visits** - Capturing full value of initial encounters
* **Commonly Missed Add-On Codes** - Finding "hidden revenue" opportunities
* **Preventative Medicine Counseling** - Additional billing opportunities
* **Office Procedures** - Simple, high-RVU procedures to incorporate
* **Medicare Billing** - Understanding Medicare's unique coding requirements
* **Medicare Wellness Visits** - Optimizing AWV/IPPE visits
* **Transition Care Management** - Capturing post-discharge follow-up properly
* **Sample Daily Schedule** - Real-world implementation of billing strategies

By the end of this masterclass, you'll have a comprehensive understanding of medical billing and coding strategies specifically optimized for primary care physicians. You'll learn how to appropriately document and code each patient encounter to ensure you're compensated fairly for the work you do.

Unlike many other courses that focus on general billing principles, this masterclass provides practical, actionable steps you can implement immediately in your practice. The strategies are ethically sound, focusing on proper documentation of the valuable care you already provide.
`

export default function Introduction() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'introduction'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Introduction"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}