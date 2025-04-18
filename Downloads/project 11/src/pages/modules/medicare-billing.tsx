import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# MEDICARE BILLING

Medicare represents almost 25% of total national health spending in the country, over $1 trillion dollars yearly. Medicare patients represent a significant portion of patient panel for primary care doctors and the number of these patients is expected to grow given the aging population.

There are constant funding cuts/adjustments that are reviewed yearly, as the goal of CMS is to maintain budget neutrality, despite the growing need for healthcare among the aging population.

Recently there has been new add-on code (G2211) to reflect the complexity of delivering primary care to this population resulting in slight increased reimbursement per visit.

Most primary care doctors are familiar with Medicare wellness visit codes but there are numerous additional add-on codes that can significantly help boost productivity which should be familiarized.

These Medicare specific codes can be tagged onto regular outpatient follow up visits or during Medicare wellness visits thus increasing the wRVU per visit.

We'll review strategies as to how to optimize the use of these codes to help reach target of 5.4 RVUs per hour.

## NEW CODE G2211 (0.33 RVU)

* New CMS code introduced January 2024 to better recognize costs associated with evaluation and management for primary/longitudinal care of Medicare patients.
* The G2211 is added to outpatient office visits for additional CMS payment, to better recognize additional costs associated with treating Medicare patients.
* Code is used if the physician is continuing focal point for all needed health care services and/or with medical care services that are part of ongoing care related to a patient's single, serious condition or a complex condition.
* G2211 was previously reported with 99202-99215 Office/Outpatient E&M code only and void with modifier 25.
* Beginning 2025, can be billed on claims that use modifier 25 to report services including Medicare Annual Exams, vaccine administration or any Medicare Part B preventative services.

**Documentation:** Some organizations require the use of phrase "I am managing a single, serious or complex condition for patient" in the Assessment/Plan section of the note.

**Strategy:** Try to incorporate with as many Medicare patient visits as possible, since most visits will qualify, thus help increase productivity.

### G2211 Examples

**Example 1:** Patient is 68 yo M presenting today for hypertension and hypothyroidism follow up. He notes checking his BP daily which has been running in the 120-130 systolic range. He takes Amlodipine 5mg and Lisinopril 10mg and denies any side effects from the medication. His thyroid has been under good control with levothyroxine 75mcg daily. He denies any concerns today and is up to date with his labs.
* **Diagnosis:** 1) Hypertension 2) Hypothyroidism
* **Billing Code:** 99214 + G2211 (1.92 RVU + 0.33 RVU = 2.25 RVUs)

**Example 2:** Patient is 75yo F presenting today for diabetes and hyperlipidemia follow up. She notes taking her Metformin 500mg BID. She takes Rosuvastatin 10mg daily and denies any side effects from medication. Today she complains of hearing difficulty from her R ear that has been worsening over the last 1 week. On exam she is noted to have impacted cerumen of the ear. After obtain consent you manually remove the ear wax which patient tolerates and notes her hearing is improved. She is otherwise due for blood work today.
* **Diagnosis:** 1) Type 2 Diabetes, Non-Insulin Dependent 2) Hyperlipidemia 3) Impacted Cerumen, Right Ear
* **Billing Code:** 99214 + 25 modifier + 69210 + G2211 (1.92 RVU + 0.61 RVU + 0.33 RVU = 2.86 RVUs)

## COMMON MEDICARE ADD ON CODES

There are many Medicare add-on codes and remembering when to appropriately use every single one of them would be extremely challenging. We will focus on some of the codes that should be prioritized given the higher probability of being used during a visit.

Most of these codes start with G and followed by a number sequence. These codes if used per the guidelines will be covered by Medicare so the patient usually is not responsible for any out-of-pocket costs.

The codes that are bolded will be the most likely to be encountered, so familiarizing with the requirements is essential to help with productivity.

Can also bill code G2211 with these add-on codes to further boost the work RVUs per patient visit.

### Common Medicare Add-On Codes & wRVUs

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

### G0444: Annual Depression Screening (0.18 RVU)
* Use screening tool such as the PHQ9 to determine if patient has depression.
* **Documentation:** Applies to Subsequent AWV's only (G0439) and must document the amount time spent which includes administration, interpretation, documenting and reviewing results with the patient. Must document that this service took over half of the threshold time or 7.5 minutes. Applies to all Medicare patients.
* Example: "The PHQ9 today is ***. Total time spent administering, collecting and reviewing results: 8 mins. Need for further intervention: ***."
* **Limitation:** Can be billed once per year. Can not be used with G0402/G0438 (since bundled already).
* **Strategy:** Should be billed with every Medicare Wellness visit that is eligible. Usually already incorporated in most Medicare Wellness templates so matter of documenting and billing this code.

### G0446: Intensive Behavioral Therapy for Cardiovascular Risk Reduction (0.45 RVU)
1. Determine if aspirin treatment is appropriate for the patient for cardiovascular disease when the benefits outweigh the risks for men aged 45-79 and women 55-79.
2. Screen for high blood pressure (check vital signs).
3. Intensive behavioral counseling to promote a healthy diet for adults who already have hyperlipidemia, hypertension, advancing age, and other known risk factors for cardiovascular and diet related chronic diseases.

* **Documentation:** Can add to Medicare Wellness or regular office visit. Must document that this service took over half of the threshold time or 7.5 minutes. Applies to all Medicare patients and has three components.
* Example: "BP screening was done in the office today, continue treatment as documented. New guidance from the U.S. Preventive Service Task Force (USPSTF) recommends against initiating the use of low-dose aspirin in patients over 60 years of age for primary prevention of atherosclerotic cardiovascular disease (ASCVD). Patient has history of CAD and thus on Aspirin. Continue to monitor BP routinely every week and discussed exercise, nutrition, weight control and dietary sodium restriction Total time spent on intensive behavioral counseling for cardiovascular disease which includes developing, reviewing and discussing plan: approximately 8 mins."
* **Limitation:** Can be only be used once per year.
* **Strategy:** Try to incorporate to the MAW if time permits or first patient visit of the year to take advantage of the RVUs. Most patients have HTN, HLD, DM, CAD or obesity so already provide counseling on these things.

### G0447: Behavior Counseling for Obesity (0.45 RVU)
* **Documentation:** Can add to Medicare Wellness or regular office visit. Must document that this service took over half of the threshold time, or 7.5 minutes. Applies to all obese Medicare patients with BMI>30. List BMI in the diagnosis.
* Example: "Patient has BMI of ***. BMI is a measurement that can be used to identify weight problems. Discussed diet and exercise to achieve target BMI <25. Get regular exercise at least 150 minutes a week. Exercise should increase heart rate and make you sweat. Do strengthening exercises at least twice a week. Spend less time sitting. Watch portion controls and restrict calories. To lose 1 pound requires deficit of about 3500 calories. Total time spent developing plan and counselling patient: approximately 8 minutes."
* **Limitation:** Can be used once a week for the first for the first month, once every other week for months 2-6, and once every month for month 7-12 (up to 21 times per year). Unlikely to be used this many times, easier just to bill at all follow up visits during the year.
* **Strategy:** Given more than 40% of Medicare patients are obese, maximize counselling on obesity at every office visit to boost work RVUs.

### G0296: Counseling to Discuss Need for Lung Cancer Screening Using Low Dose CT Scan (0.52 RVU)
1. Patients must be 50-80 years of age with no current signs or symptoms of lung cancer.
2. Patient has smoking history of at least 20 pack-years.
3. Patient is currently smoking or quit smoking within the last 15 years.

* **Documentation:** Can add to Medicare Wellness or regular office visit. No time requirement.
* Example: "Patient has *** pack year history of tobacco use. Discussed need for Low dose CT given history of tobacco use. Counselled patient on risks associated with smoking. Information was provided regarding Low Dose CT, order has been placed for patient, patient will call to schedule."
* **Limitation:** Can be used once per year.
* **Strategy:** Try to identify smokers, a lot of EMR systems automatically flag these individuals. Can also bill for smoking cessation counselling (99406/99407) during the same visit increasing wRVUs.

### 99497: Advance Care Planning (First 30 mins) (1.5 RVU)
* This is voluntary, face-to-face discussion between a physician or other health provider and patient, family members and/or caregivers to discuss the patient's health care wishes if they are unable to make their own medical decisions.
* This discussion about advance directive can be with/without helping a patient complete legal forms. These can be obtained from state specific websites. 
* Discussion can include reviewing:
  - DNR orders
  - Health care powers of attorney
  - Health care proxies
  - Instruction directives
  - Living wills
  - Medical orders for life-sustaining treatment

* **Documentation:** Document that this discussion was voluntary, explanation of advance directives, who was present at the time with patient, change in the patient's health status and the patient's health care wishes if they become unable to make their own decisions. Must document that this service took over half of the threshold time or 16 minutes. Applies to all Medicare patients.
* Example: "We (*** and Dr. ***) have discussed in detail the means which can be taken as life saving measures. Patient does/does not have an advance directive - a copy will be placed in the chart. At this time, patient has made the following choices: Full Code/DNR. Patent has appointed *** as primary HCR. The back up HCR is ***. I, Dr. *** am willing to follow the wishes expressed above and additional Advance Directives. Power of Attorney received: *** I spent approximately 16 minutes face to face with patient and spouse/SO in the planning, discussion, and completion of advanced directives."
* **Limitation:** Can be used once per year with G0438 or G0439.
* **Strategy:** Medicare will pay for this service if performed on same day as MAW, since this is worth a lot of RVUs should try to conduct at every opportunity.

### Additional Medicare Add-On Codes

#### Annual Alcohol Misuse Screening and Counseling
* **G0442:** Screening an individual for alcohol use for approximately 15 mins (0.18 RVU)
* **G0443:** Preventative counseling on alcohol misuse to an individual for approximately 15 mins (0.45 RVU)
* **Documentation:** Can add to Medicare Wellness or regular office visit. Must document the amount time spent. Need to achieve at least 50% of the 15 mins time requirement, approximately 7.5 mins for each.
  
* Can use "CAGE" questionnaire for screening purposes and alcohol counseling as discussed previously
  
* Example: "Have you ever felt you should cut down on your drinking? Have people annoyed you by criticizing your drinking? Have you ever felt bad or guilty about your drinking? Eye-opener: have you ever had a drink first thing in the morning to steady your nerves? Total time spent screening, collecting and reviewing results: 8 mins."
  
* **Limitation:** There must be an initial encounter where screening was conducted (G0442) after which the counseling can be provided on a subsequent visit (G0443), cannot be billed during same visit.
  
* **Strategy:** Only conduct screening for alcohol if time permits during MAW, however limited wRVU potential and difficulty keeping track of when to provide counseling subsequently.

#### Behavioral Counseling to Prevent Sexually Transmitted Infection
* **G0445:** Preventative counseling STD prevention to an individual for approximately 15 mins (0.45 RVU)
* **Documentation:** Can add to Medicare Wellness or regular office visit. Must document the amount time spent. Need to achieve at least 50% of the 15 mins time requirement, approximately 7.5 mins.
  
* Example: "Discussed the use latex condoms every time you have sex. Try to use condoms for the entire sex act. Condoms are not 100% effective at preventing disease or pregnancy. However, they are extremely effective if used properly. Learn how to use condoms correctly. Avoid sharing towels or underclothing. Wash before and after intercourse. Get a vaccination for hepatitis B. Get tested for HIV and other STDs. If you have a problem with drug or alcohol abuse, get help. People who are drunk or on drugs often fail to have safe sex. Consider that abstinence is the only sure way to prevent STDs. Total time spent: 7.5 mins"

* **Limitation:** Limited use potential based on geography. Some parts of the country such as Florida have higher rates of STD in the geriatric population where this code could be utilized more.

#### Social Determinants of Health Risk Assessment Tool
* **G0136:** Social determinant of health risk assessment screening for approximately 5-15 mins (0.18 RVU)
* **Documentation:** Can add to Medicare Wellness or regular office visit. Must document the amount time spent, minimum 5 mins.

* Social determinants of health (SDOH) are the nonmedical factors that influence health outcomes. They are the conditions in which people are born, grow, work, live, and age, and the wider set of forces and systems shaping the conditions of daily life. These issues would need to be brought to attention by the patient related to education, literacy, employment, social environment, etc.

* Example: "Routine social determinant of health screening: any issues pertaining to housing insecurity: ***, any issues related to food insecurity: ***, any issues pertaining to transportation: *** and any issues related utility difficulty: ***. Total time spent collecting and reviewing with patient: 5 mins"
  
* **Limitation:** Limited use potential since discussion has to be initiated by the patient. Limited wRVU potential as well for the time spent.
`

export default function MedicareBilling() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'medicare-billing'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Medicare Billing"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}