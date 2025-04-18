import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/supabase';
import { Search, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Code {
  code: string;
  description_short: string;
  description_long: string | null;
  type: string;
  national_wrvu: number;
  requires_modifier: boolean;
  ncci_pairs: string[] | null;
  guideline_source: string | null;
}

interface Modifier {
  modifier: string;
  description: string;
  usage_guidelines: string | null;
  examples: string[] | null;
}

const CodeLookup: React.FC = () => {
  const supabase = useSupabaseClient<Database>();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Code[]>([]);
  const [selectedCode, setSelectedCode] = useState<Code | null>(null);
  const [relatedModifiers, setRelatedModifiers] = useState<Modifier[]>([]);
  const [ncciBundledCodes, setNcciBundledCodes] = useState<Code[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Search by code or description
      const { data, error } = await supabase
        .from('codes')
        .select('*')
        .or(`code.ilike.%${searchTerm}%,description_short.ilike.%${searchTerm}%,description_long.ilike.%${searchTerm}%`)
        .limit(10);

      if (error) {
        throw error;
      }

      setSearchResults(data || []);
      
      // Clear selected code if no results
      if (!data || data.length === 0) {
        setSelectedCode(null);
      }
    } catch (err) {
      console.error('Error searching codes:', err);
      setError('Failed to search codes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSelect = async (code: Code) => {
    setSelectedCode(code);
    
    // Fetch related modifiers if code requires modifier
    if (code.requires_modifier) {
      try {
        const { data, error } = await supabase
          .from('modifiers')
          .select('*');

        if (error) {
          throw error;
        }

        setRelatedModifiers(data || []);
      } catch (err) {
        console.error('Error fetching modifiers:', err);
      }
    } else {
      setRelatedModifiers([]);
    }
    
    // Fetch NCCI bundled codes if any
    if (code.ncci_pairs && code.ncci_pairs.length > 0) {
      try {
        const { data, error } = await supabase
          .from('codes')
          .select('*')
          .in('code', code.ncci_pairs);

        if (error) {
          throw error;
        }

        setNcciBundledCodes(data || []);
      } catch (err) {
        console.error('Error fetching NCCI bundled codes:', err);
      }
    } else {
      setNcciBundledCodes([]);
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Code Lookup Tool</CardTitle>
        <CardDescription>
          Search for CPT, HCPCS, and other billing codes to view details, documentation requirements, and related information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by code or description (e.g., 99214, AWV, G0438)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {searchResults.length > 0 && !selectedCode && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Search Results</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">wRVU</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((code) => (
                  <TableRow key={code.code}>
                    <TableCell className="font-medium">{code.code}</TableCell>
                    <TableCell>{code.description_short}</TableCell>
                    <TableCell>{code.type}</TableCell>
                    <TableCell className="text-right">{code.national_wrvu.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleCodeSelect(code)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {searchResults.length === 0 && searchTerm && !loading && !error && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>No Results</AlertTitle>
            <AlertDescription>
              No codes found matching "{searchTerm}". Try a different search term.
            </AlertDescription>
          </Alert>
        )}

        {selectedCode && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{selectedCode.code}</h2>
                <p className="text-lg">{selectedCode.description_short}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge>{selectedCode.type}</Badge>
                  <Badge variant="outline">wRVU: {selectedCode.national_wrvu.toFixed(2)}</Badge>
                  {selectedCode.requires_modifier && (
                    <Badge variant="destructive">Requires Modifier</Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedCode(null)}>
                Back to Results
              </Button>
            </div>

            <Separator />

            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                {relatedModifiers.length > 0 && (
                  <TabsTrigger value="modifiers">Modifiers</TabsTrigger>
                )}
                {ncciBundledCodes.length > 0 && (
                  <TabsTrigger value="ncci">NCCI Pairs</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 mt-4">
                {selectedCode.description_long && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Full Description</h3>
                    <p>{selectedCode.description_long}</p>
                  </div>
                )}
                
                {selectedCode.guideline_source && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Guidelines</h3>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Source: {selectedCode.guideline_source}</AlertTitle>
                      <AlertDescription>
                        Refer to {selectedCode.guideline_source} for complete documentation and billing guidelines.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                
                {selectedCode.requires_modifier && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Modifier Required</AlertTitle>
                    <AlertDescription>
                      This code typically requires a modifier for proper billing. See the Modifiers tab for details.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div>
                  <h3 className="text-lg font-medium mb-2">External Resources</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`https://www.cms.gov/medicare-coverage-database/search.aspx?q=${selectedCode.code}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        CMS Medicare Coverage Database
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`https://www.aapc.com/codes/cpt-codes/${selectedCode.code}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        AAPC Code Lookup
                      </a>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {relatedModifiers.length > 0 && (
                <TabsContent value="modifiers" className="space-y-4 mt-4">
                  {relatedModifiers.map((modifier) => (
                    <Card key={modifier.modifier}>
                      <CardHeader>
                        <CardTitle>Modifier {modifier.modifier}</CardTitle>
                        <CardDescription>{modifier.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {modifier.usage_guidelines && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-1">Usage Guidelines</h4>
                            <p>{modifier.usage_guidelines}</p>
                          </div>
                        )}
                        
                        {modifier.examples && modifier.examples.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-1">Examples</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {modifier.examples.map((example, index) => (
                                <li key={index}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              )}
              
              {ncciBundledCodes.length > 0 && (
                <TabsContent value="ncci" className="space-y-4 mt-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>NCCI Bundling</AlertTitle>
                    <AlertDescription>
                      The following codes are bundled with {selectedCode.code} according to CMS National Correct Coding Initiative (NCCI). These codes should not be billed together without appropriate modifiers.
                    </AlertDescription>
                  </Alert>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ncciBundledCodes.map((code) => (
                        <TableRow key={code.code}>
                          <TableCell className="font-medium">{code.code}</TableCell>
                          <TableCell>{code.description_short}</TableCell>
                          <TableCell>{code.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeLookup;
