import { useEffect } from 'react'
import { ModuleLayout } from '@/components/module/module-layout'
import { ModuleContent } from '@/components/module/module-content'
import { useChatStore } from '@/store/chat-store'

const moduleContent = `
# Physician Reimbursement

## Understanding Compensation Models

* Per American Academy of Family Medicine (AAFP), average reported full-time family physician total compensation in 2022 was $274,359 (Only 7000 respondents out of 100,000+ primary care doctors) (range of $120,000 - $1.6 million).

* Total compensation is derived from combination of base salary, productivity (RVUs), quality performance, value-based payments and other non-RVU incentives such panel size, after hours service, meetings and mid-level supervision (NP/PA).

* Depending on the organization, combination of the above will determine final total pay, although total RVUs generated usually accounts for highest percentage of total compensation.

* Physician in private practice or direct primary care (DPC) can be paid on collections generated and subtracting total expenses.

* Other organizations reimburse based on salary, years of experience and quality metrics and do not rely on RVUs.

## The Secret of RVU Rates

* The most important factor is the rate paid per RVU; this is a very well-kept secret of most health organizations, usually last information disclosed before signing a contract.

* Most large organizations rely on MGMA reports or other benchmarking reports to determine the "fair market value" to pay per RVU.

* The hospital-owned medical groups or affiliated physician practices can contribute data to the MGMA's research and benchmarking efforts, which doctors do not have access to readily although can be purchased for a fee.

* The rate paid per RVU significantly determines your pay and can vary widely between health organizations even within the same city as much as 30%. There can also be tier levels based on productivity.

* National average for Family Medicine outpatient is around $45 per RVU. This can vary significantly and be as low as $24 per RVU (Indiana University Health) upwards of $80 per RVU (Signature Health Massachusetts).

## CPT Codes and Reimbursement

* CPT codes are the most common way to bill for the work done in the outpatient setting in the United States. Consists of billing codes 99*** in addition to procedure and modifier codes.

* Each code has an assigned RVU value, when multiplied by the RVU rate determines your reimbursement for that service rendered.

* Most primary care doctors are familiar with the basic billing codes. There are many additional codes that should be captured more frequently to better reflect the work being doing and ultimately increase pay.

* Coding is taught poorly in most residency programs, ACGME requirements for this is very minimal. Most experience is attained in the outpatient setting and can vary depending on the savviness of the faculty.

* Most physicians who work for large health care organization are largely seen as referral sources for their specialists. Most organizations are not incentivized to teach billing and coding well to maximize reimbursement for primary care doctors.

* Despite having a billing and coding department, often just provided a list of codes although never instructed on full integration potential into practice.

* Higher reimbursement, regardless of being an employed physician through an organization or in private practice, requires better productivity achieved through improved coding.

## Reaching Your Financial Goal ($400K+)

* To earn $400,000 yearly based on national average of rate of $45 per RVU would require to generate 8890 RVUs during the year.

* Most outpatient doctors work on average of 46 weeks of the year spending around 36h of patient contact hours per week.

* Doing the math indicates you would need to generate approximately 193 RVUs per week or 5.4 RVUs per hour worked seeing patients.

* Is it more optimal to bill based on Time or Complexity to achieve this target? (We'll explore this in the following modules)
`

export default function PhysicianReimbursement() {
  const { setCurrentModule } = useChatStore()
  const moduleId = 'physician-reimbursement'
  
  // Set the current module for the chat context
  useEffect(() => {
    setCurrentModule(moduleId)
  }, [setCurrentModule])
  
  return (
    <ModuleLayout 
      moduleId={moduleId}
      title="Physician Reimbursement"
      isPreview={true}
    >
      <ModuleContent content={moduleContent} />
    </ModuleLayout>
  )
}