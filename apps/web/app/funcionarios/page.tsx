import { PageHeader } from '@/components/ui/page-header';
import { EmployeesPageClient } from '@/components/employees/employees-page-client';

export default function FuncionariosPage() {
  return (
    <div>
      <PageHeader 
        title="Funcionários" 
        description="Gestão da equipe de colaboradores da associação." 
      />
      <EmployeesPageClient />
    </div>
  );
}