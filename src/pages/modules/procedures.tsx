import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# OFFICE PROCEDURES

* Many office procedures can increase total wRVU. Some quick, others take time.
* **Top 4 High-Return, Minimal Prep Procedures:**
    1.  **69210:** Cerumen Disimpaction Unilateral Manually (0.61 RVU)
        * Medicare pays for one manual debridement/visit; others may reduce 2nd ear RVU.
    2.  **17110:** Wart Destruction 1-14 Lesions (Cryo) (0.70 RVU)
    3.  **11200:** Skintag removal 1-15 Lesions (0.80 RVU)
    4.  **17000:** Destruction benign/pre-malignant Lesion 1 (Cryo) (0.61 RVU)
        **17003:** Destruction benign/pre-malignant Lesions 2-14 (Cryo) (0.04 RVU)
        * Use for Seborrheic Keratoses (SK) or Actinic Keratoses (AK).
* **Documentation:** Add to any office visit (incl. follow-ups, annuals) with 25 modifier (e.g., 99214 + 25 modifier + procedure code).
* **Strategy:** Identify during PE, use smart phrase. Significantly increases RVU/visit, takes minutes.

* **Other Common Procedures (depending on experience/comfort):** Injections (joint, trigger points), skin biopsies (extensive list), OMT. wRVU vary (0.17 to 1.50).
* **Recommendation:** Avoid time-intensive procedures or those with low reimbursement. Seeing more patients might be more productive. Conduct procedures during regular office visit to bill E&M + procedure. Billing only procedure limits reaching 5.4 RVU/hour target.

**Office Procedure Billing Examples:**
* **Example 1 (Ear Pain + Cerumen):** 31yo M R ear pain x 1 wk. OTC meds no help. Exam: wax build-up R ear. Manually removed cerumen w/ curette. R TM inflamed. Dx: Otitis Media R, Otalgia R, Impacted Cerumen R. Rx: Augmentin. Billing: 99214 + 25 modifier + 69210 (1.92 + 0.61 = 2.53 RVUs).
* **Example 2 (Gout F/U + Skin Tags):** 58yo F gout f/u on Allopurinol 100mg, no flares. C/o irritated neck skin tags (catch on clothes/jewelry). Exam: 3 small tags R neck base. Consent obtained, cleaned area, excised tags w/ sterile scissors. Tolerated well, no bleeding/bandages. Dx: Gout, Acrochordon. Billing: 99213 + 25 modifier + 11200 (1.3 + 0.80 = 2.1 RVUs).
`

export default function Procedures() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'procedures'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Office Procedures"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}