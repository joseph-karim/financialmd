import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Brain, CheckCircle2, Lock, Unlock, CreditCard, FileText,
  Calculator, Target, DollarSign, FileCode, Scale,
  Users, CalendarDays, UserPlus, PlusCircle, Stethoscope, Scissors, Receipt,
  Calendar, ArrowLeftRight, Clock, MoreHorizontal,
  // New module icons
  ClipboardList, HeartPulse, Plus, Wrench
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/contexts/auth-context'
import { useProgressStore } from '@/store/progress-store'
import { useChatStore } from '@/store/chat-store'
import { AIChat } from '@/components/core/ai-chat'
import { moduleNavItems } from '@/lib/module-data'

export default function Dashboard() {
  const { user, userRole } = useAuth()
  const { completedModules, fetchUserProgress } = useProgressStore()
  const { openChat, isOpen } = useChatStore()
  const navigate = useNavigate()

  const [progress, setProgress] = useState(0)

  // Fetch user progress
  useEffect(() => {
    if (user) {
      fetchUserProgress(user.id)
    }
  }, [user, fetchUserProgress])

  // Calculate progress
  useEffect(() => {
    if (Object.keys(completedModules).length > 0) {
      const completedCount = Object.values(completedModules).filter(Boolean).length
      const totalModules = moduleNavItems.length
      const progressValue = Math.round((completedCount / totalModules) * 100)
      setProgress(progressValue)
    }
  }, [completedModules])

  // Handle module click
  const handleModuleClick = (moduleId: string, isPreview: boolean) => {
    if (isPreview || userRole === 'paid') {
      navigate(`/modules/${moduleId}`)
    } else {
      // Could show upgrade modal instead
      window.alert('Upgrade to full access to view this module')
    }
  }

  // Handle payment
  const handlePaymentClick = () => {
    // In a real app, this would redirect to a Stripe checkout page
    navigate('/payment')
  }

  // Get icon for a module by ID
  const getModuleIcon = (moduleId: string) => {
    switch(moduleId) {
      // New module icons
      case 'practice-efficiency':
        return <ClipboardList className="h-12 w-12 text-medical-blue/70" />;
      case 'awv-optimization':
        return <Calendar className="h-12 w-12 text-medical-blue/70" />;
      case 'em-coding':
        return <FileCode className="h-12 w-12 text-medical-blue/70" />;
      case 'chronic-care':
        return <HeartPulse className="h-12 w-12 text-medical-blue/70" />;
      case 'special-services':
        return <Plus className="h-12 w-12 text-medical-blue/70" />;
      case 'tools':
        return <Wrench className="h-12 w-12 text-medical-blue/70" />;

      // Legacy module icons
      case 'introduction':
        return <Target className="h-12 w-12 text-medical-blue/70" />;
      case 'physician-reimbursement':
        return <DollarSign className="h-12 w-12 text-medical-blue/70" />;
      case 'coding-review':
        return <FileCode className="h-12 w-12 text-medical-blue/70" />;
      case 'billing-time-vs-complexity':
        return <Scale className="h-12 w-12 text-medical-blue/70" />;
      case 'office-visits':
        return <Users className="h-12 w-12 text-medical-blue/70" />;
      case 'annual-exams':
        return <CalendarDays className="h-12 w-12 text-medical-blue/70" />;
      case 'new-patient-visits':
        return <UserPlus className="h-12 w-12 text-medical-blue/70" />;
      case 'missed-codes':
        return <PlusCircle className="h-12 w-12 text-medical-blue/70" />;
      case 'preventative-medicine':
        return <Stethoscope className="h-12 w-12 text-medical-blue/70" />;
      case 'procedures':
        return <Scissors className="h-12 w-12 text-medical-blue/70" />;
      case 'medicare-billing':
        return <Receipt className="h-12 w-12 text-medical-blue/70" />;
      case 'medicare-wellness':
        return <Calendar className="h-12 w-12 text-medical-blue/70" />;
      case 'transition-care-management':
        return <ArrowLeftRight className="h-12 w-12 text-medical-blue/70" />;
      case 'daily-schedule':
        return <Clock className="h-12 w-12 text-medical-blue/70" />;
      case 'extras':
        return <MoreHorizontal className="h-12 w-12 text-medical-blue/70" />;
      default:
        return <BookOpen className="h-12 w-12 text-muted-foreground" />;
    }
  };

  return (
    <div className="container max-w-6xl p-4 md:p-6">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-medical-dark">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress through the Primary Care Financial Masterclass
          </p>
        </div>

        {/* Progress Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-medical-dark">Your Progress</CardTitle>
              <CardDescription>
                {progress}% of all modules completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-2 bg-gray-200"
                style={{ '--theme-primary': 'hsl(var(--medical-blue))' } as React.CSSProperties} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-medical-dark">Account Status</CardTitle>
              <CardDescription>
                {userRole === 'paid' ? 'Full Access' : 'Limited Access'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-6">
              {userRole === 'paid' ? (
                <div className="flex flex-col items-center gap-2 text-center">
                  <Unlock className="h-8 w-8 text-medical-green" />
                  <p className="text-sm font-medium text-medical-green">All Features Unlocked</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <Lock className="h-8 w-8 text-amber-500" />
                  <p className="text-sm font-medium text-amber-500">Upgrade for Full Access</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {userRole !== 'paid' && (
                <Button className="w-full bg-medical-blue hover:bg-medical-blue/90" onClick={handlePaymentClick}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Upgrade Now
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-medical-dark">AI Assistant</CardTitle>
              <CardDescription>
                Get help with billing and coding concepts
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <Brain className="h-8 w-8 text-medical-blue" />
                <p className="text-sm text-muted-foreground">
                  Ask questions about any module content
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-medical-blue hover:bg-medical-blue/90"
                onClick={openChat}
                variant={userRole !== 'paid' ? 'outline' : 'default'}
                disabled={userRole !== 'paid'}
              >
                {userRole === 'paid' ? (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Open AI Assistant
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Upgrade for AI Assistant
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Modules Section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-medical-dark">Masterclass Modules</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {moduleNavItems.map((module) => {
              const isCompleted = !!completedModules[module.id]
              const isAccessible = module.isPreview || userRole === 'paid'
              const ModuleIcon = getModuleIcon(module.id);

              return (
                <Card
                  key={module.id}
                  className={!isAccessible ? "opacity-70 shadow-sm" : "shadow-card"}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg text-medical-dark">{module.title}</CardTitle>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-medical-green" />
                      ) : !isAccessible ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : null}
                    </div>
                    <CardDescription>
                      {module.isPreview ? 'Preview Available' : 'Full Access Only'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-24 items-center justify-center">
                      {ModuleIcon}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleModuleClick(module.id, module.isPreview)}
                      className={`w-full ${
                        isAccessible
                          ? "bg-medical-blue hover:bg-medical-blue/90 text-white"
                          : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
                      }`}
                      variant={isAccessible ? 'default' : 'outline'}
                    >
                      {isAccessible ? (
                        isCompleted ? 'Review Again' : 'Start Learning'
                      ) : (
                        'Upgrade to Access'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Tools Section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-medical-dark">Interactive Tools</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-medical-dark">Code Lookup</CardTitle>
                <CardDescription>
                  Search for codes and billing details
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-10 w-10 text-medical-blue/70" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${userRole === 'paid'
                    ? "bg-medical-blue hover:bg-medical-blue/90 text-white"
                    : "bg-gray-100 border border-gray-200 text-gray-500"}`}
                  onClick={() => navigate('/modules/tools/code-lookup')}
                  variant={userRole !== 'paid' ? 'outline' : 'default'}
                  disabled={userRole !== 'paid'}
                >
                  {userRole === 'paid' ? (
                    'Access Code Lookup'
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Upgrade to Access
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-medical-dark">MDM Calculator</CardTitle>
                <CardDescription>
                  Determine E/M level based on MDM
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-2">
                  <Calculator className="h-10 w-10 text-medical-blue/70" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${userRole === 'paid'
                    ? "bg-medical-blue hover:bg-medical-blue/90 text-white"
                    : "bg-gray-100 border border-gray-200 text-gray-500"}`}
                  onClick={() => navigate('/modules/em-coding/mdm-coding')}
                  variant={userRole !== 'paid' ? 'outline' : 'default'}
                  disabled={userRole !== 'paid'}
                >
                  {userRole === 'paid' ? (
                    'Access MDM Calculator'
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Upgrade to Access
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-medical-dark">Smart Phrases</CardTitle>
                <CardDescription>
                  Documentation templates for billing
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-10 w-10 text-medical-blue/70" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${userRole === 'paid'
                    ? "bg-medical-blue hover:bg-medical-blue/90 text-white"
                    : "bg-gray-100 border border-gray-200 text-gray-500"}`}
                  onClick={() => navigate('/modules/tools/smart-phrases')}
                  variant={userRole !== 'paid' ? 'outline' : 'default'}
                  disabled={userRole !== 'paid'}
                >
                  {userRole === 'paid' ? (
                    'View Smart Phrases'
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Upgrade to Access
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Chat Component (conditionally rendered) */}
      {isOpen && <AIChat />}
    </div>
  )
}