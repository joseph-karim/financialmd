import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/supabase';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Info, Calculator } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface CodeData {
  code: string;
  description_short: string;
  national_wrvu: number;
}

const AWVRevenueCalculator: React.FC = () => {
  const supabase = useSupabaseClient<Database>();
  const [codeData, setCodeData] = useState<Record<string, CodeData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Calculator state
  const [patientCount, setPatientCount] = useState<number>(100);
  const [conversionFactor, setConversionFactor] = useState<number>(34.0096); // 2023 Medicare conversion factor
  const [includeEM, setIncludeEM] = useState<boolean>(true);
  const [includeACP, setIncludeACP] = useState<boolean>(false);
  const [includeG0444, setIncludeG0444] = useState<boolean>(false);
  const [includeG0442, setIncludeG0442] = useState<boolean>(false);
  const [emPercentage, setEmPercentage] = useState<number>(50);
  const [acpPercentage, setAcpPercentage] = useState<number>(10);
  const [initialPercentage, setInitialPercentage] = useState<number>(20);

  useEffect(() => {
    const fetchCodeData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('codes')
          .select('code, description_short, national_wrvu')
          .in('code', ['G0438', 'G0439', '99214', '99497', 'G0444', 'G0442']);

        if (error) {
          throw error;
        }

        if (data) {
          const codeMap: Record<string, CodeData> = {};
          data.forEach(item => {
            codeMap[item.code] = item;
          });
          setCodeData(codeMap);
        }
      } catch (err) {
        console.error('Error fetching code data:', err);
        setError('Failed to load code data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCodeData();
  }, [supabase]);

  const calculateRevenue = () => {
    if (!codeData.G0438 || !codeData.G0439) return { total: 0, breakdown: [] };
    
    const initialAwvRvu = codeData.G0438.national_wrvu;
    const subsequentAwvRvu = codeData.G0439.national_wrvu;
    const emRvu = codeData.['99214']?.national_wrvu || 1.5;
    const acpRvu = codeData.['99497']?.national_wrvu || 1.5;
    const g0444Rvu = codeData.G0444?.national_wrvu || 0.18;
    const g0442Rvu = codeData.G0442?.national_wrvu || 0.18;
    
    // Calculate number of each type
    const initialCount = Math.round(patientCount * (initialPercentage / 100));
    const subsequentCount = patientCount - initialCount;
    const emCount = includeEM ? Math.round(patientCount * (emPercentage / 100)) : 0;
    const acpCount = includeACP ? Math.round(patientCount * (acpPercentage / 100)) : 0;
    const g0444Count = includeG0444 ? subsequentCount : 0; // Only with subsequent AWVs
    const g0442Count = includeG0442 ? patientCount : 0;
    
    // Calculate revenue for each
    const initialRevenue = initialCount * initialAwvRvu * conversionFactor;
    const subsequentRevenue = subsequentCount * subsequentAwvRvu * conversionFactor;
    const emRevenue = emCount * emRvu * conversionFactor;
    const acpRevenue = acpCount * acpRvu * conversionFactor;
    const g0444Revenue = g0444Count * g0444Rvu * conversionFactor;
    const g0442Revenue = g0442Count * g0442Rvu * conversionFactor;
    
    const totalRevenue = initialRevenue + subsequentRevenue + emRevenue + acpRevenue + g0444Revenue + g0442Revenue;
    
    const breakdown = [
      { 
        code: 'G0438', 
        description: 'Initial AWV', 
        count: initialCount, 
        rvu: initialAwvRvu, 
        revenue: initialRevenue 
      },
      { 
        code: 'G0439', 
        description: 'Subsequent AWV', 
        count: subsequentCount, 
        rvu: subsequentAwvRvu, 
        revenue: subsequentRevenue 
      }
    ];
    
    if (includeEM) {
      breakdown.push({ 
        code: '99214-25', 
        description: 'E/M with Modifier 25', 
        count: emCount, 
        rvu: emRvu, 
        revenue: emRevenue 
      });
    }
    
    if (includeACP) {
      breakdown.push({ 
        code: '99497', 
        description: 'Advance Care Planning', 
        count: acpCount, 
        rvu: acpRvu, 
        revenue: acpRevenue 
      });
    }
    
    if (includeG0444) {
      breakdown.push({ 
        code: 'G0444', 
        description: 'Depression Screening', 
        count: g0444Count, 
        rvu: g0444Rvu, 
        revenue: g0444Revenue 
      });
    }
    
    if (includeG0442) {
      breakdown.push({ 
        code: 'G0442', 
        description: 'Alcohol Screening', 
        count: g0442Count, 
        rvu: g0442Rvu, 
        revenue: g0442Revenue 
      });
    }
    
    return { total: totalRevenue, breakdown };
  };

  const result = calculateRevenue();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Annual Wellness Visit Revenue Calculator</CardTitle>
        <CardDescription>
          Estimate potential revenue from Medicare Annual Wellness Visits and associated services.
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
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This calculator provides an estimate based on national averages. Actual reimbursement may vary based on geographic location, MAC policies, and other factors.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="patientCount">Medicare Patient Count</Label>
                  <Input
                    id="patientCount"
                    type="number"
                    min="1"
                    value={patientCount}
                    onChange={(e) => setPatientCount(parseInt(e.target.value) || 0)}
                  />
                  <p className="text-xs text-muted-foreground">Number of Medicare patients eligible for AWV</p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="conversionFactor">Medicare Conversion Factor</Label>
                  <Input
                    id="conversionFactor"
                    type="number"
                    step="0.0001"
                    min="0"
                    value={conversionFactor}
                    onChange={(e) => setConversionFactor(parseFloat(e.target.value) || 0)}
                  />
                  <p className="text-xs text-muted-foreground">2023 Medicare conversion factor: $34.0096</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="initialPercentage">Initial AWV Percentage</Label>
                <Input
                  id="initialPercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={initialPercentage}
                  onChange={(e) => setInitialPercentage(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Percentage of patients receiving initial AWV (G0438) vs. subsequent AWV (G0439)</p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Services</h3>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="includeEM" 
                    checked={includeEM} 
                    onCheckedChange={() => setIncludeEM(!includeEM)} 
                  />
                  <div className="space-y-1">
                    <Label htmlFor="includeEM" className="font-medium">
                      Include Problem-Focused E/M (99214-25)
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Percentage of AWVs that also include a separately billable E/M service
                    </p>
                    {includeEM && (
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={emPercentage}
                        onChange={(e) => setEmPercentage(parseInt(e.target.value) || 0)}
                        className="w-24 h-8 mt-1"
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="includeACP" 
                    checked={includeACP} 
                    onCheckedChange={() => setIncludeACP(!includeACP)} 
                  />
                  <div className="space-y-1">
                    <Label htmlFor="includeACP" className="font-medium">
                      Include Advance Care Planning (99497)
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Percentage of AWVs that include ACP (no cost-sharing when done with AWV)
                    </p>
                    {includeACP && (
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={acpPercentage}
                        onChange={(e) => setAcpPercentage(parseInt(e.target.value) || 0)}
                        className="w-24 h-8 mt-1"
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="includeG0444" 
                    checked={includeG0444} 
                    onCheckedChange={() => setIncludeG0444(!includeG0444)} 
                  />
                  <div className="space-y-1">
                    <Label htmlFor="includeG0444" className="font-medium">
                      Include Depression Screening (G0444)
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Add depression screening to subsequent AWVs (not billable with initial AWV)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="includeG0442" 
                    checked={includeG0442} 
                    onCheckedChange={() => setIncludeG0442(!includeG0442)} 
                  />
                  <div className="space-y-1">
                    <Label htmlFor="includeG0442" className="font-medium">
                      Include Alcohol Screening (G0442)
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Add alcohol screening to all AWVs
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Revenue Projection</h3>
                  <div className="bg-primary/10 text-primary font-medium px-4 py-2 rounded-md flex items-center">
                    <Calculator className="h-4 w-4 mr-2" />
                    Total: ${result.total.toFixed(2)}
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">wRVU</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.breakdown.map((item) => (
                      <TableRow key={item.code}>
                        <TableCell className="font-medium">{item.code}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">{item.count}</TableCell>
                        <TableCell className="text-right">{item.rvu.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${item.revenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <Alert>
                  <AlertDescription>
                    Per patient average: ${(result.total / patientCount).toFixed(2)}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Source: CMS, AAFP</p>
        <Button variant="outline" onClick={() => {
          setPatientCount(100);
          setConversionFactor(34.0096);
          setIncludeEM(true);
          setIncludeACP(false);
          setIncludeG0444(false);
          setIncludeG0442(false);
          setEmPercentage(50);
          setAcpPercentage(10);
          setInitialPercentage(20);
        }}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AWVRevenueCalculator;
