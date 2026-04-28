'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Resident } from '@/types/resident';
import styles from './residents-list.module.css';

interface ResidentsListProps {
  residents: Resident[];
  isLoading: boolean;
  error: string | null;
}

export function ResidentsList({ residents, isLoading, error }: ResidentsListProps) {
  // Corrige problema de fuso horário ao renderizar a data ISO
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <Card title="Lista de Residentes">
      <div className={styles.tableContainer}>
        {isLoading && <div className={styles.feedbackMsg}>Carregando residentes...</div>}
        
        {error && <div className={`${styles.feedbackMsg} ${styles.errorMsg}`}>{error}</div>}

        {!isLoading && !error && residents.length === 0 && (
          <div className={styles.feedbackMsg}>Nenhum residente cadastrado.</div>
        )}

        {!isLoading && !error && residents.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Nome Completo</th>
                <th className={styles.th}>Nascimento</th>
                <th className={styles.th}>Documento</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => (
                <tr key={resident.id}>
                  <td className={styles.td}><strong>{resident.fullName}</strong></td>
                  <td className={styles.td}>{formatDate(resident.birthDate)}</td>
                  <td className={styles.td}>{resident.documentId || 'Não informado'}</td>
                  <td className={styles.td}>{resident.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}