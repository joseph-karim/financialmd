import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# EXTRA

### SUMMARY

1.  Use accurate, up-to-date billing codes. Review/improve coding to maximize reimbursement.
2.  Implement workflows for productivity (adequate pt numbers, capture risks).
3.  Streamline documentation (smart phrases, AI, scribes) to reduce time on non-clinical tasks.

### CHEAT SHEET

| Code | Description | RVU |
|---|---|---|
| 99406 | Tobacco use Counselling 3-10mins | 0.24 |
| 99407 | Tobacco use Counselling >10mins | 0.50 |
| G2211 | Medicare Continuity of Care | 0.33 |
| G0442 | Alcohol Screening | 0.18 |
| G0444 | Depression Screening | 0.18 |
| G0446 | Cardiovascular Risk Reduction | 0.45 |
| G0447 | Obesity Counselling | 0.45 |
| G0296 | Need for Low Dose CT | 0.52 |
| 99497 | Advance Care Planning | 1.50 |
| 99401 | Preventative Medicine Counselling | 0.48 |

---
## THANK YOU
*(Placeholder for presenter details)*
`

export default function Extras() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'extras'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Extras"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}