import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getModuleBySlug, Module } from '@/lib/module-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function ModuleIndexPage() {
  const router = useRouter();
  const { moduleSlug } = router.query;
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (moduleSlug) {
      const foundModule = getModuleBySlug(moduleSlug as string);
      setModule(foundModule || null);
      setLoading(false);
    }
  }, [moduleSlug]);

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!module) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
        <p>The requested module could not be found.</p>
        <Button asChild className="mt-4">
          <Link href="/modules">Back to Modules</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/modules" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to All Modules
        </Link>
        <h1 className="text-4xl font-bold mt-2">{module.title}</h1>
        <p className="text-xl mt-2 text-muted-foreground">{module.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {module.sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              {section.hasTools && (
                <Badge variant="outline" className="w-fit">Interactive Tools</Badge>
              )}
            </CardHeader>
            <CardContent>
              {section.content && <p>{section.content}</p>}
              {!section.content && <p className="text-muted-foreground">Learn about {section.title.toLowerCase()}</p>}
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/modules/${module.slug}/${section.slug}`}>
                  Go to Section
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
