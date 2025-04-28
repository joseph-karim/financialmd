import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BookOpen, Mail, Loader2, UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/contexts/auth-context'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof formSchema>

export default function Register() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [signupComplete, setSignupComplete] = useState(false)
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setAuthError(null)
    
    try {
      const { error, data: userData } = await signUp(data.email, data.password)
      if (error) throw error
      
      if (userData) {
        setSignupComplete(true)
      }
    } catch (error) {
      console.error('Registration error:', error)
      if (error instanceof Error) {
        setAuthError(error.message)
      } else {
        setAuthError('An unknown error occurred during registration')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-primary">
          Primary Care Financial Masterclass
        </span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Sign up to get started with the Masterclass
          </CardDescription>
        </CardHeader>
        <CardContent>
          {authError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          {signupComplete ? (
            <div className="space-y-4 text-center">
              <Mail className="mx-auto h-12 w-12 text-primary" />
              <h3 className="text-xl font-medium">Verification email sent</h3>
              <p className="text-muted-foreground">
                We've sent a verification link to your email. Please check your inbox and click the link to confirm your account.
              </p>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="example@email.com"
                          type="email"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="••••••••"
                          type="password"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="••••••••"
                          type="password"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I accept the{' '}
                          <Link
                            to="#"
                            className="font-medium text-primary hover:underline"
                            onClick={(e) => e.preventDefault()}
                          >
                            terms and conditions
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}