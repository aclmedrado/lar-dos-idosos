'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Feedback } from '@/components/ui/feedback';
import { createResident, updateResident } from '@/lib/residents';
import { Resident } from '@/types/resident';
import styles from '@/components/ui/form/form.module.css';

interface ResidentsFormProps {
  onSuccess: () => void;
  editingResident: Resident | null;
  onCancelEdit: () => void;
}

export function ResidentsForm({ onSuccess, editingResident, onCancelEdit }: ResidentsFormProps) {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [documentId, setDocumentId] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setSuccess(null);

    if (editingResident) {
      setFullName(editingResident.fullName);
      setBirthDate(editingResident.birthDate.split('T')[0]);
      setDocumentId(editingResident.documentId || '');
    } else {
      setFullName('');
      setBirthDate('');
      setDocumentId('');
    }
  }, [editingResident]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fullName.trim() || !birthDate) {
      setError('Nome completo e Data de nascimento são obrigatórios.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        fullName,
        birthDate,
        documentId: documentId.trim() || undefined,
      };

      if (editingResident) {
        await updateResident(editingResident.id, payload);
        setSuccess('Residente atualizado com sucesso!');
      } else {
        await createResident(payload);
        setSuccess('Residente cadastrado com sucesso!');
      }

      setFullName('');
      setBirthDate('');
      setDocumentId('');
      onSuccess();
      
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao processar residente.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title={editingResident ? "Editar Residente" : "Novo Residente"}>
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
            placeholder="Ex: Maria da Silva"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="birthDate" className={styles.label}>Data de Nascimento *</label>
          <input
            id="birthDate"
            type="date"
            className={styles.input}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            disabled={isLoading}
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

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading 
              ? (editingResident ? 'Salvando...' : 'Cadastrando...') 
              : (editingResident ? 'Salvar alterações' : 'Cadastrar Residente')}
          </button>
          
          {editingResident && (
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
