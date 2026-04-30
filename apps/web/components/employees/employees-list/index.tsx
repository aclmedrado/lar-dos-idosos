'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Feedback } from '@/components/ui/feedback';
import { Employee } from '@/types/employee';
import tableStyles from '@/components/ui/table/table.module.css';
import styles from './employees-list.module.css';

interface EmployeesListProps {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  onEdit: (employee: Employee) => void;
  onInactivate: (id: string) => void;
  actionFeedback: {type: 'success'|'error', msg: string} | null;
}

export function EmployeesList({ employees, isLoading, error, onEdit, onInactivate, actionFeedback }: EmployeesListProps) {
  return (
    <Card title="Lista de Funcionários">
      
      {actionFeedback && <Feedback type={actionFeedback.type} message={actionFeedback.msg} />}

      <div className={tableStyles.tableContainer}>
        {isLoading && <div className={tableStyles.feedbackMsg}>⏳ Carregando funcionários...</div>}
        
        {error && <Feedback type="error" message={error} />}

        {!isLoading && !error && employees.length === 0 && (
          <div className={styles.emptyState}>
            <p>Não há registros cadastrados ainda.</p>
          </div>
        )}

        {!isLoading && !error && employees.length > 0 && (
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th className={tableStyles.th}>Nome Completo</th>
                <th className={tableStyles.th}>Cargo</th>
                <th className={tableStyles.th}>Contato</th>
                <th className={tableStyles.th}>Status</th>
                <th className={tableStyles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                const isInactive = employee.status === 'INACTIVE';
                const contactInfo = [employee.phone, employee.email].filter(Boolean).join(' | ');
                
                return (
                  <tr key={employee.id} className={isInactive ? styles.inactiveRow : styles.activeRow}>
                    <td className={`${tableStyles.td} ${styles.td}`}>
                      <strong>{employee.fullName}</strong>
                      <div className={styles.subtext}>Doc: {employee.documentId || 'N/A'}</div>
                    </td>
                    <td className={`${tableStyles.td} ${styles.td}`}>{employee.role}</td>
                    <td className={`${tableStyles.td} ${styles.td}`}>{contactInfo || 'Não informado'}</td>
                    <td className={`${tableStyles.td} ${styles.td}`}>
                      <Badge status={employee.status} />
                    </td>
                    <td className={`${tableStyles.td} ${styles.td}`}>
                      <div className={tableStyles.actions}>
                        <button 
                          className={`${tableStyles.actionBtnEdit} ${styles.actionBtnEdit}`}
                          onClick={() => onEdit(employee)}
                        >
                          Editar
                        </button>
                        <button 
                          className={`${tableStyles.actionBtnDelete} ${styles.actionBtnDelete}`}
                          onClick={() => onInactivate(employee.id)}
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
