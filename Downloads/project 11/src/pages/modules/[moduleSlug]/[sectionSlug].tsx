import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getModuleBySlug, getSectionBySlug, Module, Section } from '@/lib/module-data';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ToolComponentLoader from '@/components/ToolComponentLoader';
import { Separator } from '@/components/ui/separator';

export default function ModuleSectionPage() {
  const router = useRouter();
  const { moduleSlug, sectionSlug } = router.query;
  const [module, setModule] = useState<Module | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (moduleSlug && sectionSlug) {
      const foundModule = getModuleBySlug(moduleSlug as string);
      const foundSection = getSectionBySlug(moduleSlug as string, sectionSlug as string);

      setModule(foundModule || null);
      setSection(foundSection || null);
      setLoading(false);
    }
  }, [moduleSlug, sectionSlug]);

  // Get previous and next sections
  const getPrevNextSections = () => {
    if (!module || !section) return { prev: null, next: null };

    const currentIndex = module.sections.findIndex(s => s.slug === section.slug);
    if (currentIndex === -1) return { prev: null, next: null };

    const prev = currentIndex > 0 ? module.sections[currentIndex - 1] : null;
    const next = currentIndex < module.sections.length - 1 ? module.sections[currentIndex + 1] : null;

    return { prev, next };
  };

  const { prev, next } = getPrevNextSections();

  // Render tool components if section has tools
  const renderTools = () => {
    if (!section?.hasTools || !section.toolComponents) return null;

    return (
      <div className="mt-8 space-y-8">
        <Separator />
        <h2 className="text-2xl font-bold">Interactive Tools</h2>

        {section.toolComponents.map((componentName) => (
          <ToolComponentLoader key={componentName} componentName={componentName} />
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!module || !section) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Module or Section Not Found</h1>
        <p>The requested module or section could not be found.</p>
        <Button asChild className="mt-4">
          <Link href="/modules">Back to Modules</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href={`/modules/${moduleSlug}`} className="text-sm text-muted-foreground hover:text-primary">
          ← Back to {module.title}
        </Link>
        <h1 className="text-3xl font-bold mt-2">{section.title}</h1>
      </div>

      {section.content && (
        <div className="prose max-w-none">
          <p>{section.content}</p>
        </div>
      )}

      {renderTools()}

      <div className="flex justify-between mt-12">
        {prev ? (
          <Button variant="outline" asChild>
            <Link href={`/modules/${moduleSlug}/${prev.slug}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              {prev.title}
            </Link>
          </Button>
        ) : (
          <div></div>
        )}

        {next && (
          <Button asChild>
            <Link href={`/modules/${moduleSlug}/${next.slug}`}>
              {next.title}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
