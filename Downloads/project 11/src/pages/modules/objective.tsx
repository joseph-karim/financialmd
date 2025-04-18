import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# OBJECTIVE

* Teaching primary care physicians how to increase yearly income and unlock full earning potential.
* Billing and coding simplified, learn commonly missed billing codes and avoid mistakes to ensure maximum productivity and reimbursement.
* Learn how to earn more than a specialist and gain financial freedom.
* Step by step guide on how to make $400K+ yearly regardless of working in private practice or hospital employed.
* Countless doctors helped with an increase of $3000-$15000 in monthly earnings.
`

export default function Objective() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'objective'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Objective"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}