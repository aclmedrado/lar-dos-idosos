import { PageHeader } from '@/components/ui/page-header';
import { ResidentsPageClient } from '@/components/residents/residents-page-client';

export default function ResidentesPage() {
  return (
    <div>
      <PageHeader 
        title="Residentes" 
        description="Gestão de cadastros e dados pessoais dos residentes da associação." 
      />
      <ResidentsPageClient />
    </div>
  );
}