'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Resident } from '@/types/resident';
import styles from './residents-list.module.css';

interface ResidentsListProps {
  residents: Resident[];
  isLoading: boolean;
  error: string | null;
  onEdit: (resident: Resident) => void;
  onInactivate: (id: string) => void;
}

export function ResidentsList({ residents, isLoading, error, onEdit, onInactivate }: ResidentsListProps) {
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
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => {
                const isInactive = resident.status === 'INACTIVE';
                return (
                  <tr key={resident.id} className={isInactive ? styles.inactiveRow : ''}>
                    <td className={styles.td}><strong>{resident.fullName}</strong></td>
                    <td className={styles.td}>{formatDate(resident.birthDate)}</td>
                    <td className={styles.td}>{resident.documentId || 'Não informado'}</td>
                    <td className={styles.td}>
                      <span className={isInactive ? styles.statusInactive : styles.statusActive}>
                        {resident.status}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <button 
                          className={styles.actionBtnEdit} 
                          onClick={() => onEdit(resident)}
                        >
                          Editar
                        </button>
                        <button 
                          className={styles.actionBtnDelete} 
                          onClick={() => onInactivate(resident.id)}
                          disabled={isInactive}
                        >
                          Inativar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}