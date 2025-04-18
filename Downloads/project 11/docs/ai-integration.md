# AI Integration

This document outlines the AI integration strategy for the Primary Care Financial Masterclass re-architecture, focusing on the implementation of AI-powered documentation and analysis tools.

## Overview

The application will integrate AI capabilities to provide three main functionalities:

1. **AI Scribe Assist**: Generate structured SOAP notes from bullet points
2. **Note Structurer**: Reorganize unstructured text into SOAP format
3. **Billing Analysis & Feedback**: Analyze notes to suggest codes/modifiers and provide documentation improvement tips

## Technical Implementation

### Backend: Supabase Edge Functions

We'll implement the AI functionality using Supabase Edge Functions, which will call external LLM APIs (e.g., OpenAI API or Google Gemini API).

#### Function: generate-structured-note

```typescript
// supabase/functions/generate-structured-note/index.ts

import { createClient } from '@supabase/supabase-js'
import { OpenAI } from 'openai'

// Environment variables and CORS setup

interface NoteInput {
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS and authentication
  
  try {
    const { noteInput } = await req.json() as { noteInput: NoteInput };
    
    // Validate input
    if (!noteInput || Object.values(noteInput).every(val => !val)) {
      throw new Error('Note input is required');
    }
    
    // Prepare prompt with medical billing best practices
    const prompt = `
      You are an expert medical scribe for primary care physicians. Generate a well-structured SOAP note based on the following bullet points.
      Follow these guidelines:
      - Use proper medical terminology
      - Include all relevant information for billing purposes
      - Document clearly to support the appropriate level of service
      - Format in standard SOAP note structure
      - Be concise but thorough
      
      Here are the bullet points:
      ${noteInput.subjective ? `SUBJECTIVE: ${noteInput.subjective}` : ''}
      ${noteInput.objective ? `OBJECTIVE: ${noteInput.objective}` : ''}
      ${noteInput.assessment ? `ASSESSMENT: ${noteInput.assessment}` : ''}
      ${noteInput.plan ? `PLAN: ${noteInput.plan}` : ''}
    `;
    
    // Call OpenAI API
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY') || '',
    });
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'You are an expert medical scribe assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
    });
    
    const generatedNote = response.choices[0]?.message?.content || 'Failed to generate note';
    
    return new Response(
      JSON.stringify({ note: generatedNote }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
    
  } catch (error) {
    // Error handling
  }
});
```

#### Function: structure-clinical-note

```typescript
// supabase/functions/structure-clinical-note/index.ts

// Similar structure to generate-structured-note, but takes unstructured text
// and returns organized SOAP sections
```

#### Function: analyze-note-billing

```typescript
// supabase/functions/analyze-note-billing/index.ts

// Takes a clinical note and returns:
// - Suggested E/M and other billing codes
// - Documentation gaps
// - MDM level assessment
// - Improvement suggestions
```

### Frontend Integration

#### AI Scribe Assist Component

```tsx
// src/components/tools/AIScribeAssist.tsx

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

export function AIScribeAssist() {
  const [inputs, setInputs] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });
  const [generatedNote, setGeneratedNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const handleInputChange = (section: string, value: string) => {
    setInputs(prev => ({ ...prev, [section]: value }));
  };
  
  const handleGenerate = async () => {
    // Validate inputs
    if (Object.values(inputs).every(val => !val.trim())) {
      toast({
        title: 'Input Required',
        description: 'Please enter at least one section of the note.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-structured-note', {
        body: { noteInput: inputs }
      });
      
      if (error) throw error;
      
      setGeneratedNote(data.note);
    } catch (error) {
      console.error('Error generating note:', error);
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate note. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedNote);
    toast({
      title: 'Copied to Clipboard',
      description: 'The generated note has been copied to your clipboard.'
    });
  };
  
  return (
    <div className="container max-w-4xl p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-medical-dark">AI Scribe Assist</h1>
        <p className="text-muted-foreground mt-1">
          Generate structured SOAP notes from your bullet points
        </p>
      </div>
      
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle>Enter Note Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="subjective" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="subjective">Subjective</TabsTrigger>
              <TabsTrigger value="objective">Objective</TabsTrigger>
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="plan">Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subjective">
              <Textarea
                placeholder="Enter subjective findings (HPI, ROS, etc.) as bullet points..."
                className="min-h-[200px]"
                value={inputs.subjective}
                onChange={(e) => handleInputChange('subjective', e.target.value)}
              />
            </TabsContent>
            
            {/* Similar TabsContent for other sections */}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="bg-medical-blue hover:bg-medical-blue/90 text-white"
          >
            {isGenerating ? 'Generating...' : 'Generate SOAP Note'}
          </Button>
        </CardFooter>
      </Card>
      
      {generatedNote && (
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated SOAP Note</CardTitle>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              Copy to Clipboard
            </Button>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-md border">
              {generatedNote}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Note: This AI-generated content should be reviewed for accuracy before clinical use.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
```

#### Note Analyzer Component

```tsx
// src/components/tools/NoteAnalyzer.tsx

// Similar structure to AIScribeAssist, but for analyzing notes
// and providing billing/documentation feedback
```

## Prompt Engineering

### AI Scribe Assist Prompt

The prompt for the AI Scribe Assist tool will be carefully engineered to:

1. Generate clinically appropriate documentation
2. Include all necessary elements for proper billing
3. Follow standard SOAP format
4. Use appropriate medical terminology
5. Be concise but thorough

### Note Analyzer Prompt

The prompt for the Note Analyzer will be engineered to:

1. Identify the appropriate E/M level based on documented elements
2. Suggest applicable add-on codes (G-codes, etc.)
3. Identify documentation gaps that could affect billing
4. Provide specific improvement suggestions
5. Reference course content and best practices

## Security & Compliance Considerations

1. **PHI Protection**:
   - Clear warnings to users not to include PHI
   - No storage of submitted notes or generated content
   - Compliance with HIPAA guidelines

2. **Disclaimer Requirements**:
   - Clear disclaimers that AI-generated content requires professional review
   - Statements that the tool is for educational purposes
   - Acknowledgment that billing advice should be verified

3. **API Key Security**:
   - Secure storage of API keys in Supabase environment variables
   - No client-side exposure of keys

## Testing & Validation

1. **Prompt Testing**:
   - Test prompts with various clinical scenarios
   - Validate output quality and accuracy
   - Refine prompts based on results

2. **Edge Case Handling**:
   - Test with minimal input
   - Test with very complex cases
   - Test with inappropriate content

3. **User Acceptance Testing**:
   - Get feedback from medical professionals
   - Validate usefulness in real-world scenarios

## Future Enhancements

1. **Specialty-Specific Templates**:
   - Add templates for common primary care scenarios
   - Customize for different specialties

2. **Integration with EHRs**:
   - Explore potential for direct EHR integration
   - Develop export formats compatible with common EHRs

3. **Advanced Analytics**:
   - Track common documentation gaps
   - Provide personalized improvement suggestions over time
