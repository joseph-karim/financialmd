import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  SidebarOpen,
  BookOpen,
  ChevronRight,
  Settings,
  CheckCircle2,
  LineChart,
  Brain,
  FileText,
  Calculator,
  // Module icons
  ClipboardList,
  Calendar,
  FileCode,
  HeartPulse,
  Plus,
  Wrench,
  // Legacy module icons
  Target,
  DollarSign,
  Scale,
  Users,
  CalendarDays,
  UserPlus,
  PlusCircle,
  Stethoscope,
  Scissors,
  Receipt,
  ArrowLeftRight,
  Clock,
  MoreHorizontal
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useProgressStore } from '@/store/progress-store'
import { useAuth } from '@/contexts/auth-context'
import { useChatStore } from '@/store/chat-store'
import { moduleNavItems } from '@/lib/module-data'

export function Sidebar() {
  const { userRole } = useAuth()
  const { completedModules } = useProgressStore()
  const { openChat } = useChatStore()
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  // Check if route is protected
  const isProtectedRoute = !['/login', '/register', '/'].includes(location.pathname)

  if (!isProtectedRoute) {
    return null
  }

  // On mobile, don't show sidebar expanded by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <aside className={cn(
        "fixed inset-y-0 left-0 z-20 w-64 transform border-r bg-background transition-all duration-200 md:relative",
        isOpen ? "translate-x-0" : "-translate-x-full md:w-16 md:translate-x-0"
      )}>
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h2 className={cn("text-lg font-semibold text-primary truncate",
            !isOpen && "hidden md:hidden")}>
            Masterclass
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:flex">
            <SidebarOpen className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="px-3 py-2">
            <div className="mb-2 px-4 py-1.5">
              <span className={cn("text-xs font-semibold text-muted-foreground",
                !isOpen && "hidden md:hidden")}>
                Main Navigation
              </span>
            </div>

            <div className="space-y-1">
              <TooltipProvider delayDuration={0}>
                {/* Dashboard */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        location.pathname === '/dashboard' && "bg-accent text-accent-foreground",
                        !isOpen && "md:justify-center"
                      )}
                      asChild
                    >
                      <Link to="/dashboard">
                        <LineChart className="mr-2 h-4 w-4" />
                        <span className={cn("", !isOpen && "hidden md:hidden")}>Dashboard</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {!isOpen && <TooltipContent side="right">Dashboard</TooltipContent>}
                </Tooltip>
              </TooltipProvider>

              {/* Patient Examples */}
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        location.pathname === '/patient-examples' && "bg-accent text-accent-foreground",
                        !isOpen && "md:justify-center"
                      )}
                      asChild={userRole === 'paid'}
                      disabled={userRole !== 'paid'}
                    >
                      <div className={userRole !== 'paid' ? "pointer-events-none" : undefined}>
                        <Link to={userRole === 'paid' ? "/patient-examples" : "#"} className="flex w-full items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          <span className={cn("", !isOpen && "hidden md:hidden")}>Patient Examples</span>
                          {userRole !== 'paid' && (
                            <ChevronRight className={cn("ml-auto h-4 w-4", !isOpen && "hidden md:hidden")} />
                          )}
                        </Link>
                      </div>
                    </Button>
                  </TooltipTrigger>
                  {!isOpen && <TooltipContent side="right">Patient Examples</TooltipContent>}
                </Tooltip>
              </TooltipProvider>

              {/* AI Assistant */}
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        !isOpen && "md:justify-center"
                      )}
                      onClick={openChat}
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      <span className={cn("", !isOpen && "hidden md:hidden")}>AI Assistant</span>
                    </Button>
                  </TooltipTrigger>
                  {!isOpen && <TooltipContent side="right">AI Assistant</TooltipContent>}
                </Tooltip>
              </TooltipProvider>

              {/* Modules */}
              <div className="py-2">
                <div className="mb-2 flex items-center justify-between px-4">
                  <span
                    className={cn(
                      "text-xs font-semibold text-muted-foreground",
                      !isOpen && "hidden md:hidden"
                    )}
                  >
                    Modules
                  </span>
                </div>

                {/* All modules */}
                <div className="space-y-1">
                  {moduleNavItems.map((module) => {
                    const isActive = location.pathname === `/modules/${module.id}` || location.pathname.startsWith(`/modules/${module.id}/`)
                    const isCompleted = !!completedModules[module.id]
                    const isAccessible = module.isPreview || userRole === 'paid'

                    // Choose the appropriate icon based on module type
                    let ModuleIcon = BookOpen; // Default icon

                    // Assign specific icons based on module ID
                    switch(module.id) {
                      // New module icons
                      case 'practice-efficiency':
                        ModuleIcon = ClipboardList;
                        break;
                      case 'awv-optimization':
                        ModuleIcon = Calendar;
                        break;
                      case 'em-coding':
                        ModuleIcon = FileCode;
                        break;
                      case 'chronic-care':
                        ModuleIcon = HeartPulse;
                        break;
                      case 'special-services':
                        ModuleIcon = Plus;
                        break;
                      case 'tools':
                        ModuleIcon = Wrench;
                        break;

                      // Legacy module icons
                      case 'introduction':
                        ModuleIcon = Target;
                        break;
                      case 'physician-reimbursement':
                        ModuleIcon = DollarSign;
                        break;
                      case 'coding-review':
                        ModuleIcon = FileCode;
                        break;
                      case 'billing-time-vs-complexity':
                        ModuleIcon = Scale;
                        break;
                      case 'office-visits':
                        ModuleIcon = Users;
                        break;
                      case 'annual-exams':
                        ModuleIcon = CalendarDays;
                        break;
                      case 'new-patient-visits':
                        ModuleIcon = UserPlus;
                        break;
                      case 'missed-codes':
                        ModuleIcon = PlusCircle;
                        break;
                      case 'preventative-medicine':
                        ModuleIcon = Stethoscope;
                        break;
                      case 'procedures':
                        ModuleIcon = Scissors;
                        break;
                      case 'medicare-billing':
                        ModuleIcon = Receipt;
                        break;
                      case 'medicare-wellness':
                        ModuleIcon = Calendar;
                        break;
                      case 'transition-care-management':
                        ModuleIcon = ArrowLeftRight;
                        break;
                      case 'daily-schedule':
                        ModuleIcon = Clock;
                        break;
                      case 'extras':
                        ModuleIcon = MoreHorizontal;
                        break;
                      default:
                        ModuleIcon = BookOpen;
                    }

                    return (
                      <TooltipProvider key={module.id} delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "w-full justify-start",
                                isActive && "bg-accent text-accent-foreground",
                                !isAccessible && "opacity-50",
                                !isOpen && "md:justify-center"
                              )}
                              asChild={isAccessible}
                              disabled={!isAccessible}
                            >
                              <div className={!isAccessible ? "pointer-events-none" : undefined}>
                                <Link to={isAccessible ? `/modules/${module.id}` : "#"} className="flex w-full items-center">
                                  {isCompleted ? (
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                  ) : (
                                    <ModuleIcon className={`mr-2 h-4 w-4 ${
                                      isActive || module.id.includes('preventative-medicine') || module.id.includes('medicare-wellness') || module.id.includes('transition-care-management') || module.id === 'physician-reimbursement'
                                        ? "text-medical-blue"
                                        : ""
                                    }`} />
                                  )}
                                  <span className={cn("", !isOpen && "hidden md:hidden")}>
                                    {module.title}
                                  </span>
                                  {!module.isPreview && userRole !== 'paid' && (
                                    <ChevronRight className={cn("ml-auto h-4 w-4", !isOpen && "hidden md:hidden")} />
                                  )}
                                </Link>
                              </div>
                            </Button>
                          </TooltipTrigger>
                          {!isOpen && <TooltipContent side="right">{module.title}</TooltipContent>}
                        </Tooltip>
                      </TooltipProvider>
                    )
                  })}
                </div>

                {/* Tools section */}
                <div className="py-2">
                  <div className="mb-2 flex items-center justify-between px-4">
                    <span
                      className={cn(
                        "text-xs font-semibold text-muted-foreground",
                        !isOpen && "hidden md:hidden"
                      )}
                    >
                      Tools
                    </span>
                  </div>

                  <div className="space-y-1">
                    {/* Cheat Sheet */}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-start",
                              location.pathname === '/cheat-sheet' && "bg-accent text-accent-foreground",
                              !isOpen && "md:justify-center"
                            )}
                            asChild={userRole === 'paid'}
                            disabled={userRole !== 'paid'}
                          >
                            <div className={userRole !== 'paid' ? "pointer-events-none" : undefined}>
                              <Link to={userRole === 'paid' ? "/cheat-sheet" : "#"} className="flex w-full items-center">
                                <FileText className="mr-2 h-4 w-4" />
                                <span className={cn("", !isOpen && "hidden md:hidden")}>Coding Cheat Sheet</span>
                                {userRole !== 'paid' && (
                                  <ChevronRight className={cn("ml-auto h-4 w-4", !isOpen && "hidden md:hidden")} />
                                )}
                              </Link>
                            </div>
                          </Button>
                        </TooltipTrigger>
                        {!isOpen && <TooltipContent side="right">Coding Cheat Sheet</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>

                    {/* RVU Calculator */}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-start",
                              location.pathname === '/rvu-lookup' && "bg-accent text-accent-foreground",
                              !isOpen && "md:justify-center"
                            )}
                            asChild={userRole === 'paid'}
                            disabled={userRole !== 'paid'}
                          >
                            <div className={userRole !== 'paid' ? "pointer-events-none" : undefined}>
                              <Link to={userRole === 'paid' ? "/rvu-lookup" : "#"} className="flex w-full items-center">
                                <Calculator className="mr-2 h-4 w-4" />
                                <span className={cn("", !isOpen && "hidden md:hidden")}>RVU Calculator</span>
                                {userRole !== 'paid' && (
                                  <ChevronRight className={cn("ml-auto h-4 w-4", !isOpen && "hidden md:hidden")} />
                                )}
                              </Link>
                            </div>
                          </Button>
                        </TooltipTrigger>
                        {!isOpen && <TooltipContent side="right">RVU Calculator</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>

                    {/* Settings */}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-start",
                              location.pathname === '/settings' && "bg-accent text-accent-foreground",
                              !isOpen && "md:justify-center"
                            )}
                            asChild
                          >
                            <Link to="/settings">
                              <Settings className="mr-2 h-4 w-4" />
                              <span className={cn("", !isOpen && "hidden md:hidden")}>Settings</span>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {!isOpen && <TooltipContent side="right">Settings</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Mobile backdrop when sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}