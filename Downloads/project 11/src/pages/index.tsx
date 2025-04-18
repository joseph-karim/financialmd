import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { modules } from '@/lib/module-data';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const featuredModules = modules.slice(0, 3); // First 3 modules

  // Redirect to modules page if user is already logged in
  useEffect(() => {
    // This would typically check authentication status
    // For now, we'll just show the landing page
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Medical Billing & Coding Masterclass
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Optimize your primary care practice with evidence-based billing and coding strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/modules">
                Explore All Modules
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/modules/practice-efficiency">
                <BookOpen className="mr-2 h-4 w-4" />
                Start Learning
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {featuredModules.map((module) => (
            <Card key={module.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc pl-5 space-y-1">
                  {module.sections.slice(0, 3).map((section) => (
                    <li key={section.id} className="text-sm">{section.title}</li>
                  ))}
                  {module.sections.length > 3 && (
                    <li className="text-sm text-muted-foreground">
                      +{module.sections.length - 3} more sections
                    </li>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/modules/${module.slug}`}>
                    View Module
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Interactive Tools
              </CardTitle>
              <CardDescription>
                Access a comprehensive suite of tools to help optimize your billing and coding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Code Lookup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Search for CPT, HCPCS, and other billing codes with detailed information.
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/modules/tools/code-lookup">
                      Open Tool
                    </Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">MDM Level Calculator</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Determine the appropriate E/M level based on medical decision making.
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/modules/em-coding/mdm-coding">
                      Open Tool
                    </Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">AWV Checklist</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ensure all required components of Medicare AWV are completed.
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/modules/awv-optimization/components">
                      Open Tool
                    </Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Smart Phrase Library</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access reusable documentation snippets for common scenarios.
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/modules/tools/smart-phrases">
                      Open Tool
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to="/modules/tools">
                  View All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
