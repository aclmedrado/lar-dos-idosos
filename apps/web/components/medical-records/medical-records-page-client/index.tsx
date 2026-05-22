'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MedicalRecordsForm } from '../medical-records-form';
import { MedicalRecordsList } from '../medical-records-list';
import { getMedicalRecords } from '@/lib/medical-records';
import { getResidents } from '@/lib/residents';
import { MedicalRecord } from '@/types/medical-record';
import { Resident } from '@/types/resident';
import styles from './medical-records-page.module.css';

export function MedicalRecordsPageClient() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedRecords, fetchedResidents] = await Promise.all([
        getMedicalRecords(),
        getResidents()
      ]);
      setRecords(fetchedRecords);
      setResidents(fetchedResidents);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar os dados médicos.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtra residentes que ainda não possuem prontuário
  const availableResidents = residents.filter(
    (resident) => !records.some((record) => record.residentId === resident.id)
  );

  const handleEdit = (record: MedicalRecord) => {
    setEditingRecord(record);
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <MedicalRecordsForm 
          onSuccess={() => {
            fetchData();
            setEditingRecord(null);
          }} 
          editingRecord={editingRecord}
          onCancelEdit={handleCancelEdit}
          availableResidents={availableResidents}
        />
      </div>
      <div className={styles.listSection}>
        <MedicalRecordsList 
          records={records} 
          isLoading={isLoading} 
          error={error} 
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}