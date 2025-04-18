import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronRight, BookOpen, CheckCircle2, ArrowRight, Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from '@/components/layout/theme-toggle'

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header on landing page */}
      <header className="fixed top-0 z-10 flex w-full items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-primary">
            Primary Care Financial Masterclass
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative bg-background pt-24 pb-16 md:py-24 mt-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/tight text-primary max-w-[900px]">
              Reclaim Your Life and Boost Your Income: How I Turned a 40-Hour Week into a $400K Practice without Drowning in Paperwork
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Stop being a slave to endless EHR clicks and charting. Discover the proven system that lets you see 18 to 22 patients a day, maximize RVUs, and finally enjoy real work-life balance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/dashboard">
                  Enter Masterclass
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">
                  Log In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hook Section */}
      <section className="bg-muted/30 py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px] prose dark:prose-invert">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8 mb-6 text-center">
              The Story of Reclaiming My Life Back
            </h2>
            
            <p className="text-lg">
              Every morning, I used to wake up with a knot in my stomach, knowing that before I even saw a single patient, I'd be forced to battle an endless barrage of EHR screens and paperwork. No one in med school ever warned me that becoming a primary care doctor meant sacrificing your passion to fill out forms, decode confusing E&M coding rules, and fight with insurance companies over every dollar you deserve.
            </p>
            

            
            <p className="text-lg">
              I've seen too many of my colleagues become mere data-entry clerks, spending hours on repetitive charting and administrative tasks that rob us of our joy and our income. I was determined not to face that same fate.
            </p>
            <p className="text-lg">
              During my intern year, a seasoned internist with over 20 years of experience took me under his wing. He revealed a different path: a system that allowed me to see 18–22 patients a day, work no more than 40 hours a week, and still achieve top RVU numbers in my private clinic. I dove into every technical detail—mastering advanced E&M coding, streamlining documentation, and optimizing workflows—until I built a blueprint that transformed my practice. Today, I'm on track to earn $400K this year while maintaining balance and truly enjoying my work.
            </p>
            <p className="text-lg">
              If you're tired of being chained to an EHR and frustrated by a system that treats you like a cog rather than a skilled healer, you're not alone. It's time to reclaim your expertise, your time, and your income.
            </p>
          </div>
        </div>
      </section>

      {/* The Offer Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px]">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Introducing the Primary Care Financial Masterclass, a step-by-step blueprint designed specifically for primary care doctors who are fed up with endless paperwork and underwhelming compensation.
            </h2>

            <div className="grid gap-6 mt-10">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                    Advanced E&M Coding & Billing Strategies
                  </h3>
                  <p className="text-muted-foreground">
                    Learn the insider techniques that ensure you capture every dollar you deserve. We dive deep into the nitty-gritty of CPT codes, proper documentation, and avoiding common pitfalls.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                    Workflow & Time Management Optimization
                  </h3>
                  <p className="text-muted-foreground">
                    Discover how to see 18–22 patients daily while keeping your workweek to a manageable 40 hours. Say goodbye to late nights spent finishing charts and hello to more time with your family.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                    Proven Income-Boosting Methods
                  </h3>
                  <p className="text-muted-foreground">
                    Implement tactics that have helped me and many others increase monthly income by $3,000 to $15,000. We break down complex RVU systems and reveal how to maximize reimbursements.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 flex justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/dashboard">
                  Enter Masterclass
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px]">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What Doctors Are Saying</h2>
            <div className="grid gap-6">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="italic text-muted-foreground">
                    "I was constantly working late to finish charts and still barely making $200K a year. This masterclass completely transformed my approach to billing and coding. Within 3 months, I was earning an additional $4,000 per month while actually spending LESS time at work."
                  </p>
                  <div className="mt-4 font-medium">
                    Dr. Emily Chen - Family Medicine
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="italic text-muted-foreground">
                    "The strategies in this masterclass are a game-changer. I had no idea I was leaving so much money on the table with my basic coding practices. Learning about commonly missed add-on codes alone has boosted my RVUs by over 15% with no additional patients."
                  </p>
                  <div className="mt-4 font-medium">
                    Dr. Michael Rodriguez - Internal Medicine
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-[800px]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your Practice?</h2>
            <p className="mb-8 text-lg">
              Join thousands of physicians who've already discovered how to maximize their earnings while reclaiming their time and passion for medicine.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/dashboard">
                Enter the Masterclass
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <p className="text-sm text-muted-foreground">
                Primary Care Financial Masterclass © {new Date().getFullYear()}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              This content is for educational purposes only
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}