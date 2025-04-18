import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Info, Sparkles, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from '../ui/separator';

const AIScribeAssist: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('enhance');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let result = '';
      
      if (activeTab === 'enhance') {
        result = enhanceDocumentation(inputText);
      } else if (activeTab === 'summarize') {
        result = summarizeDocumentation(inputText);
      } else if (activeTab === 'code') {
        result = suggestCodes(inputText);
      }
      
      setOutputText(result);
      setIsGenerating(false);
    }, 1500);
  };

  const enhanceDocumentation = (text: string) => {
    // This would be replaced with actual AI processing
    return `${text}\n\nAdditional documentation to support medical necessity:\n- Patient reports symptoms have been worsening over the past 2 weeks\n- Previous treatment with OTC medications has been ineffective\n- Physical exam reveals moderate tenderness on palpation\n- Assessment: Condition is currently uncontrolled and affecting daily activities\n- Plan includes prescription medication adjustment and follow-up in 2 weeks to assess response`;
  };

  const summarizeDocumentation = (text: string) => {
    // This would be replaced with actual AI processing
    return `ASSESSMENT & PLAN SUMMARY:\n\n1. Hypertension (I10) - Uncontrolled. Increasing lisinopril to 20mg daily. Follow-up in 4 weeks with home BP log.\n\n2. Type 2 Diabetes (E11.9) - A1c improved to 7.2%. Continue current regimen. Recheck A1c in 3 months.\n\n3. Hyperlipidemia (E78.5) - Stable on atorvastatin. Annual lipid panel due next visit.`;
  };

  const suggestCodes = (text: string) => {
    // This would be replaced with actual AI processing
    return `SUGGESTED CODES:\n\nDiagnosis Codes:\n- I10: Essential hypertension\n- E11.9: Type 2 diabetes without complications\n- E78.5: Hyperlipidemia, unspecified\n\nProcedure/Service Codes:\n- 99214: Office visit, established patient (moderate complexity)\n\nConsider documenting to support these additional codes:\n- G0447: Behavioral counseling for obesity\n- 99484: General behavioral health integration care management`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Documentation Assistant
        </CardTitle>
        <CardDescription>
          Enhance your clinical documentation with AI assistance. This tool helps improve specificity, suggest appropriate codes, and ensure documentation supports medical necessity.
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

        <Tabs defaultValue="enhance" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="enhance">Enhance Documentation</TabsTrigger>
            <TabsTrigger value="summarize">Generate Summary</TabsTrigger>
            <TabsTrigger value="code">Suggest Codes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enhance" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Enhance your documentation with additional details to support medical necessity and appropriate code levels.
            </p>
          </TabsContent>
          
          <TabsContent value="summarize" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Generate a concise assessment and plan summary from your clinical notes.
            </p>
          </TabsContent>
          
          <TabsContent value="code" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Get code suggestions based on your clinical documentation.
            </p>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <div>
            <label htmlFor="input" className="block text-sm font-medium mb-2">
              Enter your clinical note:
            </label>
            <Textarea
              id="input"
              placeholder="Enter your clinical documentation here..."
              className="min-h-[150px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={!inputText.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? 'Processing...' : 'Generate'}
          </Button>
          
          {outputText && (
            <>
              <Separator />
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">
                    {activeTab === 'enhance' ? 'Enhanced Documentation:' : 
                     activeTab === 'summarize' ? 'Documentation Summary:' : 
                     'Suggested Codes:'}
                  </label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
                  {outputText}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>AI suggestions are for assistance only. Always review for accuracy.</p>
      </CardFooter>
    </Card>
  );
};

export default AIScribeAssist;
