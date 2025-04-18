# Module Structure

This document outlines the new workflow-based module structure for the Primary Care Financial Masterclass re-architecture.

## Overview

The current module structure is organized by topic (e.g., "Physician Reimbursement", "Coding Review", etc.). The re-architecture will shift to a workflow-based approach that aligns with how physicians actually practice, making the content more immediately applicable to daily clinical work.

## New Module Organization

### Core Workflow Modules

1. **Optimizing Annual Wellness Visits**
   - Replaces/consolidates content from "Medicare Wellness", "Preventative Medicine"
   - Focus on the complete AWV workflow from scheduling to billing

2. **Acute Visit E/M Coding Mastery**
   - Replaces/consolidates content from "Billing Time vs Complexity", "Office Visits"
   - Focus on the complete acute visit workflow with emphasis on proper E/M selection

3. **Chronic Care Management**
   - Consolidates content related to ongoing care of chronic conditions
   - Includes HCC coding, G2211, CCM codes

4. **Preventative Services & Screenings**
   - Consolidates content from "Annual Exams", "Preventative Medicine"
   - Focus on preventative services beyond AWVs

5. **Office Procedures & Add-On Services**
   - Consolidates content from "Procedures", "Missed Codes"
   - Focus on common procedures and how to properly document and bill them

6. **Transition Care Management**
   - Expanded from existing TCM content
   - Complete workflow for post-discharge care

7. **New Patient Onboarding**
   - Expanded from "New Patient Visits"
   - Complete workflow for new patient intake and optimization

8. **Practice Efficiency & Scheduling**
   - Expanded from "Daily Schedule"
   - Strategies for optimizing daily workflow and scheduling

### Foundation Modules

1. **Physician Compensation Fundamentals**
   - Revised from "Physician Reimbursement"
   - Focus on RVUs, compensation models, and financial literacy

2. **Coding & Documentation Essentials**
   - Revised from "Coding Review"
   - Core principles that apply across all visit types

## Module Template Structure

Each module will follow a consistent structure with tabs:

### 1. Overview Tab

- Introduction to the workflow/topic
- Why it matters financially
- Key financial opportunities
- Common pitfalls to avoid

### 2. Workflow Tab

- Step-by-step process using WorkflowStep components
- Pre-visit preparation
- During visit activities
- Post-visit follow-up
- MA/staff delegation opportunities

### 3. Coding & Documentation Tab

- Relevant codes with CodeSnippetDisplay components
- Documentation requirements
- Modifier usage with ModifierHelper components
- Example documentation snippets with SmartPhraseDisplay

### 4. Tools Tab

- Interactive tools relevant to the module:
  - Checklists (InteractiveChecklist)
  - Calculators (ScenarioCalculator)
  - Decision support tools (ModifierHelper)

### 5. Examples Tab

- Real-world patient scenarios
- Before/after documentation examples
- Coding rationales

## Module Content Example: Optimizing AWV Module

```tsx
// src/pages/modules/optimizing-awv.tsx

import { ModuleLayout } from '@/components/module/module-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkflowStep } from '@/components/workflow/workflow-step';
import { CodeSnippetDisplay } from '@/components/data/code-snippet-display';
import { InteractiveChecklist } from '@/components/interactive/interactive-checklist';
import { ScenarioCalculator } from '@/components/interactive/scenario-calculator';
import { ModifierHelper } from '@/components/interactive/modifier-helper';
import { SmartPhraseDisplay } from '@/components/data/smart-phrase-display';
import { ModuleContent } from '@/components/module/module-content';

// Content for the Overview tab
const overviewContent = `
# Optimizing Annual Wellness Visits

Annual Wellness Visits (AWVs) represent one of the most significant financial opportunities in primary care. Medicare pays well for these preventative visits, and they can be combined with other services to maximize reimbursement while providing high-quality care.

## Financial Impact

A properly optimized AWV workflow can generate 2-3x the revenue of a standard AWV alone. By appropriately adding depression screening, advance care planning, and addressing acute issues with Modifier 25, you can significantly increase your RVUs while providing comprehensive care.

## Key Opportunities

- **Initial AWV (G0438)**: Higher reimbursement for first-time AWVs
- **Depression Screening (G0444)**: Quick, billable add-on
- **Advance Care Planning (99497)**: Significant RVU boost when clinically appropriate
- **Same-day Problem-Based E/M**: When addressing separate issues

## Common Pitfalls

- Failing to document the required HRA elements
- Missing opportunities to bill for additional preventative services
- Improper use of Modifier 25
- Inadequate time documentation for ACP
`;

// AWV Checklist Items
const awvChecklistItems = [
  {
    id: 'hra',
    text: 'Health Risk Assessment (HRA)',
    details: 'Must include self-assessment of health status, psychosocial risks, behavioral risks, activities of daily living (ADLs), and instrumental ADLs',
    required: true
  },
  {
    id: 'vitals',
    text: 'Vitals (height, weight, BMI, BP)',
    required: true
  },
  {
    id: 'history',
    text: 'Medical/family history review',
    required: true
  },
  // Additional checklist items...
];

// AWV Calculator Inputs
const awvCalculatorInputs = [
  {
    id: 'awvType',
    label: 'AWV Type',
    type: 'select',
    options: [
      { value: 'g0438', label: 'Initial AWV (G0438)' },
      { value: 'g0439', label: 'Subsequent AWV (G0439)' }
    ],
    defaultValue: 'g0439'
  },
  {
    id: 'depressionScreening',
    label: 'Depression Screening (G0444)',
    type: 'checkbox',
    defaultValue: true
  },
  {
    id: 'advancedCarePlanning',
    label: 'Advance Care Planning (99497)',
    type: 'checkbox',
    defaultValue: false
  },
  // Additional calculator inputs...
];

// AWV Revenue Calculator Function
const calculateAWVRevenue = (values: Record<string, any>) => {
  // Calculate total RVUs and estimated revenue based on inputs
  // This would use the actual RVU values from the database
  
  let totalRVU = 0;
  const breakdown = [];
  
  if (values.awvType === 'g0438') {
    totalRVU += 2.43; // Initial AWV RVU
    breakdown.push({ code: 'G0438', description: 'Initial AWV', rvu: 2.43 });
  } else {
    totalRVU += 1.50; // Subsequent AWV RVU
    breakdown.push({ code: 'G0439', description: 'Subsequent AWV', rvu: 1.50 });
  }
  
  if (values.depressionScreening) {
    totalRVU += 0.18; // Depression screening RVU
    breakdown.push({ code: 'G0444', description: 'Depression Screening', rvu: 0.18 });
  }
  
  if (values.advancedCarePlanning) {
    totalRVU += 1.50; // ACP RVU
    breakdown.push({ code: '99497', description: 'Advance Care Planning', rvu: 1.50 });
  }
  
  // Add more calculations based on other inputs
  
  // Estimate revenue (using approximate $36 per RVU)
  const totalRevenue = totalRVU * 36;
  
  return {
    totalRVU,
    totalRevenue,
    breakdown
  };
};

// Examples content
const examplesContent = `
# AWV Documentation Examples

## Example 1: AWV with Depression Screening

**Patient:** 68-year-old Medicare patient presenting for annual wellness visit.

**Documentation Highlights:**
- Completed Health Risk Assessment reviewed
- Updated medical, family, and social history
- Depression screening using PHQ-9 (score: 3)
- Preventative service recommendations discussed and documented
- No acute issues addressed

**Billing:** G0439 (Subsequent AWV) + G0444 (Depression Screening)
**Total RVUs:** 1.68 (1.50 + 0.18)

## Example 2: AWV with Advance Care Planning and Acute Issue

**Patient:** 72-year-old Medicare patient presenting for annual wellness visit who also mentions recent onset of knee pain.

**Documentation Highlights:**
- Completed Health Risk Assessment reviewed
- Updated medical, family, and social history
- Advance Care Planning discussion (documented 15 minutes spent specifically on ACP)
- Separate evaluation of right knee pain with focused exam and assessment
- Clear documentation separating the AWV/ACP from the knee pain evaluation

**Billing:** G0439 (Subsequent AWV) + 99497 (ACP) + 99213-25 (E/M for knee pain)
**Total RVUs:** 4.30 (1.50 + 1.50 + 1.30)
`;

export default function OptimizingAWVModule() {
  return (
    <ModuleLayout
      moduleId="optimizing-awv"
      title="Optimizing Annual Wellness Visits"
      isPreview={false}
    >
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="coding">Coding & Documentation</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <ModuleContent content={overviewContent} />
        </TabsContent>
        
        <TabsContent value="workflow">
          <div className="space-y-6">
            <WorkflowStep
              stepNumber={1}
              title="Pre-Visit Preparation"
              description="Ensure Health Risk Assessment (HRA) is completed before the visit"
              tips={[
                "Send HRA form to patient 1-2 weeks before visit",
                "Have MA review for completeness",
                "Identify preventative service gaps"
              ]}
            />
            
            <WorkflowStep
              stepNumber={2}
              title="MA Pre-Work"
              description="Maximize MA involvement to improve efficiency"
              tips={[
                "MA records vitals and updates medical/family history",
                "MA administers depression screening if appropriate",
                "MA identifies any acute concerns that may need separate E/M"
              ]}
              codes={["G0444"]}
            />
            
            <WorkflowStep
              stepNumber={3}
              title="Physician Visit"
              description="Focus on required elements and additional billable services"
              tips={[
                "Review HRA and MA documentation",
                "Perform required AWV elements",
                "Consider Advance Care Planning when appropriate (document time)",
                "Address acute issues separately with clear documentation"
              ]}
              codes={["G0438", "G0439", "99497", "99213-25"]}
            />
            
            <WorkflowStep
              stepNumber={4}
              title="Documentation & Billing"
              description="Ensure all services are properly documented and billed"
              tips={[
                "Document all required AWV elements",
                "Clearly separate AWV documentation from any acute care",
                "Document time spent on Advance Care Planning",
                "Use appropriate modifiers"
              ]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="coding">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Core AWV Codes</h3>
            <CodeSnippetDisplay code="G0438" showDescription showRVU />
            <CodeSnippetDisplay code="G0439" showDescription showRVU />
            
            <h3 className="text-xl font-semibold mt-8">Add-On Services</h3>
            <CodeSnippetDisplay code="G0444" showDescription showRVU />
            <CodeSnippetDisplay code="99497" showDescription showRVU />
            
            <h3 className="text-xl font-semibold mt-8">Using Modifier 25</h3>
            <p className="mb-4">If addressing a separate, significant, identifiable E/M service on the same day, append Modifier 25 to the E/M code.</p>
            <ModifierHelper modifier="25" />
            
            <h3 className="text-xl font-semibold mt-8">Documentation Requirements</h3>
            <p className="mb-4">AWV documentation must include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Health Risk Assessment (HRA) review</li>
              <li>Medical and family history update</li>
              <li>List of current providers/suppliers</li>
              <li>Height, weight, BMI, blood pressure</li>
              <li>Cognitive assessment</li>
              <li>Depression screening (if separately billed)</li>
              <li>Functional ability assessment</li>
              <li>Safety assessment</li>
              <li>Written screening schedule for next 5-10 years</li>
              <li>List of risk factors with interventions</li>
              <li>Personalized health advice</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-8">Documentation Templates</h3>
            <SmartPhraseDisplay scenario="AWV Documentation" />
          </div>
        </TabsContent>
        
        <TabsContent value="tools">
          <div className="space-y-6">
            <InteractiveChecklist
              title="AWV Components Checklist"
              items={awvChecklistItems}
              persistKey="awv-checklist"
            />
            
            <ScenarioCalculator
              title="AWV Revenue Calculator"
              description="Calculate potential revenue from AWV and add-on services"
              inputs={awvCalculatorInputs}
              calculateFn={calculateAWVRevenue}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="examples">
          <ModuleContent content={examplesContent} />
        </TabsContent>
      </Tabs>
    </ModuleLayout>
  );
}
```

## Module Navigation

The sidebar navigation will be updated to reflect the new module structure, with modules grouped by category:

```tsx
// src/lib/module-data.ts

export type ModuleNavItem = {
  id: string;
  title: string;
  isPreview: boolean;
  category?: 'foundation' | 'workflow' | 'tools';
}

export const moduleNavItems: ModuleNavItem[] = [
  // Foundation Modules
  { id: 'physician-compensation', title: 'Physician Compensation Fundamentals', isPreview: true, category: 'foundation' },
  { id: 'coding-essentials', title: 'Coding & Documentation Essentials', isPreview: true, category: 'foundation' },
  
  // Workflow Modules
  { id: 'optimizing-awv', title: 'Optimizing Annual Wellness Visits', isPreview: false, category: 'workflow' },
  { id: 'acute-visits-em-coding', title: 'Acute Visit E/M Coding Mastery', isPreview: false, category: 'workflow' },
  { id: 'chronic-care-management', title: 'Chronic Care Management', isPreview: false, category: 'workflow' },
  { id: 'preventative-services', title: 'Preventative Services & Screenings', isPreview: true, category: 'workflow' },
  { id: 'office-procedures', title: 'Office Procedures & Add-On Services', isPreview: true, category: 'workflow' },
  { id: 'transition-care-management', title: 'Transition Care Management', isPreview: true, category: 'workflow' },
  { id: 'new-patient-onboarding', title: 'New Patient Onboarding', isPreview: true, category: 'workflow' },
  { id: 'practice-efficiency', title: 'Practice Efficiency & Scheduling', isPreview: true, category: 'workflow' },
];
```

## Content Migration Strategy

1. **Content Audit**:
   - Review all existing module content
   - Map content to new module structure
   - Identify gaps and redundancies

2. **Content Adaptation**:
   - Rewrite content to fit workflow-based approach
   - Add practical workflow steps
   - Enhance with interactive elements
   - Simplify language and reduce jargon

3. **Content Enhancement**:
   - Add more real-world examples
   - Create smart phrases for documentation
   - Develop interactive checklists
   - Add financial impact calculations

## Implementation Timeline

1. **Phase 1 (Weeks 1-2)**:
   - Update module-data.ts with new structure
   - Create module template components
   - Implement first workflow module (Optimizing AWV)

2. **Phase 2 (Weeks 3-4)**:
   - Implement second workflow module (Acute Visit E/M Coding)
   - Update sidebar navigation
   - Create foundation modules

3. **Phase 3 (Weeks 5-8)**:
   - Implement remaining workflow modules
   - Finalize all interactive components
   - Complete content migration
