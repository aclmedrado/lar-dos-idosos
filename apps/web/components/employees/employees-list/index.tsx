'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Employee } from '@/types/employee';
import styles from './employees-list.module.css';

interface EmployeesListProps {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  onEdit: (employee: Employee) => void;
  onInactivate: (id: string) => void;
}

export function EmployeesList({ employees, isLoading, error, onEdit, onInactivate }: EmployeesListProps) {
  return (
    <Card title="Lista de Funcionários">
      <div className={styles.tableContainer}>
        {isLoading && <div className={styles.feedbackMsg}>Carregando funcionários...</div>}
        
        {error && <div className={`${styles.feedbackMsg} ${styles.errorMsg}`}>{error}</div>}

        {!isLoading && !error && employees.length === 0 && (
          <div className={styles.feedbackMsg}>Nenhum funcionário cadastrado.</div>
        )}

        {!isLoading && !error && employees.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Nome Completo</th>
                <th className={styles.th}>Cargo</th>
                <th className={styles.th}>Contato</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                const isInactive = employee.status === 'INACTIVE';
                const contactInfo = [employee.phone, employee.email].filter(Boolean).join(' | ');
                
                return (
                  <tr key={employee.id} className={isInactive ? styles.inactiveRow : ''}>
                    <td className={styles.td}>
                      <strong>{employee.fullName}</strong>
                      <div className={styles.subtext}>Doc: {employee.documentId || 'N/A'}</div>
                    </td>
                    <td className={styles.td}>{employee.role}</td>
                    <td className={styles.td}>{contactInfo || 'Não informado'}</td>
                    <td className={styles.td}>
                      <span className={isInactive ? styles.statusInactive : styles.statusActive}>
                        {employee.status}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <button 
                          className={styles.actionBtnEdit} 
                          onClick={() => onEdit(employee)}
                        >
                          Editar
                        </button>
                        <button 
                          className={styles.actionBtnDelete} 
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