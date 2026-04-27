import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';

export default function ProntuariosPage() {
  return (
    <div>
      <PageHeader title="Prontuários" description="Informações médicas e de saúde." />
      <Card>
        <p>Gestão médica dos residentes. Contempla o registro de alergias, doenças crônicas, deficiências e controle de medicamentos de uso contínuo.</p>
      </Card>
    </div>
  );
}