import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import AWVChecklist from './AWVChecklist';
import ModifierHelper from './ModifierHelper';

interface Checklist {
  id: string;
  title: string;
  description: string;
  checklist_type: string;
  source: string | null;
}

const ChecklistLibrary: React.FC = () => {
  const supabase = useSupabaseClient<Database>();
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChecklist, setSelectedChecklist] = useState<string | null>(null);

  useEffect(() => {
    const fetchChecklists = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('checklists')
          .select('*')
          .order('title');

        if (error) {
          throw error;
        }

        if (data) {
          setChecklists(data);
          if (data.length > 0) {
            setSelectedChecklist(data[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching checklists:', err);
        setError('Failed to load checklists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChecklists();
  }, [supabase]);

  // Map checklist IDs to their respective components
  const checklistComponents: Record<string, React.ReactNode> = {
    'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454': <AWVChecklist />, // AWV Checklist
    '2e0cfc8f-60c3-4b7c-b1a2-9f63c4c3454a': <ModifierHelper />, // Modifier 25 Checklist
    '3a1dfc8f-70c3-4b7c-b1a2-9f63c4c3454b': (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Pre-Visit Planning Checklist</CardTitle>
          <CardDescription>
            Tasks to complete before patient visits to optimize workflow and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              This checklist is under development. Please check back later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    ),
    '4b2efc8f-80c3-4b7c-b1a2-9f63c4c3454c': (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Medical Decision Making (MDM) Level Estimator</CardTitle>
          <CardDescription>
            Checklist to help determine appropriate E/M level based on MDM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              This checklist is under development. Please check back later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Interactive Checklists</CardTitle>
        <CardDescription>
          Access interactive checklists to help with documentation, coding, and workflow optimization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading checklists...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {checklists.map((checklist) => (
                <Button
                  key={checklist.id}
                  variant={selectedChecklist === checklist.id ? "default" : "outline"}
                  onClick={() => setSelectedChecklist(checklist.id)}
                >
                  {checklist.title}
                </Button>
              ))}
            </div>
            
            <Separator className="mb-6" />
            
            {selectedChecklist && checklistComponents[selectedChecklist] ? (
              checklistComponents[selectedChecklist]
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Select a checklist to view.</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ChecklistLibrary;
