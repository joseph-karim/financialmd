import { useNavigate } from 'react-router-dom'
import { BookOpen, Brain, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useProgressStore } from '@/store/progress-store'
import { useChatStore } from '@/store/chat-store'
import { AIChat } from '@/components/core/ai-chat'

export default function PreventativeMedicine() {
  const navigate = useNavigate()
  const { markModuleAsCompleted, completedModules } = useProgressStore()
  const { isOpen, openChat } = useChatStore()
  
  // Module content
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
  
  // Define the moduleId for this page
  const moduleId = "preventative-medicine"
  
  // For navigation between modules
  const prevModule = {
    id: "missed-codes",
    title: "Commonly Missed Codes"
  }
  
  const nextModule = {
    id: "procedures",
    title: "Office Procedures"
  }
  
  // Mark as completed when user interacts with the page
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
              <BreadcrumbLink href={`/modules/${moduleId}`}>Preventative Medicine Counseling</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-medical-dark">Preventative Medicine Counseling</h1>
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
          <span>Full Access Content</span>
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
            {moduleContent}
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