import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Separator } from '../ui/separator';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { HelpCircle, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ChecklistItem {
  id: string;
  checklist_id: string;
  item_text: string;
  required: boolean;
  order_index: number;
  explanation: string | null;
}

const MDMLevelCalculator: React.FC = () => {
  const supabase = useSupabaseClient<Database>();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChecklist = async () => {
      setLoading(true);
      try {
        // Fetch the MDM checklist items
        const { data, error } = await supabase
          .from('checklist_items')
          .select('*')
          .eq('checklist_id', '4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c') // MDM checklist ID
          .order('order_index');

        if (error) {
          throw error;
        }

        if (data) {
          setItems(data);
          // Initialize all items as unchecked
          const initialCheckedState: Record<string, boolean> = {};
          data.forEach(item => {
            initialCheckedState[item.id] = false;
          });
          setCheckedItems(initialCheckedState);
        }
      } catch (err) {
        console.error('Error fetching checklist:', err);
        setError('Failed to load checklist items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChecklist();
  }, [supabase]);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    const resetState: Record<string, boolean> = {};
    items.forEach(item => {
      resetState[item.id] = false;
    });
    setCheckedItems(resetState);
  };

  // Group items by complexity level
  const moderateItems = items.filter(item => item.order_index <= 7); // First 7 items are moderate complexity
  const highItems = items.filter(item => item.order_index > 7); // Remaining items are high complexity

  // Count checked items by complexity
  const moderateCheckedCount = moderateItems.filter(item => checkedItems[item.id]).length;
  const highCheckedCount = highItems.filter(item => checkedItems[item.id]).length;

  // Determine MDM level
  const getMDMLevel = () => {
    if (highCheckedCount >= 2) {
      return {
        level: 'High',
        code: 'Established: 99215 / New: 99205',
        description: 'High complexity MDM requires at least 2 elements from the high complexity category.',
        color: 'bg-blue-100 text-blue-800'
      };
    } else if (moderateCheckedCount >= 2 || (moderateCheckedCount >= 1 && highCheckedCount >= 1)) {
      return {
        level: 'Moderate',
        code: 'Established: 99214 / New: 99204',
        description: 'Moderate complexity MDM requires at least 2 elements from the moderate complexity category.',
        color: 'bg-green-100 text-green-800'
      };
    } else {
      return {
        level: 'Low or Straightforward',
        code: 'Established: 99212-99213 / New: 99202-99203',
        description: 'Based on your selections, the MDM level is low or straightforward. Select more elements to reach moderate or high complexity.',
        color: 'bg-gray-100 text-gray-800'
      };
    }
  };

  const mdmLevel = getMDMLevel();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Medical Decision Making (MDM) Level Calculator</CardTitle>
        <CardDescription>
          Use this tool to estimate the appropriate E/M level based on medical decision making complexity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading calculator...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>How to Use</AlertTitle>
              <AlertDescription>
                Check all elements that apply to your patient encounter. The calculator will determine the appropriate MDM level based on your selections.
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="moderate">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="moderate">Moderate Complexity</TabsTrigger>
                <TabsTrigger value="high">High Complexity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="moderate" className="space-y-4 mt-4">
                {moderateItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={item.id} 
                      checked={checkedItems[item.id] || false} 
                      onCheckedChange={() => handleCheckboxChange(item.id)} 
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={item.id} className="font-medium">
                          {item.item_text}
                        </Label>
                        {item.explanation && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>{item.explanation}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="high" className="space-y-4 mt-4">
                {highItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={item.id} 
                      checked={checkedItems[item.id] || false} 
                      onCheckedChange={() => handleCheckboxChange(item.id)} 
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={item.id} className="font-medium">
                          {item.item_text}
                        </Label>
                        {item.explanation && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>{item.explanation}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Selected Elements:</p>
                  <p className="text-sm">Moderate: {moderateCheckedCount} / High: {highCheckedCount}</p>
                </div>
                
                <div className={`px-4 py-2 rounded-md ${mdmLevel.color}`}>
                  <p className="font-medium">{mdmLevel.level} Complexity</p>
                  <p className="text-sm">{mdmLevel.code}</p>
                </div>
              </div>
              
              <Alert>
                <AlertTitle>MDM Assessment</AlertTitle>
                <AlertDescription>
                  {mdmLevel.description}
                </AlertDescription>
              </Alert>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Remember</AlertTitle>
                <AlertDescription>
                  E/M level is determined by either MDM or total time, whichever is more favorable. This tool only calculates the MDM component.
                </AlertDescription>
              </Alert>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Source: AAFP, IDSA, CMS</p>
        <Button variant="outline" onClick={resetChecklist}>Reset</Button>
      </CardFooter>
    </Card>
  );
};

export default MDMLevelCalculator;
