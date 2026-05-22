'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Feedback } from '@/components/ui/feedback';
import { Badge } from '@/components/ui/badge';
import { MedicalRecord } from '@/types/medical-record';
import tableStyles from '@/components/ui/table/table.module.css';
import localStyles from './medical-records-list.module.css';

interface MedicalRecordsListProps {
  records: MedicalRecord[];
  isLoading: boolean;
  error: string | null;
  onEdit: (record: MedicalRecord) => void;
}

export function MedicalRecordsList({ records, isLoading, error, onEdit }: MedicalRecordsListProps) {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <Card title="Prontuários Ativos">
      <div className={tableStyles.tableContainer}>
        {isLoading && <div className={tableStyles.feedbackMsg}>⏳ Carregando prontuários...</div>}
        
        {error && <Feedback type="error" message={error} />}

        {!isLoading && !error && records.length === 0 && (
          <div className={localStyles.emptyState}>
            <p>Nenhum prontuário registrado ainda.</p>
          </div>
        )}

        {!isLoading && !error && records.length > 0 && (
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th className={tableStyles.th}>Residente</th>
                <th className={tableStyles.th}>Status</th>
                <th className={tableStyles.th}>Alergias</th>
                <th className={tableStyles.th}>Doenças Crônicas</th>
                <th className={tableStyles.th}>Medicação Contínua</th>
                <th className={tableStyles.th}>Medicamentos Atuais</th>
                <th className={tableStyles.th}>Última Atualização</th>
                <th className={tableStyles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const isInactive = record.resident?.status === 'INACTIVE';

                return (
                  <tr key={record.id} className={isInactive ? localStyles.inactiveRow : localStyles.activeRow}>
                    <td className={`${tableStyles.td} ${localStyles.td}`}>
                      <strong>{record.resident?.fullName || 'Desconhecido'}</strong>
                    </td>
                    <td className={`${tableStyles.td} ${localStyles.td}`}>
                      {record.resident ? (
                        <Badge status={record.resident.status} />
                      ) : (
                        <span className={localStyles.mutedText}>Não informado</span>
                      )}
                    </td>
                    <td className={`${tableStyles.td} ${localStyles.td}`}>
                      {record.allergies ? (
                        record.allergies
                      ) : (
                        <span className={localStyles.mutedText}>Não informado</span>
                      )}
                    </td>
                    <td className={`${tableStyles.td} ${localStyles.td}`}>
                      {record.chronicDiseases ? (
                        record.chronicDiseases
                      ) : (
                        <span className={localStyles.mutedText}>Não informado</span>
                      )}
                    </td>
                    <td className={`${tableStyles.td} ${localStyles.td}`}>
                      {record.usesContinuousMedication ? (
                        <span className={localStyles.positiveText}>Sim</span>
                      ) : (
                        <span className={localStyles.neutralText}>Não</span>
                      )}
                    </td>
                    <td className={`${tableStyles.td} ${localStyles.td}`}>
                      {record.currentMedications ? (
                        record.currentMedications
                      ) : (
                        <span className={localStyles.mutedText}>Não informado</span>
                      )}
                    </td>
                    <td className={`${tableStyles.td} ${localStyles.td}`}>
                      {formatDate(record.updatedAt)}
                    </td>
                    <td className={`${tableStyles.td} ${localStyles.td}`}>
                      <div className={tableStyles.actions}>
                        <button 
                          className={tableStyles.actionBtnEdit} 
                          onClick={() => onEdit(record)}
                        >
                          Editar
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