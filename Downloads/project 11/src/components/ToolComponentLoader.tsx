import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from './ui/skeleton';

// Define the available tool components
const toolComponents: Record<string, React.ComponentType<any>> = {
  AWVChecklist: dynamic(() => import('./tools/AWVChecklist'), {
    loading: () => <ToolSkeleton />
  }),
  AWVRevenueCalculator: dynamic(() => import('./tools/AWVRevenueCalculator'), {
    loading: () => <ToolSkeleton />
  }),
  ChecklistLibrary: dynamic(() => import('./tools/ChecklistLibrary'), {
    loading: () => <ToolSkeleton />
  }),
  CodeLookup: dynamic(() => import('./tools/CodeLookup'), {
    loading: () => <ToolSkeleton />
  }),
  MDMLevelCalculator: dynamic(() => import('./tools/MDMLevelCalculator'), {
    loading: () => <ToolSkeleton />
  }),
  ModifierHelper: dynamic(() => import('./tools/ModifierHelper'), {
    loading: () => <ToolSkeleton />
  }),
  SmartPhraseLibrary: dynamic(() => import('./tools/SmartPhraseLibrary'), {
    loading: () => <ToolSkeleton />
  }),
  // Placeholder components for future implementation
  AIScribeAssist: () => (
    <div className="p-4 border rounded-md bg-muted">
      <p className="font-medium">AI Documentation Assistant</p>
      <p className="text-muted-foreground">This tool is coming soon.</p>
    </div>
  ),
  NoteAnalyzer: () => (
    <div className="p-4 border rounded-md bg-muted">
      <p className="font-medium">Clinical Note Analyzer</p>
      <p className="text-muted-foreground">This tool is coming soon.</p>
    </div>
  ),
  PreVisitPlanningChecklist: () => (
    <div className="p-4 border rounded-md bg-muted">
      <p className="font-medium">Pre-Visit Planning Checklist</p>
      <p className="text-muted-foreground">This tool is coming soon.</p>
    </div>
  ),
};

// Loading skeleton for tools
const ToolSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
);

interface ToolComponentLoaderProps {
  componentName: string;
}

const ToolComponentLoader: React.FC<ToolComponentLoaderProps> = ({ componentName }) => {
  const Component = toolComponents[componentName];
  
  if (!Component) {
    return (
      <div className="p-4 border rounded-md bg-muted">
        <p>Tool component "{componentName}" not found.</p>
      </div>
    );
  }
  
  return <Component />;
};

export default ToolComponentLoader;
