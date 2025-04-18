import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
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
`

export default function PreventativeMedicine() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'preventative-medicine'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Preventative Medicine Counseling"
      isPreview={false}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}