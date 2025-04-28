import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/auth-context"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Settings, LogOut, User, Book, LineChart } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  
  // Don't show header on login and register pages
  if (['/login', '/register'].includes(location.pathname)) {
    return null
  }
  
  // Don't show header on landing page
  if (location.pathname === '/') {
    return null
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Book className="h-6 w-6 text-medical-blue" />
          <span className="hidden text-lg font-semibold text-medical-blue md:block">
            Primary Care Financial Masterclass
          </span>
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{user.email}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="flex w-full items-center gap-2 cursor-pointer">
                  <LineChart className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex w-full items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => signOut()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-medical-blue hover:bg-medical-blue/90 text-white">
              <Link to="/register">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}