# Component Architecture

This document outlines the component architecture for the Primary Care Financial Masterclass re-architecture, focusing on reusable components, page structure, and state management.

## Core Components

### Layout Components

- **ModuleLayout**: Enhanced version of the existing layout with support for workflow-based content
- **ToolboxLayout**: Layout for interactive tools with consistent UI
- **AIToolLayout**: Specialized layout for AI-powered tools with appropriate disclaimers and UI

### Data Display Components

#### CodeSnippetDisplay

Displays formatted details for a given medical code.

```tsx
interface CodeSnippetDisplayProps {
  code: string;
  showDescription?: boolean;
  showRVU?: boolean;
  showModifiers?: boolean;
  className?: string;
}
```

#### GlossaryTermDisplay

Displays a glossary term with definition and optional tooltip.

```tsx
interface GlossaryTermDisplayProps {
  term: string;
  showAsTooltip?: boolean;
  highlightInText?: boolean;
  className?: string;
}
```

#### WorkflowStep

Displays a single step in a clinical workflow process.

```tsx
interface WorkflowStepProps {
  stepNumber: number;
  title: string;
  description: string;
  tips?: string[];
  codes?: string[];
  className?: string;
}
```

### Interactive Components

#### InteractiveChecklist

Renders a checklist with state management for tracking completion.

```tsx
interface ChecklistItem {
  id: string;
  text: string;
  details?: string;
  required?: boolean;
}

interface InteractiveChecklistProps {
  title: string;
  items: ChecklistItem[];
  onComplete?: (completedItems: string[]) => void;
  persistKey?: string; // For saving state
  className?: string;
}
```

#### ScenarioCalculator

Form + display logic for financial/RVU calculators.

```tsx
interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  defaultValue?: any;
}

interface ScenarioCalculatorProps {
  title: string;
  description?: string;
  inputs: CalculatorInput[];
  calculateFn: (values: Record<string, any>) => CalculationResult;
  className?: string;
}

interface CalculationResult {
  totalRVU?: number;
  totalRevenue?: number;
  timeEstimate?: number;
  breakdown: Record<string, any>[];
}
```

#### ModifierHelper

Interactive decision support for modifiers.

```tsx
interface ModifierHelperProps {
  modifier: string; // e.g., "25"
  onDecision?: (isApplicable: boolean) => void;
  className?: string;
}
```

#### SmartPhraseDisplay

Displays copyable smart phrases for documentation.

```tsx
interface SmartPhraseDisplayProps {
  scenario: string;
  phraseId?: string;
  className?: string;
}
```

### AI Tool Components

#### AIScribeAssistUI

Interface for the AI Scribe tool.

```tsx
interface AIScribeAssistUIProps {
  initialContent?: {
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
  };
  onGenerate?: (generatedNote: string) => void;
  className?: string;
}
```

#### NoteStructurerUI

Interface for the Note Structurer tool.

```tsx
interface NoteStructurerUIProps {
  initialContent?: string;
  onStructure?: (structuredNote: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  }) => void;
  className?: string;
}
```

#### AIFeedbackDisplay

Component to render AI analysis/suggestions.

```tsx
interface AIFeedbackDisplayProps {
  noteText: string;
  analysis: {
    suggestedCodes: Array<{
      code: string;
      description: string;
      confidence: number;
    }>;
    documentationGaps: string[];
    mdmLevel: string;
    timeEstimate?: number;
    improvementSuggestions: string[];
  };
  className?: string;
}
```

## Page Structure

### Module Pages

The module pages will be restructured to follow a workflow-based approach:

```
/modules/
  /optimizing-awv/
  /acute-visits-em-coding/
  /chronic-care-management/
  /preventative-services/
  /office-procedures/
```

Each module page will use a tabbed interface:
- Overview
- Workflow
- Coding/Documentation
- Tools
- Examples

### Tool Pages

Dedicated pages for interactive tools:

```
/tools/
  /code-lookup/
  /ai-scribe/
  /note-analyzer/
  /mdm-calculator/
  /awv-revenue-calculator/
  /modifier-helper/
```

### Resource Pages

Supporting resource pages:

```
/resources/
  /glossary/
  /cheat-sheet/
  /smart-phrases/
```

## State Management

We'll continue using Zustand for state management with the following stores:

### Auth Store

```tsx
interface AuthState {
  user: User | null;
  userRole: 'free' | 'paid' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null, data: any }>;
  signOut: () => Promise<void>;
}
```

### Progress Store

```tsx
interface ProgressState {
  completedModules: Record<string, boolean>;
  currentModule: string | null;
  markModuleAsCompleted: (moduleId: string) => void;
  setCurrentModule: (moduleId: string) => void;
}
```

### AI Tools Store

```tsx
interface AIToolsState {
  isGenerating: boolean;
  lastGeneratedNote: string | null;
  lastAnalysis: any | null;
  generateNote: (inputs: any) => Promise<string>;
  analyzeNote: (noteText: string) => Promise<any>;
  structureNote: (noteText: string) => Promise<any>;
  clearResults: () => void;
}
```

### Code Lookup Store

```tsx
interface CodeLookupState {
  recentLookups: string[];
  favoritesCodes: string[];
  addToRecent: (code: string) => void;
  toggleFavorite: (code: string) => void;
}
```

## Component Usage Examples

### Example: AWV Module Page

```tsx
export default function OptimizingAWVModule() {
  return (
    <ModuleLayout
      moduleId="optimizing-awv"
      title="Optimizing Annual Wellness Visits"
      isPreview={false}
    >
      <Tabs defaultValue="overview">
        <TabsList>
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
              tips={["Send HRA form to patient 1-2 weeks before visit", "Have MA review for completeness"]}
            />
            {/* More workflow steps */}
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
