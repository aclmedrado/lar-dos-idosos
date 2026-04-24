import './globals.css';
import { AppShell } from '@/components/AppShell';

export const metadata = {
  title: 'Associação Lar dos Idosos de Nazário',
  description: 'Sistema de Gestão do Lar de Idosos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}