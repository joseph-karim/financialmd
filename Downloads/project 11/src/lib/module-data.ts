// Module and section interfaces
export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  isPreview?: boolean;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  content?: string;
  hasTools?: boolean;
  toolComponents?: string[];
}

// Legacy module navigation data for backward compatibility
export type ModuleNavItem = {
  id: string
  title: string
  isPreview: boolean
}

// New module structure based on research
export const modules: Module[] = [
  {
    id: "practice-efficiency",
    title: "Streamlining Documentation & Practice Efficiency",
    slug: "practice-efficiency",
    description: "Learn evidence-based strategies to optimize workflow, delegate tasks, and implement team-based documentation to improve efficiency and revenue capture.",
    icon: "ClipboardList",
    isPreview: true,
    sections: [
      {
        id: "practice-efficiency-intro",
        title: "Introduction",
        slug: "introduction",
        content: "This module covers proven strategies to streamline your practice workflow and documentation processes, allowing you to maximize both efficiency and revenue capture."
      },
      {
        id: "pre-visit-planning",
        title: "Pre-Visit Planning",
        slug: "pre-visit-planning",
        hasTools: true,
        toolComponents: ["PreVisitPlanningChecklist"]
      },
      {
        id: "team-documentation",
        title: "Team Documentation",
        slug: "team-documentation"
      },
      {
        id: "emr-tools",
        title: "EMR Tools & Templates",
        slug: "emr-tools",
        hasTools: true,
        toolComponents: ["SmartPhraseLibrary"]
      },
      {
        id: "delegation",
        title: "Delegation Strategies",
        slug: "delegation"
      },
      {
        id: "ai-assist",
        title: "AI Documentation Assistance",
        slug: "ai-assist",
        hasTools: true,
        toolComponents: ["AIScribeAssist"]
      }
    ]
  },
  {
    id: "awv-optimization",
    title: "Optimizing AWV & Preventive Services",
    slug: "awv-optimization",
    description: "Master the Medicare Annual Wellness Visit and learn how to efficiently integrate preventive services into your practice for improved patient care and revenue.",
    icon: "Calendar",
    sections: [
      {
        id: "awv-overview",
        title: "Overview",
        slug: "overview"
      },
      {
        id: "awv-workflow",
        title: "Workflow & Preparation",
        slug: "workflow",
        hasTools: true,
        toolComponents: ["PreVisitPlanningChecklist"]
      },
      {
        id: "awv-components",
        title: "Required Components",
        slug: "components",
        hasTools: true,
        toolComponents: ["AWVChecklist"]
      },
      {
        id: "awv-addons",
        title: "Common Add-on Services",
        slug: "addons"
      },
      {
        id: "awv-billing",
        title: "Billing & Combining Services",
        slug: "billing"
      },
      {
        id: "awv-tools",
        title: "Tools & Resources",
        slug: "tools",
        hasTools: true,
        toolComponents: ["AWVRevenueCalculator"]
      }
    ]
  },
  {
    id: "em-coding",
    title: "E/M Coding Mastery",
    slug: "em-coding",
    description: "Learn the nuances of E/M coding based on medical decision making and time, with strategies to accurately document and bill higher-level services when appropriate.",
    icon: "FileCode",
    sections: [
      {
        id: "em-overview",
        title: "Overview",
        slug: "overview"
      },
      {
        id: "mdm-coding",
        title: "MDM-Based Coding",
        slug: "mdm-coding",
        hasTools: true,
        toolComponents: ["MDMLevelCalculator"]
      },
      {
        id: "time-coding",
        title: "Time-Based Coding",
        slug: "time-coding"
      },
      {
        id: "modifier-25",
        title: "Modifier 25 Deep Dive",
        slug: "modifier-25",
        hasTools: true,
        toolComponents: ["ModifierHelper"]
      },
      {
        id: "em-examples",
        title: "Documentation Examples",
        slug: "examples"
      }
    ]
  },
  {
    id: "chronic-care",
    title: "Chronic Care & Risk Adjustment",
    slug: "chronic-care",
    description: "Optimize chronic care management and HCC coding to ensure appropriate risk adjustment and maximize value-based payments.",
    icon: "HeartPulse",
    sections: [
      {
        id: "chronic-overview",
        title: "Overview",
        slug: "overview"
      },
      {
        id: "hcc-coding",
        title: "HCC Coding Strategies",
        slug: "hcc-coding"
      },
      {
        id: "chronic-care-management",
        title: "Chronic Care Management",
        slug: "ccm"
      },
      {
        id: "g2211-addon",
        title: "G2211 Add-on Code",
        slug: "g2211"
      },
      {
        id: "documentation-strategies",
        title: "Documentation Strategies",
        slug: "documentation",
        hasTools: true,
        toolComponents: ["SmartPhraseLibrary"]
      }
    ]
  },
  {
    id: "special-services",
    title: "Special Services & Add-on Codes",
    slug: "special-services",
    description: "Learn how to properly document and bill for special services like Transitional Care Management, Advance Care Planning, and behavioral health integration.",
    icon: "Plus",
    sections: [
      {
        id: "special-overview",
        title: "Overview",
        slug: "overview"
      },
      {
        id: "tcm",
        title: "Transitional Care Management",
        slug: "tcm"
      },
      {
        id: "acp",
        title: "Advance Care Planning",
        slug: "acp"
      },
      {
        id: "behavioral-health",
        title: "Behavioral Health Integration",
        slug: "bhi"
      },
      {
        id: "preventive-services",
        title: "Preventive Service Codes",
        slug: "preventive"
      }
    ]
  },
  {
    id: "tools-resources",
    title: "Tools & Resources",
    slug: "tools",
    description: "Access a comprehensive collection of tools, calculators, and resources to support your billing and coding efforts.",
    icon: "Wrench",
    isPreview: true,
    sections: [
      {
        id: "code-lookup",
        title: "Code Lookup Tool",
        slug: "code-lookup",
        hasTools: true,
        toolComponents: ["CodeLookup"]
      },
      {
        id: "smart-phrases",
        title: "Smart Phrase Library",
        slug: "smart-phrases",
        hasTools: true,
        toolComponents: ["SmartPhraseLibrary"]
      },
      {
        id: "checklists",
        title: "Interactive Checklists",
        slug: "checklists",
        hasTools: true,
        toolComponents: ["ChecklistLibrary"]
      },
      {
        id: "calculators",
        title: "Revenue Calculators",
        slug: "calculators",
        hasTools: true,
        toolComponents: ["AWVRevenueCalculator", "MDMLevelCalculator"]
      },
      {
        id: "ai-tools",
        title: "AI Documentation Tools",
        slug: "ai-tools",
        hasTools: true,
        toolComponents: ["AIScribeAssist", "NoteAnalyzer"]
      }
    ]
  }
];

// Legacy modules array for backward compatibility
export const moduleNavItems: ModuleNavItem[] = [
  { id: 'practice-efficiency', title: 'Streamlining Documentation & Practice Efficiency', isPreview: true },
  { id: 'awv-optimization', title: 'Optimizing AWV & Preventive Services', isPreview: true },
  { id: 'em-coding', title: 'E/M Coding Mastery', isPreview: true },
  { id: 'chronic-care', title: 'Chronic Care & Risk Adjustment', isPreview: true },
  { id: 'special-services', title: 'Special Services & Add-on Codes', isPreview: true },
  { id: 'tools-resources', title: 'Tools & Resources', isPreview: true },

  // Legacy modules kept for backward compatibility
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
];

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

// New helper functions for the enhanced module structure
export const getModuleBySlug = (slug: string): Module | undefined => {
  return modules.find((module) => module.slug === slug);
};

export const getSectionBySlug = (
  moduleSlug: string,
  sectionSlug: string
): Section | undefined => {
  const module = getModuleBySlug(moduleSlug);
  if (!module) return undefined;
  return module.sections.find((section) => section.slug === sectionSlug);
};