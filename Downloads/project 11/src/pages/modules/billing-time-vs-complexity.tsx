import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# Billing Based on Complexity

## Elements of Medical Decision Making (MDM)

**Table 4: Elements of Medical Decision Making (MDM)**

| Code | Level of MDM | Number and Complexity of Problems | Amount/Complexity of Data | Risk of Complications |
|---|---|---|---|---|
| 99211 | N/A | N/A | N/A | N/A |
| 99202 / 99212 | Straightforward | **Minimal:** 1 self-limited or minor problem | **Minimal or none** | **Minimal risk** |
| 99203 / 99213 | Low | **Low:** 2+ self-limited/minor problems; OR 1 stable chronic illness; OR 1 acute, uncomplicated illness/injury | **Limited:** (Must meet at least 1 of 2 categories)<br>**Cat 1:** Any 2 from: Review prior notes; Review test results; Order tests<br>**Cat 2:** Assessment requiring independent historian | **Low risk** |
| 99204 / 99214 | Moderate | **Moderate:** 1+ chronic illness w/ exacerbation; OR 2+ stable chronic illnesses; OR 1 undiagnosed new problem w/ uncertain prognosis; OR 1 acute illness w/ systemic symptoms; OR 1 acute complicated injury | **Moderate:** (Must meet at least 1 of 3 categories)<br>**Cat 1:** Any 3 from: Review notes; Review tests; Order tests; Independent historian<br>**Cat 2:** Independent test interpretation<br>**Cat 3:** Discussion of management w/ external provider | **Moderate risk:**<br>• Prescription drug management<br>• Decision re: minor surgery w/ risk factors<br>• Decision re: major surgery w/o risk factors<br>• Diagnosis/treatment limited by social determinants |
| 99205 / 99215 | High | **High:** 1+ chronic illness w/ severe exacerbation; OR 1 acute/chronic illness posing threat to life/bodily function | **Extensive:** (Must meet at least 2 of 3 categories)<br>**Cat 1:** Any 3 from: Review notes; Review tests; Order tests; Independent historian<br>**Cat 2:** Independent test interpretation<br>**Cat 3:** Discussion w/ external provider | **High risk:**<br>• Drug therapy requiring intensive monitoring<br>• Decision re: major surgery w/ risk factors<br>• Decision re: emergency major surgery<br>• Decision re: hospitalization<br>• Decision not to resuscitate |

## The Level 3 Visit (99203 / 99213)

* **Complexity:** Low
* **Problems:** 2+ self-limited/minor problems; OR 1 stable chronic illness; OR 1 acute, uncomplicated illness/injury.
* **Data:** Limited (Meet 1 of 2 categories: Category 1 - Combination of 2 tests/documents review/order; Category 2 - Independent historian).
* **Risk:** Low risk from additional testing/treatment.
* **Examples:** 
  * 2 minor problems managed conservatively
  * 1 stable chronic problem on medications
  * 1 new problem needing OTC treatment
* **Documentation:** HPI (brief is acceptable), Pertinent physical exam only (ROS not needed), Plan with recommended treatments.
* **Strategy:** Minimize using this code; most primary care visits involve multiple problems and prescriptions.

## The Level 4 Visit (99204 / 99214)

* **Complexity:** Moderate
* **Problems:** 1+ chronic illness w/ exacerbation/progression/side effects; OR 2+ stable chronic illnesses; OR 1 undiagnosed new problem w/ uncertain prognosis; OR 1 acute illness w/ systemic symptoms; OR 1 acute complicated injury.
* **Data:** Moderate (Meet 1 of 3 categories: Category 1 - Combination of 3 tests/documents/historian; Category 2 - Independent test interpretation; Category 3 - Discussion with external provider).
* **Risk:** Moderate risk from additional testing/treatment (prescription drug management, decision regarding minor surgery with risk factors, etc.)

* **Examples:** 
  * 1 chronic problem needing medication adjustment
  * 2 stable chronic problems on medications
  * 1 new problem needing prescription management

* **Documentation:** HPI (brief acceptable), Pertinent physical exam only (ROS not needed), Plan with prescribed medications/treatments.

* **Strategy:**
  1. Incorporate prescription medications to shift from level 3 to level 4
  2. Limit chronic problems to 2-3 per visit (more won't yield higher code)

* The increase from Level 3 (1.3 RVU) to Level 4 (1.92 RVU) is over 47% and accounts for most outpatient visits.

**Table 5: Common Level 4 Scenarios (Systemic Involvement + Prescription)**

| Condition | Prescription Treatment | Systemic Involvement |
|---|---|---|
| Viral Illness (COVID, Flu, Herpes, Shingles) | Paxlovid, Tamiflu, Valacyclovir, Tessalon Pearls, Rx cough syrups, Steroids | Fever, Chills, Cough, Myalgias, Headache, Painful Lesions |
| Bacterial Infection (Sinusitis, Bronchitis, OM, Strep, Cellulitis, UTI, STD) | Antibiotics (various classes), Tessalon Pearls, Rx cough syrups, Steroids | Fever, Chills, CVA pain, Lesions, Cough, Myalgias, Dysuria |
| Migraines/Headaches | Toradol injection, Rx NSAIDs, Imitrex | Visual/Auditory aura, Sensitivities |
| Musculoskeletal Injuries (LBP, Knee pain, Strains/sprains) | Rx NSAIDs, Muscle Relaxers, Steroid pak, Lidocaine patches | Neuropathy, Radiculopathy, Joint swelling, Inflammation |

## The Level 5 Visit (99205 / 99215)

* **Complexity:** High
* **Problems:** 1+ chronic illness w/ severe exacerbation/progression/side effects; OR 1 acute/chronic illness/injury posing threat to life/bodily function.
* **Data:** Extensive (Meet 2 of 3 categories: Category 1 - Combination of 3 tests/documents/historian; Category 2 - Independent test interpretation; Category 3 - Discussion with external provider).
* **Risk:** High risk from additional testing/treatment. Examples: Drug therapy needing intensive toxicity monitoring, decision re: elective major surgery w/ risk factors, decision re: emergency major surgery, decision re: hospitalization, decision not to resuscitate/de-escalate care.

* **Common Examples:** 
  * Sending patients to ER/hospital
  * Patients with high-risk conditions (cancer, risk of death/harm)
  * Patients on high-risk medications needing monitoring
  * Non-compliance posing risk to health

* **Documentation:** HPI (brief is acceptable), Pertinent physical exam only (ROS not needed), Plan MUST discuss risks.
* **Strategy:** Identify these common but often under-coded patients.

**Table 6: Examples Qualifying for Level 5 Visit**

| Category | Examples |
|---|---|
| Hospital/ER Evaluation (Urgent workup/stabilization needed) | Concerns for STEMI, A.fib, Arrhythmia, PE, DVT, Sepsis, Syncope, Seizure, CHF/COPD exacerbation, Hypotension, Stroke, Hypertensive emergency, DKA, Appendicitis, SBO, Acute Renal Failure, Anemia |
| High Risk Medical Conditions (Risk of death/bodily harm requiring intervention) | Unstable Angina needing stress test; 3-vessel CAD needing CABG; New colon mass concerning for cancer; Breast cancer pt undergoing chemo/radiation; Ongoing drug/alcohol abuse, risky behaviors |
| High Risk Medications (Require close monitoring for adverse events) | Combo of opioids/benzos/sleep meds; Active chemotherapy/cancer treatments; Multiple mood stabilizers/anticonvulsants (Lithium, Lamictal, Phenytoin, etc.) |
| Non-compliance with Treatment (Risk of exacerbation/hospitalization) | Excessive alcohol despite esophageal varices/cirrhosis; Uncontrolled diabetes risking DKA; Uncontrolled BP risking stroke |

### Level 5 Documentation Examples:

* **Example 1 (ER Referral):** "Patient with exertional chest pain, respiratory distress, exam findings suggestive of DVT/PE/MI/CHF/COPD/ARF. Discussed need for urgent ER evaluation, patient agrees to go with family."

* **Example 2 (High-Risk Meds):** "Patient on chronic Xanax + Norco. Discussed FDA black box warning re: serious risks (dizziness, sleepiness, slowed breathing, coma, death) of combining opioids and CNS depressants. Patient aware."

* **Example 3 (Non-Compliance):** "Patient drinks 3-4 alcohol/day despite hx of varices/cirrhosis. Discussed risks (bleeding, ascites, life-threatening complications). Provided resources, patient refuses help currently."
`

export default function BillingTimeVsComplexity() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'billing-time-vs-complexity'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Billing: Time vs Complexity"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}