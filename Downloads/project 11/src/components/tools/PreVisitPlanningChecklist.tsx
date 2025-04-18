import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ChecklistItem {
  id: string;
  text: string;
  explanation?: string;
}

const PreVisitPlanningChecklist: React.FC = () => {
  // Placeholder data - in the real implementation, this would come from the database
  const checklistItems: Record<string, ChecklistItem[]> = {
    'general': [
      { id: 'review-chart', text: 'Review chart for care gaps (preventive services due)' },
      { id: 'check-awv', text: 'Check if patient is eligible for AWV (G0438/G0439)' },
      { id: 'review-chronic', text: 'Review chronic conditions not coded in current year' },
      { id: 'prepare-forms', text: 'Prepare necessary forms (HRA, PHQ-9, etc.)' },
      { id: 'check-discharge', text: 'Check if patient was recently discharged (TCM opportunity)' },
      { id: 'pre-order-labs', text: 'Pre-order routine labs if appropriate' },
      { id: 'identify-opportunities', text: 'Identify opportunities for additional services (depression screening, alcohol screening)' },
    ],
    'medicare': [
      { id: 'check-awv-eligibility', text: 'Verify AWV eligibility (12 months since last AWV)' },
      { id: 'prepare-hra', text: 'Prepare Health Risk Assessment form' },
      { id: 'check-preventive', text: 'Check for due preventive services (G0444, G0442, etc.)' },
      { id: 'check-acp', text: 'Consider Advance Care Planning opportunity (99497)' },
      { id: 'check-ccm', text: 'Evaluate for Chronic Care Management eligibility (99490)' },
      { id: 'check-g2211', text: 'Determine if G2211 add-on code is applicable' },
    ],
    'chronic': [
      { id: 'review-hcc', text: 'Review HCC diagnoses that need recapture this year' },
      { id: 'check-last-labs', text: 'Check when last labs were done for chronic conditions' },
      { id: 'prepare-chronic-templates', text: 'Prepare documentation templates for chronic conditions' },
      { id: 'review-specialists', text: 'Review recent specialist notes' },
      { id: 'check-medication-refills', text: 'Check if medication refills are needed' },
      { id: 'identify-care-gaps', text: 'Identify care gaps for chronic conditions' },
    ],
  };

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('general');

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  const currentItems = checklistItems[activeTab] || [];
  const checkedCount = currentItems.filter(item => checkedItems[item.id]).length;
  const totalItems = currentItems.length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Pre-Visit Planning Checklist</CardTitle>
        <CardDescription>
          Use this checklist to prepare for patient visits and optimize billing opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            This feature is currently in development. The example below demonstrates the planned functionality.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="medicare">Medicare Patients</TabsTrigger>
            <TabsTrigger value="chronic">Chronic Care</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4 mt-4">
            {currentItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3">
                <Checkbox 
                  id={item.id} 
                  checked={checkedItems[item.id] || false} 
                  onCheckedChange={() => handleCheckboxChange(item.id)} 
                />
                <div className="space-y-1">
                  <Label htmlFor={item.id} className="font-medium">
                    {item.text}
                  </Label>
                  {item.explanation && (
                    <p className="text-sm text-muted-foreground">{item.explanation}</p>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Progress: {checkedCount}/{totalItems} completed</p>
            <div className="w-48 h-2 bg-gray-200 rounded-full mt-2">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {progress === 100 ? (
            <Alert className="w-fit bg-primary/20 border-primary">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertTitle>Ready</AlertTitle>
              <AlertDescription>
                Pre-visit planning complete!
              </AlertDescription>
            </Alert>
          ) : progress > 0 ? (
            <Alert className="w-fit">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>In Progress</AlertTitle>
              <AlertDescription>
                Continue pre-visit planning.
              </AlertDescription>
            </Alert>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Source: AAFP, CMS</p>
        <Button variant="outline" onClick={resetChecklist}>Reset Checklist</Button>
      </CardFooter>
    </Card>
  );
};

export default PreVisitPlanningChecklist;
