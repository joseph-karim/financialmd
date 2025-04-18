import { useState } from 'react'
import { BookA, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useChatStore } from '@/store/chat-store'
import { AIChat } from '@/components/core/ai-chat'

// Mock cheat sheet data
const cheatSheetData = {
  codes: [
    { code: '99406', description: 'Tobacco use Counselling 3-10mins', rvu: 0.24 },
    { code: '99407', description: 'Tobacco use Counselling >10mins', rvu: 0.50 },
    { code: 'G2211', description: 'Medicare Continuity of Care', rvu: 0.33 },
    { code: 'G0442', description: 'Alcohol Screening', rvu: 0.18 },
    { code: 'G0444', description: 'Depression Screening', rvu: 0.18 },
    { code: 'G0446', description: 'Cardiovascular Risk Reduction', rvu: 0.45 },
    { code: 'G0447', description: 'Obesity Counselling', rvu: 0.45 },
    { code: 'G0296', description: 'Need for Low Dose CT', rvu: 0.52 },
    { code: '99497', description: 'Advance Care Planning', rvu: 1.50 },
    { code: '99401', description: 'Preventative Medicine Counselling', rvu: 0.48 },
    { code: '69210', description: 'Cerumen Disimpaction Unilateral Manually', rvu: 0.61 },
    { code: '17110', description: 'Wart Destruction 1-14 Lesions (Cryo)', rvu: 0.70 },
    { code: '11200', description: 'Skintag removal 1-15 Lesions', rvu: 0.80 },
    { code: '17000', description: 'Destruction benign/pre-malignant Lesion 1 (Cryo)', rvu: 0.61 },
    { code: '17003', description: 'Destruction benign/pre-malignant Lesions 2-14 (Cryo)', rvu: 0.04 },
  ],
  templates: [
    {
      title: 'Tobacco Cessation Counseling', 
      content: 'Smoking risks (COPD, cancer, heart dz) discussed. Strategies (NRT, BHT, meds) counseled. Total time: 3 mins',
      code: '99406'
    },
    {
      title: 'Obesity Counseling', 
      content: 'BMI 33. Discussed diet/exercise for BMI <25. Exercise 150 min/wk (inc HR/sweat), strength 2x/wk. Less sitting. Portion control, <1500 cal. Total plan/counseling time: ~8 mins',
      code: 'G0447'
    },
    {
      title: 'Vaping Counseling', 
      content: 'E-cigs contain nicotine, chemicals, toxicants (anti-freeze, carcinogens). Youth vulnerable (brain dev - CDC). Not approved for cessation, long-term effects unknown. Liquid causes nicotine poisoning (vomiting, sweat, dizzy, inc HR, lethargy, seizure, dyspnea). Assoc w/ popcorn lung/lipid pneumonia. Total counseling time ~8 mins',
      code: '99401'
    },
    {
      title: 'Marijuana Counseling', 
      content: 'Risks: anxiety, fear, panic instead of relaxation (esp w/ high dose/potency, inexperience). Large doses -> acute psychosis (hallucinations, delusions, lost identity). Distinct from longer psychotic disorders assoc. w/ use in vulnerable ppl. Recent ACC studies: 34% higher CAD risk, 20% inc MI risk, 40% inc stroke risk vs non-users. Approx counseling time: 8 mins',
      code: '99401'
    },
    {
      title: 'Level 5 (99215) Documentation', 
      content: 'Patient with exertional chest pain, respiratory distress, exam findings suggestive of DVT/PE/MI/CHF/COPD/ARF. Discussed need for urgent ER eval, patient agrees to go with family',
      code: '99215'
    },
  ]
}

export default function CheatSheet() {
  const [searchTerm, setSearchTerm] = useState('')
  const { isOpen } = useChatStore()
  const [activeTab, setActiveTab] = useState('codes')
  
  // Filter codes based on search term
  const filteredCodes = cheatSheetData.codes.filter(
    (code) =>
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Filter templates based on search term
  const filteredTemplates = cheatSheetData.templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.code.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="container max-w-6xl p-4 md:p-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-medical-dark">Coding Cheat Sheet</h1>
          <p className="text-muted-foreground">
            Quick reference for billing codes and documentation templates
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-medical-blue/70" />
          <Input
            type="search"
            placeholder="Search for codes or descriptions..."
            className="pl-8 border-medical-blue/20 focus-visible:ring-medical-blue"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="codes" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-medical-light dark:bg-gray-800/30">
            <TabsTrigger 
              value="codes"
              className="data-[state=active]:bg-medical-blue data-[state=active]:text-white"
            >
              Billing Codes
            </TabsTrigger>
            <TabsTrigger 
              value="templates"
              className="data-[state=active]:bg-medical-blue data-[state=active]:text-white"
            >
              Documentation Templates
            </TabsTrigger>
          </TabsList>
          
          {/* Codes Table */}
          <TabsContent value="codes" className="border-none p-0 pt-4">
            <Card className="shadow-card">
              <CardHeader className="pb-0 border-b">
                <CardTitle className="flex items-center gap-2 text-medical-dark">
                  <BookA className="h-5 w-5 text-medical-blue" />
                  Billing Codes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[60vh] rounded-md p-4">
                  {filteredCodes.length > 0 ? (
                    <table className="medical-table">
                      <thead>
                        <tr className="bg-medical-blue/10">
                          <th className="py-2 pl-0 pr-4 text-left font-semibold">Code</th>
                          <th className="px-4 py-2 text-left font-semibold">Description</th>
                          <th className="pl-4 pr-0 py-2 text-right font-semibold">RVU</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCodes.map((code) => (
                          <tr key={code.code} className="border-b hover:bg-medical-blue/5">
                            <td className="py-2 pl-0 pr-4 text-left font-medium text-medical-blue">{code.code}</td>
                            <td className="px-4 py-2 text-left">{code.description}</td>
                            <td className="pl-4 pr-0 py-2 text-right font-semibold">{code.rvu}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Search className="mb-2 h-8 w-8 text-medical-blue/50" />
                      <p className="text-center text-muted-foreground">
                        No matching codes found
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Templates */}
          <TabsContent value="templates" className="border-none p-0 pt-4">
            <Card className="shadow-card">
              <CardHeader className="pb-0 border-b">
                <CardTitle className="flex items-center gap-2 text-medical-dark">
                  <BookA className="h-5 w-5 text-medical-blue" />
                  Documentation Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[60vh] rounded-md p-4">
                  {filteredTemplates.length > 0 ? (
                    <div className="space-y-4">
                      {filteredTemplates.map((template, index) => (
                        <div key={index} className="rounded-lg border border-medical-blue/10 p-4 hover:shadow-card transition-shadow duration-200 bg-white dark:bg-gray-800">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-semibold text-medical-dark">{template.title}</h3>
                            <div className="rounded bg-medical-blue/10 px-2 py-1 text-xs font-medium text-medical-blue">
                              {template.code}
                            </div>
                          </div>
                          <p className="text-sm text-medical-dark/80">{template.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Search className="mb-2 h-8 w-8 text-medical-blue/50" />
                      <p className="text-center text-muted-foreground">
                        No matching templates found
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* AI Chat Component (conditionally rendered) */}
      {isOpen && <AIChat />}
    </div>
  )
}