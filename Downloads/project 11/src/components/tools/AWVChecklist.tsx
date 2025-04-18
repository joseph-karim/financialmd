import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle2, Info, AlertTriangle, HelpCircle } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/supabase';
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

const AWVChecklist: React.FC = () => {
  const supabase = useSupabaseClient<Database>();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChecklist = async () => {
      setLoading(true);
      try {
        // Fetch the AWV checklist items
        const { data, error } = await supabase
          .from('checklist_items')
          .select('*')
          .eq('checklist_id', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454') // AWV checklist ID
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

  const requiredItems = items.filter(item => item.required);
  const allRequiredChecked = requiredItems.length > 0 && requiredItems.every(item => checkedItems[item.id]);
  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = items.length;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Medicare Annual Wellness Visit (AWV) Checklist</CardTitle>
        <CardDescription>
          Use this checklist to ensure all required components of the Medicare AWV (G0438/G0439) are completed and documented.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading checklist...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                All required elements must be completed and documented to bill for the AWV (G0438 for initial, G0439 for subsequent).
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {items.map((item) => (
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
                      {item.required && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Required</span>
                      )}
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
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Progress: {totalChecked}/{totalItems} completed</p>
                <div className="w-48 h-2 bg-gray-200 rounded-full mt-2">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${(totalChecked / totalItems) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {allRequiredChecked ? (
                <Alert className="w-fit bg-primary/20 border-primary">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <AlertTitle>Ready to Bill</AlertTitle>
                  <AlertDescription>
                    All required elements are completed.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="w-fit">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Not Ready</AlertTitle>
                  <AlertDescription>
                    Complete all required elements to bill.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Source: CMS, CGS Medicare</p>
        <Button variant="outline" onClick={resetChecklist}>Reset Checklist</Button>
      </CardFooter>
    </Card>
  );
};

export default AWVChecklist;
