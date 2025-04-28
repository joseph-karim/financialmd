import { useNavigate } from 'react-router-dom'
import { BookOpen, Brain, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useAuth } from '@/contexts/auth-context'
import { useProgressStore } from '@/store/progress-store'
import { useChatStore } from '@/store/chat-store'
import { AIChat } from '@/components/core/ai-chat'

export default function MedicareWellness() {
  const navigate = useNavigate()
  const { userRole } = useAuth()
  const { markModuleAsCompleted, completedModules } = useProgressStore()
  const { isOpen, openChat } = useChatStore()
  
  // Module content
  const moduleContent = `
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
  `
  
  // For this module's ID
  const moduleId = "medicare-wellness"
  
  // Handle completion
  const handleMarkAsCompleted = () => {
    markModuleAsCompleted(moduleId)
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
              <BreadcrumbLink href={`/modules/${moduleId}`}>Medicare Wellness Visits</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-medical-dark">Medicare Wellness Visits</h1>
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
          <BookOpen className="mr-2 h-4 w-4" />
          <span>{userRole === 'paid' ? 'Full Access Content' : 'Preview Content'}</span>
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
                      prose-hr:my-6
                      prose-h3:mt-8
                      prose-h2:text-2xl
                      prose-h3:text-xl
                      prose-h4:text-lg"
            options={{
              overrides: {
                table: {
                  props: {
                    className: "medical-table w-full overflow-x-scroll block md:table"
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
            {moduleContent}
          </Markdown>
        </CardContent>
      </Card>
      
      {/* Module navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/modules/medicare-billing')}
            className="flex items-center border-medical-blue/20 hover:bg-medical-blue/5 hover:text-medical-blue"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Medicare Billing
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleMarkAsCompleted} 
            variant={completedModules[moduleId] ? "outline" : "default"}
            disabled={completedModules[moduleId]}
            className={completedModules[moduleId] ? 
              "border-medical-green/40 text-medical-green" : 
              "bg-medical-green hover:bg-medical-green/90 text-white"}
          >
            {completedModules[moduleId] ? (
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
          <Button 
            onClick={() => navigate('/modules/daily-schedule')}
            className="flex items-center bg-medical-blue hover:bg-medical-blue/90 text-white"
          >
            Sample Daily Schedule
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* AI Chat Component (conditionally rendered) */}
      {isOpen && <AIChat />}
    </div>
  )
}