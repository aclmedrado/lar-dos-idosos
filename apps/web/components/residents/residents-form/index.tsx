'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { createResident } from '@/lib/residents';
import styles from './residents-form.module.css';

interface ResidentsFormProps {
  onSuccess: () => void;
}

export function ResidentsForm({ onSuccess }: ResidentsFormProps) {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [documentId, setDocumentId] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validação local simples
    if (!fullName.trim() || !birthDate) {
      setError('Nome completo e Data de nascimento são obrigatórios.');
      return;
    }

    setIsLoading(true);
    try {
      await createResident({
        fullName,
        birthDate,
        documentId: documentId.trim() || undefined,
      });

      setSuccess('Residente cadastrado com sucesso!');
      setFullName('');
      setBirthDate('');
      setDocumentId('');
      onSuccess(); // Atualiza a lista na tela
      
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erro ao cadastrar residente.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Novo Residente">
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

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

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar Residente'}
        </button>
      </form>
    </Card>
  );
}