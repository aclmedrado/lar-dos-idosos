import React from 'react';
import { Card } from '@/components/ui/card';
import styles from './summary.module.css';

const mockSummary = [
  { label: 'Novos residentes (Mês)', value: '2' },
  { label: 'Funcionários em turno', value: '8' },
  { label: 'Prontuários atualizados hoje', value: '5' },
  { label: 'Consultas agendadas (Semana)', value: '12' },
];

export function OperationalSummary() {
  return (
    <Card title="Resumo Operacional">
      <div className={styles.summaryGrid}>
        {mockSummary.map((item, index) => (
          <div key={index} className={styles.summaryItem}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}