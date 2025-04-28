import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Brain, ChevronLeft, ChevronRight, CheckCircle2, Calendar, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useAuth } from '@/contexts/auth-context'
import { useProgressStore } from '@/store/progress-store'
import { useChatStore } from '@/store/chat-store'
import { getModuleNavigation } from '@/lib/module-data'

interface ModuleLayoutProps {
  children: ReactNode
  moduleId: string
  title: string
  isPreview: boolean
}

export function ModuleLayout({ children, moduleId, title, isPreview }: ModuleLayoutProps) {
  const navigate = useNavigate()
  const { userRole } = useAuth()
  const { markModuleAsCompleted, completedModules } = useProgressStore()
  const { openChat } = useChatStore()
  
  // Get navigation for this module
  const { prev, next } = getModuleNavigation(moduleId)
  
  // Choose icon based on module type
  let ModuleIcon = BookOpen;
  if (moduleId === 'preventative-medicine') {
    ModuleIcon = Stethoscope;
  } else if (moduleId === 'medicare-wellness') {
    ModuleIcon = Calendar;
  }
  
  // Handle mark as completed
  const handleMarkAsCompleted = () => {
    markModuleAsCompleted(moduleId)
  }
  
  // If restricted content and user doesn't have access
  if (!isPreview && userRole !== 'paid') {
    return (
      <div className="container flex flex-col items-center justify-center p-4 text-center md:p-8">
        <div className="mb-8 flex flex-col items-center space-y-4">
          <ModuleIcon className="h-16 w-16 text-amber-500" />
          <h1 className="text-2xl font-bold text-medical-dark">Premium Content</h1>
          <p className="max-w-md text-muted-foreground">
            This module is only available with full access to the masterclass.
          </p>
        </div>
        <Button 
          onClick={() => navigate('/payment')} 
          className="bg-medical-blue hover:bg-medical-blue/90 text-white"
        >
          Upgrade to Full Access
        </Button>
      </div>
    )
  }
  
  return (
    <div className="container max-w-4xl p-4 md:p-6">
      <div className="mb-6">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/modules/${moduleId}`}>{title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-medical-dark">{title}</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={openChat}
            className="border-medical-blue/20 hover:bg-medical-blue/5 hover:text-medical-blue"
          >
            <Brain className="mr-2 h-4 w-4 text-medical-blue" />
            Ask AI
          </Button>
        </div>
        <div className="mt-1 flex items-center text-muted-foreground">
          <ModuleIcon className="mr-2 h-4 w-4" />
          <span>{isPreview ? 'Preview Content' : 'Full Access Content'}</span>
        </div>
      </div>
      
      <Card className="mb-8 shadow-card overflow-x-hidden">
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
      
      {/* Module navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          {prev && (
            <Button 
              variant="outline" 
              onClick={() => navigate(`/modules/${prev.id}`)}
              className="flex items-center border-medical-blue/20 hover:bg-medical-blue/5 hover:text-medical-blue"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {prev.title}
            </Button>
          )}
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleMarkAsCompleted} 
            variant={completedModules[moduleId] ? "outline" : "default"}
            disabled={completedModules[moduleId]}
            className={completedModules[moduleId] ? 
              "border-medical-green/40 text-medical-green" : 
              "bg-medical-green hover:bg-medical-green/90 text-white"}
          >
            {completedModules[moduleId] ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Completed
              </>
            ) : (
              'Mark as Completed'
            )}
          </Button>
        </div>
        
        <div className="flex gap-2 justify-end">
          {next && (
            <Button 
              onClick={() => navigate(`/modules/${next.id}`)}
              className="flex items-center bg-medical-blue hover:bg-medical-blue/90 text-white"
            >
              {next.title}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}