import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/auth-context'

export default function PaymentSuccess() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)
  
  useEffect(() => {
    // Redirect to dashboard if not authenticated
    if (!user) {
      navigate('/login')
    }

    // Countdown timer to auto-redirect to dashboard
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [user, navigate])
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-2">
            Thank you for your purchase. You now have full access to the Primary Care Financial Masterclass.
          </p>
          <p className="text-muted-foreground">
            You'll be redirected to your dashboard in {countdown} seconds, or you can click the button below.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" asChild>
            <Link to="/dashboard">
              <BookOpen className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}