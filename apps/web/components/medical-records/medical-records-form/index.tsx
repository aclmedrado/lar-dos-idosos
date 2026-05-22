'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Feedback } from '@/components/ui/feedback';
import { createMedicalRecord, updateMedicalRecord } from '@/lib/medical-records';
import { MedicalRecord } from '@/types/medical-record';
import { Resident } from '@/types/resident';
import formStyles from '@/components/ui/form/form.module.css';
import localStyles from './medical-records-form.module.css';

interface MedicalRecordsFormProps {
  onSuccess: () => void;
  editingRecord: MedicalRecord | null;
  onCancelEdit: () => void;
  availableResidents: Resident[];
}

export function MedicalRecordsForm({ 
  onSuccess, 
  editingRecord, 
  onCancelEdit, 
  availableResidents 
}: MedicalRecordsFormProps) {
  const [residentId, setResidentId] = useState('');
  const [allergies, setAllergies] = useState('');
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [disabilities, setDisabilities] = useState('');
  const [usesContinuousMedication, setUsesContinuousMedication] = useState(false);
  const [currentMedications, setCurrentMedications] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const noResidentsAvailable = !editingRecord && availableResidents.length === 0;

  // Função local para limpar todos os campos do formulário
  const resetForm = useCallback(() => {
    setResidentId('');
    setAllergies('');
    setChronicDiseases('');
    setDisabilities('');
    setUsesContinuousMedication(false);
    setCurrentMedications('');
    setMedicalHistory('');
    setNotes('');
  }, []);

  useEffect(() => {
    setError(null);
    
    if (editingRecord) {
      // Ao entrar em modo edição, limpamos mensagens anteriores e preenchemos os campos
      setSuccess(null);
      setResidentId(editingRecord.residentId);
      setAllergies(editingRecord.allergies || '');
      setChronicDiseases(editingRecord.chronicDiseases || '');
      setDisabilities(editingRecord.disabilities || '');
      setUsesContinuousMedication(editingRecord.usesContinuousMedication);
      setCurrentMedications(editingRecord.currentMedications || '');
      setMedicalHistory(editingRecord.medicalHistory || '');
      setNotes(editingRecord.notes || '');
    } else {
      // Ao cancelar edição ou voltar para modo criação, limpamos os campos.
      // Não limpamos 'success' aqui para permitir que a mensagem do submit sobreviva à troca de modo.
      resetForm();
    }
  }, [editingRecord, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!editingRecord && !residentId) {
      setError('Selecione um residente para o prontuário.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        allergies: allergies.trim() || undefined,
        chronicDiseases: chronicDiseases.trim() || undefined,
        disabilities: disabilities.trim() || undefined,
        usesContinuousMedication,
        currentMedications: currentMedications.trim() || undefined,
        medicalHistory: medicalHistory.trim() || undefined,
        notes: notes.trim() || undefined,
      };

      if (editingRecord) {
        await updateMedicalRecord(editingRecord.id, payload);
        setSuccess('Prontuário atualizado com sucesso!');
      } else {
        await createMedicalRecord({ residentId, ...payload });
        setSuccess('Prontuário cadastrado com sucesso!');
      }

      // Limpeza imediata após o sucesso
      resetForm();
      onSuccess();
      
      // Mantém a mensagem visível por 4 segundos
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao processar prontuário.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title={editingRecord ? "Editar Prontuário" : "Novo Prontuário"}>
      <form onSubmit={handleSubmit} className={formStyles.form}>
        
        {error && <Feedback type="error" message={error} />}
        {success && <Feedback type="success" message={success} />}
        {noResidentsAvailable && (
          <Feedback 
            type="info" 
            message="Todos os residentes já possuem prontuário cadastrado." 
          />
        )}

        <div className={formStyles.formGroup}>
          <label htmlFor="resident" className={formStyles.label}>Residente *</label>
          {editingRecord ? (
            <input 
              id="resident"
              className={formStyles.input} 
              value={editingRecord.resident?.fullName || 'Desconhecido'} 
              disabled 
            />
          ) : (
            <select
              id="resident"
              className={formStyles.input}
              value={residentId}
              onChange={(e) => setResidentId(e.target.value)}
              disabled={isLoading || noResidentsAvailable}
            >
              <option value="">Selecione um residente...</option>
              {availableResidents.map(r => (
                <option key={r.id} value={r.id}>{r.fullName}</option>
              ))}
            </select>
          )}
        </div>

        <div className={formStyles.formGroup}>
          <label htmlFor="allergies" className={formStyles.label}>Alergias</label>
          <input
            id="allergies"
            type="text"
            className={formStyles.input}
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            disabled={isLoading || noResidentsAvailable}
            placeholder="Ex: Dipirona, Penicilina"
          />
        </div>

        <div className={formStyles.formGroup}>
          <label htmlFor="chronicDiseases" className={formStyles.label}>Doenças Crônicas</label>
          <input
            id="chronicDiseases"
            type="text"
            className={formStyles.input}
            value={chronicDiseases}
            onChange={(e) => setChronicDiseases(e.target.value)}
            disabled={isLoading || noResidentsAvailable}
            placeholder="Ex: Hipertensão, Diabetes"
          />
        </div>

        <div className={formStyles.formGroup}>
          <label htmlFor="disabilities" className={formStyles.label}>Deficiências / Limitações</label>
          <input
            id="disabilities"
            type="text"
            className={formStyles.input}
            value={disabilities}
            onChange={(e) => setDisabilities(e.target.value)}
            disabled={isLoading || noResidentsAvailable}
            placeholder="Ex: Mobilidade reduzida"
          />
        </div>

        <div className={localStyles.checkboxContainer}>
          <input
            id="usesContinuousMedication"
            type="checkbox"
            className={localStyles.checkboxInput}
            checked={usesContinuousMedication}
            onChange={(e) => setUsesContinuousMedication(e.target.checked)}
            disabled={isLoading || noResidentsAvailable}
          />
          <label htmlFor="usesContinuousMedication" className={localStyles.checkboxLabel}>
            Faz uso de medicação contínua?
          </label>
        </div>

        {usesContinuousMedication && (
          <div className={formStyles.formGroup}>
            <label htmlFor="currentMedications" className={formStyles.label}>Quais medicamentos?</label>
            <input
              id="currentMedications"
              type="text"
              className={formStyles.input}
              value={currentMedications}
              onChange={(e) => setCurrentMedications(e.target.value)}
              disabled={isLoading || noResidentsAvailable}
              placeholder="Ex: Losartana 50mg"
            />
          </div>
        )}

        <div className={formStyles.formGroup}>
          <label htmlFor="medicalHistory" className={formStyles.label}>Histórico Médico Breve</label>
          <textarea
            id="medicalHistory"
            className={formStyles.input}
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            disabled={isLoading || noResidentsAvailable}
            rows={3}
          />
        </div>

        <div className={formStyles.formGroup}>
          <label htmlFor="notes" className={formStyles.label}>Observações Gerais</label>
          <textarea
            id="notes"
            className={formStyles.input}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isLoading || noResidentsAvailable}
            rows={2}
          />
        </div>

        <div className={formStyles.buttonGroup}>
          <button 
            type="submit" 
            className={formStyles.button} 
            disabled={isLoading || noResidentsAvailable}
          >
            {isLoading 
              ? (editingRecord ? 'Salvando...' : 'Cadastrando...') 
              : (editingRecord ? 'Salvar alterações' : 'Criar Prontuário')}
          </button>
          
          {editingRecord && (
            <button 
              type="button" 
              className={formStyles.cancelButton} 
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
