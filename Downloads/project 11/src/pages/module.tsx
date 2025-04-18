import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BookOpen, Lock, Brain, ChevronLeft, ChevronRight, CheckCircle2, Calendar, Stethoscope } from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useAuth } from '@/contexts/auth-context'
import { useProgressStore } from '@/store/progress-store'
import { useChatStore } from '@/store/chat-store'
import { AIChat } from '@/components/core/ai-chat'

// Mock module data (in a real app, this would be fetched from the database)
const moduleData = {
  'objective': {
    title: 'Objective',
    content: `
# OBJECTIVE

* Teaching primary care physicians how to increase yearly income and unlock full earning potential.
* Billing and coding simplified, learn commonly missed billing codes and avoid mistakes to ensure maximum productivity and reimbursement.
* Learn how to earn more than a specialist and gain financial freedom.
* Step by step guide on how to make $400K+ yearly regardless of working in private practice or hospital employed.
* Countless doctors helped with an increase of $3000-$15000 in monthly earnings.
    `,
    isPreview: true
  },
  'agenda': {
    title: 'Agenda',
    content: `
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
* Sample of Daily Schedule
* Extras
    `,
    isPreview: true
  },
  'physician-reimbursement': {
    title: 'Physician Reimbursement',
    content: `
# PHYSICIAN REIMBURSEMENT

* Per American Academy of Family Medicine (AAFP), average reported full-time family physician total compensation in 2022 was $274,359 (Only 7000 respondents out of 100,000+ primary care doctors) (range of $120,000 - $1.6 million).
* Total compensation is derived from combination of base salary, productivity (RVUs), quality performance, value-based payments and other non-RVU incentives such panel size, after hours service, meetings and mid-level supervision (NP/PA).
* Depending on the organization, combination of the above will determine final total pay, although total RVUs generated usually accounts for highest percentage of total compensation.
* Physician in private practice or direct primary care (DPC) can be paid on collections generated and subtracting total expenses.
* Other organizations reimburse based on salary, years of experience and quality metrics and do not rely on RVUs.
* The most important factor is the rate paid per RVU; this is a very well-kept secret of most health organizations, usually last information disclosed before signing a contract.
* Most large organizations rely on MGMA reports or other benchmarking reports to determine the "fair market value" to pay per RVU.
* The hospital-owned medical groups or affiliated physician practices can contribute data to the MGMA's research and benchmarking efforts, which doctors do not have access to readily although can be purchased for a fee.
* The rate paid per RVU significantly determines your pay and can vary widely between health organizations even within the same city as much as 30%. There can also be tier levels based on productivity.
* National average for Family Medicine outpatient is around $45 per RVU. This can vary significantly and be as low as $24 per RVU (Indiana University Health) upwards of $80 per RVU (Signature Health Massachusetts).

---

## PHYSICIAN REIMBURSEMENT (Continued)

* CPT codes are the most common way to bill for the work done in the outpatient setting in the United States. Consists of billing codes 99*** in addition to procedure and modifier codes.
* Each code has an assigned RVU value, when multiplied by the RVU rate determines your reimbursement for that service rendered.
* Most primary care doctors are familiar with the basic billing codes. There are many additional codes that should be captured more frequently to better reflect the work being doing and ultimately increase pay.
* Coding is taught poorly in most residency programs, ACGME requirements for this is very minimal. Most experience is attained in the outpatient setting and can vary depending on the savviness of the faculty.
* Most physicians who work for large health care organization are largely seen as referral sources for their specialists. Most organizations are not incentivized to teach billing and coding well to maximize reimbursement for primary care doctors.
* Despite having a billing and coding department, often just provided a list of codes although never instructed on full integration potential into practice.
* Higher reimbursement, regardless of being an employed physician through an organization or in private practice, requires better productivity achieved through improved coding.

---

## PHYSICIAN REIMBURSEMENT (Goal)

* To earn $400,000 yearly based on national average of rate of $45 per RVU would require to generate 8890 RVUs during the year.
* Most outpatient doctors work on average of 46 weeks of the year spending around 36h of patient contact hours per week.
* Doing the math indicates you would need to generate approximately 193 RVUs per week or 5.4 RVUs per hour worked seeing patients.
* Is it more optimal to bill based on Time or Complexity to achieve this target?
    `,
    isPreview: true
  },
  'coding-review': {
    title: 'Review of Coding',
    content: `
# REVIEW OF CODING

## BILLING BASED ON TIME

**Table 1: CPT Codes and Time Requirements**
| New Patient CPT Codes | Time Must be Met or Exceeded | Establish Patient CPT Codes | Time Must be Met or Exceeded |
|---|---|---|---|
| 99202 | 15-29 Minutes | 99212 | 10-19 Minutes |
| 99203 | 30-44 Minutes | 99213 | 20-29 Minutes |
| 99204 | 45-59 Minutes | 99214 | 30-39 Minutes |
| 99205 | 60-74 Minutes | 99215 | 40-59 Minutes |

**Table 2: CPT Codes and Work RVU (Example Values)**
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

* All work RVUs for annual exams have remained the same.
* Medicare wellness exams along with TCM visits also received work RVU increases.
* Some organizations may have adjusted conversion factor rate paid per RVU if they have adopted this new scale in order to maintain budget neutrality.
* Some codes did not receive any wRVU increases such as 99202. New patient visits 99203-99205 received slight increase in wRVU.
* The largest increases were for established patients 99212-99215 which received upwards of 28-45% increase in wRVU.

## BILLING BASED ON TIME (Limitations)

* Billing strictly based on time limits RVUs per hour earning potential and ultimately fails to reach threshold of 5.4 RVUs per hour.
* Examples:
    * 15 min x 4 = 99212 (0.70 RVU) x 4 = 2.80 RVUs total
    * 20 min x 3 = 99213 (1.3 RVU) x 3 = 3.90 RVUs total
    * 30 min x 2 = 99214 (1.92 RVU) x 2 = 3.84 RVUs total
    * 30 min + 15 min + 15 min = 99214 (1.92 RVU) + 99212 (0.70 RVU) x 2 = 3.32 RVUs total
    * 40 min + 20 min = 99215 (2.8 RVU) + 99213 (1.3 RVU) = 4.10 RVUs total
    * 40 min (New) + 20 min (Established) = 99203 (1.6 RVU) + 99213 (1.3 RVU) = 2.90 RVUs total
    * 45 min (New) + 15 min (Established) = 99204 (2.6 RVU) + 99212 (0.7 RVU) = 3.3 RVUs total
    * 30 min (New) + 30 min (New) = 99203 (1.6 RVU) + 99203 (1.6 RVU) = 3.2 RVUs total
    * 60 min (New) = 99205 (3.5 RVU) = 3.50 RVUs total

* Can be helpful to bill based on time if doing pre-chart review along with completing charts after visit if leads to higher level billing (total time spent on patient care including pre-charting, patient encounter and post visit wrap-up required all on same day).
* If a scheduled visit ran over the allotted time, despite being low complexity may yield higher level codes if billing based on time.
* In most cases, it is preferable to bill based on complexity and visit type to achieve the target hourly productivity.
    `,
    isPreview: true
  },
  'billing-time-vs-complexity': {
    title: 'Billing: Time vs Complexity',
    content: `
# BILLING BASED ON COMPLEXITY

**Table 4: Elements of Medical Decision Making (MDM)**
| Code | Level of MDM (Based on 2 out of 3 Elements) | Number and Complexity of Problems Addressed | Amount and/or Complexity of Data to be Reviewed and Analyzed | Risk of Complications and/or Morbidity or Mortality of Patient Management |
|---|---|---|---|---|
| 99211 | N/A | N/A | N/A | N/A |
| 99202 / 99212 | Straightforward | **Minimal:** 1 self-limited or minor problem | **Minimal or none** | **Minimal risk** |
| 99203 / 99213 | Low | **Low:** 2+ self-limited/minor problems; OR 1 stable chronic illness; OR 1 acute, uncomplicated illness/injury | **Limited:** (Must meet reqs of at least 1 of 2 categories) **Cat 1:** Tests/documents (Any combination of 2 from: Review prior external note; Review unique test result; Order unique test) **Cat 2:** Assessment requiring independent historian | **Low risk** |
| 99204 / 99214 | Moderate | **Moderate:** 1+ chronic illness w/ exacerbation/progression/side effects; OR 2+ stable chronic illnesses; OR 1 undiagnosed new problem w/ uncertain prognosis; OR 1 acute illness w/ systemic symptoms; OR 1 acute complicated injury | **Moderate:** (Must meet reqs of at least 1 of 3 categories) **Cat 1:** Tests/docs/historian (Any combination of 3 from: Review prior external note; Review unique test result; Order unique test; Assess. requiring independent historian) **Cat 2:** Independent interpretation of test **Cat 3:** Discussion of management/test interpretation w/ external provider | **Moderate risk:** Examples: Prescription drug mgmt; Decision re: minor surgery w/ risk factors; Decision re: elective major surgery w/o risk factors; Dx/Tx limited by social determinants |
| 99205 / 99215 | High | **High:** 1+ chronic illness w/ severe exacerbation/progression/side effects; OR 1 acute/chronic illness/injury posing threat to life/bodily function | **Extensive:** (Must meet reqs of at least 2 of 3 categories) **Cat 1:** Tests/docs/historian (Any combination of 3 from: Review prior external note; Review unique test result; Order unique test; Assess. requiring independent historian) **Cat 2:** Independent interpretation of test **Cat 3:** Discussion of management/test interpretation w/ external provider | **High risk:** Examples: Drug therapy requiring intensive toxicity monitoring; Decision re: elective major surgery w/ risk factors; Decision re: emergency major surgery; Decision re: hospitalization; Decision not to resuscitate/de-escalate care |

---
### THE LEVEL 3 VISIT (99203 / 99213)

* **Complexity:** Low
* **Problems:** 2+ self-limited/minor problems; OR 1 stable chronic illness; OR 1 acute, uncomplicated illness/injury.
* **Data:** Limited (Meet 1 of 2 categories: Cat 1 - Combo of 2 tests/docs review/order; Cat 2 - Independent historian).
* **Risk:** Low risk from additional testing/treatment.
* **Examples:** 2 minor problems managed conservatively; 1 stable chronic problem on meds; 1 new problem needing OTC treatment.
* **Documentation:** HPI (brief OK), Pertinent PE only (ROS not needed), Plan with recommended treatments.
* **Strategy:** Minimize using this code; most primary care visits involve multiple problems and prescriptions.

---
### THE LEVEL 4 VISIT (99204 / 99214)

* **Complexity:** Moderate
* **Problems:** 1+ chronic illness w/ exacerbation/progression/side effects; OR 2+ stable chronic illnesses; OR 1 undiagnosed new problem w/ uncertain prognosis; OR 1 acute illness w/ systemic symptoms; OR 1 acute complicated injury.
* **Data:** Moderate (Meet 1 of 3 categories: Cat 1 - Combo of 3 tests/docs/historian; Cat 2 - Independent test interpretation; Cat 3 - Discussion w/ external provider).
* **Risk:** Moderate risk from additional testing/treatment. Examples: Prescription drug management, decision re: minor surgery w/ risk factors, decision re: elective major surgery w/o risk factors, dx/tx limited by social determinants.
* **Examples:** 1 chronic problem needing med adjustment; 2 stable chronic problems on meds; 1 new problem needing prescription management.
* **Documentation:** HPI (brief OK), Pertinent PE only (ROS not needed), Plan with prescribed meds/treatments.
* **Strategy:**
    1.  Incorporate prescription meds to shift from level 3 to level 4.
    2.  Limit chronic problems to 2-3 per visit (more won't yield higher code).
* The increase from Level 3 (1.3 RVU) to Level 4 (1.92 RVU) is over 47% and accounts for most outpatient visits.

**Table 5: Common Level 4 Scenarios (Systemic Involvement + Prescription)**
| Condition | Prescription Treatment | Systemic Involvement |
|---|---|---|
| Viral Illness (COVID, Flu, Herpes, Shingles) | Paxlovid, Tamiflu, Valacyclovir, Tessalon Pearls, Rx cough syrups, Steroids | Fever, Chills, Cough, Myalgias, Headache, Painful Lesions |
| Bacterial Infection (Sinusitis, Bronchitis, OM, Strep, Cellulitis, UTI, STD) | Antibiotics (various classes), Tessalon Pearls, Rx cough syrups, Steroids | Fever, Chills, CVA pain, Lesions, Cough, Myalgias, Dysuria |
| Migraines/Headaches | Toradol injection, Rx NSAIDs, Imitrex | Visual/Auditory aura, Sensitivities |
| Musculoskeletal Injuries (LBP, Knee pain, Strains/sprains) | Rx NSAIDs, Muscle Relaxers, Steroid pak, Lidocaine patches | Neuropathy, Radiculopathy, Joint swelling, Inflammation |

---
### THE LEVEL 5 VISIT (99205 / 99215)

* **Complexity:** High
* **Problems:** 1+ chronic illness w/ severe exacerbation/progression/side effects; OR 1 acute/chronic illness/injury posing threat to life/bodily function.
* **Data:** Extensive (Meet 2 of 3 categories: Cat 1 - Combo of 3 tests/docs/historian; Cat 2 - Independent test interpretation; Cat 3 - Discussion w/ external provider).
* **Risk:** High risk from additional testing/treatment. Examples: Drug therapy needing intensive toxicity monitoring, decision re: elective major surgery w/ risk factors, decision re: emergency major surgery, decision re: hospitalization, decision not to resuscitate/de-escalate care.
* **Examples:** Sending patients to ER/hospital; Patients with high-risk conditions (cancer, risk of death/harm); Patients on high-risk meds needing monitoring; Non-compliance posing risk to health.
* **Documentation:** HPI (brief OK), Pertinent PE only (ROS not needed), Plan MUST discuss risks.
* **Strategy:** Identify these common but often under-coded patients.

**Table 6: Examples Qualifying for Level 5 Visit**
| Category | Examples |
|---|---|
| Hospital/ER Evaluation (Urgent workup/stabilization needed) | Concerns for STEMI, A.fib, Arrhythmia, PE, DVT, Sepsis, Syncope, Seizure, CHF/COPD exacerbation, Hypotension, Stroke, Hypertensive emergency, DKA, Appendicitis, SBO, Acute Renal Failure, Anemia |
| High Risk Medical Conditions (Risk of death/bodily harm requiring intervention) | Unstable Angina needing stress test; 3-vessel CAD needing CABG; New colon mass concerning for cancer; Breast cancer pt undergoing chemo/radiation; Ongoing drug/alcohol abuse, risky behaviors |
| High Risk Medications (Require close monitoring for adverse events) | Combo of opioids/benzos/sleep meds; Active chemotherapy/cancer treatments; Multiple mood stabilizers/anticonvulsants (Lithium, Lamictal, Phenytoin, etc.) |
| Non-compliance with Treatment (Risk of exacerbation/hospitalization) | Excessive alcohol despite esophageal varices/cirrhosis; Uncontrolled diabetes risking DKA; Uncontrolled BP risking stroke |

**Level 5 Documentation Examples:**
* **Example 1 (ER Referral):** Patient with exertional chest pain, respiratory distress, exam findings suggestive of DVT/PE/MI/CHF/COPD/ARF. Discussed need for urgent ER eval, patient agrees to go with family.
* **Example 2 (High-Risk Meds):** Patient on chronic Xanax + Norco. Discussed FDA black box warning re: serious risks (dizziness, sleepiness, slowed breathing, coma, death) of combining opioids and CNS depressants. Patient aware.
* **Example 3 (Non-Compliance):** Patient drinks 3-4 alcohol/day despite hx of varices/cirrhosis. Discussed risks (bleeding, ascites, life-threatening complications). Provided resources, patient refuses help currently.
    `,
    isPreview: true
  },
  'office-visits': {
    title: 'Office Visits',
    content: `
# OFFICE VISITS

The guidelines for office visits in 2021 underwent a significant revision. The history and physical exam components no longer factor into code selection. Instead, code selection is based on either:

1. Total time spent on the date of the encounter (includes pre and post time)
2. Medical Decision Making (MDM)

**For time-based billing, know these thresholds:**

| New Patient | Time | Established Patient | Time |
|-------------|------|---------------------|------|
| 99202 | 15-29 min | 99212 | 10-19 min |
| 99203 | 30-44 min | 99213 | 20-29 min |
| 99204 | 45-59 min | 99214 | 30-39 min |
| 99205 | 60-74 min | 99215 | 40-59 min |

**For MDM-based billing, the criteria are:**

* **Straightforward MDM (99212/99202)**: Minimal problems, minimal risk
* **Low MDM (99213/99203)**: Minor problems, minor risk, low complexity data
* **Moderate MDM (99214/99204)**: Multiple minor or chronic problems, medications, moderate complexity data
* **High MDM (99215/99205)**: Severe problems, life-threatening conditions, high-complexity decisions

Remember, billing by complexity (MDM) typically yields higher RVUs per hour than billing strictly by time, which is why it's important to understand MDM criteria thoroughly.

**Tips to Optimize Office Visits:**

1. **Document clearly** - Focus on MDM elements rather than extensive histories and physical exams
2. **Consider prescription management** - When managing multiple medications or initiating new ones, this often qualifies for moderate MDM (99214)
3. **Capture complexity factors** - Document social determinants, comorbidities, and risk factors that increase complexity
4. **Time documentation** - Only use time-based coding when it yields a higher level than MDM
5. **Optimize scheduling** - Consider 30-minute slots for complex patients and 15-minute slots for straightforward issues

By mastering these concepts and applying them appropriately, you can increase your RVUs per hour without increasing your patient volume or work hours.
    `,
    isPreview: true
  },
  'annual-exams': {
    title: 'Annual Exams',
    content: `
# ANNUAL EXAMS

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

* wRVU for physical exams has remained the same despite 2021 increases for other E&M codes.
* Elderly codes (65+) rarely used; Medicare Wellness Exams (different codes/wRVU) are typical.

**Table 8: Annual Exam Billing Strategy**
| Total Time Spent on Visit | Billing Code Strategy |
|---|---|
| 15 to 20 mins | 9939* |
| 30 to 40 mins | 9939* + 99213/99214/99215 (with 25 modifier) |

* **Strategy:** Addressing chronic problems during annual visit is a separate charge (split-bill). Annual exams cover screenings, immunizations, counseling. Need split-bill if addressing conditions like HTN, DM, Anxiety, etc.
* **Documentation:** Use EMR templates for efficiency. Need comprehensive PE, review screenings/immunizations, pertinent counseling.
* **Remember:** Most insurances cover annual exams yearly; split-bill results in a regular office visit charge for the patient. Need a billing code for every 15-20 mins to meet the 5.4 RVU/hour target.

**Annual Exam Billing Examples:**
* **Example 1 (Simple Annual):** 35yo M, no PMH, UTD immunizations, requests routine labs. Dx: Annual Physical Exam, Multiphasic Screening. Orders: CBC, CMP, A1C, Lipid Panel. Billing: 99395 (1.75 RVU).
* **Example 2 (Annual + Chronic):** 62yo F for annual and 6mo f/u (DM2, HTN, HLD). Due for flu shot, labs, mammogram. UTD colon/cervical screening. Dx: Annual Exam, Ess. HTN, DM2 w/o Insulin, HLD, Breast Ca Screen, Need Flu Vaccine. Orders: CBC, CMP, A1C, Lipid, Microalbumin, Flu shot, Mammogram. Billing: 99396 + 25 modifier + 99214 (1.9 RVU + 1.92 RVU = 3.82 RVUs).

**Key Takeaway:**
Annual exams provide an excellent opportunity to also address chronic conditions using the 25 modifier, which can significantly boost RVUs per visit. When patients come in for their annual, make sure to address and document any chronic condition management to maximize reimbursement appropriately.
    `,
    isPreview: true
  },
  'new-patient-visits': {
    title: 'New Patient Visits',
    content: `
# NEW PATIENT VISIT

* **Strategy:** For non-Medicare new patients, try completing the annual exam concurrently. New patient visits are usually longer, allowing time for screenings/immunizations. Insurance covers annuals yearly, split-bill yields a regular office visit charge. Only one new patient code per first encounter.
* **Example RVU Calculations (Split-Bill New Patient + Annual):**
    * **Young Adult (18-39):**
        * New Level 3 (99203) + Annual (99395) = 1.6 + 1.75 = 3.35 RVUs
        * New Annual (99385) + Est. Level 3 (99213) = 1.92 + 1.3 = 3.22 RVUs
        * New Level 4 (99204) + Annual (99395) = 2.6 + 1.75 = 4.35 RVUs
        * New Annual (99385) + Est. Level 4 (99214) = 1.92 + 1.92 = 3.84 RVUs
        * New Level 5 (99205) + Annual (99395) = 3.5 + 1.75 = 5.25 RVUs
        * New Annual (99385) + Est. Level 5 (99215) = 1.92 + 2.80 = 4.72 RVUs
    * **Adult (40-64):**
        * New Level 3 (99203) + Annual (99396) = 1.6 + 1.9 = 3.50 RVUs
        * New Annual (99386) + Est. Level 3 (99213) = 2.33 + 1.3 = 3.63 RVUs
        * New Level 4 (99204) + Annual (99396) = 2.6 + 1.9 = 4.50 RVUs
        * New Annual (99386) + Est. Level 4 (99214) = 2.33 + 1.92 = 4.25 RVUs
        * New Level 5 (99205) + Annual (99396) = 3.5 + 1.9 = 5.4 RVUs
        * New Annual (99386) + Est. Level 5 (99215) = 2.33 + 2.8 = 5.13 RVUs
* **Maximizing Productivity:** Bill new patient E&M code primary + established yearly physical for highest wRVU in most cases. Split visits can potentially yield the target 5.4 RVU/hour.

**New Patient Visit Example (Split-Bill):**
* 52yo M establishing care. PMH: Hypothyroidism, HTN, HLD. Recently moved. Takes meds (Lisinopril, Levo, Atorva) without issue. Sx Hx: Appy, Tonsils. SHx: No smoke/ETOH/drugs; Father (DM, HTN), Mother (Hypothyroid); Mixed diet, multivitamin; Bikes 3x/wk, stretches; Sleeps 7-8h; New dentist; Eye check yearly (readers only); Accountant.
* Wants labs (almost 1 yr). Never screened for colon cancer. UTD immunizations, gets flu shot yearly.
* Dx: Establish Care, Primary HTN, Hypothyroid, HLD, Annual Exam, DM Screen, Colon Ca Screen.
* Orders: CBC, CMP, A1C, Lipid, TSH, FT4, Cologuard.
* Billing: 99204 + 25 modifier + 99396 (2.6 RVU + 1.9 RVU = 4.5 RVUs).
    `,
    isPreview: true
  },
  'missed-codes': {
    title: 'Commonly Missed Codes',
    content: `
# COMMONLY MISSED CODES

### Tobacco Use Cessation Counselling
* **99406:** 3 - 10 mins (0.24 RVU)
* **99407:** > 10 mins (0.50 RVU)
* **Documentation:** Add to any visit (incl. wellness). Must doc time spent. Example: "Smoking risks (COPD, cancer, heart dz) discussed. Strategies (NRT, BHT, meds) counseled. Total time: 3 mins".
* **Strategy:** Identify tobacco users, use smart phrase for quick doc.

### Preventative Medicine Counselling or Risk Factor Reduction
* **99401:** Approx 15 mins (0.48 RVU)
* **Documentation:** Add ONLY to office visits (not wellness/annual). Must doc time spent (need >50% of time, ~8 mins, but enforcement varies).
* **Strategy:** Identify pts in social history, use smart phrase.

**Table 9: ICD-10 Codes for Preventative Counseling (99401)**
| ICD 10 Code | Description |
|---|---|
| F10.10 | Alcohol abuse, uncomplicated |
| F11.10 | Opioid abuse, uncomplicated |
| F12.10 | Cannabis abuse, uncomplicated |
| F13.10 | Sedative, hypnotic or anxiolytic abuse, uncomplicated |
| F15.90 | Other stimulant use, unspecified, uncomplicated |
| F16.90 | Hallucinogen use, unspecified, uncomplicated |
| Z91.89 | Other specified personal risk factors, NEC |
| E66.9 | Obesity, unspecified (***only for non-Medicare patients***) |

* Need ~8 mins counseling on listed conditions for 99401. Longer codes (99402-4) exist but aren't efficient. Medicare has separate obesity code.

**Preventative Counseling Documentation Examples:**
* **Alcohol:** "Pt drinks 3-4/day. Excessive. Alcohol=carcinogen (6 cancers). No safe limit (WHO). Links to early dementia. Counseled reduction, resources provided. ~8 mins".
* **Obesity:** "BMI 33. Discussed diet/exercise for BMI <25. Exercise 150 min/wk (inc HR/sweat), strength 2x/wk. Less sitting. Portion control, <1500 cal. Total plan/counseling time: ~8 mins".
* **Vaping:** "E-cigs contain nicotine, chemicals, toxicants (anti-freeze, carcinogens). Youth vulnerable (brain dev - CDC). Not approved for cessation, long-term effects unknown. Liquid causes nicotine poisoning (vomiting, sweat, dizzy, inc HR, lethargy, seizure, dyspnea). Assoc w/ popcorn lung/lipid pneumonia. Total counseling time ~8 mins".
* **Marijuana:** "Risks: anxiety, fear, panic instead of relaxation (esp w/ high dose/potency, inexperience). Large doses -> acute psychosis (hallucinations, delusions, lost identity). Distinct from longer psychotic disorders assoc. w/ use in vulnerable ppl. Recent ACC studies: 34% higher CAD risk, 20% inc MI risk, 40% inc stroke risk vs non-users. Approx counseling time: 8 mins".
* **AAFP Position on Marijuana:** Opposes recreational use. Supports decriminalization of personal possession. Recognizes benefits of intervention/treatment over incarceration. Provide counseling regardless of state laws, follow AAFP guidelines to maximize productivity.

**Preventative Counseling Billing Examples:**
* **Example 1 (Anxiety/Depression + Substance Use):** 24yo F f/u Sertraline 50mg. Good control. Smokes 0.5 PPD (down from 1 PPD). Uses marijuana 3x/wk recreationally. Counseled smoking cessation (3 min) + marijuana use (8 min). Dx: Depression, GAD, Nicotine Dep., Cannabis Abuse. Billing: 99214 + 25 modifier + 99406 + 99401 (1.92 + 0.24 + 0.48 = 2.64 RVUs).
* **Example 2 (HTN/HLD + Obesity):** 44yo M f/u Amlodipine 5mg, Pravastatin 20mg. No SE. BP < 130/80 at home. Lost 10 lbs, BMI still 41. Counseled continued weight loss + strategies (8 min). Dx: Ess HTN, HLD, Morbid Obesity, BMI 40-44.9. Billing: 99214 + 25 modifier + 99401 (1.92 + 0.48 = 2.4 RVUs).
    `,
    isPreview: true
  },
  'preventative-medicine': {
    title: 'Preventative Medicine Counseling',
    content: `
# PREVENTATIVE MEDICINE COUNSELING

## ICD 10 Codes for Preventative Counseling

| ICD 10 Code | Description |
|---|---|
| F10.10 | Alcohol abuse, uncomplicated |
| F11.10 | Opioid abuse, uncomplicated |
| F12.10 | Cannabis abuse, uncomplicated |
| F13.10 | Sedative, hypnotic or anxiolytic abuse, uncomplicated |
| F15.90 | Other stimulant use, unspecified, uncomplicated |
| F16.90 | Hallucinogen use, unspecified, uncomplicated |
| Z91.89 | Other specified personal risk factors, NEC |
| E66.9 | Obesity, unspecified ***(only for non-Medicare patients)*** |

In order to use 99401 need to spend approximately 8 minutes on providing counseling on some of the above listed conditions. There are codes for longer counselling session such as 99402 (30 mins), 99403 (45 mins) and 99404 (60 mins) although not beneficial since will minimize productivity.

Obesity counselling has different code for Medicare patients (reviewed later).

## Documentation Templates for Preventative Medicine Counseling

### Example of counseling documentation that can be incorporated into note:

**Alcohol Counselling:** 
"Patient currently drinking 3-4 alcoholic beverages daily. Excessive amounts of alcohol. Alcohol is considered a carcinogen which is linked directly to 6 different types of cancers. There is no longer any safe limits for alcohol consumption as it can causes irreversible damage per WHO guidelines. Discussed links to early onset dementia as well. Counseled patient on reducing intake at this time and resources provided, approximately spent 8 mins"

**Obesity Counselling:** 
"BMI is a measurement that can be used to identify weight problems. Patient has BMI of 33. Discussed diet and exercise to achieve target BMI <25. Get regular exercise at least 150 minutes a week. Exercise should increase heart rate and make you sweat. Do strengthening exercises at least twice a week. Spend less time sitting. Watch portion controls and restrict calories to less 1500 calories. Total time spent developing plan and counselling: approximately 8 minutes"

**Vaping Counselling:** 
"Vaping e-cigarettes contains nicotine, chemicals, and other toxicants (ie, anti-freeze, diethylene glycol and carcinogens like nitrosamines). Youth are uniquely vulnerable to the nicotine in e-cigarettes because their brains are still developing per CDC data. Vaping e-Cigarettes are not approved for smoking cessation, and the long-term health effects to users and bystanders are still unknown. The liquid from e-cigarettes and refill packs can contaminate skin, leading to nicotine poisoning. Symptoms of nicotine poisoning include vomiting, sweating, dizziness, increased heart rate, lethargy, seizures, and difficulty breathing. Also vaping has been associated with popcorn lung and lipid pneumonia. Total time spent counselling approximately 8 mins"

**Marijuana Counselling:** 
"There are risks associated with marijuana use, instead of relaxation and euphoria, some people experience anxiety, fear, distrust, or panic. These effects are more common when a person takes too much, the marijuana has an unexpectedly high potency, or the person is inexperienced. People who have taken large doses of marijuana may experience an acute psychosis, which includes hallucinations, delusions, and a loss of the sense of personal identity. These unpleasant but temporary reactions are distinct from longer-lasting psychotic disorders, such as schizophrenia, that may be associated with the use of marijuana in vulnerable individuals. Also recent studies through the American College of Cardiology (ACC) has found marijuana users are 34% more likely at risk to develop coronary artery disease (CAD), 20% increased risk of heart attacks and 40% increased risk of stroke in comparison to people who have never used the drug. Approximate time spent on counseling patient: 8 mins"

### AAFP Position on Marijuana

- The American Academy of Family Physicians (AAFP) opposes the recreational use of marijuana. However, the AAFP supports decriminalization of possession of marijuana for personal use. The AAFP recognizes the benefits of intervention and treatment for the recreational use of marijuana, in lieu of incarceration, for all individuals, including youth.
- Try to provide counselling to patients who use marijuana irrespective of state legislations, following the AAFP guidelines, and this will further help maximize productivity.

## Example Patient Scenarios

**Example 1:** Patient is 24yo F presenting today for her anxiety and depression follow up. She has been on Sertraline 50mg daily for the last 6 months. She notes her symptoms are under good control and denies any side effects from the medication. She reports smoking 0.5 pack per day which is reduced from one pack daily. She further notes using marijuana at least 3 times a week which she obtains from a local dispensary for recreational purposes. You counsel her on quitting smoking (3 mins) along with her marijuana use (8 mins).
* **Diagnosis:** 1) Depression, Unspecified 2) Generalized Anxiety Disorder 3) Nicotine Dependance, Uncomplicated 4) Cannabis, Abuse
* **Billing Code:** 99214 + 25 modifier + 99406 + 99401 (1.92 RVU + 0.24 RVU + 0.48 RVU = 2.64 RVUs)

**Example 2:** Patient is 44yo M presenting today for hypertension and hyperlipidemia follow up. He takes Amlodipine 5mg for his blood pressure along with Pravastatin 20mg for his cholesterol. He denies having any side effects from his medication. He checks his blood pressures daily and runs less than 130/80. He notes losing 10 pounds from his last office visit although his BMI is still 41. You counsel him on continuing to lose weight and provide him some strategies (8 mins).
* **Diagnosis:** 1) Essential Hypertension 2) Hyperlipidemia 3) Morbid Obesity 4) BMI 40-44.9
* **Billing Code:** 99214 + 25 modifier + 99401 (1.92 RVU + 0.48 RVU = 2.4 RVUs)
    `,
    isPreview: false
  },
  'procedures': {
    title: 'Office Procedures',
    content: `
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
    `,
    isPreview: true
  },
  'medicare-billing': {
    title: 'Medicare Billing',
    content: `
# MEDICARE BILLING

* Medicare = ~25% total national health spending (>$1 trillion/yr). Significant portion of primary care panels, expected to grow.
* Constant funding cuts/adjustments yearly (CMS goal: budget neutrality) despite growing healthcare need.
* New add-on code (G2211) reflects complexity, slight reimbursement increase.
* Most PCPs know wellness visit codes, but many additional add-on codes exist to boost productivity.
* Medicare codes can be tagged onto regular visits or wellness visits, increasing wRVU.
* Focus on optimizing these codes to reach 5.4 RVU/hour target.

### NEW CODE G2211 (0.33 RVU)

* Introduced Jan 2024 to recognize costs for primary/longitudinal care of Medicare pts.
* Added to outpatient office visits (99202-99215) for additional CMS payment.
* Use if physician is focal point for care OR providing ongoing care for single serious/complex condition.
* Previously void with modifier 25. **Beginning 2025:** can bill with modifier 25 services (Medicare Annual Exams, vaccine admin, Part B preventative services).
* **Documentation:** Some orgs require phrase "I am managing a single, serious or complex condition for patient" in A/P.
* **Strategy:** Incorporate with most Medicare visits (most qualify) to increase productivity.

**G2211 Billing Examples:**
* **Example 1 (Chronic F/U):** 68yo M HTN/Hypothyroid f/u. BP controlled (120-130s). Meds: Amlodipine 5mg, Lisinopril 10mg, Levo 75mcg. No SE. No concerns, labs UTD. Dx: HTN, Hypothyroid. Billing: 99214 + G2211 (1.92 + 0.33 = 2.25 RVUs).
* **Example 2 (Chronic F/U + Procedure):** 75yo F DM/HLD f/u. Meds: Metformin 500mg BID, Rosuva 10mg. No SE. C/o R ear hearing difficulty x 1 wk. Exam: impacted cerumen R ear. Consent obtained, manually removed wax, hearing improved. Due for labs. Dx: DM2 NIDDM, HLD, Impacted Cerumen R. Billing: 99214 + 25 modifier + 69210 + G2211 (1.92 + 0.61 + 0.33 = 2.86 RVUs).

---
### COMMON MEDICARE ADD ON CODES

* Many G-codes exist; focus on prioritized, higher probability codes.
* Covered by Medicare if used per guidelines (usually no pt out-of-pocket).
* **Bolded codes** below are most likely encountered; familiarize requirements.
* Can bill G2211 with these add-ons to boost wRVU.

**Table 10: Common Medicare Add-On Codes & wRVUs**
| Medicare Code | Description | Work RVU |
|---|---|---|
| G0442 | Annual Alcohol Misuse Screening | 0.18 |
| G0443 | Behavioral Counseling for Alcohol Misuse | 0.45 |
| **G0444** | **Annual Depression Screening** | **0.18** |
| G0445 | Behavioral Counseling to Prevent STI | 0.45 |
| **G0446** | **Intensive Behavioral Therapy for CVD** | **0.45** |
| **G0447** | **Behavioral Counseling for Obesity** | **0.45** |
| G0136 | Social Determinants of Health Risk Assessment Tool | 0.18 |
| **G0296** | **Counseling re: Need for Lung Cancer Screen (LDCT)** | **0.52** |
| **99497** | **Advance Care Planning (first 30 min)** | **1.5** |

#### G0444: Annual Depression Screening (0.18 RVU)
* Use screening tool (e.g., PHQ9).
* **Documentation:** Applies ONLY to Subsequent AWV (G0439). Must doc time spent (admin, interpret, doc, review w/ pt) > 7.5 mins. Applies to all Medicare pts. Example: "PHQ9 today is ***. Total time spent...: 8 mins. Need for further intervention: ***".
* **Limitation:** Bill once/year. CANNOT use w/ G0402/G0438 (bundled).
* **Strategy:** Bill with every eligible MAW. Usually in templates, just need to doc/bill.

#### G0446: Intensive Behavioral Therapy for CVD Risk Reduction (0.45 RVU)
* Components:
    1.  Determine aspirin appropriateness (benefit > risk for men 45-79, women 55-79).
    2.  Screen for high BP (vitals).
    3.  Intensive counseling for healthy diet in adults w/ HLD, HTN, age, other risk factors.
* **Documentation:** Add to MAW or regular office visit. Must doc time spent > 7.5 mins. Applies to all Medicare pts. Example: "BP screen done. USPSTF recs against low-dose aspirin initiation >60yo for primary ASCVD prevention discussed. Pt has CAD, cont Aspirin. Monitor BP, discussed exercise, nutrition, weight, Na restriction. Total time on intensive behavioral counseling...: ~8 mins".
* **Limitation:** Use once/year.
* **Strategy:** Incorporate into MAW if time permits or first visit of year. Most pts have HTN/HLD/DM/CAD/obesity, counseling likely already happening.

#### G0447: Behavior Counseling for Obesity (0.45 RVU)
* **Documentation:** Add to MAW or regular office visit. Must doc time spent > 7.5 mins. Applies to obese Medicare pts (BMI>30). List BMI in diagnosis. Example: "Pt BMI ***. Discussed diet/exercise for BMI <25... (details on exercise, portions, calories)... Total time developing plan/counseling: ~8 mins".
* **Limitation:** Can use 1x/wk (month 1), 1x/2wks (months 2-6), 1x/mo (months 7-12) - up to 21x/yr. Unlikely used this often; easier to bill at all follow-ups.
* **Strategy:** >40% Medicare pts obese; maximize counseling at every visit to boost RVUs.

#### G0296: Counseling for Lung Cancer Screening (LDCT) (0.52 RVU)
* Eligibility:
    1.  Age 50-80, no current lung cancer signs/symptoms.
    2.  Smoking hx >= 20 pack-years.
    3.  Current smoker OR quit within last 15 years.
* **Documentation:** Add to MAW or regular office visit. No time requirement. Example: "Pt has *** pack year hx. Discussed need for LDCT. Counseled smoking risks. Info provided, order placed, pt will schedule".
* **Limitation:** Use once/year.
* **Strategy:** Identify smokers (EMR flags help). Can also bill smoking cessation (99406/99407) same visit.

#### 99497: Advance Care Planning (First 30 mins) (1.5 RVU)
* Voluntary, face-to-face discussion (pt, family, provider) re: healthcare wishes if pt unable to decide.
* Can be w/ or w/o completing legal forms (state specific). Discussion topics: DNR, HCPOA, proxies, directives, living wills, MOLST.
* **Documentation:** Doc voluntariness, explanation of directives, who present, change in health status, pt wishes. Must doc time > 16 mins. Applies all Medicare pts. Example: "We (*** and Dr. ***) discussed life saving measures. Pt has/has not AD (copy in chart). Choices: Full Code/DNR. Appointed *** HCR, backup ***. Dr. *** willing to follow wishes. POA received: ***. Spent ~16 mins face-to-face...".
* **Limitation:** Can use once/year with G0438 or G0439.
* **Strategy:** Medicare pays if done same day as MAW. High RVU value, conduct whenever possible.

#### G0442/G0443: Annual Alcohol Misuse Screening/Counseling
* **G0442:** Screening (~15 mins) (0.18 RVU)
* **G0443:** Counseling (~15 mins) (0.45 RVU)
* **Documentation:** Add to MAW or regular visit. Must doc time spent > 7.5 mins for each. Use CAGE for screening. Example (Screening): "CAGE questions asked... Total time screening...: 8 mins".
* **Limitation:** Must screen (G0442) first, then counsel (G0443) on subsequent visit; cannot bill same day.
* **Strategy:** Only screen if time permits during MAW. Limited RVU, hard to track for subsequent counseling.

#### G0445: Behavioral Counseling to Prevent STI (~15 mins) (0.45 RVU)
* **Documentation:** Add to MAW or regular visit. Must doc time spent > 7.5 mins. Example: "Discussed latex condoms, proper use, avoiding sharing towels, wash pre/post intercourse, Hep B vax, HIV/STD testing, risks of substance abuse impairing safe sex, abstinence. Total time: 7.5 mins".
* **Limitation:** Limited use based on geography (higher rates in geriatric populations in some areas like Florida might increase use).

#### G0136: Social Determinants of Health (SDOH) Risk Assessment Tool (5-15 mins) (0.18 RVU)
* **Documentation:** Add to MAW or regular visit. Must doc time spent (min 5 mins). SDOH = nonmedical factors influencing health (conditions where people born, grow, work, live, age). Issues usually brought up by patient (education, literacy, employment, social environment, etc.). Example: "Routine SDOH screen: housing insecurity: ***, food insecurity: ***, transportation: ***, utility difficulty: ***. Total time collecting/reviewing: 5 mins".
* **Limitation:** Limited use (pt must initiate discussion). Limited wRVU potential for time spent.
    `,
    isPreview: true
  },
  'medicare-wellness': {
    title: 'Medicare Wellness Visits',
    content: `
# MEDICARE WELLNESS VISITS

The Medicare Annual Wellness (MAW) is yearly check up for Medicare patients to assess current health status and update health plan based on any changes. It includes a review of patient's medical/family history, medications, current health status and risk factors such as smoking, alcohol use, and mental health. Screenings for specific health conditions, such as depression and obesity along with assessments for cognitive function (testing for dementia or Alzheimer's). A plan for future health screenings (such as mammograms, colonoscopies, and immunizations), counseling, and preventive services.

* Can be conducted virtually for patients who can not make it to the clinic. It does not require a physical examination or ROS. Welcome to Medicare (G0402) requires vision screen although these visits are NOT considered a physical exam.
* Most institutions have templates built in to the EMR systems to streamline the encounters and assist with documentation.
* Institutions are prioritizing these visits as part of Population Health Metrics for practices and physicians.
* These visits present significant opportunity to generate wRVUs since often can be split billed with other codes and thus can help boost productivity.

## Medicare Wellness Visit Types and Coding

| Visit Type | Welcome to Medicare | First Medicare Annual Wellness | Subsequent Annual Wellness |
|---|---|---|---|
| **Eligibility** | Within the first 12 months of Medicare Part B eligibility | After 12 months of Part B eligibility and more than 12 months since welcome to Medicare (once per lifetime service) | Every year after the first Medicare AWV must be 366 days from the last AWV (for Medicare Shared Savings Plan or Medicare Advantage patients can become potentially eligible January 1 of every year) |
| **Billing Code** | G0402 | G0438 | G0439 |
| **Work RVU** | 2.6 | 2.6 | 1.92 |
| **Additional Billable Codes** | E&M 99213-99215 (Addressing any chronic conditions pertinent to patient) G2211 (starting 2025 can be added with Medicare visits and 25 modifier) 99497 (End of life discussion) G-Codes as applicable to the patient (G0444 Depression Screen can only be billed with G0439) | E&M 99213-99215 (Addressing any chronic conditions pertinent to patient) G2211 (starting 2025 can be added with Medicare visits and 25 modifier) 99497 (End of life discussion) G-Codes as applicable to the patient (G0444 Depression Screen can only be billed with G0439) | E&M 99213-99215 (Addressing any chronic conditions pertinent to patient) G2211 (starting 2025 can be added with Medicare visits and 25 modifier) 99497 (End of life discussion) G-Codes as applicable to the patient (G0444 Depression Screen can only be billed with G0439) |

## RVU Potential - Welcome to Medicare / First Medicare Wellness Visit

| Total Time Spent For Visit | Less than 15 mins | 15-30 mins | Greater than 30 mins |
|---|---|---|---|
| **Billing Codes** | G0402/G0438 (2.6 RVU) G2211 (0.33 RVU) 99213-99215 (1.3-2.8 RVU) | G0402/G0438 (2.6 RVU) G2211 (0.33 RVU) 99213-99215 (1.3-2.8 RVU) 99497 (1.5 RVU) G0446 (0.45 RVU) | G0402/G0438 (2.6 RVU) G2211 (0.33 RVU) 99213-99215 (1.3-2.8 RVU) 99497 (1.5 RVU) G0446 (0.45 RVU) G0442 (0.18 RVU) |
| **Total RVU Potential** | 4.23 – 5.73 RVU | 6.18 – 7.68 RVU | 6.36 – 7.86 RVU |

Can further add other counselling codes such as smoking cessation 99406 (0.24 RVU), need for low dose lung CT scan G0296 (0.52 RVU) or obesity counselling G0447 (0.45 RVU) to further increase productivity based on time availability during the encounter. Good opportunity to perform ear checks and determine if cerumen disimpaction is needed (0.61 RVU).

## RVU Potential - Medicare Subsequent Wellness Visit

| Total Time Spent For Visit | Less than 15 mins | 15-30 mins | 30-40 mins | Greater than 40 mins |
|---|---|---|---|---|
| **Billing Codes** | G0439 (1.92 RVU) G2211 (0.33 RVU) 99213-99215 (1.3-2.8 RVU) G0444 (0.18 RVU) | G0439 (1.92 RVU) G2211 (0.33 RVU) 99213-99215 (1.3-2.8 RVU) 99497 (1.5 RVU) G0444 (0.18 RVU) | G0439 (1.92 RVU) G2211 (0.33 RVU) 99213-99215 (1.3-2.8 RVU) 99497 (1.5 RVU) G0444 (0.18 RVU) G0446 (0.45 RVU) | G0439 (1.92 RVU) G2211 (0.33 RVU) 99213-99215 (1.3-2.8 RVU) 99497 (1.5 RVU) G0444 (0.18 RVU) G0446 (0.45 RVU) G0442 (0.18 RVU) |
| **Total RVU Potential** | 3.73 – 5.23 RVU | 5.23 – 6.73 RVU | 5.68 – 7.18 RVU | 5.86 – 7.36 RVU |

Can further add other counselling codes such as smoking cessation 99406 (0.24 RVU), need for low dose lung CT scan G0296 (0.52 RVU) or obesity counselling G0447 (0.45 RVU) to further increase productivity based on time availability during the encounter. Good opportunity to perform ear checks and determine if cerumen disimpaction is needed (0.61 RVU).

## Best Practices for Medicare Wellness Visits

### Planning and Preparation
* Review patient's history before the visit to identify opportunities for additional services
* Schedule adequate time based on patient complexity (typically 30-45 minutes)
* Utilize EMR templates specifically designed for MAW encounters to ensure complete documentation
* Identify eligibility for additional screening services that may be due

### During the Visit
* Explicitly document that this is a Medicare Wellness Visit
* Complete all required elements:
  - Health risk assessment
  - Review of medical/family history
  - List of current providers/suppliers
  - Height, weight, BMI, blood pressure measurements
  - Cognitive assessment
  - Depression screening (use validated tool)
  - Functional ability assessment
  - Safety assessment (fall risk, home safety)
  - Written screening schedule for next 5-10 years
  - List of risk factors with interventions
* Document time spent on each additional service (when applicable)
* Ensure clear distinction between wellness visit components and any chronic condition management (for split billing)

### Documentation Tips
* Clearly separate the MAW documentation from any problem-oriented E/M service
* Document time spent on each counseling service to support billing
* Include specific language for each add-on service (as shown in the examples for G0444, G0446, G0447, etc.)
* When providing advance care planning, document the specific content discussed and the time spent
* For split billing, use modifier 25 on the E/M code and ensure the documentation supports a separately identifiable service

### Optimizing Workflow and RVUs
* Identify candidates for multiple add-on services during pre-visit planning
* Develop efficient workflows for administering screenings (depression, alcohol, etc.)
* Train support staff to assist with portions of the visit where appropriate
* Create smart phrases or templates for common add-on services to streamline documentation
* Schedule MAW visits strategically during slower periods to allow adequate time
* Implement tracking systems to ensure follow-up on any required counseling services (e.g., G0443 after G0442 screening)

By thoroughly understanding Medicare wellness visit requirements and optimizing documentation and billing practices, primary care physicians can significantly increase their RVU generation while providing comprehensive preventive care to their Medicare population.
    `,
    isPreview: true
  },
  'daily-schedule': {
    title: 'Sample Daily Schedule',
    content: `
# SAMPLE OF DAILY OFFICE SCHEDULE

* **Goal:** Maximize patient care, maintain efficiency. Avg outpatient MD: 18-25 pts/day. Balance visits, admin tasks, self-care. Schedules vary (start/end times, hours, visit length, days worked).
* **Example Structure:**
    * 8:00 AM – 12:00 PM: Patient Block (15 or 30 min appts).
    * 12:00 PM – 1:00 PM: Lunch / Catch-up (in-basket, charting).
    * 1:00 PM – 5:00 PM: Patient Block (15 or 30 min appts).

**Table 15: Sample Daily Schedule Template (19 Patients)**
| # | Time | Duration | # | Time | Duration |
|---|---|---|---|---|---|
| 1 | 8:00-8:20am | 20 mins | 10 | 1:00-1:40pm | 40 mins |
| 2 | 8:20-9:00am | 40 mins | 11 | 1:40-2:00pm | 20 mins |
| 3 | 9:00-9:20am | 20 mins | 12 | 2:00-2:20pm | 20 mins |
| 4 | 9:20-10:00am | 40 mins | 13 | 2:20-2:40pm | 20 mins |
| 5 | 10:00-10:20am | 20 mins | 14 | 2:40-3:20pm | 40 mins |
| 6 | 10:20-10:40am | 20 mins | 15 | 3:20-3:40pm | 20 mins |
| 7 | 10:40-11:00am | 20 mins | 16 | 3:40-4:00pm | 20 mins |
| 8 | 11:00-11:40am | 40 mins | 17 | 4:00-4:20pm | 20 mins |
| 9 | 11:40-12:00pm | 20 mins | 18 | 4:20-4:40pm | 20 mins |
|   | 12:00-1:00pm | Lunch (1 hr) | 19 | 4:40-5:00pm | 20 mins |

### Sample Daily Schedule - Patient Encounters & Billing

**Table 16: Sample Daily Schedule - RVU Summary**
| # | Total wRVU | Visit Duration | # | Total wRVU | Visit Duration |
|---|---|---|---|---|---|
| 1 | 1.92 | 20 mins | 10 | 3.2 | 40 mins |
| 2 | 6.54 | 40 mins | 11 | 2.25 | 20 mins |
| 3 | 1.3 | 20 mins | 12 | 1.92 | 20 mins |
| 4 | 3.82 | 40 mins | 13 | 1.92 | 20 mins |
| 5 | 1.75 | 20 mins | 14 | 3.82 | 40 mins |
| 6 | 2.7 | 20 mins | 15 | 2.25 | 20 mins |
| 7 | 4.24 | 20 mins | 16 | 2.16 | 20 mins |
| 8 | 6.3 | 40 mins | 17 | 1.75 | 20 mins |
| 9 | 1.92 | 20 mins | 18 | 2.7 | 20 mins |
|   | 0 | Lunch (1 hour) | 19 | 3.25 | 20 mins |
| **Total Daily RVU:** | **55.71 RVUs** | | **RVUs per Hour:** | **6.96 RVU/ hr** | |

---
## SAMPLE OF DAILY SCHEDULE (Analysis)

* Daily generation: 55.71 RVUs = 6.96 RVUs/hour (exceeds target 5.4 RVU/hr).
* Based on national avg $45/wRVU, this day yielded >$2500 daily earnings.
* Extrapolated to 36 hr week -> >$11,000 weekly earnings from productivity (~$500k yearly).
* **Factors Decreasing Productivity:**
    * High patient no-shows/cancellations.
    * Large pediatric panel (fewer split-bill opportunities, well-child visits generate less RVU than 99214).
    * Prenatal care (paid globally end of pregnancy, visits = 0 RVU for most private insurance; Medicaid may have specific codes). Unless doing full pregnancy/delivery, referral to OB/Gyn may be better.
* **Factors Increasing Productivity:**
    * Large Medicare population (more MAW opportunities, G-code use).
    * Double booking, smaller visit slots.
    * Scribes (in-person/virtual), smart phrases, templates.
    `,
    isPreview: true
  },
  'extras': {
    title: 'Extras',
    content: `
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
    `,
    isPreview: true
  },
}

// Define the type for the module navigation
type ModuleNav = {
  id: string
  title: string
}

export default function Module() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { userRole } = useAuth()
  const { markModuleAsCompleted, completedModules } = useProgressStore()
  const navigate = useNavigate()
  const { isOpen, openChat, setCurrentModule } = useChatStore()
  
  const [module, setModule] = useState<{
    title: string
    content: string
    isPreview: boolean
  } | null>(null)
  
  const [prevModule, setPrevModule] = useState<ModuleNav | null>(null)
  const [nextModule, setNextModule] = useState<ModuleNav | null>(null)
  
  // Set the current module for the chat context
  useEffect(() => {
    if (moduleId) {
      setCurrentModule(moduleId)
    }
  }, [moduleId, setCurrentModule])
  
  // Fetch module data
  useEffect(() => {
    if (!moduleId) return
    
    // In a real app, this would be a fetch request
    const moduleInfo = moduleData[moduleId as keyof typeof moduleData]
    
    if (moduleInfo) {
      setModule(moduleInfo)
      
      // Determine previous and next modules for navigation
      const moduleKeys = Object.keys(moduleData)
      const currentIndex = moduleKeys.indexOf(moduleId)
      
      if (currentIndex > 0) {
        const prevId = moduleKeys[currentIndex - 1]
        setPrevModule({
          id: prevId,
          title: moduleData[prevId as keyof typeof moduleData].title
        })
      } else {
        setPrevModule(null)
      }
      
      if (currentIndex < moduleKeys.length - 1) {
        const nextId = moduleKeys[currentIndex + 1]
        setNextModule({
          id: nextId,
          title: moduleData[nextId as keyof typeof moduleData].title
        })
      } else {
        setNextModule(null)
      }
    }
  }, [moduleId])
  
  // Mark as completed when user reaches the bottom
  const handleMarkAsCompleted = () => {
    if (moduleId) {
      markModuleAsCompleted(moduleId)
    }
  }
  
  // If module not found or restricted
  if (!module) {
    return (
      <div className="container flex flex-col items-center justify-center p-4 text-center md:p-8">
        <div className="mb-8 flex flex-col items-center space-y-4">
          <BookOpen className="h-16 w-16 text-gray-400" />
          <h1 className="text-2xl font-bold text-medical-dark">Module Not Found</h1>
          <p className="max-w-md text-muted-foreground">
            The requested module does not exist or is not available.
          </p>
        </div>
        <Button 
          onClick={() => navigate('/dashboard')} 
          className="bg-medical-blue hover:bg-medical-blue/90 text-white"
        >
          Back to Dashboard
        </Button>
      </div>
    )
  }
  
  // If restricted content
  if (!module.isPreview && userRole !== 'paid') {
    return (
      <div className="container flex flex-col items-center justify-center p-4 text-center md:p-8">
        <div className="mb-8 flex flex-col items-center space-y-4">
          <Lock className="h-16 w-16 text-amber-500" />
          <h1 className="text-2xl font-bold text-medical-dark">Premium Content</h1>
          <p className="max-w-md text-muted-foreground">
            This module is only available with full access to the masterclass.
          </p>
        </div>
        <Button 
          onClick={() => navigate('/payment')} 
          className="bg-medical-blue hover:bg-medical-blue/90 text-white"
        >
          Upgrade to Full Access
        </Button>
      </div>
    )
  }

  // Choose icon based on module type
  let ModuleIcon = BookOpen;
  if (moduleId === 'preventative-medicine') {
    ModuleIcon = Stethoscope;
  } else if (moduleId === 'medicare-wellness') {
    ModuleIcon = Calendar;
  }

  return (
    <div className="container max-w-4xl p-4 md:p-6">
      <div className="mb-6">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/modules/${moduleId}`}>{module.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-medical-dark">{module.title}</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={openChat}
            className="border-medical-blue/20 hover:bg-medical-blue/5 hover:text-medical-blue"
          >
            <Brain className="mr-2 h-4 w-4 text-medical-blue" />
            Ask AI
          </Button>
        </div>
        <div className="mt-1 flex items-center text-muted-foreground">
          <ModuleIcon className="mr-2 h-4 w-4" />
          <span>{module.isPreview ? 'Preview Content' : 'Full Access Content'}</span>
        </div>
      </div>
      
      <Card className="mb-8 shadow-card overflow-x-hidden">
        <CardContent className="p-6">
          <Markdown 
            className="prose prose-sm sm:prose lg:prose-lg max-w-none dark:prose-invert
                      prose-headings:text-medical-dark 
                      prose-headings:font-semibold 
                      prose-a:text-medical-blue 
                      prose-p:text-medical-dark/90
                      prose-strong:text-medical-dark
                      prose-code:text-medical-blue
                      prose-code:bg-medical-blue/5
                      prose-code:px-1
                      prose-code:py-0.5
                      prose-code:rounded
                      prose-code:font-normal
                      prose-p:leading-relaxed
                      prose-li:leading-relaxed
                      prose-ul:my-6
                      prose-ol:my-6
                      prose-li:my-2
                      prose-hr:border-gray-200
                      prose-hr:my-6"
            options={{
              overrides: {
                table: {
                  props: {
                    className: "medical-table"
                  }
                },
                th: {
                  props: {
                    className: "bg-medical-blue/10 text-medical-dark font-semibold border border-medical-blue/20 p-3"
                  }
                },
                td: {
                  props: {
                    className: "p-3 border border-gray-200"
                  }
                },
                tr: {
                  props: {
                    className: "even:bg-medical-light hover:bg-medical-blue/5"
                  }
                },
                h1: {
                  props: {
                    className: "text-3xl font-bold text-medical-dark mb-6 pb-2 border-b border-gray-200"
                  }
                }
              }
            }}
          >
            {module.content}
          </Markdown>
        </CardContent>
      </Card>
      
      {/* Module navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          {prevModule && (
            <Button 
              variant="outline" 
              onClick={() => navigate(`/modules/${prevModule.id}`)}
              className="flex items-center border-medical-blue/20 hover:bg-medical-blue/5 hover:text-medical-blue"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {prevModule.title}
            </Button>
          )}
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleMarkAsCompleted} 
            variant={completedModules[moduleId as string] ? "outline" : "default"}
            disabled={completedModules[moduleId as string]}
            className={completedModules[moduleId as string] ? 
              "border-medical-green/40 text-medical-green" : 
              "bg-medical-green hover:bg-medical-green/90 text-white"}
          >
            {completedModules[moduleId as string] ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Completed
              </>
            ) : (
              'Mark as Completed'
            )}
          </Button>
        </div>
        
        <div className="flex gap-2 justify-end">
          {nextModule && (
            <Button 
              onClick={() => navigate(`/modules/${nextModule.id}`)}
              className="flex items-center bg-medical-blue hover:bg-medical-blue/90 text-white"
            >
              {nextModule.title}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* AI Chat Component (conditionally rendered) */}
      {isOpen && <AIChat />}
    </div>
  )
}