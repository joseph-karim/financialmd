import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-4 text-6xl font-bold">404</div>
        <h1 className="mb-2 text-2xl font-bold">Page Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">
            <BookOpen className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}