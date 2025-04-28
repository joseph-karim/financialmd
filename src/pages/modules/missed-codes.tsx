import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
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
`

export default function MissedCodes() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'missed-codes'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Commonly Missed Codes"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}