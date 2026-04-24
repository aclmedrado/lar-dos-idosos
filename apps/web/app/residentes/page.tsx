import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';

export default function ResidentesPage() {
  return (
    <div>
      <PageHeader title="Residentes" description="Gestão de cadastros e dados pessoais." />
      <Card>
        <p>Módulo dedicado ao cadastro, busca, edição e filtros dos residentes do lar, incluindo dados de contato dos responsáveis.</p>
      </Card>
    </div>
  );
}