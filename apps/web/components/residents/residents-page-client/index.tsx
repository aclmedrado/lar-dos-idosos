'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ResidentsForm } from '../residents-form';
import { ResidentsList } from '../residents-list';
import { getResidents } from '@/lib/residents';
import { Resident } from '@/types/resident';
import styles from './residents-page.module.css';

export function ResidentsPageClient() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResidents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getResidents();
      setResidents(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Falha ao carregar a lista de residentes.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Busca inicial
  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <ResidentsForm onSuccess={fetchResidents} />
      </div>
      <div className={styles.listSection}>
        <ResidentsList residents={residents} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}