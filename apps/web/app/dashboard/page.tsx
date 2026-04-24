import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { AlertList } from '@/components/dashboard/alert-list';
import { OperationalSummary } from '@/components/dashboard/operational-summary';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      <PageHeader 
        title="Dashboard" 
        description="Visão geral e indicadores principais do Lar dos Idosos de Nazário." 
      />

      <section className={styles.statsGrid}>
        <StatCard title="Total de Residentes" value={42} helperText="2 admissões este mês" />
        <StatCard title="Funcionários Ativos" value={15} helperText="Equipe completa" />
        <StatCard title="Receitas do Mês" value="R$ 85.400,00" isCurrency helperText="Competência atual" />
        <StatCard title="Despesas do Mês" value="R$ 78.250,00" isCurrency helperText="Competência atual" />
        <StatCard title="Saldo Atual" value="R$ 7.150,00" isCurrency helperText="Caixa positivo" />
      </section>

      <section className={styles.detailsGrid}>
        <div className={styles.alertsSection}>
          <AlertList />
        </div>
        <div className={styles.summarySection}>
          <OperationalSummary />
        </div>
      </section>
    </div>
  );
}