import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Module components
import Introduction from './modules/introduction'
import PhysicianReimbursement from './modules/physician-reimbursement'
import CodingReview from './modules/coding-review'
import BillingTimeVsComplexity from './modules/billing-time-vs-complexity'
import OfficeVisits from './modules/office-visits'
import AnnualExams from './modules/annual-exams'
import NewPatientVisits from './modules/new-patient-visits'
import MissedCodes from './modules/missed-codes'
import PreventativeMedicine from './modules/preventative-medicine'
import Procedures from './modules/procedures'
import MedicareBilling from './modules/medicare-billing'
import MedicareWellness from './modules/medicare-wellness'
import TransitionCareManagement from './modules/transition-care-management'
import DailySchedule from './modules/daily-schedule'
import Extras from './modules/extras'
import { LoadingScreen } from '@/components/ui/loading-screen'

// Map of moduleId to component
const moduleMap = {
  'introduction': Introduction,
  'physician-reimbursement': PhysicianReimbursement,
  'coding-review': CodingReview,
  'billing-time-vs-complexity': BillingTimeVsComplexity,
  'office-visits': OfficeVisits,
  'annual-exams': AnnualExams,
  'new-patient-visits': NewPatientVisits,
  'missed-codes': MissedCodes,
  'preventative-medicine': PreventativeMedicine,
  'procedures': Procedures,
  'medicare-billing': MedicareBilling,
  'medicare-wellness': MedicareWellness,
  'transition-care-management': TransitionCareManagement,
  'daily-schedule': DailySchedule,
  'extras': Extras
}

export default function ModuleRouter() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  
  // Redirect to 404 if module doesn't exist
  useEffect(() => {
    if (moduleId && !moduleMap[moduleId as keyof typeof moduleMap]) {
      navigate('/not-found', { replace: true })
    }
  }, [moduleId, navigate])
  
  if (!moduleId) {
    return <LoadingScreen />
  }
  
  // Get the component for this module
  const ModuleComponent = moduleMap[moduleId as keyof typeof moduleMap]
  
  // If module exists, render it
  if (ModuleComponent) {
    return <ModuleComponent />
  }
  
  // Fallback while redirecting
  return <LoadingScreen />
}