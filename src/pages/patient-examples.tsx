import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileText, CheckCircle2, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AIChat } from '@/components/core/ai-chat'
import { useChatStore } from '@/store/chat-store'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Markdown from 'markdown-to-jsx'

export default function PatientExamples() {
  const [activeTab, setActiveTab] = useState('level5')
  const { isOpen, openChat } = useChatStore()
  
  const examplesContent = {
    level5: `
# Level 5 Visit Documentation Examples

**Example 1:** "Patient is presenting to the office with exertional chest pain along with mild respiratory distress. On exam patient is noted to have crackles in the lower lung quadrants with 4+ pitting edema of bilateral feet. Concerned for DVT, PE, MI, CHF exacerbation, COPD exacerbation or acute renal failure. Discussed the need for urgent evaluation in the ER for treatment and stabilization. Patient agreeable to go with family member immediately and refusing ambulance transport at this time."

**Example 2:** "Patient has history of benzodiazepine dependance on chronic Xanax (Alprazolam) along with Norco (Hydrocodone) TID for chronic back pain. Per FDA black box warning, there is serious risks of taking opioids along with benzodiazepines or other central nervous system (CNS) depressant medicines. Serious risks include unusual dizziness or lightheaded, extreme sleepiness, slowed or difficult breathing, coma, and even death. Patient has been made aware of these risks."

**Example 3:** "Patient continues to drink 3-4 alcoholic beverages daily despite having history of esophageal varices and liver cirrhosis. Discusses risks of bleeding, ascites and other life threating complications. Resources were provided to patient to help quit although patient is refusing at this time."
    `,
    annual: `
# Annual Exams Examples

**Example 1:** Patient is 35yo M presenting today for his yearly physical. He has no prior medical history and is up to date on all his immunizations. He would like to get routine blood work conducted today.
* **Diagnosis:** 1) Annual Physical Exam 2) Multiphasic Screening
* **Orders:** CBC, CMP, A1C, Lipid Panel
* **Billing Code:** 99395 (1.75 RVU)

**Example 2:** Patient is 62yo F presenting today for her annual and 6 month follow up of her chronic conditions. She has history of Type 2 Diabetes, Hypertension and Hyperlipidemia. She is due for her flu shot today along with blood work to assess the state of her chronic conditions. She is up to date with her colon cancer and cervical cancer screening although is currently due for her yearly mammogram.
* **Diagnosis:** 1) Annual Physical Exam 2) Essential Hypertension 3) Type 2 Diabetes without Insulin 4) Hyperlipidemia 5) Breast Cancer Screening 6) Need for Influenza Vaccine
* **Orders:** CBC, CMP, A1C, Lipid Panel, Microalbumin, Flu shot, Screening Mammogram Bilateral
* **Billing Code:** 99396 + 25 modifier + 99214 (1.9 RVU + 1.92 RVU = 3.82 RVUs)
    `,
    newPatient: `
# New Patient Visit Example

**Example:** Patient is 52yo M presenting today to establish care. He has PMH of Hypothyroidism, Hypertension and Hyperlipidemia. He was following with a primary care physician out of state and had recently moved into town 6 months prior. He reports taking his Lisinopril, Levothyroxine and Atorvastatin as directed and never experienced any side effects. The only surgery he has had was his appendix and tonsils removed as a child. He does not smoke, drink or use any illicit drugs. He states his father had history of diabetes and hypertension, while his mother had history of hypothyroidism. He reports having a mixed diet and using a daily multivitamin. He rides his bike three times a week and does some stretches for his physical activity. He gets 7-8 hours of sleep nightly. He recently got established with a new dentist in town for his routine cleaning. He gets his eyes checked every year although only requires reading glasses. He works as accountant. He would like to get his blood work checked as it has been almost a year. He further states he has never been screened for colon cancer although was advised of this previously. He is up to date with all his immunizations and reports getting his flu shot in the fall every year.
* **Diagnosis:** 1) Establish Care New Doctor 2) Primary Hypertension 3) Hypothyroidism 4) Hyperlipidemia 5) Annual Physical Exam 6) Screening for Diabetes 7) Colon Cancer screening
* **Orders:** CBC, CMP, A1C, Lipid Panel, TSH, FT4, Cologuard
* **Billing Code:** 99204 + 25 modifier + 99396 (2.6 RVU + 1.9 RVU = 4.5 RVUS)
    `,
    preventative: `
# Preventative Medicine Counseling Examples

**Example 1:** Patient is 24yo F presenting today for her anxiety and depression follow up. She has been on Sertraline 50mg daily for the last 6 months. She notes her symptoms are under good control and denies any side effects from the medication. She reports smoking 0.5 pack per day which is reduced from one pack daily. She further notes using marijuana at least 3 times a week which she obtains from a local dispensary for recreational purposes. You counsel her on quitting smoking (3 mins) along with her marijuana use (8 mins).
* **Diagnosis:** 1) Depression, Unspecified 2) Generalized Anxiety Disorder 3) Nicotine Dependance, Uncomplicated 4) Cannabis, Abuse
* **Billing Code:** 99214 + 25 modifier + 99406 + 99401 (1.92 RVU + 0.24 RVU + 0.48 RVU = 2.64 RVUs)

**Example 2:** Patient is 44yo M presenting today for hypertension and hyperlipidemia follow up. He takes Amlodipine 5mg for his blood pressure along with Pravastatin 20mg for his cholesterol. He denies having any side effects from his medication. He checks his blood pressures daily and runs less than 130/80. He notes losing 10 pounds from his last office visit although his BMI is still 41. You counsel him on continuing to lose weight and provide him some strategies (8 mins).
* **Diagnosis:** 1) Essential Hypertension 2) Hyperlipidemia 3) Morbid Obesity 4) BMI 40-44.9
* **Billing Code:** 99214 + 25 modifier + 99401 (1.92 RVU + 0.48 RVU = 2.4 RVUs)
    `,
    procedures: `
# Office Procedures Examples

**Example 1:** Patient is 31yo M presenting today complaints of R ear pain. He notes the pain has been going on for at least one week. He notes he has tried taking some Ibuprofen and Tylenol although it did not improve his symptoms. On exam, patient was noted to have a lot of wax build up in the R ear. Using a curette, you manually remove the cerumen. On further inspection the R tympanic membrane is inflamed. He is diagnosed with an inner ear infection and prescribed Augmentin.
* **Diagnosis:** 1) Otitis Media, Right Ear 2) Otalgia, Right Ear 3) Impacted Cerumen, Right Ear
* **Billing Code:** 99214 + 25 modifier + 69210 (1.92 RVU + 0.61 RVU = 2.53 RVUs)

**Example 2:** Patient is 58yo F presenting today for gout follow up. She notes taking her Allopurinol 100mg daily and denies any flare ups. Today she complains of skin tags on her neck which have been getting more irritated recently. The skin tags get caught in her clothing along with jewelry and was hoping to get them removed. On inspection, she has three small skin tags on the base of her R neck. After obtaining consent and cleaning area with alcohol wipe, the skin tags are easily excised using a pair of sterile scissors. Patient tolerated the procedure well and did not have any bleeding or require any bandages.
* **Diagnosis:** 1) Gout 2) Acrochordon
* **Billing Code:** 99213 + 25 modifier + 11200 (1.3 RVU + 0.80 RVU = 2.1 RVUS)
    `,
    g2211: `
# New Code G2211 Examples

**Example 1:** Patient is 68 yo M presenting today for hypertension and hypothyroidism follow up. He notes checking his BP daily which has been running in the 120-130 systolic range. He takes Amlodipine 5mg and Lisinopril 10mg and denies any side effects from the medication. His thyroid has been under good control with levothyroxine 75mcg daily. He denies any concerns today and is up to date with his labs.
* **Diagnosis:** 1) Hypertension 2) Hypothyroidism
* **Billing Code:** 99214 + G2211 (1.92 RVU + 0.33 RVU = 2.25 RVUs)

**Example 2:** Patient is 75yo F presenting today for diabetes and hyperlipidemia follow up. She notes taking her Metformin 500mg BID. She takes Rosuvastatin 10mg daily and denies any side effects from medication. Today she complains of hearing difficulty from her R ear that has been worsening over the last 1 week. On exam she is noted to have impacted cerumen of the ear. After obtain consent you manually remove the ear wax which patient tolerates and notes her hearing is improved. She is otherwise due for blood work today.
* **Diagnosis:** 1) Type 2 Diabetes, Non-Insulin Dependent 2) Hyperlipidemia 3) Impacted Cerumen, Right Ear
* **Billing Code:** 99214 + 25 modifier + 69210 + G2211 (1.92 RVU + 0.61 RVU + 0.33 RVU = 2.86 RVUS)
    `,
    tcm: `
# Transition Care Management Examples

**Example 1:** Patient is 72yo M presenting today for hospital discharge follow up. He was admitted for cellulitis of his R leg and released 8 days before. While in the hospital he was treated with IV antibiotics and given fluids. He had some swelling of his R leg although lower extremity US was negative for DVT. He was discharged home with 5 days of oral antibiotics which he completed. He notes the redness and swelling has gone away fully. He has history of diabetes and would like his A1C checked today in office.
* **Diagnosis:** 1) Hospital Discharge Follow Up 2) Cellulitis Lower Extremity 3) R Leg Swelling 4) Type 2 Diabetes
* **Billing Code:** 99495 + 25 modifier + 99213 = (2.78 RVU + 1.3 RVU) = 4.08 RVUs

**Example 2:** Patient is 67yo F presenting today for hospital discharge follow up. She was admitted for NSTEMI for which she underwent PCI and required 2 stent placement. She was discharged 3 days prior and will be starting cardiac rehab next week. She was started on Aspirin, Plavix, Metoprolol, Atorvastatin and Lisinopril and has been taking her medications as directed. She still notes continuing to smoke 1 pack per day. Furthermore, she has gained 15 pounds over the last 3 months and her BMI has increased from 33 to 37. You counsel her on quitting smoking (3 min) along with her increased weight and obesity (8 min).
* **Diagnosis:** 1) Hospital Discharge Follow Up 2) NSTEMI 3) CAD of Native Artery 4) CAD s/p Stent Placement 5) Nicotine Dependance, current use 6) Severe Obesity 7) BMI 37-37.9
* **Billing Code:** 99496 + 25 modifier + 99406 + G0447 = (3.79 RVU + 0.24 RVU + 0.45 RVU) = 4.48 RVUs
    `,
    daily: `
# Sample Daily Schedule Examples

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
* **Billing Code:** G0439 / 99214 / 99406 / G2211 / G0444 / G0446 / 99497
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
    `
  }

  return (
    <div className="container max-w-6xl p-4 md:p-6">
      <div className="flex flex-col gap-8">
        {/* Header with breadcrumb */}
        <div>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/patient-examples">Patient Examples</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-medical-dark">Patient Examples</h1>
              <p className="text-muted-foreground mt-1">
                Real-world patient scenarios with proper billing and coding
              </p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openChat}
              className="border-medical-blue/20 hover:bg-medical-blue/5 hover:text-medical-blue"
            >
              <Brain className="mr-2 h-4 w-4 text-medical-blue" />
              Ask AI About Examples
            </Button>
          </div>
        </div>

        {/* Tabs for different example types */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-transparent p-0 h-auto mb-6">
            <TabsTrigger 
              value="level5"
              className="border border-medical-blue/20 data-[state=active]:border-medical-blue 
                        data-[state=active]:bg-medical-blue data-[state=active]:text-white rounded-full px-4"
            >
              Level 5 Visits
            </TabsTrigger>
            <TabsTrigger 
              value="annual"
              className="border border-medical-blue/20 data-[state=active]:border-medical-blue 
                        data-[state=active]:bg-medical-blue data-[state=active]:text-white rounded-full px-4"
            >
              Annual Exams
            </TabsTrigger>
            <TabsTrigger 
              value="newPatient"
              className="border border-medical-blue/20 data-[state=active]:border-medical-blue 
                        data-[state=active]:bg-medical-blue data-[state=active]:text-white rounded-full px-4"
            >
              New Patient
            </TabsTrigger>
            <TabsTrigger 
              value="preventative"
              className="border border-medical-blue/20 data-[state=active]:border-medical-blue 
                        data-[state=active]:bg-medical-blue data-[state=active]:text-white rounded-full px-4"
            >
              Preventative Counseling
            </TabsTrigger>
            <TabsTrigger 
              value="procedures"
              className="border border-medical-blue/20 data-[state=active]:border-medical-blue 
                        data-[state=active]:bg-medical-blue data-[state=active]:text-white rounded-full px-4"
            >
              Office Procedures
            </TabsTrigger>
            <TabsTrigger 
              value="g2211"
              className="border border-medical-blue/20 data-[state=active]:border-medical-blue 
                        data-[state=active]:bg-medical-blue data-[state=active]:text-white rounded-full px-4"
            >
              G2211 Code
            </TabsTrigger>
            <TabsTrigger 
              value="tcm"
              className="border border-medical-blue/20 data-[state=active]:border-medical-blue 
                        data-[state=active]:bg-medical-blue data-[state=active]:text-white rounded-full px-4"
            >
              TCM
            </TabsTrigger>
            <TabsTrigger 
              value="daily"
              className="border border-medical-blue/20 data-[state=active]:border-medical-blue 
                        data-[state=active]:bg-medical-blue data-[state=active]:text-white rounded-full px-4"
            >
              Daily Schedule
            </TabsTrigger>
          </TabsList>

          {Object.entries(examplesContent).map(([key, content]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <Card className="shadow-card">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-medical-blue" />
                    <CardTitle>{key === 'level5' ? 'Level 5 Visit Examples' : 
                                key === 'annual' ? 'Annual Exam Examples' : 
                                key === 'newPatient' ? 'New Patient Visit Example' :
                                key === 'preventative' ? 'Preventative Medicine Counseling Examples' :
                                key === 'procedures' ? 'Office Procedures Examples' :
                                key === 'g2211' ? 'G2211 Code Examples' :
                                key === 'tcm' ? 'Transition Care Management Examples' :
                                'Sample Daily Schedule Examples'}</CardTitle>
                  </div>
                  <CardDescription>
                    {key === 'level5' ? 'Documentation examples for high complexity visits' : 
                     key === 'annual' ? 'Annual physical exam with proper coding' : 
                     key === 'newPatient' ? 'New patient intake with comprehensive documentation' : 
                     key === 'preventative' ? 'Examples of preventative counseling documentation' : 
                     key === 'procedures' ? 'Common in-office procedures with billing codes' : 
                     key === 'g2211' ? 'Examples using the Medicare continuity of care code' : 
                     key === 'tcm' ? 'Post-hospitalization follow-up visit coding' : 
                     'Examples from a productive daily schedule'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[65vh]">
                    <div className="p-6">
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
                                  prose-li:my-2"
                        options={{
                          overrides: {
                            li: {
                              props: {
                                className: "flex gap-2 items-start"
                              }
                            },
                            ul: {
                              props: {
                                className: "space-y-2 my-4"
                              }
                            },
                            strong: {
                              props: {
                                className: "text-medical-blue font-semibold"
                              }
                            }
                          }
                        }}
                      >
                        {content}
                      </Markdown>

                      <div className="mt-8 flex justify-center">
                        <div className="inline-flex items-center justify-center gap-1.5 rounded-full bg-medical-blue/10 px-3 py-1.5 text-sm font-medium text-medical-blue">
                          <CheckCircle2 className="h-4 w-4" />
                          Use these examples as templates for your documentation
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

      </div>

      {/* AI Chat Component (conditionally rendered) */}
      {isOpen && <AIChat />}
    </div>
  )
}