// Module navigation data
export type ModuleNavItem = {
  id: string
  title: string
  isPreview: boolean
}

// This array defines the order of modules
export const moduleNavItems: ModuleNavItem[] = [
  { id: 'introduction', title: 'Introduction', isPreview: true },
  { id: 'physician-reimbursement', title: 'Physician Reimbursement', isPreview: true },
  { id: 'coding-review', title: 'Review of Coding', isPreview: true },
  { id: 'billing-time-vs-complexity', title: 'Billing: Time vs Complexity', isPreview: true },
  { id: 'office-visits', title: 'Office Visits', isPreview: true },
  { id: 'annual-exams', title: 'Annual Exams', isPreview: true },
  { id: 'new-patient-visits', title: 'New Patient Visits', isPreview: true },
  { id: 'missed-codes', title: 'Commonly Missed Codes', isPreview: true },
  { id: 'preventative-medicine', title: 'Preventative Medicine Counseling', isPreview: false },
  { id: 'procedures', title: 'Office Procedures', isPreview: true },
  { id: 'medicare-billing', title: 'Medicare Billing', isPreview: true },
  { id: 'medicare-wellness', title: 'Medicare Wellness Visits', isPreview: true },
  { id: 'transition-care-management', title: 'Transition Care Management', isPreview: true },
  { id: 'daily-schedule', title: 'Sample Daily Schedule', isPreview: true },
  { id: 'extras', title: 'Extras', isPreview: true },
]

// Function to get the previous and next module based on current moduleId
export function getModuleNavigation(currentModuleId: string): { 
  prev: ModuleNavItem | null, 
  next: ModuleNavItem | null 
} {
  const currentIndex = moduleNavItems.findIndex(item => item.id === currentModuleId)
  
  if (currentIndex < 0) {
    return { prev: null, next: null }
  }
  
  const prev = currentIndex > 0 ? moduleNavItems[currentIndex - 1] : null
  const next = currentIndex < moduleNavItems.length - 1 ? moduleNavItems[currentIndex + 1] : null
  
  return { prev, next }
}

// Function to get module by ID
export function getModuleById(moduleId: string): ModuleNavItem | undefined {
  return moduleNavItems.find(item => item.id === moduleId)
}