import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Copy, Search, Check, Tag } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';

interface SmartPhrase {
  id: string;
  phrase_name: string;
  content: string;
  scenario: string;
  related_codes: string[] | null;
  source_recommendation: string | null;
}

const SmartPhraseLibrary: React.FC = () => {
  const supabase = useSupabaseClient<Database>();
  const [phrases, setPhrases] = useState<SmartPhrase[]>([]);
  const [filteredPhrases, setFilteredPhrases] = useState<SmartPhrase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<string[]>([]);

  useEffect(() => {
    const fetchPhrases = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('smart_phrases')
          .select('*')
          .order('scenario', { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          setPhrases(data);
          setFilteredPhrases(data);
          
          // Extract unique scenarios for tabs
          const uniqueScenarios = Array.from(new Set(data.map(phrase => phrase.scenario)));
          setScenarios(uniqueScenarios);
        }
      } catch (err) {
        console.error('Error fetching smart phrases:', err);
        setError('Failed to load smart phrases. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhrases();
  }, [supabase]);

  useEffect(() => {
    // Filter phrases based on search term and selected scenario
    let filtered = phrases;
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        phrase => 
          phrase.phrase_name.toLowerCase().includes(lowerSearchTerm) || 
          phrase.content.toLowerCase().includes(lowerSearchTerm) ||
          phrase.scenario.toLowerCase().includes(lowerSearchTerm) ||
          (phrase.related_codes && phrase.related_codes.some(code => code.toLowerCase().includes(lowerSearchTerm)))
      );
    }
    
    if (selectedScenario !== 'all') {
      filtered = filtered.filter(phrase => phrase.scenario === selectedScenario);
    }
    
    setFilteredPhrases(filtered);
  }, [searchTerm, selectedScenario, phrases]);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Smart Phrase Library</CardTitle>
        <CardDescription>
          Browse and copy reusable documentation snippets for common clinical scenarios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading smart phrases...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-6">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by phrase name, content, scenario, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                disabled={!searchTerm}
              >
                Clear
              </Button>
            </div>

            <Tabs defaultValue="all" value={selectedScenario} onValueChange={setSelectedScenario}>
              <TabsList className="mb-4 flex flex-wrap h-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                {scenarios.map(scenario => (
                  <TabsTrigger key={scenario} value={scenario}>
                    {scenario}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={selectedScenario} className="mt-0">
                {filteredPhrases.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No phrases found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredPhrases.map((phrase) => (
                      <div key={phrase.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{phrase.phrase_name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {phrase.scenario}
                              </Badge>
                              {phrase.source_recommendation && (
                                <Badge variant="secondary" className="text-xs">
                                  Source: {phrase.source_recommendation}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopy(phrase.id, phrase.content)}
                            className="flex items-center gap-1"
                          >
                            {copiedId === phrase.id ? (
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
                        
                        <Separator className="my-2" />
                        
                        <div className="bg-muted p-3 rounded text-sm whitespace-pre-wrap">
                          {phrase.content}
                        </div>
                        
                        {phrase.related_codes && phrase.related_codes.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground mb-1">Related Codes:</p>
                            <div className="flex flex-wrap gap-1">
                              {phrase.related_codes.map((code, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {code}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartPhraseLibrary;
