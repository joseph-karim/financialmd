import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# AGENDA

* Physician Reimbursement
* Review of Coding
* Billing Based on Time vs Complexity
* Office Visits
* Annual Exams
* New Patient Visits
* Commonly Missed Add-On Codes
* Office Procedures
* Medicare Billing
* Medicare Wellness Visits
* Sample of Daily Schedule
* Extras
`

export default function Agenda() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'agenda'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Agenda"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}