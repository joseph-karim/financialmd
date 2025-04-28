import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# SAMPLE DAILY OFFICE SCHEDULE

The goal is to maximize patient care while maintaining efficiency. On average, the typical outpatient doctor sees 18-25 patients per day. There needs to be balance between patient visits, administrative tasks, and self-care. Schedules can vary based on start and end times, extended hours, length of visits along with number of days worked.

## Daily Schedule Structure

* **First Patient Block (8:00 AM – 12:00 PM)**
  * Each visit: 15 or 30 minute appointments (includes time for documentation and patient interaction)

* **Lunch Break (12:00 PM – 1:00 PM)**
  * Quick and nutritious lunch to maintain energy
  * Opportunity to catch up on personal tasks such as in-basket and charting

* **Afternoon Patient Block (1:00 PM – 5:00 PM)**
  * Each visit: 15 or 30 minute appointments (includes time for documentation and patient interaction)

## Sample Daily Schedule Template (19 Patients)

<div class="overflow-x-auto">
<table class="medical-table border-collapse w-full">
<thead>
  <tr>
    <th class="bg-medical-blue/20 text-medical-dark">#</th>
    <th class="bg-medical-blue/20 text-medical-dark">Time</th>
    <th class="bg-medical-blue/20 text-medical-dark">Visit Duration</th>
    <th class="bg-medical-blue/20 text-medical-dark">#</th>
    <th class="bg-medical-blue/20 text-medical-dark">Time</th>
    <th class="bg-medical-blue/20 text-medical-dark">Visit Duration</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>1</td>
    <td>8:00-8:20am</td>
    <td>20 mins</td>
    <td>10</td>
    <td>1:00-1:40pm</td>
    <td>40 mins</td>
  </tr>
  <tr>
    <td>2</td>
    <td>8:20-9:00am</td>
    <td>40 mins</td>
    <td>11</td>
    <td>1:40-2:00pm</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>3</td>
    <td>9:00-9:20am</td>
    <td>20 mins</td>
    <td>12</td>
    <td>2:00-2:20pm</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>4</td>
    <td>9:20-10:00am</td>
    <td>40 mins</td>
    <td>13</td>
    <td>2:20-2:40pm</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>5</td>
    <td>10:00-10:20am</td>
    <td>20 mins</td>
    <td>14</td>
    <td>2:40-3:20pm</td>
    <td>40 mins</td>
  </tr>
  <tr>
    <td>6</td>
    <td>10:20-10:40am</td>
    <td>20 mins</td>
    <td>15</td>
    <td>3:20-3:40pm</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>7</td>
    <td>10:40-11:00am</td>
    <td>20 mins</td>
    <td>16</td>
    <td>3:40-4:00pm</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>8</td>
    <td>11:00-11:40am</td>
    <td>40 mins</td>
    <td>17</td>
    <td>4:00-4:20pm</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>9</td>
    <td>11:40-12:00pm</td>
    <td>20 mins</td>
    <td>18</td>
    <td>4:20-4:40pm</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td></td>
    <td>12:00-1:00pm</td>
    <td>Lunch (1 hour)</td>
    <td>19</td>
    <td>4:40-5:00pm</td>
    <td>20 mins</td>
  </tr>
</tbody>
</table>
</div>

## Daily RVU Summary

<div class="overflow-x-auto">
<table class="medical-table border-collapse w-full">
<thead>
  <tr>
    <th class="bg-medical-blue/20 text-medical-dark">#</th>
    <th class="bg-medical-blue/20 text-medical-dark">Total wRVU</th>
    <th class="bg-medical-blue/20 text-medical-dark">Visit Duration</th>
    <th class="bg-medical-blue/20 text-medical-dark">#</th>
    <th class="bg-medical-blue/20 text-medical-dark">Total wRVU</th>
    <th class="bg-medical-blue/20 text-medical-dark">Visit Duration</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>1</td>
    <td class="text-medical-blue font-semibold">1.92</td>
    <td>20 mins</td>
    <td>10</td>
    <td class="text-medical-blue font-semibold">3.2</td>
    <td>40 mins</td>
  </tr>
  <tr>
    <td>2</td>
    <td class="text-medical-blue font-semibold">6.54</td>
    <td>40 mins</td>
    <td>11</td>
    <td class="text-medical-blue font-semibold">2.25</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>3</td>
    <td class="text-medical-blue font-semibold">1.3</td>
    <td>20 mins</td>
    <td>12</td>
    <td class="text-medical-blue font-semibold">1.92</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>4</td>
    <td class="text-medical-blue font-semibold">3.82</td>
    <td>40 mins</td>
    <td>13</td>
    <td class="text-medical-blue font-semibold">1.92</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>5</td>
    <td class="text-medical-blue font-semibold">1.75</td>
    <td>20 mins</td>
    <td>14</td>
    <td class="text-medical-blue font-semibold">3.82</td>
    <td>40 mins</td>
  </tr>
  <tr>
    <td>6</td>
    <td class="text-medical-blue font-semibold">2.7</td>
    <td>20 mins</td>
    <td>15</td>
    <td class="text-medical-blue font-semibold">2.25</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>7</td>
    <td class="text-medical-blue font-semibold">4.24</td>
    <td>20 mins</td>
    <td>16</td>
    <td class="text-medical-blue font-semibold">2.16</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>8</td>
    <td class="text-medical-blue font-semibold">6.3</td>
    <td>40 mins</td>
    <td>17</td>
    <td class="text-medical-blue font-semibold">1.75</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td>9</td>
    <td class="text-medical-blue font-semibold">1.92</td>
    <td>20 mins</td>
    <td>18</td>
    <td class="text-medical-blue font-semibold">2.7</td>
    <td>20 mins</td>
  </tr>
  <tr>
    <td></td>
    <td>0</td>
    <td>Lunch (1 hour)</td>
    <td>19</td>
    <td class="text-medical-blue font-semibold">3.25</td>
    <td>20 mins</td>
  </tr>
</tbody>
</table>
</div>

<div class="bg-medical-blue/10 p-4 rounded-lg my-6 border border-medical-blue/20">
  <table class="w-full text-center">
    <tr>
      <th class="py-2 px-4 text-medical-dark">Total Daily RVU</th>
      <th class="py-2 px-4 text-medical-dark">RVUs per Hour</th>
    </tr>
    <tr>
      <td class="font-bold text-xl text-medical-blue border-r">55.71 RVUs</td>
      <td class="font-bold text-xl text-medical-blue">6.96 RVU/hr</td>
    </tr>
  </table>
</div>

## Daily Schedule Analysis

* Based on daily generation of **55.71 RVUs** which equates to **6.96 RVUs per hour**, exceeding the target of 5.4 RVU per hour.
* Based on the national average rate of $45/wRVU for family medicine, this standard work day yielded over **$2,500 in daily earnings**.
* This was an example of an 8-hour work day, however if extrapolated to 36 hours work week could easily yield over **$11,000 in weekly earnings** just from productivity (approximately **$500,000 in yearly earnings**).

### Factors That Can Decrease Productivity

* **High Patient No-Shows/Cancellations**: Unfilled slots directly impact daily RVU generation
* **Large Pediatric Panel**: Well-child visits typically generate lower RVU than equivalent adult visits (e.g., 99214)
* **Prenatal Care**: For most private insurers, prenatal visits are paid globally at the end of pregnancy (0 RVU per visit). Unless committed to full pregnancy care and delivery, referral to OB/GYN may be more productive.

### Factors That Can Increase Productivity

* **Medicare Population**: Higher percentage of Medicare patients provides more opportunities for Medicare Annual Wellness visits and G-code usage
* **Efficient Scheduling**: Strategic double-booking and shorter visit slots for straightforward issues
* **Charting Efficiency**: Using in-person or virtual scribes, along with smart phrases and templates, expedites documentation

## Detailed Patient Encounters

**Patient 1/19**
* **Appointment Length:** 20 mins
* **Insurance:** Blue Cross Blue Shield
* **Chief Complaint:** Persistent Cough for 3 Weeks
* **Description:** Patient is 25yo M with PMH of asthma presents with a persistent cough lasting for three weeks. The cough is non-productive, and the patient reports mild shortness of breath. No fever or chills are present, but the cough worsens at night. He has been using his albuterol inhaler although has not been effective. Patient is diagnosed with asthma exacerbation at the visit and oral prednisone along with Z-pack is sent in for the patient.
* **Vitals:** T: 98.6°F BP: 120/78 mmHg HR: 72 bpm RR: 16 O2 Sat: 98% BMI: 28
* **Diagnosis:** 1)Asthma Exacerbation 2)Shortness of Breath
* **Billing Code:** 99214 
* **wRVU total:** 1.92 RVU

**Patient 2/19**
* **Appointment Length:** 40 mins
* **Insurance:** Medicare (primary insurance) + Medicaid (secondary insurance)
* **Chief Complaint:** Medicare Annual Exam + Follow Up of Chronic Conditions
* **Description:** Patient is 70yo M patient for presenting for Medicare Wellness exam and follow up. He has history of hypertension, migraine, bipolar 2 disorder. He is a smoker as well for which counselling was conducted. He has follow up labs to complete today and requires medication refills for his chronic conditions. He completed advance care directive which was discussed for approximately 16 minutes. Furthermore, depression screen and cardiovascular risk reduction discussion was performed for approximately 8 minutes each.
* **Vitals:** T: 97.6°F BP: 123/88 mmHg HR: 95 bpm RR: 19 O2 Sat: 95% BMI: 27
* **Diagnosis:** 1)Medicare Wellness Visit, Subsequent 2)Depression Screen 3)Essential Hypertension 4)Migraine Syndrome 5)Bipolar 2 Disorder 6)Nicotine Dependance with Current Use
* **Billing Code:** G0439/99214/99406/G2211/G0444/G0446/99497
* **wRVU total:** 1.92 + 1.92 + 0.24 + 0.33 + 0.18 + 0.45 + 1.5 = 6.54 RVU

**Patient 3/19**
* **Appointment Length:** 20 mins
* **Insurance:** Blue Cross Anthem
* **Chief Complaint:** ER Follow Up
* **Description:** Patient is 22yo F presenting for hospital follow up. She was seen in the ER for abdominal pain 1 week prior. At the time she had normal blood work although US of the pelvis noted to have an ovarian cyst of 1.3 although no evidence of torsion. She was advised to continue supportive care and conservative management. She was also advised to follow up with her Ob/gyn regarding next steps. She has no other concerns today.
* **Vitals:** T: 97.2°F BP: 115/79 mmHg HR: 84 bpm RR: 15 O2 Sat: 99% BMI: 25
* **Diagnosis:** 1)Encounter for Examination After Treatment in Hospital 2)L Ovarian Cyst
* **Billing Code:** 99213
* **wRVU total:** 1.3 RVU

## Implementing an Optimized Schedule

### Schedule Design Principles
1. **Balance Visit Types**
   * Mix complex patients (40-minute slots) with simpler follow-ups (20-minute slots)
   * Reserve longer slots for patients with multiple chronic conditions
   * Schedule new patients when you're most alert and efficient

2. **Strategic Placement**
   * Place high-RVU encounters (Medicare Annual Wellness, TCM visits) throughout the day
   * Schedule procedure-eligible patients when staff assistance is optimal
   * Consider scheduling complex patients earlier in the day when cognitive energy is highest

3. **Buffer Time Management**
   * Build in strategic 5-minute buffers between complex patients
   * Utilize lunch period for catch-up rather than scheduling additional patients
   * Block time for administrative tasks if documentation consistently falls behind

### Template Implementation Recommendations
1. **Maintain Mixed Duration Blocks**
   * Keep the 20-minute/40-minute mixed format shown in the sample
   * Prioritize 40-minute slots for:
     * Medicare Annual Wellness visits
     * New patient evaluations
     * Complex chronic care patients
     * TCM visits (especially high-complexity ones)

2. **Protected Documentation Time**
   * Schedule 5-minute "documentation blocks" after every 3-4 patients
   * Maintain a protected lunch period for catching up and self-care
   * Consider ending patient care 30 minutes before clinic close for final documentation

3. **Staff Integration**
   * Train staff to identify opportunities for add-on codes/procedures
   * Implement pre-visit planning to identify potential billing opportunities
   * Consider MA/nurse-conducted screening to maximize provider efficiency
`

export default function DailySchedule() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'daily-schedule'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Sample Daily Schedule"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}