import React from 'react';
import { Card } from '@/components/ui/card';
import styles from './alert-list.module.css';

const mockAlerts = [
  { id: 1, type: 'health', message: 'Residente João Silva relatou febre (Alergia a Dipirona confirmada no prontuário).', date: 'Hoje, 08:30' },
  { id: 2, type: 'medication', message: 'Estoque de Losartana (uso contínuo de 5 residentes) baixo.', date: 'Hoje, 09:15' },
  { id: 3, type: 'finance', message: 'Vencimento da conta de energia elétrica em 2 dias.', date: 'Ontem' },
  { id: 4, type: 'system', message: '3 novos prontuários aguardando revisão da equipe médica.', date: 'Ontem' },
];

export function AlertList() {
  return (
    <Card title="Alertas Recentes">
      <ul className={styles.list}>
        {mockAlerts.map(alert => (
          <li key={alert.id} className={styles.listItem}>
            <div className={styles.alertDot} data-type={alert.type}></div>
            <div className={styles.alertContent}>
              <p className={styles.message}>{alert.message}</p>
              <span className={styles.date}>{alert.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}