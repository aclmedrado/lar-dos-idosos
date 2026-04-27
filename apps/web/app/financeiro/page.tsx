import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';

export default function FinanceiroPage() {
  return (
    <div>
      <PageHeader title="Financeiro / Livro Caixa" description="Controle de fluxo de caixa." />
      <Card>
        <p>Controle de receitas e despesas da instituição. Gerenciamento de categorias, datas de competência e cálculo de saldo acumulado.</p>
      </Card>
    </div>
  );
}