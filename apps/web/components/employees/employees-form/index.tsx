'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Feedback } from '@/components/ui/feedback';
import { createEmployee, updateEmployee } from '@/lib/employees';
import { Employee } from '@/types/employee';
import styles from '@/components/ui/form/form.module.css';

interface EmployeesFormProps {
  onSuccess: () => void;
  editingEmployee: Employee | null;
  onCancelEdit: () => void;
}

export function EmployeesForm({ onSuccess, editingEmployee, onCancelEdit }: EmployeesFormProps) {
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setSuccess(null);

    if (editingEmployee) {
      setFullName(editingEmployee.fullName);
      setRole(editingEmployee.role);
      setDocumentId(editingEmployee.documentId || '');
      setPhone(editingEmployee.phone || '');
      setEmail(editingEmployee.email || '');
    } else {
      setFullName('');
      setRole('');
      setDocumentId('');
      setPhone('');
      setEmail('');
    }
  }, [editingEmployee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fullName.trim() || !role.trim()) {
      setError('Nome completo e Cargo são obrigatórios.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        fullName,
        role,
        documentId: documentId.trim() || undefined,
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
      };

      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, payload);
        setSuccess('Funcionário atualizado com sucesso!');
      } else {
        await createEmployee(payload);
        setSuccess('Funcionário cadastrado com sucesso!');
      }

      setFullName('');
      setRole('');
      setDocumentId('');
      setPhone('');
      setEmail('');
      onSuccess();
      
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao processar funcionário.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title={editingEmployee ? "Editar Funcionário" : "Novo Funcionário"}>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {error && <Feedback type="error" message={error} />}
        {success && <Feedback type="success" message={success} />}

        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>Nome Completo *</label>
          <input
            id="fullName"
            type="text"
            className={styles.input}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
            placeholder="Ex: Ana Souza"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.label}>Cargo *</label>
          <input
            id="role"
            type="text"
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isLoading}
            placeholder="Ex: Enfermeiro, Cuidador..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="documentId" className={styles.label}>Documento (Opcional)</label>
          <input
            id="documentId"
            type="text"
            className={styles.input}
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            disabled={isLoading}
            placeholder="Ex: 12345678900"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>Telefone (Opcional)</label>
          <input
            id="phone"
            type="text"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isLoading}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>E-mail (Opcional)</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder="email@exemplo.com"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading 
              ? (editingEmployee ? 'Salvando...' : 'Cadastrando...') 
              : (editingEmployee ? 'Salvar alterações' : 'Cadastrar Funcionário')}
          </button>
          
          {editingEmployee && (
            <button 
              type="button" 
              className={styles.cancelButton} 
              onClick={onCancelEdit}
              disabled={isLoading}
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}
