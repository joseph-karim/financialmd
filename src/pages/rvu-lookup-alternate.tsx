import { useState } from 'react'
import { Search, FileBarChart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { useChatStore } from '@/store/chat-store'
import { AIChat } from '@/components/core/ai-chat'

// Mock RVU data
const rvuData = [
  { code: '99202', description: 'Office/outpatient visit, new patient, straightforward MDM', rvu: 0.93, category: 'E&M' },
  { code: '99203', description: 'Office/outpatient visit, new patient, low MDM', rvu: 1.6, category: 'E&M' },
  { code: '99204', description: 'Office/outpatient visit, new patient, moderate MDM', rvu: 2.6, category: 'E&M' },
  { code: '99205', description: 'Office/outpatient visit, new patient, high MDM', rvu: 3.5, category: 'E&M' },
  { code: '99212', description: 'Office/outpatient visit, established patient, straightforward MDM', rvu: 0.7, category: 'E&M' },
  { code: '99213', description: 'Office/outpatient visit, established patient, low MDM', rvu: 1.3, category: 'E&M' },
  { code: '99214', description: 'Office/outpatient visit, established patient, moderate MDM', rvu: 1.92, category: 'E&M' },
  { code: '99215', description: 'Office/outpatient visit, established patient, high MDM', rvu: 2.8, category: 'E&M' },
  { code: '99381', description: 'Initial preventive medicine, infant (< 1 year)', rvu: 1.5, category: 'Preventive' },
  { code: '99382', description: 'Initial preventive medicine, early childhood (1-4 years)', rvu: 1.6, category: 'Preventive' },
  { code: '99383', description: 'Initial preventive medicine, late childhood (5-11 years)', rvu: 1.7, category: 'Preventive' },
  { code: '99384', description: 'Initial preventive medicine, adolescent (12-17 years)', rvu: 2.0, category: 'Preventive' },
  { code: '99385', description: 'Initial preventive medicine, young adult (18-39 years)', rvu: 1.92, category: 'Preventive' },
  { code: '99386', description: 'Initial preventive medicine, adult (40-64 years)', rvu: 2.33, category: 'Preventive' },
  { code: '99387', description: 'Initial preventive medicine, elderly (65+ years)', rvu: 2.5, category: 'Preventive' },
  { code: '99391', description: 'Periodic preventive medicine, infant (< 1 year)', rvu: 1.37, category: 'Preventive' },
  { code: '99392', description: 'Periodic preventive medicine, early childhood (1-4 years)', rvu: 1.5, category: 'Preventive' },
  { code: '99393', description: 'Periodic preventive medicine, late childhood (5-11 years)', rvu: 1.5, category: 'Preventive' },
  { code: '99394', description: 'Periodic preventive medicine, adolescent (12-17 years)', rvu: 1.7, category: 'Preventive' },
  { code: '99395', description: 'Periodic preventive medicine, young adult (18-39 years)', rvu: 1.75, category: 'Preventive' },
  { code: '99396', description: 'Periodic preventive medicine, adult (40-64 years)', rvu: 1.9, category: 'Preventive' },
  { code: '99397', description: 'Periodic preventive medicine, elderly (65+ years)', rvu: 2.0, category: 'Preventive' },
  { code: 'G0402', description: 'Welcome to Medicare visit', rvu: 2.6, category: 'Medicare' },
  { code: 'G0438', description: 'Annual wellness visit, initial', rvu: 2.6, category: 'Medicare' },
  { code: 'G0439', description: 'Annual wellness visit, subsequent', rvu: 1.92, category: 'Medicare' },
  { code: '99495', description: 'Transitional care management - moderate complexity', rvu: 2.78, category: 'TCM' },
  { code: '99496', description: 'Transitional care management - high complexity', rvu: 3.79, category: 'TCM' },
  { code: '99406', description: 'Tobacco use counseling 3-10 minutes', rvu: 0.24, category: 'Counseling' },
  { code: '99407', description: 'Tobacco use counseling >10 minutes', rvu: 0.50, category: 'Counseling' },
  { code: '99401', description: 'Preventive medicine counseling, 15 min', rvu: 0.48, category: 'Counseling' },
  { code: 'G0444', description: 'Annual depression screening', rvu: 0.18, category: 'Medicare' },
  { code: 'G0442', description: 'Annual alcohol misuse screening', rvu: 0.18, category: 'Medicare' },
  { code: 'G0443', description: 'Brief alcohol misuse counseling', rvu: 0.45, category: 'Medicare' },
  { code: 'G0446', description: 'Annual, intensive behavioral therapy for CVD', rvu: 0.45, category: 'Medicare' },
  { code: 'G0447', description: 'Behavior counseling for obesity', rvu: 0.45, category: 'Medicare' },
  { code: 'G0296', description: 'Counseling for lung cancer screening', rvu: 0.52, category: 'Medicare' },
  { code: 'G2211', description: 'Medicare continuity of care', rvu: 0.33, category: 'Medicare' },
  { code: '99497', description: 'Advance care planning, first 30 min', rvu: 1.50, category: 'ACP' },
  { code: '69210', description: 'Cerumen removal', rvu: 0.61, category: 'Procedure' },
  { code: '17110', description: 'Wart destruction 1-14 lesions', rvu: 0.70, category: 'Procedure' },
  { code: '11200', description: 'Skin tag removal 1-15 lesions', rvu: 0.80, category: 'Procedure' },
  { code: '17000', description: 'Destruction of benign/premalignant lesion, first', rvu: 0.61, category: 'Procedure' },
  { code: '17003', description: 'Destruction of benign/premalignant lesion, 2-14', rvu: 0.04, category: 'Procedure' },
]

// Group codes by category
const groupedData = rvuData.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, typeof rvuData>);

export default function RVULookupAlternate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const { isOpen } = useChatStore()
  
  // Filter RVUs based on search term and category
  const filteredRVUs = rvuData.filter(
    (rvuItem) => {
      const matchesSearch = 
        rvuItem.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rvuItem.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch && (filterCategory === null || rvuItem.category === filterCategory);
    }
  )
  
  const categories = Object.keys(groupedData).sort();
  
  return (
    <div className="container max-w-6xl p-4 md:p-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">RVU Lookup</h1>
          <p className="text-muted-foreground">
            Search for RVU values by CPT or G-code
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by code or description..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory(null)}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filterCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="space-y-8">
          {/* RVU Table */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5" />
                RVU Values
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[60vh] rounded-md border p-4">
                {filteredRVUs.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 pl-0 pr-4 text-left font-medium">Code</th>
                        <th className="px-4 py-2 text-left font-medium">Description</th>
                        <th className="px-4 py-2 text-left font-medium">Category</th>
                        <th className="pl-4 pr-0 py-2 text-right font-medium">RVU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRVUs.map((rvuItem) => (
                        <tr key={rvuItem.code} className="border-b">
                          <td className="py-2 pl-0 pr-4 text-left font-medium">{rvuItem.code}</td>
                          <td className="px-4 py-2 text-left">{rvuItem.description}</td>
                          <td className="px-4 py-2 text-left">{rvuItem.category}</td>
                          <td className="pl-4 pr-0 py-2 text-right">{rvuItem.rvu}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Search className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-center text-muted-foreground">
                      No matching codes found
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          
          {/* AAPC RVU Calculator Widget - iframe approach */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5" />
                AAPC RVU Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-center">
                <iframe 
                  src="/aapc-widget-container.html" 
                  title="AAPC RVU Calculator Widget"
                  width="100%"
                  height="600px"
                  style={{ border: 'none', maxWidth: '600px', margin: '0 auto' }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* AI Chat Component (conditionally rendered) */}
      {isOpen && <AIChat />}
    </div>
  )
}