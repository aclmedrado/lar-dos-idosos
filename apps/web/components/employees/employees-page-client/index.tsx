'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { EmployeesForm } from '../employees-form';
import { EmployeesList } from '../employees-list';
import { getEmployees, deleteEmployee } from '@/lib/employees';
import { Employee } from '@/types/employee';
import styles from './employees-page.module.css';

export function EmployeesPageClient() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar a lista de funcionários.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  const handleInactivate = async (id: string) => {
    if (window.confirm('Tem certeza que deseja inativar este funcionário?')) {
      try {
        await deleteEmployee(id);
        alert('Funcionário inativado com sucesso!');
        fetchEmployees();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erro ao inativar funcionário.';
        alert(message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <EmployeesForm 
          onSuccess={() => {
            fetchEmployees();
            setEditingEmployee(null);
          }} 
          editingEmployee={editingEmployee}
          onCancelEdit={handleCancelEdit}
        />
      </div>
      <div className={styles.listSection}>
        <EmployeesList 
          employees={employees} 
          isLoading={isLoading} 
          error={error} 
          onEdit={handleEdit}
          onInactivate={handleInactivate}
        />
      </div>
    </div>
  );
}