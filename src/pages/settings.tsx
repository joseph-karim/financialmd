import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Settings as SettingsIcon, Save, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const profileFormSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
})

const notificationsFormSchema = z.object({
  aiTips: z.boolean().default(true),
  progressUpdates: z.boolean().default(true),
  newContent: z.boolean().default(true),
})

export default function Settings() {
  const { user, userRole, signOut } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: user?.email || '',
      name: '',
    },
  })
  
  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      aiTips: true,
      progressUpdates: true,
      newContent: true,
    },
  })
  
  function onProfileSubmit(_data: z.infer<typeof profileFormSchema>) {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
      setIsSubmitting(false)
    }, 1000)
  }
  
  function onNotificationsSubmit(_data: z.infer<typeof notificationsFormSchema>) {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
      setIsSubmitting(false)
    }, 1000)
  }
  
  return (
    <div className="container max-w-3xl p-4 md:p-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>
              Update your account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="min-w-36 text-sm font-medium">Account Type:</span>
                <span className={`text-sm ${userRole === 'paid' ? 'text-green-500' : 'text-amber-500'}`}>
                  {userRole === 'paid' ? 'Full Access' : 'Limited Access (Preview Only)'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="min-w-36 text-sm font-medium">Email:</span>
                <span className="text-sm">{user?.email}</span>
              </div>
              
              {userRole !== 'paid' && (
                <Alert className="mt-4">
                  <AlertTitle>Upgrade your account</AlertTitle>
                  <AlertDescription>
                    You currently have limited access. Upgrade to full access to unlock all modules and features.
                  </AlertDescription>
                  <Button className="mt-2" size="sm">
                    Upgrade Now
                  </Button>
                </Alert>
              )}
            </div>
            
            <Separator className="my-6" />
            
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormDescription>
                        Email cannot be changed at this time
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This name will be used for personalization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...notificationsForm}>
              <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-4">
                <FormField
                  control={notificationsForm.control}
                  name="aiTips"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">AI Tips & Insights</FormLabel>
                        <FormDescription>
                          Receive helpful suggestions from the AI assistant
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="progressUpdates"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Progress Updates</FormLabel>
                        <FormDescription>
                          Notifications about your learning progress
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="newContent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">New Content Alerts</FormLabel>
                        <FormDescription>
                          Get notified when new content is added to the masterclass
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>
              Manage your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full sm:w-auto" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}