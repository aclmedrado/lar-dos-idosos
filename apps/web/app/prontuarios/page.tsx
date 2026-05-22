import { PageHeader } from '@/components/ui/page-header';
import { MedicalRecordsPageClient } from '@/components/medical-records/medical-records-page-client';

export default function ProntuariosPage() {
  return (
    <div>
      <PageHeader 
        title="Prontuários Médicos" 
        description="Gestão de histórico clínico e medicamentos dos residentes." 
      />
      <MedicalRecordsPageClient />
    </div>
  );
}