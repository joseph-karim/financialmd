import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getModuleById } from '@/lib/module-data';

// Map old module IDs to new module slugs
const moduleIdToSlugMap: Record<string, string> = {
  'introduction': 'practice-efficiency',
  'physician-reimbursement': 'em-coding',
  'coding-review': 'em-coding',
  'billing-time-vs-complexity': 'em-coding',
  'office-visits': 'em-coding',
  'annual-exams': 'awv-optimization',
  'new-patient-visits': 'em-coding',
  'missed-codes': 'tools',
  'preventative-medicine': 'awv-optimization',
  'procedures': 'special-services',
  'medicare-billing': 'awv-optimization',
  'medicare-wellness': 'awv-optimization',
  'transition-care-management': 'special-services',
  'daily-schedule': 'practice-efficiency',
  'extras': 'tools',
};

export default function LegacyModuleRedirect() {
  const router = useRouter();
  const { moduleId } = router.query;

  useEffect(() => {
    if (moduleId) {
      const moduleIdStr = moduleId as string;
      
      // Check if the module exists in the old structure
      const oldModule = getModuleById(moduleIdStr);
      
      if (oldModule) {
        // Map to new structure if possible
        const newSlug = moduleIdToSlugMap[moduleIdStr] || 'modules';
        router.replace(`/modules/${newSlug}`);
      } else {
        // If module doesn't exist, redirect to modules index
        router.replace('/modules');
      }
    }
  }, [moduleId, router]);

  return (
    <div className="container py-8">
      <p>Redirecting to new module structure...</p>
    </div>
  );
}
