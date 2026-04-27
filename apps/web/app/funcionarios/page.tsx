import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';

export default function FuncionariosPage() {
  return (
    <div>
      <PageHeader title="Funcionários" description="Gestão da equipe de trabalho." />
      <Card>
        <p>Módulo para gestão da equipe. Aqui será feito o cadastro de funcionários, definição de funções/cargos e status de atividade.</p>
      </Card>
    </div>
  );
}