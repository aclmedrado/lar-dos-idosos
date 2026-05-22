import { fetchApi } from './api';
import { MedicalRecord, CreateMedicalRecordInput, UpdateMedicalRecordInput } from '../types/medical-record';

export async function getMedicalRecords(): Promise<MedicalRecord[]> {
  return fetchApi('/medical-records');
}

export async function getMedicalRecordById(id: string): Promise<MedicalRecord> {
  return fetchApi(`/medical-records/${id}`);
}

export async function getMedicalRecordByResidentId(residentId: string): Promise<MedicalRecord> {
  return fetchApi(`/medical-records/resident/${residentId}`);
}

export async function createMedicalRecord(data: CreateMedicalRecordInput): Promise<MedicalRecord> {
  return fetchApi('/medical-records', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateMedicalRecord(id: string, data: UpdateMedicalRecordInput): Promise<MedicalRecord> {
  return fetchApi(`/medical-records/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}