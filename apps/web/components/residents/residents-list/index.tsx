'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Feedback } from '@/components/ui/feedback';
import { Resident } from '@/types/resident';
import tableStyles from '@/components/ui/table/table.module.css';
import styles from './residents-list.module.css';

interface ResidentsListProps {
  residents: Resident[];
  isLoading: boolean;
  error: string | null;
  onEdit: (resident: Resident) => void;
  onInactivate: (id: string) => void;
  actionFeedback: {type: 'success'|'error', msg: string} | null;
}

export function ResidentsList({ residents, isLoading, error, onEdit, onInactivate, actionFeedback }: ResidentsListProps) {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <Card title="Lista de Residentes">
      
      {actionFeedback && <Feedback type={actionFeedback.type} message={actionFeedback.msg} />}
      
      <div className={tableStyles.tableContainer}>
        {isLoading && <div className={tableStyles.feedbackMsg}>⏳ Carregando residentes...</div>}
        
        {error && <Feedback type="error" message={error} />}

        {!isLoading && !error && residents.length === 0 && (
          <div className={styles.emptyState}>
            <p>Não há registros cadastrados ainda.</p>
          </div>
        )}

        {!isLoading && !error && residents.length > 0 && (
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th className={tableStyles.th}>Nome Completo</th>
                <th className={tableStyles.th}>Nascimento</th>
                <th className={tableStyles.th}>Documento</th>
                <th className={tableStyles.th}>Status</th>
                <th className={tableStyles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => {
                const isInactive = resident.status === 'INACTIVE';
                return (
                  <tr key={resident.id} className={isInactive ? styles.inactiveRow : styles.activeRow}>
                    <td className={`${tableStyles.td} ${styles.td}`}><strong>{resident.fullName}</strong></td>
                    <td className={`${tableStyles.td} ${styles.td}`}>{formatDate(resident.birthDate)}</td>
                    <td className={`${tableStyles.td} ${styles.td}`}>{resident.documentId || 'Não informado'}</td>
                    <td className={`${tableStyles.td} ${styles.td}`}>
                      <Badge status={resident.status} />
                    </td>
                    <td className={`${tableStyles.td} ${styles.td}`}>
                      <div className={tableStyles.actions}>
                        <button 
                          className={`${tableStyles.actionBtnEdit} ${styles.actionBtnEdit}`}
                          onClick={() => onEdit(resident)}
                        >
                          Editar
                        </button>
                        <button 
                          className={`${tableStyles.actionBtnDelete} ${styles.actionBtnDelete}`}
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
