import React, { useState } from 'react';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/supabase';

const ModifierHelper: React.FC = () => {
  const supabase = useSupabaseClient<Database>();
  const [criteria, setCriteria] = useState({
    separateEM: false,
    standAlone: false,
    medicalNecessity: false,
    separateDocumentation: false,
    scheduledProcedure: false,
  });
  const [examples, setExamples] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (key: keyof typeof criteria) => {
    setCriteria((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const fetchModifierInfo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('modifiers')
        .select('description, usage_guidelines, examples')
        .eq('modifier', '25')
        .single();

      if (error) {
        console.error('Error fetching modifier info:', error);
      } else if (data) {
        setExamples(data.examples || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchModifierInfo();
  }, []);

  const getResult = () => {
    // If scheduled procedure is checked, it's a clear no
    if (criteria.scheduledProcedure) {
      return {
        appropriate: false,
        message: 'Modifier 25 is NOT appropriate for scheduled procedure visits with no significant separate evaluation.',
        icon: <XCircle className="h-6 w-6 text-destructive" />,
      };
    }

    // All three main criteria must be met
    if (criteria.separateEM && criteria.standAlone && criteria.medicalNecessity) {
      return {
        appropriate: true,
        message: 'Modifier 25 appears appropriate based on your responses.',
        icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      };
    }

    // If any of the three main criteria are not met
    return {
      appropriate: false,
      message: 'Modifier 25 is NOT appropriate based on your responses.',
      icon: <XCircle className="h-6 w-6 text-destructive" />,
    };
  };

  const result = getResult();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Modifier 25 Decision Support Tool</CardTitle>
        <CardDescription>
          Use this tool to determine if Modifier 25 (Significant, separately identifiable E/M service) is appropriate for your scenario.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Modifier 25 should be appended to an E/M code when a significant, separately identifiable E/M service is performed on the same day as a procedure or other service.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="separateEM" 
              checked={criteria.separateEM} 
              onCheckedChange={() => handleCheckboxChange('separateEM')} 
            />
            <div className="space-y-1">
              <Label htmlFor="separateEM" className="font-medium">
                Did I perform and document key components of a problem-focused E/M independent of the procedure?
              </Label>
              <p className="text-sm text-muted-foreground">
                The E/M service must be above and beyond the usual pre- and post-operative care associated with the procedure.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="standAlone" 
              checked={criteria.standAlone} 
              onCheckedChange={() => handleCheckboxChange('standAlone')} 
            />
            <div className="space-y-1">
              <Label htmlFor="standAlone" className="font-medium">
                Could the documented E/M stand alone as a billable visit if the procedure was not performed?
              </Label>
              <p className="text-sm text-muted-foreground">
                The E/M documentation should be substantial enough to support billing even without the procedure.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="medicalNecessity" 
              checked={criteria.medicalNecessity} 
              onCheckedChange={() => handleCheckboxChange('medicalNecessity')} 
            />
            <div className="space-y-1">
              <Label htmlFor="medicalNecessity" className="font-medium">
                Is there medical necessity for evaluating a condition separate from the procedure?
              </Label>
              <p className="text-sm text-muted-foreground">
                There must be a clinical reason to perform the separate E/M service.
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="separateDocumentation" 
              checked={criteria.separateDocumentation} 
              onCheckedChange={() => handleCheckboxChange('separateDocumentation')} 
            />
            <div className="space-y-1">
              <Label htmlFor="separateDocumentation" className="font-medium">
                Is the documentation clearly separated between the E/M and the procedure?
              </Label>
              <p className="text-sm text-muted-foreground">
                Best practice is to physically separate the documentation for the E/M from the procedure note.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="scheduledProcedure" 
              checked={criteria.scheduledProcedure} 
              onCheckedChange={() => handleCheckboxChange('scheduledProcedure')} 
            />
            <div className="space-y-1">
              <Label htmlFor="scheduledProcedure" className="font-medium">
                Is this a scheduled procedure visit with no significant separate evaluation?
              </Label>
              <p className="text-sm text-muted-foreground">
                If yes, do NOT use Modifier 25 - the E/M is included in the procedure.
              </p>
            </div>
          </div>
        </div>

        <Alert className={result.appropriate ? "bg-primary/20" : "bg-destructive/20"}>
          {result.icon}
          <AlertTitle>{result.appropriate ? "Appropriate" : "Not Appropriate"}</AlertTitle>
          <AlertDescription>
            {result.message}
          </AlertDescription>
        </Alert>

        {!result.appropriate && criteria.separateDocumentation && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Documentation Tip</AlertTitle>
            <AlertDescription>
              Even with separate documentation, all three main criteria must be met for Modifier 25 to be appropriate.
            </AlertDescription>
          </Alert>
        )}

        {result.appropriate && !criteria.separateDocumentation && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Documentation Tip</AlertTitle>
            <AlertDescription>
              While Modifier 25 appears appropriate, best practice is to clearly separate E/M documentation from procedure documentation.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Common Examples</h3>
          <ul className="list-disc pl-5 space-y-2">
            {examples.map((example, index) => (
              <li key={index} className="text-sm">{example}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Source: AAFP, CMS</p>
        <Button variant="outline" onClick={() => setCriteria({
          separateEM: false,
          standAlone: false,
          medicalNecessity: false,
          separateDocumentation: false,
          scheduledProcedure: false,
        })}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModifierHelper;
