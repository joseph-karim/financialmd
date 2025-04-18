import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Info, Search, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

const NoteAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<null | {
    score: number;
    mdmLevel: string;
    missingElements: string[];
    codeRecommendation: string;
    hccOpportunities: string[];
    warnings: string[];
  }>(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis processing
    setTimeout(() => {
      // This would be replaced with actual analysis logic
      const results = {
        score: 78,
        mdmLevel: 'Moderate',
        missingElements: [
          'Specific medication dosage changes',
          'Time statement for time-based billing',
          'Assessment of treatment effectiveness'
        ],
        codeRecommendation: '99214 - Office/outpatient visit, established patient, moderate complexity',
        hccOpportunities: [
          'Consider documenting diabetes with chronic kidney disease (E11.22)',
          'Document status of hypertensive heart disease (I11.9)'
        ],
        warnings: [
          'Documentation may not fully support the complexity of medical decision making',
          'Missing specific assessment for one chronic condition'
        ]
      };
      
      setAnalysisResults(results);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Clinical Note Analyzer
        </CardTitle>
        <CardDescription>
          Analyze your clinical notes for coding opportunities, documentation gaps, and compliance issues.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            This feature is currently in development. The example below demonstrates the planned functionality.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <label htmlFor="input" className="block text-sm font-medium mb-2">
              Paste your clinical note for analysis:
            </label>
            <Textarea
              id="input"
              placeholder="Paste your clinical documentation here..."
              className="min-h-[200px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleAnalyze} 
            disabled={!inputText.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Note'}
          </Button>
          
          {analysisResults && (
            <>
              <Separator />
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Documentation Score</h3>
                    <Badge variant={analysisResults.score >= 80 ? "default" : "outline"}>
                      {analysisResults.score}%
                    </Badge>
                  </div>
                  <Progress value={analysisResults.score} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {analysisResults.score >= 80 
                      ? 'Good documentation quality' 
                      : 'Documentation could be improved'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Code Recommendation</h3>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <p className="font-medium">{analysisResults.codeRecommendation}</p>
                    <p className="text-sm mt-1">Based on {analysisResults.mdmLevel} complexity medical decision making</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Missing Elements</h3>
                  <ul className="space-y-1">
                    {analysisResults.missingElements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">HCC Coding Opportunities</h3>
                  <ul className="space-y-1">
                    {analysisResults.hccOpportunities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {analysisResults.warnings.length > 0 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warnings</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                        {analysisResults.warnings.map((warning, index) => (
                          <li key={index} className="text-sm">{warning}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Analysis is for guidance only. Always use professional judgment for final coding decisions.</p>
      </CardFooter>
    </Card>
  );
};

export default NoteAnalyzer;
