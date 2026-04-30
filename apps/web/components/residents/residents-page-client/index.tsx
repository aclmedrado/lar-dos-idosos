'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ResidentsForm } from '../residents-form';
import { ResidentsList } from '../residents-list';
import { getResidents, deleteResident } from '@/lib/residents';
import { Resident } from '@/types/resident';
import styles from './residents-page.module.css';

export function ResidentsPageClient() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{type: 'success'|'error', msg: string} | null>(null);

  const fetchResidents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getResidents();
      setResidents(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar a lista de residentes.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  const handleEdit = (resident: Resident) => {
    setEditingResident(resident);
    setActionFeedback(null);
  };

  const handleCancelEdit = () => {
    setEditingResident(null);
  };

  const handleInactivate = async (id: string) => {
    if (window.confirm('Tem certeza que deseja inativar este residente?')) {
      try {
        await deleteResident(id);
        setActionFeedback({ type: 'success', msg: 'Residente inativado com sucesso!' });
        fetchResidents();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erro ao inativar residente.';
        setActionFeedback({ type: 'error', msg: message });
      }
      // Limpa a mensagem após 5 segundos
      setTimeout(() => setActionFeedback(null), 5000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <ResidentsForm 
          onSuccess={() => {
            fetchResidents();
            setEditingResident(null);
            setActionFeedback(null);
          }} 
          editingResident={editingResident}
          onCancelEdit={handleCancelEdit}
        />
      </div>
      <div className={styles.listSection}>
        <ResidentsList 
          residents={residents} 
          isLoading={isLoading} 
          error={error} 
          onEdit={handleEdit}
          onInactivate={handleInactivate}
          actionFeedback={actionFeedback}
        />
      </div>
    </div>
  );
}